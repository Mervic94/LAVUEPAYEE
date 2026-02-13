
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const allowedActions = ['view', 'click', 'share'] as const
const actionFieldMap: Record<string, string> = {
  view: 'views_count',
  click: 'clicks_count',
  share: 'shares_count',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { adId, action } = await req.json()

    // Validate inputs
    if (!adId || typeof adId !== 'string') {
      return new Response(
        JSON.stringify({ error: 'ID de publicité invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!allowedActions.includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Action non valide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify authentication
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const updateField = actionFieldMap[action]

    // Use service role for updates
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Get current count and increment
    const { data: currentAd } = await supabaseService
      .from('ads')
      .select(`${updateField}, reward_points, reward_amount`)
      .eq('id', adId)
      .single()

    if (!currentAd) {
      return new Response(
        JSON.stringify({ error: 'Publicité introuvable' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    await supabaseService
      .from('ads')
      .update({ [updateField]: (currentAd[updateField] || 0) + 1 })
      .eq('id', adId)

    // Create task for non-view actions
    if (action !== 'view') {
      await supabaseService
        .from('tasks')
        .insert({
          user_id: user.id,
          ad_id: adId,
          type: action,
          reward_points: currentAd.reward_points,
          reward_amount: currentAd.reward_amount,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Action ${action} enregistrée`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Ad analytics error:', error)
    return new Response(
      JSON.stringify({ error: 'Une erreur est survenue' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
