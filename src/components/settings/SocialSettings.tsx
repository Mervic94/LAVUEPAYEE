
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SocialMediaManager from '@/components/SocialMediaManager';
import { Share2, Users, Link, Globe } from 'lucide-react';

interface SocialSettingsProps {
  user: User | null;
}

const SocialSettings: React.FC<SocialSettingsProps> = ({ user }) => {
  const { toast } = useToast();
  const [socialSharing, setSocialSharing] = useState({
    earnings: false,
    achievements: true,
    referrals: true,
    activity: false
  });
  
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    facebook: false,
    twitter: false,
    linkedin: false
  });

  const handleSocialSharingToggle = (key: string, value: boolean) => {
    setSocialSharing(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Partage social mis à jour",
      description: `Le partage ${key} a été ${value ? 'activé' : 'désactivé'}.`
    });
  };

  const handleAccountConnection = (platform: string) => {
    setConnectedAccounts(prev => ({ ...prev, [platform]: !prev[platform as keyof typeof prev] }));
    toast({
      title: `Compte ${platform}`,
      description: `Votre compte ${platform} a été ${connectedAccounts[platform as keyof typeof connectedAccounts] ? 'déconnecté' : 'connecté'}.`
    });
  };

  const handleSaveSocialLinks = (links: any[]) => {
    toast({
      title: "Réseaux sociaux mis à jour",
      description: `${links.length} lien(s) enregistré(s).`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Mes réseaux sociaux
          </CardTitle>
          <CardDescription>
            Ajoutez vos profils de réseaux sociaux
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialMediaManager 
            onSave={handleSaveSocialLinks}
            initialLinks={[]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comptes connectés
          </CardTitle>
          <CardDescription>
            Gérez vos comptes connectés pour la connexion et le partage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  G
                </div>
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-muted-foreground">
                    {connectedAccounts.google ? 'Connecté' : 'Non connecté'}
                  </p>
                </div>
              </div>
              <Button
                variant={connectedAccounts.google ? "destructive" : "default"}
                size="sm"
                onClick={() => handleAccountConnection('google')}
              >
                {connectedAccounts.google ? 'Déconnecter' : 'Connecter'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  F
                </div>
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-sm text-muted-foreground">
                    {connectedAccounts.facebook ? 'Connecté' : 'Non connecté'}
                  </p>
                </div>
              </div>
              <Button
                variant={connectedAccounts.facebook ? "destructive" : "default"}
                size="sm"
                onClick={() => handleAccountConnection('facebook')}
              >
                {connectedAccounts.facebook ? 'Déconnecter' : 'Connecter'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  T
                </div>
                <div>
                  <p className="font-medium">Twitter / X</p>
                  <p className="text-sm text-muted-foreground">
                    {connectedAccounts.twitter ? 'Connecté' : 'Non connecté'}
                  </p>
                </div>
              </div>
              <Button
                variant={connectedAccounts.twitter ? "destructive" : "default"}
                size="sm"
                onClick={() => handleAccountConnection('twitter')}
              >
                {connectedAccounts.twitter ? 'Déconnecter' : 'Connecter'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  L
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    {connectedAccounts.linkedin ? 'Connecté' : 'Non connecté'}
                  </p>
                </div>
              </div>
              <Button
                variant={connectedAccounts.linkedin ? "destructive" : "default"}
                size="sm"
                onClick={() => handleAccountConnection('linkedin')}
              >
                {connectedAccounts.linkedin ? 'Déconnecter' : 'Connecter'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Partage automatique
          </CardTitle>
          <CardDescription>
            Configurez le partage automatique de vos activités
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Partager mes gains</Label>
              <p className="text-sm text-muted-foreground">
                Partager automatiquement vos gains sur vos réseaux sociaux
              </p>
            </div>
            <Switch
              checked={socialSharing.earnings}
              onCheckedChange={(value) => handleSocialSharingToggle('earnings', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Partager mes achievements</Label>
              <p className="text-sm text-muted-foreground">
                Partager vos réussites et badges obtenus
              </p>
            </div>
            <Switch
              checked={socialSharing.achievements}
              onCheckedChange={(value) => handleSocialSharingToggle('achievements', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Partager mes parrainages</Label>
              <p className="text-sm text-muted-foreground">
                Partager votre lien de parrainage automatiquement
              </p>
            </div>
            <Switch
              checked={socialSharing.referrals}
              onCheckedChange={(value) => handleSocialSharingToggle('referrals', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Partager mon activité</Label>
              <p className="text-sm text-muted-foreground">
                Partager vos activités récentes sur la plateforme
              </p>
            </div>
            <Switch
              checked={socialSharing.activity}
              onCheckedChange={(value) => handleSocialSharingToggle('activity', value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Globe className="h-5 w-5" />
            Conseils pour le partage social
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
            <li>• Partagez vos réussites pour inspirer votre réseau</li>
            <li>• Utilisez votre lien de parrainage pour gagner plus</li>
            <li>• Personnalisez vos messages de partage</li>
            <li>• Respectez les bonnes pratiques de chaque réseau social</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialSettings;
