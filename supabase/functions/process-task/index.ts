
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get user from request
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { ad_id, task_type, proof_url } = await req.json();

    console.log('Processing task for user:', user.id, 'ad:', ad_id);

    // Get ad details
    const { data: ad, error: adError } = await supabaseClient
      .from('ads')
      .select('*, campaigns(*)')
      .eq('id', ad_id)
      .eq('status', 'active')
      .single();

    if (adError || !ad) {
      console.error('Ad not found:', adError);
      return new Response(
        JSON.stringify({ error: 'Ad not found or inactive' }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user already completed this task
    const { data: existingTask } = await supabaseClient
      .from('tasks')
      .select('id')
      .eq('user_id', user.id)
      .eq('ad_id', ad_id)
      .eq('status', 'completed')
      .maybeSingle();

    if (existingTask) {
      return new Response(
        JSON.stringify({ error: 'Task already completed' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create service client for database operations
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Create task record
    const { data: task, error: taskError } = await supabaseService
      .from('tasks')
      .insert({
        user_id: user.id,
        ad_id: ad_id,
        type: task_type || 'view',
        status: 'completed',
        reward_points: ad.reward_points,
        reward_amount: ad.reward_amount,
        proof_url: proof_url,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (taskError) {
      console.error('Error creating task:', taskError);
      return new Response(
        JSON.stringify({ error: 'Failed to create task' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Update user points and total earned
    const { error: userUpdateError } = await supabaseService
      .from('users')
      .update({ 
        points: supabaseService.raw(`points + ${ad.reward_points}`),
        total_earned: supabaseService.raw(`total_earned + ${ad.reward_amount}`)
      })
      .eq('id', user.id);

    if (userUpdateError) {
      console.error('Error updating user points:', userUpdateError);
    }

    // Update user wallet
    const { error: walletUpdateError } = await supabaseService
      .from('wallets')
      .update({ 
        balance: supabaseService.raw(`balance + ${ad.reward_amount}`),
        total_earned: supabaseService.raw(`total_earned + ${ad.reward_amount}`)
      })
      .eq('user_id', user.id);

    if (walletUpdateError) {
      console.error('Error updating wallet:', walletUpdateError);
    }

    // Update ad view count
    const { error: adUpdateError } = await supabaseService
      .from('ads')
      .update({ 
        views_count: supabaseService.raw(`views_count + 1`)
      })
      .eq('id', ad_id);

    if (adUpdateError) {
      console.error('Error updating ad stats:', adUpdateError);
    }

    console.log('Task processed successfully:', task.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        task_id: task.id,
        points_earned: ad.reward_points,
        amount_earned: ad.reward_amount
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
