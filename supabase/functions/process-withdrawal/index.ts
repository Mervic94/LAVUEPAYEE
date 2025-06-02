
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

    // Vérifier l'authentification
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Vérifier le solde
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

    // Calculer les frais (2% de base)
    const fee = amount * 0.02
    const netAmount = amount - fee

    // Créer la demande de retrait
    const { data: withdrawal, error } = await supabaseClient
      .from('withdrawals')
      .insert({
        user_id: user.id,
        amount,
        fee,
        net_amount: netAmount,
        method,
        payment_details: paymentDetails
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Déduire du portefeuille
    await supabaseClient
      .from('wallets')
      .update({
        balance: supabaseClient.raw(`balance - ${amount}`),
        pending_balance: supabaseClient.raw(`pending_balance + ${amount}`)
      })
      .eq('user_id', user.id)

    return new Response(
      JSON.stringify({ success: true, withdrawal }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
