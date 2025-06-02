
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { referredUserId, referralCode } = await req.json()

    // Trouver le parrain
    const { data: referrer } = await supabaseClient
      .from('users')
      .select('id')
      .eq('referral_code', referralCode)
      .single()

    if (!referrer) {
      return new Response(
        JSON.stringify({ error: 'Code de parrainage invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Créer la relation de parrainage
    const { error: referralError } = await supabaseClient
      .from('referrals')
      .insert({
        referrer_id: referrer.id,
        referred_id: referredUserId,
        status: 'active',
        reward_points: 100, // 100 points pour le parrain
        level: 1
      })

    if (referralError) {
      throw referralError
    }

    // Récompenser le parrain
    await supabaseClient
      .from('users')
      .update({
        points: supabaseClient.raw('points + 100')
      })
      .eq('id', referrer.id)

    // Récompenser le filleul
    await supabaseClient
      .from('users')
      .update({
        points: supabaseClient.raw('points + 50'),
        referred_by: referrer.id
      })
      .eq('id', referredUserId)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Parrainage activé avec succès'
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
