
import { supabase } from '@/integrations/supabase/client';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface PushSubscription {
  userId: string;
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class NotificationService {
  private static instance: NotificationService;
  private vapidPublicKey = 'BKs3s9g_M8QmQrBZr6QZr_aY3mL7Hv8XBh0uH4Fq4N9g3L2qA8Xs5Rt6Y_aEt3'; // Exemple

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Initialiser les notifications push
  async initializePushNotifications(): Promise<boolean> {
    try {
      // Vérifier le support des notifications
      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        console.log('Les notifications push ne sont pas supportées');
        return false;
      }

      // Demander la permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Permission refusée pour les notifications');
        return false;
      }

      // Enregistrer le service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      // S'abonner aux notifications push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      // Sauvegarder l'abonnement
      await this.savePushSubscription(subscription);

      return true;
    } catch (error) {
      console.error('Erreur initialisation notifications push:', error);
      return false;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private async savePushSubscription(subscription: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: user.id,
          endpoint: subscription.endpoint,
          p256dh_key: subscription.keys.p256dh,
          auth_key: subscription.keys.auth,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erreur sauvegarde abonnement push:', error);
    }
  }

  // Envoyer une notification locale
  async showLocalNotification(payload: NotificationPayload) {
    try {
      if (Notification.permission !== 'granted') {
        console.log('Permission requise pour afficher la notification');
        return;
      }

      const notification = new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icon-192x192.png',
        badge: payload.badge || '/badge-72x72.png',
        data: payload.data,
        actions: payload.actions,
        requireInteraction: true,
        tag: 'lavuepayee-notification'
      });

      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        
        if (payload.data?.url) {
          window.open(payload.data.url, '_blank');
        }
        
        notification.close();
      };

      // Auto-fermer après 10 secondes
      setTimeout(() => {
        notification.close();
      }, 10000);

    } catch (error) {
      console.error('Erreur affichage notification locale:', error);
    }
  }

  // Envoyer des notifications par type d'événement
  async notifyTaskCompleted(taskId: string, reward: number) {
    await this.showLocalNotification({
      title: 'Tâche complétée ! 🎉',
      body: `Vous avez gagné ${reward} LVP pour cette tâche`,
      icon: '/icon-192x192.png',
      data: {
        type: 'task_completed',
        taskId: taskId,
        url: '/tasks'
      }
    });
  }

  async notifyNewTask(taskTitle: string) {
    await this.showLocalNotification({
      title: 'Nouvelle tâche disponible',
      body: taskTitle,
      icon: '/icon-192x192.png',
      data: {
        type: 'new_task',
        url: '/tasks'
      }
    });
  }

  async notifyPayment(amount: number, method: string) {
    await this.showLocalNotification({
      title: 'Paiement reçu 💰',
      body: `${amount}€ crédité via ${method}`,
      icon: '/icon-192x192.png',
      data: {
        type: 'payment_received',
        url: '/wallet'
      }
    });
  }

  async notifyReferral(referralName: string) {
    await this.showLocalNotification({
      title: 'Nouveau filleul ! 👥',
      body: `${referralName} s'est inscrit grâce à vous`,
      icon: '/icon-192x192.png',
      data: {
        type: 'new_referral',
        url: '/affiliates'
      }
    });
  }

  async notifySystemMessage(title: string, message: string) {
    await this.showLocalNotification({
      title: title,
      body: message,
      icon: '/icon-192x192.png',
      data: {
        type: 'system_message',
        url: '/notifications'
      }
    });
  }

  // Envoyer une notification push à un utilisateur
  async sendPushNotification(userId: string, payload: NotificationPayload) {
    try {
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          userId: userId,
          payload: payload
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur envoi notification push:', error);
      return null;
    }
  }

  // Programmer des notifications
  async scheduleNotification(userId: string, payload: NotificationPayload, scheduledFor: Date) {
    try {
      const { error } = await supabase
        .from('scheduled_notifications')
        .insert({
          user_id: userId,
          title: payload.title,
          body: payload.body,
          data: payload.data,
          scheduled_for: scheduledFor.toISOString(),
          status: 'pending'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur programmation notification:', error);
      return false;
    }
  }

  // Gérer les préférences de notification
  async updateNotificationPreferences(preferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      const { error } = await supabase
        .from('user_settings')
        .update({
          notifications_email: preferences.email,
          notifications_push: preferences.push,
          notifications_sms: preferences.sms,
          notifications_marketing: preferences.marketing,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur mise à jour préférences:', error);
      return false;
    }
  }

  // Analyser l'engagement des notifications
  async trackNotificationEngagement(notificationId: string, action: 'opened' | 'clicked' | 'dismissed') {
    try {
      const { error } = await supabase
        .from('notification_analytics')
        .insert({
          notification_id: notificationId,
          action: action,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Erreur tracking notification:', error);
    }
  }
}
