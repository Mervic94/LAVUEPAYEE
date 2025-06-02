import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, Mail, MessageSquare, DollarSign, Users, Settings, Trash2, CheckCheck } from 'lucide-react';
import Navbar from '@/components/navbar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'payment' | 'social' | 'promotion';
  read: boolean;
  created_at: string;
}

const Notifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
    payments: true,
    social: true,
    promotions: false,
    system: true
  });

  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchNotificationSettings();
    }
  }, [user]);

  const fetchNotifications = async () => {
    // Simuler des notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Nouveau gain !',
        message: 'Vous avez gagné 25 points LPV en regardant une publicité',
        type: 'success',
        category: 'payment',
        read: false,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Nouveau filleul',
        message: 'Marie a rejoint LaVuePayee avec votre code de parrainage',
        type: 'info',
        category: 'social',
        read: false,
        created_at: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '3',
        title: 'Retrait traité',
        message: 'Votre retrait de 50€ a été traité avec succès',
        type: 'success',
        category: 'payment',
        read: true,
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '4',
        title: 'Promotion spéciale',
        message: 'Double points sur toutes les publicités ce week-end !',
        type: 'info',
        category: 'promotion',
        read: true,
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    setNotifications(mockNotifications);
  };

  const fetchNotificationSettings = async () => {
    try {
      const { data } = await supabase
        .from('user_settings')
        .select('notifications_email, notifications_push, notifications_sms')
        .eq('user_id', user?.id)
        .single();

      if (data) {
        setSettings(prev => ({
          ...prev,
          email: data.notifications_email,
          push: data.notifications_push,
          sms: data.notifications_sms
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes vos notifications ont été marquées comme lues."
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée."
    });
  };

  const updateSettings = async (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Mise à jour en base de données pour certains paramètres
    if (['email', 'push', 'sms'].includes(key)) {
      try {
        const updateData: any = {};
        if (key === 'email') updateData.notifications_email = value;
        if (key === 'push') updateData.notifications_push = value;
        if (key === 'sms') updateData.notifications_sms = value;

        await supabase
          .from('user_settings')
          .update(updateData)
          .eq('user_id', user?.id);

        toast({
          title: "Paramètres mis à jour",
          description: "Vos préférences de notification ont été sauvegardées."
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
      }
    }
  };

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case 'payment':
        return <DollarSign className="h-5 w-5" />;
      case 'social':
        return <Users className="h-5 w-5" />;
      case 'system':
        return <Settings className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    return notif.category === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-4xl pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Gérez vos notifications et préférences
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                </Badge>
              )}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <CheckCheck className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="unread">Non lues ({unreadCount})</TabsTrigger>
            <TabsTrigger value="payment">Paiements</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <BellOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucune notification</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={getNotificationColor(notification.type)}>
                          {getNotificationIcon(notification.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCheck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <BellOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucune notification non lue</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card key={notification.id} className="border-l-4 border-l-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={getNotificationColor(notification.type)}>
                          {getNotificationIcon(notification.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(notification.created_at).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={getNotificationColor(notification.type)}>
                        {getNotificationIcon(notification.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notification.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={getNotificationColor(notification.type)}>
                        {getNotificationIcon(notification.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notification.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={getNotificationColor(notification.type)}>
                        {getNotificationIcon(notification.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(notification.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Canaux de notification</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label>Notifications par email</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevez des notifications par email
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email}
                        onCheckedChange={(value) => updateSettings('email', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label>Notifications push</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevez des notifications sur votre navigateur
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push}
                        onCheckedChange={(value) => updateSettings('push', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label>Notifications SMS</Label>
                          <p className="text-sm text-muted-foreground">
                            Recevez des notifications par SMS
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.sms}
                        onCheckedChange={(value) => updateSettings('sms', value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Types de notification</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Paiements et gains</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications sur vos gains et retraits
                        </p>
                      </div>
                      <Switch
                        checked={settings.payments}
                        onCheckedChange={(value) => updateSettings('payments', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Activité sociale</Label>
                        <p className="text-sm text-muted-foreground">
                          Parrainages et interactions sociales
                        </p>
                      </div>
                      <Switch
                        checked={settings.social}
                        onCheckedChange={(value) => updateSettings('social', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Promotions</Label>
                        <p className="text-sm text-muted-foreground">
                          Offres spéciales et promotions
                        </p>
                      </div>
                      <Switch
                        checked={settings.promotions}
                        onCheckedChange={(value) => updateSettings('promotions', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notifications système</Label>
                        <p className="text-sm text-muted-foreground">
                          Mises à jour et maintenance
                        </p>
                      </div>
                      <Switch
                        checked={settings.system}
                        onCheckedChange={(value) => updateSettings('system', value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Notifications;
