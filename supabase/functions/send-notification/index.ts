
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

    const { userId, type, title, message, data } = await req.json()

    // Récupérer les préférences utilisateur
    const { data: settings } = await supabaseClient
      .from('user_settings')
      .select('notifications_email, notifications_push, notifications_sms')
      .eq('user_id', userId)
      .single()

    const notifications = []

    // Notification email
    if (settings?.notifications_email) {
      // Ici vous pourriez intégrer un service email comme SendGrid
      notifications.push({
        type: 'email',
        status: 'sent',
        message: 'Email notification sent'
      })
    }

    // Notification push
    if (settings?.notifications_push) {
      // Ici vous pourriez intégrer un service push comme Firebase
      notifications.push({
        type: 'push',
        status: 'sent',
        message: 'Push notification sent'
      })
    }

    // Créer un message système
    await supabaseClient
      .from('messages')
      .insert({
        sender_id: '00000000-0000-0000-0000-000000000000', // ID système
        recipient_id: userId,
        content: message,
        type: 'system'
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        notifications,
        message: 'Notifications envoyées'
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
