
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

    const { amount, method, paymentDetails } = await req.json()

    // Validate inputs
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return new Response(
        JSON.stringify({ error: 'Montant invalide' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!method || typeof method !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Méthode de paiement invalide' }),
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

    // Check balance
    const { data: wallet } = await supabaseClient
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single()

    if (!wallet || wallet.balance < amount) {
      return new Response(
        JSON.stringify({ error: 'Solde insuffisant' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const fee = amount * 0.02
    const netAmount = amount - fee

    // Use service role for financial operations
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Create withdrawal
    const { data: withdrawal, error } = await supabaseService
      .from('withdrawals')
      .insert({
        user_id: user.id,
        amount,
        fee,
        net_amount: netAmount,
        method,
        payment_details: paymentDetails || {}
      })
      .select()
      .single()

    if (error) {
      console.error('Withdrawal creation error:', error)
      return new Response(
        JSON.stringify({ error: 'Impossible de créer la demande de retrait' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update wallet balances
    await supabaseService
      .from('wallets')
      .update({
        balance: (wallet.balance || 0) - amount,
        pending_balance: (wallet.balance || 0) + amount
      })
      .eq('user_id', user.id)

    return new Response(
      JSON.stringify({ success: true, withdrawal }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Withdrawal processing error:', error)
    return new Response(
      JSON.stringify({ error: 'Une erreur est survenue lors du traitement' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
