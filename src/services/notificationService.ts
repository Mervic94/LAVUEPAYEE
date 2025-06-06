
export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  tag?: string;
  requireInteraction?: boolean;
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface NotificationPreferences {
  newTasks: boolean;
  taskReminders: boolean;
  pointsEarned: boolean;
  withdrawalUpdates: boolean;
  marketingEmails: boolean;
}

export class NotificationService {
  private static instance: NotificationService;
  private sw: ServiceWorker | null = null;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initializePushNotifications(): Promise<boolean> {
    try {
      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        console.warn('Push notifications not supported');
        return false;
      }

      // Demander la permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Notification permission denied');
        return false;
      }

      // Enregistrer le service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      return true;
    } catch (error) {
      console.error('Erreur initialisation notifications:', error);
      return false;
    }
  }

  async showLocalNotification(data: NotificationData): Promise<void> {
    try {
      if (Notification.permission !== 'granted') {
        console.warn('Permission notification non accordée');
        return;
      }

      const notification = new Notification(data.title, {
        body: data.body,
        icon: data.icon || '/favicon.ico',
        badge: data.badge || '/favicon.ico',
        tag: data.tag,
        requireInteraction: data.requireInteraction || false,
        data: data.data
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        
        if (data.data?.url) {
          window.location.href = data.data.url;
        }
      };

    } catch (error) {
      console.error('Erreur affichage notification:', error);
    }
  }

  async subscribeToPush(userId: string): Promise<PushSubscription | null> {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa40HI0YiqbN-nYcN2-z7I8MklqObRTW0W6s1p12-b1FG2c1q0JeRu7sKLqAgo' // Clé publique VAPID temporaire
        )
      });

      console.log('Push subscription created:', subscription);
      
      // Dans un vrai projet, sauvegarder en base de données
      const subscriptionData: PushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: this.arrayBufferToBase64(subscription.getKey('p256dh')),
          auth: this.arrayBufferToBase64(subscription.getKey('auth'))
        }
      };

      return subscriptionData;
    } catch (error) {
      console.error('Erreur souscription push:', error);
      return null;
    }
  }

  async getNotificationPreferences(userId: string): Promise<NotificationPreferences> {
    try {
      // Mock data - dans un vrai projet, récupérer depuis la base de données
      return {
        newTasks: true,
        taskReminders: true,
        pointsEarned: true,
        withdrawalUpdates: true,
        marketingEmails: false
      };
    } catch (error) {
      console.error('Erreur récupération préférences:', error);
      return {
        newTasks: false,
        taskReminders: false,
        pointsEarned: false,
        withdrawalUpdates: false,
        marketingEmails: false
      };
    }
  }

  async updateNotificationPreferences(userId: string, preferences: NotificationPreferences): Promise<boolean> {
    try {
      // Mock - dans un vrai projet, sauvegarder en base de données
      console.log('Préférences mises à jour:', { userId, preferences });
      return true;
    } catch (error) {
      console.error('Erreur mise à jour préférences:', error);
      return false;
    }
  }

  async scheduleNotification(data: NotificationData, delayMinutes: number): Promise<string> {
    try {
      const notificationId = `scheduled_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      setTimeout(() => {
        this.showLocalNotification(data);
      }, delayMinutes * 60 * 1000);

      console.log(`Notification programmée dans ${delayMinutes} minutes:`, data);
      return notificationId;
    } catch (error) {
      console.error('Erreur programmation notification:', error);
      throw error;
    }
  }

  async trackNotificationInteraction(notificationId: string, action: 'delivered' | 'opened' | 'clicked'): Promise<void> {
    try {
      // Mock analytics - dans un vrai projet, envoyer vers un service d'analytics
      console.log('Interaction notification trackée:', { notificationId, action, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error('Erreur tracking interaction:', error);
    }
  }

  // Fonctions utilitaires
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

  private arrayBufferToBase64(buffer: ArrayBuffer | null): string {
    if (!buffer) return '';
    
    const bytes = new Uint8Array(buffer);
    let binary = '';
    
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    return window.btoa(binary);
  }
}
