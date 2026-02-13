
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
    // Authenticate user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const authClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await authClient.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { referralCode } = await req.json()

    // Validate input
    if (!referralCode || typeof referralCode !== 'string' || referralCode.length > 20) {
      return new Response(
        JSON.stringify({ error: 'Code de parrainage invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // The referred user must be the authenticated user
    const referredUserId = user.id

    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Check if user already has a referrer
    const { data: existingUser } = await supabaseService
      .from('users')
      .select('referred_by')
      .eq('id', referredUserId)
      .single()

    if (existingUser?.referred_by) {
      return new Response(
        JSON.stringify({ error: 'Vous avez déjà un parrain' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Find the referrer
    const { data: referrer } = await supabaseService
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

    // Cannot refer yourself
    if (referrer.id === referredUserId) {
      return new Response(
        JSON.stringify({ error: 'Vous ne pouvez pas vous parrainer vous-même' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create referral relationship
    const { error: referralError } = await supabaseService
      .from('referrals')
      .insert({
        referrer_id: referrer.id,
        referred_id: referredUserId,
        status: 'active',
        reward_points: 100,
        level: 1
      })

    if (referralError) {
      console.error('Referral creation error:', referralError)
      return new Response(
        JSON.stringify({ error: 'Ce parrainage existe déjà' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Reward referrer (+100 points)
    const { data: referrerData } = await supabaseService
      .from('users')
      .select('points')
      .eq('id', referrer.id)
      .single()

    if (referrerData) {
      await supabaseService
        .from('users')
        .update({ points: (referrerData.points || 0) + 100 })
        .eq('id', referrer.id)
    }

    // Reward referred user (+50 points) and set referred_by
    const { data: referredData } = await supabaseService
      .from('users')
      .select('points')
      .eq('id', referredUserId)
      .single()

    if (referredData) {
      await supabaseService
        .from('users')
        .update({
          points: (referredData.points || 0) + 50,
          referred_by: referrer.id
        })
        .eq('id', referredUserId)
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Parrainage activé avec succès'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Referral system error:', error)
    return new Response(
      JSON.stringify({ error: 'Une erreur est survenue lors du parrainage' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
