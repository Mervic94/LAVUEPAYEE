
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User as UserIcon } from 'lucide-react';
import { PhoneNumberInput } from '@/components/ui/phone-input';

interface AccountSettingsProps {
  user: User | null;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const { toast } = useToast();
  const [phoneValue, setPhoneValue] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: user?.email || '',
    phone: '',
    bio: ''
  });

  const handleSave = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos informations de compte ont été mises à jour avec succès."
    });
  };

  const handleDeleteAccount = () => {
    // Cette fonctionnalité nécessitera une confirmation supplémentaire
    toast({
      variant: "destructive",
      title: "Suppression de compte",
      description: "Cette fonctionnalité sera bientôt disponible."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Modifiez vos informations de base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                placeholder="Votre prénom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                placeholder="Votre nom"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="@votre_nom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biographie</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Parlez-nous de vous..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact
          </CardTitle>
          <CardDescription>
            Gérez vos moyens de contact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="votre@email.com"
                className="flex-1"
              />
              <Button variant="outline">Vérifier</Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <div className="flex gap-2">
              <PhoneNumberInput
                value={phoneValue}
                onChange={setPhoneValue}
                className="flex-1"
              />
              <Button variant="outline">Vérifier</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Enregistrer les modifications</Button>
      </div>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Zone de danger</CardTitle>
          <CardDescription>
            Actions irréversibles sur votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            className="w-full md:w-auto"
          >
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
