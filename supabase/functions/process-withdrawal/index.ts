import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// LAVUEPAYEE withdrawal rules
const MIN_WITHDRAWAL_VUC = 500;
const COMMISSION_RATE = 0.05; // 5%

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { amount_vuc, method, paymentDetails } = await req.json();

    if (typeof amount_vuc !== 'number' || isNaN(amount_vuc) || amount_vuc <= 0) {
      return json({ error: 'Montant VUC invalide' }, 400);
    }
    if (amount_vuc < MIN_WITHDRAWAL_VUC) {
      return json({ error: `Retrait minimum : ${MIN_WITHDRAWAL_VUC} VUC` }, 400);
    }
    if (!method || typeof method !== 'string') {
      return json({ error: 'Méthode de paiement invalide' }, 400);
    }

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return json({ error: 'Non autorisé' }, 401);

    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { data: wallet } = await supabaseService
      .from('wallets')
      .select('balance_vuc, locked_vuc')
      .eq('user_id', user.id)
      .single();

    if (!wallet || Number(wallet.balance_vuc || 0) < amount_vuc) {
      return json({ error: 'Solde VUC insuffisant' }, 400);
    }

    // VUC → XOF
    const { data: rateRow } = await supabaseService
      .from('token_rates')
      .select('vuc_to_xof')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const vucToXof = Number(rateRow?.vuc_to_xof ?? 5);

    const grossXof = amount_vuc * vucToXof;
    const feeXof = grossXof * COMMISSION_RATE;
    const netXof = grossXof - feeXof;

    const { data: withdrawal, error } = await supabaseService
      .from('withdrawals')
      .insert({
        user_id: user.id,
        amount: grossXof,
        amount_vuc,
        amount_xof: grossXof,
        fee: feeXof,
        net_amount: netXof,
        method,
        payment_details: paymentDetails || {},
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Withdrawal error:', error);
      return json({ error: 'Impossible de créer la demande de retrait' }, 500);
    }

    // Lock VUC: balance -= amount, locked += amount
    await supabaseService
      .from('wallets')
      .update({
        balance_vuc: Number(wallet.balance_vuc) - amount_vuc,
        locked_vuc: Number(wallet.locked_vuc || 0) + amount_vuc,
      })
      .eq('user_id', user.id);

    await supabaseService.from('transactions').insert({
      user_id: user.id,
      type: 'withdrawal',
      amount: grossXof,
      points: amount_vuc,
      status: 'pending',
      description: `Withdrawal ${amount_vuc} VUC via ${method}`,
      reference_id: withdrawal.id,
      platform_id: 'lavuepayee',
    });

    return json({
      success: true,
      withdrawal,
      summary: {
        amount_vuc,
        gross_xof: grossXof,
        commission_xof: feeXof,
        net_xof: netXof,
        commission_rate: COMMISSION_RATE,
        vuc_to_xof: vucToXof,
      },
    });
  } catch (e) {
    console.error('Withdrawal processing error:', e);
    return json({ error: 'Une erreur est survenue lors du traitement' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
