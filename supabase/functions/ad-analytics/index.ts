
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Vérifier l'authentification
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Mettre à jour les statistiques de la publicité
    let updateField = ''
    switch (action) {
      case 'view':
        updateField = 'views_count'
        break
      case 'click':
        updateField = 'clicks_count'
        break
      case 'share':
        updateField = 'shares_count'
        break
      default:
        throw new Error('Action non valide')
    }

    const { error } = await supabaseClient
      .from('ads')
      .update({
        [updateField]: supabaseClient.raw(`${updateField} + 1`)
      })
      .eq('id', adId)

    if (error) {
      throw error
    }

    // Créer une tâche pour l'utilisateur si applicable
    if (action !== 'view') {
      const { data: ad } = await supabaseClient
        .from('ads')
        .select('reward_points, reward_amount')
        .eq('id', adId)
        .single()

      if (ad) {
        await supabaseClient
          .from('tasks')
          .insert({
            user_id: user.id,
            ad_id: adId,
            type: action,
            reward_points: ad.reward_points,
            reward_amount: ad.reward_amount,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Action ${action} enregistrée`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
