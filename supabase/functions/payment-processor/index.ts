
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

    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const paymentSuccess = Math.random() > 0.1
    const transactionStatus = paymentSuccess ? 'completed' : 'failed'
    const referenceId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create transaction
    const { data: transaction, error: transactionError } = await supabaseService
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'earning',
        amount,
        status: transactionStatus,
        description: typeof description === 'string' ? description.slice(0, 500) : '',
        reference_id: referenceId,
        payment_method: method,
        payment_details: { campaign_id: campaignId },
        processed_at: paymentSuccess ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (transactionError) {
      console.error('Transaction creation error:', transactionError)
      return new Response(
        JSON.stringify({ error: 'Impossible de créer la transaction' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // If payment succeeds, update wallet
    if (paymentSuccess) {
      const { data: wallet } = await supabaseService
        .from('wallets')
        .select('balance, total_earned')
        .eq('user_id', user.id)
        .single()

      if (wallet) {
        await supabaseService
          .from('wallets')
          .update({
            balance: (wallet.balance || 0) + amount,
            total_earned: (wallet.total_earned || 0) + amount
          })
          .eq('user_id', user.id)
      }

      // Update campaign budget
      if (campaignId && typeof campaignId === 'string') {
        const { data: campaign } = await supabaseService
          .from('campaigns')
          .select('spent')
          .eq('id', campaignId)
          .single()

        if (campaign) {
          await supabaseService
            .from('campaigns')
            .update({ spent: (campaign.spent || 0) + amount })
            .eq('id', campaignId)
        }
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
    console.error('Payment processing error:', error)
    return new Response(
      JSON.stringify({ error: 'Une erreur est survenue lors du traitement du paiement' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
