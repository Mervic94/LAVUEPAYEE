
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { ad_id, task_type, proof_url } = await req.json();

    // Validate inputs
    if (!ad_id || typeof ad_id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'ID de publicité invalide' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const allowedTaskTypes = ['view', 'click', 'share', 'like', 'comment', 'subscribe'];
    const validTaskType = allowedTaskTypes.includes(task_type) ? task_type : 'view';

    console.log('Processing task for user:', user.id, 'ad:', ad_id);

    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Get ad details
    const { data: ad, error: adError } = await supabaseService
      .from('ads')
      .select('*, campaigns(*)')
      .eq('id', ad_id)
      .eq('status', 'active')
      .single();

    if (adError || !ad) {
      console.error('Ad not found:', adError);
      return new Response(
        JSON.stringify({ error: 'Publicité introuvable ou inactive' }), 
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check duplicate
    const { data: existingTask } = await supabaseService
      .from('tasks')
      .select('id')
      .eq('user_id', user.id)
      .eq('ad_id', ad_id)
      .eq('status', 'completed')
      .maybeSingle();

    if (existingTask) {
      return new Response(
        JSON.stringify({ error: 'Tâche déjà complétée' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create task
    const { data: task, error: taskError } = await supabaseService
      .from('tasks')
      .insert({
        user_id: user.id,
        ad_id: ad_id,
        type: validTaskType,
        status: 'completed',
        reward_points: ad.reward_points,
        reward_amount: ad.reward_amount,
        proof_url: typeof proof_url === 'string' ? proof_url.slice(0, 2000) : null,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (taskError) {
      console.error('Error creating task:', taskError);
      return new Response(
        JSON.stringify({ error: 'Impossible de créer la tâche' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update user points (read-then-write to avoid raw())
    const { data: userData } = await supabaseService
      .from('users')
      .select('points, total_earned')
      .eq('id', user.id)
      .single();

    if (userData) {
      await supabaseService
        .from('users')
        .update({ 
          points: (userData.points || 0) + ad.reward_points,
          total_earned: (userData.total_earned || 0) + (ad.reward_amount || 0)
        })
        .eq('id', user.id);
    }

    // Update wallet
    const { data: walletData } = await supabaseService
      .from('wallets')
      .select('balance, total_earned')
      .eq('user_id', user.id)
      .single();

    if (walletData) {
      await supabaseService
        .from('wallets')
        .update({ 
          balance: (walletData.balance || 0) + (ad.reward_amount || 0),
          total_earned: (walletData.total_earned || 0) + (ad.reward_amount || 0)
        })
        .eq('user_id', user.id);
    }

    // Update ad view count
    const { data: adData } = await supabaseService
      .from('ads')
      .select('views_count')
      .eq('id', ad_id)
      .single();

    if (adData) {
      await supabaseService
        .from('ads')
        .update({ views_count: (adData.views_count || 0) + 1 })
        .eq('id', ad_id);
    }

    console.log('Task processed successfully:', task.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        task_id: task.id,
        points_earned: ad.reward_points,
        amount_earned: ad.reward_amount
      }), 
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Une erreur interne est survenue' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
