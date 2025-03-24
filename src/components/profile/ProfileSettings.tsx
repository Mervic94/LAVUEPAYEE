import React, { useState } from 'react';
import { Mail, Phone, ToggleLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import SocialMediaManager from '@/components/SocialMediaManager';
import { PhoneNumberInput } from '@/components/ui/phone-input';

interface ProfileSettingsProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  isAdvertiser: boolean;
  onToggleAdvertiser: (checked: boolean) => void;
  kycVerified: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  userData,
  isAdvertiser,
  onToggleAdvertiser,
  kycVerified
}) => {
  const { toast } = useToast();
  const [phoneValue, setPhoneValue] = useState('');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès."
    });
  };
  
  const handleSaveSocialLinks = (links: any[]) => {
    toast({
      title: "Réseaux sociaux mis à jour",
      description: `${links.length} lien(s) enregistré(s).`
    });
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Préférences de compte</h3>
      
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        <div>
          <Label htmlFor="full-name" className="block text-foreground/70 mb-2">Nom complet</Label>
          <Input 
            id="full-name"
            type="text" 
            defaultValue={userData.name}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="block text-foreground/70 mb-2">Adresse email</Label>
          <div className="flex gap-2">
            <Input 
              id="email"
              type="email" 
              defaultValue={userData.email}
              className="w-full"
            />
            <Button type="button" variant="outline" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Vérifier
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor="phone" className="block text-foreground/70 mb-2">Numéro de téléphone</Label>
          <div className="flex gap-2">
            <PhoneNumberInput 
              value={phoneValue || userData.phone}
              onChange={setPhoneValue}
              className="w-full"
            />
            <Button type="button" variant="outline" className="flex items-center gap-1 whitespace-nowrap">
              <Phone className="h-4 w-4" />
              Vérifier
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor="password" className="block text-foreground/70 mb-2">Changer le mot de passe</Label>
          <div className="space-y-2">
            <Input 
              id="current-password"
              type="password" 
              placeholder="Mot de passe actuel"
              className="w-full"
            />
            <Input 
              id="new-password"
              type="password" 
              placeholder="Nouveau mot de passe"
              className="w-full"
            />
            <Input 
              id="confirm-password"
              type="password" 
              placeholder="Confirmer le mot de passe"
              className="w-full"
            />
          </div>
        </div>
        
        <div>
          <Label className="block text-foreground/70 mb-2">Réseaux sociaux</Label>
          <SocialMediaManager 
            onSave={handleSaveSocialLinks}
            initialLinks={[]}
          />
        </div>
        
        <div>
          <Label className="block text-foreground/70 mb-4">Préférences de notification</Label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="notify_new_ads" className="rounded border-border focus:ring-primary" />
              <label htmlFor="notify_new_ads" className="ml-2">Nouvelles publicités disponibles</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notify_earnings" className="rounded border-border focus:ring-primary" />
              <label htmlFor="notify_earnings" className="ml-2">Gains de points</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notify_affiliates" className="rounded border-border focus:ring-primary" />
              <label htmlFor="notify_affiliates" className="ml-2">Activité des affiliés</label>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium">Compte annonceur</h4>
              <p className="text-sm text-foreground/60">Activez pour créer et gérer vos propres campagnes publicitaires</p>
            </div>
            <Switch 
              checked={isAdvertiser}
              onCheckedChange={onToggleAdvertiser}
            />
          </div>
          <Button type="submit">Enregistrer les modifications</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
