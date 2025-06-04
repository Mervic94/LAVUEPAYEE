
import { useEffect, useState } from 'react';
import { NotificationService } from '@/services/notificationService';

export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    checkNotificationSupport();
  }, []);

  const checkNotificationSupport = () => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator;
    setIsSupported(supported);
    
    if (supported) {
      setIsEnabled(Notification.permission === 'granted');
    }
    
    setIsLoading(false);
  };

  const enableNotifications = async () => {
    if (!isSupported) return false;

    setIsLoading(true);
    try {
      const success = await notificationService.initializePushNotifications();
      setIsEnabled(success);
      return success;
    } catch (error) {
      console.error('Erreur activation notifications:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = async (title: string, body: string, data?: any) => {
    if (!isEnabled) return;

    await notificationService.showLocalNotification({
      title,
      body,
      data
    });
  };

  return {
    isSupported,
    isEnabled,
    isLoading,
    enableNotifications,
    showNotification,
    notificationService
  };
};
