
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, Smartphone, Globe } from 'lucide-react';

interface NotificationSettingsProps {
  user: User | null;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ user }) => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState({
    newAds: true,
    earnings: true,
    affiliates: true,
    newsletters: false,
    security: true
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    newAds: true,
    earnings: true,
    affiliates: false,
    security: true
  });
  
  const [frequency, setFrequency] = useState('immediate');

  const handleEmailToggle = (key: string, value: boolean) => {
    setEmailNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification mise à jour",
      description: `Les notifications email ${key} ont été ${value ? 'activées' : 'désactivées'}.`
    });
  };

  const handlePushToggle = (key: string, value: boolean) => {
    setPushNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification mise à jour",
      description: `Les notifications push ${key} ont été ${value ? 'activées' : 'désactivées'}.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notifications par email
          </CardTitle>
          <CardDescription>
            Choisissez les types d'emails que vous souhaitez recevoir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Nouvelles publicités disponibles</Label>
                <p className="text-sm text-muted-foreground">
                  Être notifié quand de nouvelles publicités sont disponibles
                </p>
              </div>
              <Switch
                checked={emailNotifications.newAds}
                onCheckedChange={(value) => handleEmailToggle('newAds', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Gains de LVP</Label>
                <p className="text-sm text-muted-foreground">
                  Être notifié de vos gains et récompenses
                </p>
              </div>
              <Switch
                checked={emailNotifications.earnings}
                onCheckedChange={(value) => handleEmailToggle('earnings', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Activité des affiliés</Label>
                <p className="text-sm text-muted-foreground">
                  Être notifié de l'activité de vos affiliés
                </p>
              </div>
              <Switch
                checked={emailNotifications.affiliates}
                onCheckedChange={(value) => handleEmailToggle('affiliates', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Newsletters et actualités</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les actualités et nouveautés de LAVUEPAYEE
                </p>
              </div>
              <Switch
                checked={emailNotifications.newsletters}
                onCheckedChange={(value) => handleEmailToggle('newsletters', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Alertes de sécurité</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications importantes concernant la sécurité de votre compte
                </p>
              </div>
              <Switch
                checked={emailNotifications.security}
                onCheckedChange={(value) => handleEmailToggle('security', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Notifications push
          </CardTitle>
          <CardDescription>
            Gérez les notifications dans l'application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Nouvelles publicités</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications instantanées pour les nouvelles publicités
                </p>
              </div>
              <Switch
                checked={pushNotifications.newAds}
                onCheckedChange={(value) => handlePushToggle('newAds', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Gains et récompenses</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications pour vos gains de LVP
                </p>
              </div>
              <Switch
                checked={pushNotifications.earnings}
                onCheckedChange={(value) => handlePushToggle('earnings', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Activité des affiliés</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications sur l'activité de votre réseau d'affiliation
                </p>
              </div>
              <Switch
                checked={pushNotifications.affiliates}
                onCheckedChange={(value) => handlePushToggle('affiliates', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Sécurité</Label>
                <p className="text-sm text-muted-foreground">
                  Alertes de sécurité importantes
                </p>
              </div>
              <Switch
                checked={pushNotifications.security}
                onCheckedChange={(value) => handlePushToggle('security', value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Fréquence des notifications
          </CardTitle>
          <CardDescription>
            Choisissez la fréquence de vos notifications groupées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Fréquence d'envoi</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une fréquence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immédiat</SelectItem>
                <SelectItem value="hourly">Toutes les heures</SelectItem>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
