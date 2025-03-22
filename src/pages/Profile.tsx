import React, { useState, useRef } from 'react';
import { BadgeDollarSign, Users, Clock, ChevronDown, ChevronUp, Check, Link as LinkIcon, Copy, CreditCard, Camera, Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import PointsIndicator from '@/components/PointsIndicator';
import CashoutDialog from '@/components/CashoutDialog';
import SocialShareLinks from '@/components/SocialShareLinks';

const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [cashoutDialogOpen, setCashoutDialogOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock user data
  const userData = {
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    phone: '+33 6 12 34 56 78',
    points: 1250,
    affiliationCode: 'THOMAS25',
    affiliationLink: 'https://rewardads.com/ref/THOMAS25',
    affiliationStats: {
      totalAffiliates: 12,
      level1: 5,
      level2: 4,
      level3: 2,
      level4: 1,
      level5: 0,
      earnings: 387
    }
  };
  
  // Mock transaction history
  const transactions = [
    { id: 1, type: 'earning', description: 'Publicité visionnée', amount: 50, date: '2023-06-15T14:30:00' },
    { id: 2, type: 'earning', description: 'Commission d\'affiliation - Niveau 1', amount: 25, date: '2023-06-14T11:15:00' },
    { id: 3, type: 'spending', description: 'Conversion en euros', amount: -5000, date: '2023-06-10T09:45:00' },
    { id: 4, type: 'earning', description: 'Publicité visionnée', amount: 75, date: '2023-06-08T16:20:00' },
    { id: 5, type: 'earning', description: 'Commission d\'affiliation - Niveau 2', amount: 10, date: '2023-06-05T13:10:00' },
    { id: 6, type: 'spending', description: 'Écouteurs sans fil premium', amount: -15000, date: '2023-06-01T10:30:00' },
  ];
  
  // Mock affiliates data
  const affiliates = [
    { id: 1, name: 'Marie Laurent', level: 1, joinDate: '2023-05-20T10:30:00', earnings: 250 },
    { id: 2, name: 'Jean Petit', level: 1, joinDate: '2023-05-18T14:15:00', earnings: 180 },
    { id: 3, name: 'Claire Martin', level: 1, joinDate: '2023-05-15T09:45:00', earnings: 320 },
    { id: 4, name: 'Lucas Bernard', level: 2, joinDate: '2023-05-10T11:30:00', earnings: 150 },
    { id: 5, name: 'Sophie Durand', level: 2, joinDate: '2023-05-05T16:20:00', earnings: 200 },
  ];
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  // Handle copy affiliation link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData.affiliationLink);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  
  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          toast({
            title: "Photo de profil mise à jour",
            description: "Votre photo a été modifiée avec succès."
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
        
        {/* User Profile Card */}
        <div className="glass-card rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar with Upload */}
            <div className="relative group">
              <div 
                className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                {profileImage ? (
                  <img src={profileImage} alt={userData.name} className="h-full w-full object-cover" />
                ) : (
                  userData.name.charAt(0)
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload}
              />
            </div>
            
            {/* User Info */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-foreground/60 mb-4">{userData.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <PointsIndicator points={userData.points} size="lg" />
                <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">
                  <Users className="h-4 w-4" />
                  <span>{userData.affiliationStats.totalAffiliates} affiliés</span>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button
                className="flex items-center gap-2"
                onClick={() => setCashoutDialogOpen(true)}
              >
                <CreditCard className="h-4 w-4" />
                Retirer mes points
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                Paramètres du compte
              </Button>
            </div>
          </div>
        </div>
        
        {/* Affiliation Section */}
        <div className="glass-card rounded-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Programme d'affiliation</h2>
              <p className="text-foreground/60">Invitez des amis et gagnez des commissions sur 5 niveaux</p>
            </div>
            
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <SocialShareLinks 
                username={userData.name}
                affiliationLink={userData.affiliationLink}
              />
              
              <button 
                className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Réduire' : 'Voir les détails'}
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          {/* Affiliation Link */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <p className="text-sm text-foreground/60 mb-2">Votre lien d'affiliation</p>
            <div className="flex items-center gap-2">
              <div className="flex-grow bg-background rounded-lg px-4 py-2.5 border border-border overflow-hidden overflow-ellipsis">
                {userData.affiliationLink}
              </div>
              <button 
                className={`min-w-24 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  copiedToClipboard 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-primary-foreground'
                }`}
                onClick={copyToClipboard}
              >
                {copiedToClipboard ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copier
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-foreground/60 mt-2">Code: <span className="font-medium">{userData.affiliationCode}</span></p>
          </div>
          
          {/* The rest of the affiliation section */}
          {/* ... keep existing code (affiliation stats and expanded details) */}
        </div>
        
        {/* Tabs for History and Settings */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="history" className="text-base">Historique</TabsTrigger>
            <TabsTrigger value="settings" className="text-base">Paramètres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="animate-fade-in">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-secondary/50 font-medium">
                <div className="col-span-2">Transaction</div>
                <div className="text-center">Date</div>
                <div className="text-right">Points</div>
              </div>
              
              {transactions.map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-4 gap-4 p-4 border-t border-border">
                  <div className="col-span-2">{transaction.description}</div>
                  <div className="text-center">{formatDate(transaction.date)}</div>
                  <div className={`text-right font-medium ${
                    transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
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
                    <Input 
                      id="phone"
                      type="tel" 
                      defaultValue={userData.phone}
                      className="w-full"
                    />
                    <Button type="button" variant="outline" className="flex items-center gap-1">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-blue-500 text-white rounded flex items-center justify-center">
                        <Facebook className="h-4 w-4" />
                      </div>
                      <Input placeholder="URL Facebook" className="flex-grow" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded flex items-center justify-center">
                        <Instagram className="h-4 w-4" />
                      </div>
                      <Input placeholder="URL Instagram" className="flex-grow" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="block text-foreground/70 mb-2">Préférences de notification</Label>
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
                  <Button type="submit">Enregistrer les modifications</Button>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Cashout Dialog */}
      <CashoutDialog
        open={cashoutDialogOpen}
        onOpenChange={setCashoutDialogOpen}
        userPoints={userData.points}
      />
    </div>
  );
};

export default Profile;
