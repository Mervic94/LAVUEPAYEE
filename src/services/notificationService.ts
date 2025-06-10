
export class NotificationService {
  private static instance: NotificationService;

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

  async showLocalNotification(title: string, body: string, data?: any): Promise<void> {
    try {
      if (Notification.permission !== 'granted') {
        console.warn('Permission notification non accordée');
        return;
      }

      const notification = new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        data
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
        
        if (data?.url) {
          window.location.href = data.url;
        }
      };
    } catch (error) {
      console.error('Erreur affichage notification:', error);
    }
  }

  async scheduleNotification(title: string, body: string, delayMinutes: number): Promise<void> {
    setTimeout(() => {
      this.showLocalNotification(title, body);
    }, delayMinutes * 60 * 1000);
  }
}
