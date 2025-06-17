
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { NotificationService } from '@/services/notificationService';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read_at: string | null;
  created_at: string;
  user_id: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialiser les notifications push
  useEffect(() => {
    const initNotifications = async () => {
      const service = NotificationService.getInstance();
      await service.initializePushNotifications();
    };
    
    initNotifications();
  }, []);

  // Charger les notifications
  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;

        const typedData = (data || []).map(notification => ({
          ...notification,
          type: (['info', 'success', 'warning', 'error'].includes(notification.type) 
            ? notification.type 
            : 'info') as 'info' | 'success' | 'warning' | 'error'
        }));

        setNotifications(typedData);
        setUnreadCount(typedData.filter(n => !n.read_at).length);
      } catch (error) {
        console.error('Erreur chargement notifications:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les notifications",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Écouter les nouvelles notifications en temps réel
    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          const newNotification = {
            ...payload.new,
            type: (['info', 'success', 'warning', 'error'].includes(payload.new.type) 
              ? payload.new.type 
              : 'info') as 'info' | 'success' | 'warning' | 'error'
          } as Notification;
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Afficher une notification push
          const service = NotificationService.getInstance();
          service.showLocalNotification(
            newNotification.title, 
            newNotification.message
          );
          
          // Afficher un toast
          toast({
            title: newNotification.title,
            description: newNotification.message,
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, toast]);

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read_at: new Date().toISOString() } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erreur marquage notification:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .is('read_at', null);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Erreur marquage notifications:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      setUnreadCount(prev => {
        const notification = notifications.find(n => n.id === notificationId);
        return notification && !notification.read_at ? prev - 1 : prev;
      });
    } catch (error) {
      console.error('Erreur suppression notification:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
};
