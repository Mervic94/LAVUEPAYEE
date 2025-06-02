
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

    const { amount, method, description, campaignId } = await req.json()

    // Vérifier l'authentification
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Simuler le traitement du paiement
    const paymentSuccess = Math.random() > 0.1 // 90% de succès

    const transactionStatus = paymentSuccess ? 'completed' : 'failed'
    const referenceId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Créer la transaction
    const { data: transaction, error: transactionError } = await supabaseClient
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'earning',
        amount,
        status: transactionStatus,
        description,
        reference_id: referenceId,
        payment_method: method,
        payment_details: { campaign_id: campaignId },
        processed_at: paymentSuccess ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (transactionError) {
      throw transactionError
    }

    // Si le paiement réussit, mettre à jour le portefeuille
    if (paymentSuccess) {
      await supabaseClient
        .from('wallets')
        .update({
          balance: supabaseClient.raw(`balance + ${amount}`),
          total_earned: supabaseClient.raw(`total_earned + ${amount}`)
        })
        .eq('user_id', user.id)

      // Mettre à jour le budget de la campagne
      if (campaignId) {
        await supabaseClient
          .from('campaigns')
          .update({
            spent: supabaseClient.raw(`spent + ${amount}`)
          })
          .eq('id', campaignId)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: paymentSuccess,
        transaction,
        message: paymentSuccess ? 'Paiement traité avec succès' : 'Échec du paiement'
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
