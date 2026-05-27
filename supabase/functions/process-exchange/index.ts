import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

    const { data: isAdmin } = await userClient.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!isAdmin) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });

    const { request_id, decision, admin_note } = await req.json();
    if (!['approved', 'rejected'].includes(decision)) {
      return new Response(JSON.stringify({ error: 'Invalid decision' }), { status: 400, headers: corsHeaders });
    }

    const admin = createClient(supabaseUrl, serviceKey);

    // Load request
    const { data: reqRow, error: loadErr } = await admin
      .from('exchange_requests').select('*').eq('id', request_id).single();
    if (loadErr || !reqRow) throw loadErr ?? new Error('Request not found');
    if (reqRow.status !== 'pending') {
      return new Response(JSON.stringify({ error: 'Already processed' }), { status: 400, headers: corsHeaders });
    }

    if (decision === 'approved') {
      // Deduct points
      const { data: u } = await admin.from('users').select('points').eq('id', reqRow.user_id).single();
      const currentPoints = u?.points ?? 0;
      if (currentPoints < reqRow.amount_points) {
        return new Response(JSON.stringify({ error: 'Insufficient points' }), { status: 400, headers: corsHeaders });
      }
      await admin.from('users').update({ points: currentPoints - reqRow.amount_points }).eq('id', reqRow.user_id);

      // Record transaction
      await admin.from('transactions').insert({
        user_id: reqRow.user_id,
        type: reqRow.type === 'fiat' ? 'withdrawal' : 'exchange',
        amount: reqRow.amount_fiat ?? 0,
        points: -reqRow.amount_points,
        status: 'completed',
        description: reqRow.type === 'product' ? 'Échange produit' : 'Retrait fiat',
        reference_id: request_id,
      });

      // Decrement stock if product
      if (reqRow.type === 'product' && reqRow.product_id) {
        const { data: p } = await admin.from('products').select('stock').eq('id', reqRow.product_id).single();
        if (p) await admin.from('products').update({ stock: Math.max(0, p.stock - 1) }).eq('id', reqRow.product_id);
      }
    }

    await admin.from('exchange_requests').update({
      status: decision,
      admin_note,
      processed_by: user.id,
      processed_at: new Date().toISOString(),
    }).eq('id', request_id);

    // Notify user
    await admin.from('notifications').insert({
      user_id: reqRow.user_id,
      title: decision === 'approved' ? 'Demande validée' : 'Demande refusée',
      message: decision === 'approved'
        ? `Votre demande d'échange de ${reqRow.amount_points} LVP a été validée.`
        : `Votre demande a été refusée. ${admin_note ?? ''}`.trim(),
      type: decision === 'approved' ? 'success' : 'warning',
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
