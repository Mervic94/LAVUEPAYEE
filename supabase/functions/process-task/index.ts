import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// LAVUEPAYEE economic rules (VueCoins)
const MIN_WATCH_PERCENT = 80;          // ≥80% de la durée
const COOLDOWN_SECONDS = 30;           // 30s entre 2 vues
const DAILY_VUC_CAP = 2000;            // plafond quotidien par user
const MAX_REGISTRATIONS_PER_IP_24H = 5;
const PLATFORM_ID = 'lavuepayee';

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return json({ error: 'Non autorisé' }, 401);
    }
    const token = authHeader.replace('Bearer ', '');
    const { data: authData } = await supabaseClient.auth.getUser(token);
    const user = authData.user;
    if (!user) return json({ error: 'Non autorisé' }, 401);

    const body = await req.json();
    const { ad_id, task_type, proof_url, watched_seconds, ip_hash, device } = body;

    if (!ad_id || typeof ad_id !== 'string') {
      return json({ error: 'ID de publicité invalide' }, 400);
    }

    const allowed = ['view', 'click', 'share', 'like', 'comment', 'subscribe'];
    const validTaskType = allowed.includes(task_type) ? task_type : 'view';

    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // ----- Layer 3 anti-fraud: max 5 registrations/IP/24h -----
    if (ip_hash && typeof ip_hash === 'string') {
      const { data: regCount } = await supabaseService.rpc(
        'count_recent_registrations_by_ip',
        { _ip_hash: ip_hash, _hours: 24 }
      );
      if (typeof regCount === 'number' && regCount > MAX_REGISTRATIONS_PER_IP_24H) {
        return json({ error: 'Trop d\'inscriptions depuis cette IP (anti-fraude)' }, 429);
      }
    }

    // ----- Get ad -----
    const { data: ad, error: adError } = await supabaseService
      .from('ads')
      .select('*, campaigns(*)')
      .eq('id', ad_id)
      .eq('status', 'active')
      .single();

    if (adError || !ad) return json({ error: 'Publicité introuvable ou inactive' }, 404);

    // ----- Watch-time validation (≥80%) for view tasks -----
    if (validTaskType === 'view') {
      const duration = ad.duration_sec || 30;
      const minRequired = Math.ceil((duration * (ad.min_watch_percent || MIN_WATCH_PERCENT)) / 100);
      const watched = Number(watched_seconds) || 0;
      if (watched < minRequired) {
        return json({
          error: `Durée de visionnage insuffisante (${watched}s / ${minRequired}s requis)`,
        }, 400);
      }
    }

    // ----- Cooldown 30s between two completions for same user -----
    const cooldownStart = new Date(Date.now() - COOLDOWN_SECONDS * 1000).toISOString();
    const { data: recent } = await supabaseService
      .from('tasks')
      .select('id, created_at')
      .eq('user_id', user.id)
      .gte('created_at', cooldownStart)
      .limit(1);
    if (recent && recent.length > 0) {
      return json({ error: `Cooldown actif (attendez ${COOLDOWN_SECONDS}s entre 2 actions)` }, 429);
    }

    // ----- Duplicate check -----
    const { data: existingTask } = await supabaseService
      .from('tasks')
      .select('id')
      .eq('user_id', user.id)
      .eq('ad_id', ad_id)
      .eq('status', 'completed')
      .maybeSingle();
    if (existingTask) return json({ error: 'Tâche déjà complétée' }, 400);

    // ----- Daily VUC cap -----
    const { data: userRow } = await supabaseService
      .from('users')
      .select('points, total_earned, daily_vuc_earned, daily_vuc_reset_at')
      .eq('id', user.id)
      .single();

    const today = new Date().toISOString().slice(0, 10);
    let dailyEarned = Number(userRow?.daily_vuc_earned || 0);
    let dailyResetAt = userRow?.daily_vuc_reset_at || today;
    if (dailyResetAt !== today) {
      dailyEarned = 0;
      dailyResetAt = today;
    }

    const reward = ad.reward_points || 0;
    if (dailyEarned + reward > DAILY_VUC_CAP) {
      return json({
        error: `Plafond quotidien atteint (${DAILY_VUC_CAP} VUC/jour). Déjà gagné : ${dailyEarned}`,
      }, 429);
    }

    // ----- Get current VUC→XOF rate (1 VUC = 5 XOF par défaut) -----
    const { data: rateRow } = await supabaseService
      .from('token_rates')
      .select('vuc_to_xof')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const vucToXof = Number(rateRow?.vuc_to_xof ?? 5);
    const rewardXof = reward * vucToXof;

    // ----- Create task -----
    const { data: task, error: taskError } = await supabaseService
      .from('tasks')
      .insert({
        user_id: user.id,
        ad_id,
        type: validTaskType,
        status: 'completed',
        reward_points: reward,
        reward_amount: rewardXof,
        proof_url: typeof proof_url === 'string' ? proof_url.slice(0, 2000) : null,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (taskError) {
      console.error('Task creation error:', taskError);
      return json({ error: 'Impossible de créer la tâche' }, 500);
    }

    // ----- Log ad_view (multi-platform tracking) -----
    if (validTaskType === 'view') {
      await supabaseService.from('ad_views').insert({
        ad_id,
        viewer_id: user.id,
        watched_seconds: Number(watched_seconds) || 0,
        rewarded_vuc: reward,
        ip_hash: ip_hash ?? null,
        device: device ?? null,
        platform_id: PLATFORM_ID,
      });
    }

    // ----- Update user totals + daily cap -----
    await supabaseService
      .from('users')
      .update({
        points: (userRow?.points || 0) + reward,
        total_earned: Number(userRow?.total_earned || 0) + rewardXof,
        daily_vuc_earned: dailyEarned + reward,
        daily_vuc_reset_at: dailyResetAt,
      })
      .eq('id', user.id);

    // ----- Update wallet (atomic via RPC) -----
    await supabaseService.rpc('increment_wallet_vuc', {
      p_user_id: user.id,
      p_amount: reward,
    });

    // ----- Log reward (multi-platform) -----
    await supabaseService.from('reward_logs').insert({
      user_id: user.id,
      ref_id: task.id,
      action_type: validTaskType,
      vuc_earned: reward,
      platform_id: PLATFORM_ID,
      description: `Reward for ${validTaskType} on ad ${ad_id}`,
    });

    // ----- Log transaction (multi-platform) -----
    await supabaseService.from('transactions').insert({
      user_id: user.id,
      type: 'reward',
      amount: rewardXof,
      points: reward,
      status: 'completed',
      description: `${validTaskType} ad reward`,
      reference_id: task.id,
      platform_id: PLATFORM_ID,
      processed_at: new Date().toISOString(),
    });

    // ----- Update ad counter -----
    await supabaseService
      .from('ads')
      .update({ views_count: (ad.views_count || 0) + 1 })
      .eq('id', ad_id);

    return json({
      success: true,
      task_id: task.id,
      points_earned: reward,
      amount_earned_xof: rewardXof,
      vuc_to_xof: vucToXof,
      daily_vuc_earned: dailyEarned + reward,
      daily_vuc_remaining: DAILY_VUC_CAP - (dailyEarned + reward),
    }, 200);
  } catch (e) {
    console.error('Unexpected error:', e);
    return json({ error: 'Une erreur interne est survenue' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
