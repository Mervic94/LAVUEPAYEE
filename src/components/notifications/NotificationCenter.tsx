
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, BellOff, Settings, CheckCircle } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useToast } from '@/hooks/use-toast';

const NotificationCenter = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true
  });
  
  const { 
    isSupported, 
    isEnabled, 
    isLoading, 
    enableNotifications, 
    showNotification,
    notificationService 
  } = useNotifications();
  
  const { toast } = useToast();

  const handleEnableNotifications = async () => {
    const success = await enableNotifications();
    if (success) {
      toast({
        title: "Notifications activées",
        description: "Vous recevrez maintenant des notifications push",
        variant: "default"
      });
      
      // Afficher une notification de test
      setTimeout(() => {
        showNotification(
          "Notifications activées ! 🎉",
          "Vous recevrez maintenant les mises à jour importantes"
        );
      }, 1000);
    } else {
      toast({
        title: "Erreur",
        description: "Impossible d'activer les notifications",
        variant: "destructive"
      });
    }
  };

  const handlePreferenceChange = async (key: keyof typeof preferences, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    // Sauvegarder les préférences
    const success = await notificationService.updateNotificationPreferences(newPreferences);
    if (success) {
      toast({
        title: "Préférences mises à jour",
        description: "Vos préférences de notification ont été sauvegardées",
        variant: "default"
      });
    }
  };

  const testNotification = () => {
    showNotification(
      "Notification de test",
      "Ceci est une notification de test pour vérifier que tout fonctionne correctement"
    );
  };

  const notificationTypes = [
    {
      title: "Nouvelles tâches",
      description: "Être notifié quand de nouvelles tâches sont disponibles",
      enabled: true
    },
    {
      title: "Tâches complétées",
      description: "Confirmation quand vos tâches sont validées",
      enabled: true
    },
    {
      title: "Paiements",
      description: "Notifications pour vos gains et retraits",
      enabled: true
    },
    {
      title: "Parrainage",
      description: "Alertes pour vos nouveaux filleuls",
      enabled: preferences.marketing
    },
    {
      title: "Maintenance",
      description: "Informations sur la maintenance du site",
      enabled: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Centre de Notifications
        </h2>
      </div>

      {/* État des notifications push */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isEnabled ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <BellOff className="h-5 w-5 text-gray-500" />
            )}
            Notifications Push
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSupported ? (
            <Alert>
              <AlertDescription>
                Votre navigateur ne supporte pas les notifications push.
              </AlertDescription>
            </Alert>
          ) : !isEnabled ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Activez les notifications push pour recevoir des alertes en temps réel sur votre appareil.
              </p>
              <Button 
                onClick={handleEnableNotifications} 
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Activation...' : 'Activer les notifications'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Les notifications push sont activées. Vous recevrez les alertes importantes.
                </AlertDescription>
              </Alert>
              <Button 
                onClick={testNotification}
                variant="outline"
                size="sm"
              >
                Tester les notifications
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Préférences générales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Préférences de Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-notifications">Notifications Email</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les notifications par email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.email}
                onCheckedChange={(value) => handlePreferenceChange('email', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="push-notifications">Notifications Push</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les notifications sur votre appareil
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={preferences.push && isEnabled}
                onCheckedChange={(value) => handlePreferenceChange('push', value)}
                disabled={!isEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="sms-notifications">Notifications SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les notifications par SMS (fonctionnalité future)
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={preferences.sms}
                onCheckedChange={(value) => handlePreferenceChange('sms', value)}
                disabled={true}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="marketing-notifications">Notifications Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les offres et promotions
                </p>
              </div>
              <Switch
                id="marketing-notifications"
                checked={preferences.marketing}
                onCheckedChange={(value) => handlePreferenceChange('marketing', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Types de notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Types de Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{type.title}</p>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
                <Switch
                  checked={type.enabled}
                  disabled={type.title === "Nouvelles tâches" || type.title === "Maintenance"}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
