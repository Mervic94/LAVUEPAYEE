
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff, Download, Trash2 } from 'lucide-react';

interface PrivacySettingsProps {
  user: User | null;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ user }) => {
  const { toast } = useToast();
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    activityVisible: false,
    earningsVisible: false,
    affiliatesVisible: true,
    dataCollection: true,
    analytics: false,
    marketing: false
  });

  const handlePrivacyToggle = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Paramètre de confidentialité mis à jour",
      description: `Le paramètre ${key} a été ${value ? 'activé' : 'désactivé'}.`
    });
  };

  const handleDataExport = () => {
    toast({
      title: "Export des données",
      description: "Votre demande d'export a été prise en compte. Vous recevrez un email avec vos données sous 48h."
    });
  };

  const handleDataDeletion = () => {
    toast({
      variant: "destructive",
      title: "Suppression des données",
      description: "Cette action nécessite une confirmation par email."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visibilité du profil
          </CardTitle>
          <CardDescription>
            Contrôlez qui peut voir vos informations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Profil public</Label>
              <p className="text-sm text-muted-foreground">
                Permettre aux autres utilisateurs de voir votre profil
              </p>
            </div>
            <Switch
              checked={privacySettings.profileVisible}
              onCheckedChange={(value) => handlePrivacyToggle('profileVisible', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Activité publique</Label>
              <p className="text-sm text-muted-foreground">
                Afficher votre activité récente aux autres utilisateurs
              </p>
            </div>
            <Switch
              checked={privacySettings.activityVisible}
              onCheckedChange={(value) => handlePrivacyToggle('activityVisible', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Gains visibles</Label>
              <p className="text-sm text-muted-foreground">
                Permettre à vos affiliés de voir vos gains
              </p>
            </div>
            <Switch
              checked={privacySettings.earningsVisible}
              onCheckedChange={(value) => handlePrivacyToggle('earningsVisible', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Réseau d'affiliation visible</Label>
              <p className="text-sm text-muted-foreground">
                Afficher votre réseau d'affiliation dans votre profil
              </p>
            </div>
            <Switch
              checked={privacySettings.affiliatesVisible}
              onCheckedChange={(value) => handlePrivacyToggle('affiliatesVisible', value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Collecte de données
          </CardTitle>
          <CardDescription>
            Gérez l'utilisation de vos données personnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Collecte de données nécessaires</Label>
              <p className="text-sm text-muted-foreground">
                Données requises pour le fonctionnement du service
              </p>
            </div>
            <Switch
              checked={privacySettings.dataCollection}
              onCheckedChange={(value) => handlePrivacyToggle('dataCollection', value)}
              disabled
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Données d'analyse</Label>
              <p className="text-sm text-muted-foreground">
                Utilisation de vos données pour améliorer nos services
              </p>
            </div>
            <Switch
              checked={privacySettings.analytics}
              onCheckedChange={(value) => handlePrivacyToggle('analytics', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Données marketing</Label>
              <p className="text-sm text-muted-foreground">
                Utilisation de vos données pour le marketing personnalisé
              </p>
            </div>
            <Switch
              checked={privacySettings.marketing}
              onCheckedChange={(value) => handlePrivacyToggle('marketing', value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des données personnelles</CardTitle>
          <CardDescription>
            Exercez vos droits sur vos données personnelles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Exporter mes données</h4>
            <p className="text-sm text-muted-foreground">
              Téléchargez une copie de toutes vos données personnelles
            </p>
            <Button variant="outline" onClick={handleDataExport} className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Demander un export
            </Button>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Supprimer mes données</h4>
            <p className="text-sm text-muted-foreground">
              Supprimez définitivement toutes vos données personnelles
            </p>
            <Button variant="destructive" onClick={handleDataDeletion} className="w-full md:w-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Demander la suppression
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-400">
            Vos droits RGPD
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li>• Droit d'accès à vos données personnelles</li>
            <li>• Droit de rectification de vos données</li>
            <li>• Droit à l'effacement (droit à l'oubli)</li>
            <li>• Droit à la portabilité de vos données</li>
            <li>• Droit d'opposition au traitement</li>
            <li>• Droit de limitation du traitement</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
