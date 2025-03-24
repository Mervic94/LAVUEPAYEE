import React, { useState } from 'react';
import { BadgeDollarSign, Users, ChevronDown, ChevronUp, Check, Link as LinkIcon, Copy, CreditCard, Mail, Phone, Building, AlertTriangle, Shield, FileCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import PointsIndicator from '@/components/PointsIndicator';
import CashoutDialog from '@/components/CashoutDialog';
import SocialShareLinks from '@/components/SocialShareLinks';
import ProfilePhotoUploader from '@/components/ProfilePhotoUploader';
import SocialMediaManager from '@/components/SocialMediaManager';
import { PhoneNumberInput } from '@/components/ui/phone-input';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Profile = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [cashoutDialogOpen, setCashoutDialogOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAdvertiser, setIsAdvertiser] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [showAdvertiserTerms, setShowAdvertiserTerms] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [kybVerified, setKybVerified] = useState(false);
  const [advertiserVerificationRequested, setAdvertiserVerificationRequested] = useState(false);
  
  // Mock user data
  const userData = {
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    phone: '+33612345678',
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
  
  // Advertiser account requirements
  const advertiserRequirements = [
    "Vérification d'identité complète (KYC)",
    "Vérification d'entreprise (KYB) pour les professionnels",
    "Respect des règles publicitaires de LAVUEPAYEE",
    "Contenu publicitaire conforme aux lois en vigueur",
    "Absence d'antécédents de fraude ou de contenu trompeur",
    "Solde minimum de 100€ pour lancer des campagnes"
  ];
  
  // Advertiser violations and penalties
  const advertiserViolations = [
    {
      level: "Mineur",
      examples: ["Publicité non conforme aux directives", "Erreurs dans les descriptions"],
      penalty: "Avertissement et suspension temporaire de la campagne",
      duration: "3 jours"
    },
    {
      level: "Moyen",
      examples: ["Contenu inapproprié", "Publicité trompeuse"],
      penalty: "Suspension du compte annonceur",
      duration: "14 jours"
    },
    {
      level: "Grave",
      examples: ["Fraude", "Contenu illégal", "Harcèlement"],
      penalty: "Suspension permanente et confiscation des LVP",
      duration: "Définitive"
    }
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
  
  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès."
    });
  };
  
  // Handle social media links save
  const handleSaveSocialLinks = (links: any[]) => {
    toast({
      title: "Réseaux sociaux mis à jour",
      description: `${links.length} lien(s) enregistré(s).`
    });
  };
  
  // Request advertiser verification
  const handleRequestAdvertiserVerification = () => {
    setAdvertiserVerificationRequested(true);
    toast({
      title: "Demande de vérification envoyée",
      description: "Votre demande a été soumise. Notre équipe examinera votre profil et vos documents dans les 48 heures."
    });
  };
  
  // Toggle advertiser status - now only available for admin
  const handleToggleAdvertiser = (checked: boolean) => {
    // This would typically be restricted to admin users only
    if (checked && !kycVerified) {
      toast({
        title: "Vérification requise",
        description: "La vérification KYC/KYB est requise pour devenir annonceur."
      });
      return;
    }
    
    setIsAdvertiser(checked);
    toast({
      title: checked ? "Compte annonceur activé" : "Compte annonceur désactivé",
      description: checked 
        ? "Vous pouvez maintenant accéder aux fonctionnalités annonceur." 
        : "Les fonctionnalités annonceur ont été désactivées."
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
            <ProfilePhotoUploader 
              initialPhoto={profileImage}
              userName={userData.name}
              onPhotoChange={setProfileImage}
            />
            
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
                {isAdvertiser && (
                  <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
                    <Building className="h-4 w-4" />
                    <span>Annonceur</span>
                  </div>
                )}
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
            {isAdvertiser && (
              <TabsTrigger value="advertiser" className="text-base">Annonceur</TabsTrigger>
            )}
            {!isAdvertiser && (
              <TabsTrigger value="advertiser-registration" className="text-base">Devenir Annonceur</TabsTrigger>
            )}
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
                      onCheckedChange={handleToggleAdvertiser}
                    />
                  </div>
                  <Button type="submit">Enregistrer les modifications</Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="advertiser-registration" className="animate-fade-in">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Devenir Annonceur LAVUEPAYEE</h3>
              <p className="text-foreground/70 mb-6">
                Pour diffuser des publicités sur notre plateforme, vous devez soumettre une demande de vérification et respecter nos conditions strictes.
              </p>
              
              <Alert className="mb-6 bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  L'activation d'un compte annonceur est permanente. Une fois activé, ce compte ne peut être désactivé que par l'équipe LAVUEPAYEE.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-primary" />
                    Conditions requises
                  </h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {advertiserRequirements.map((req, index) => (
                      <li key={index} className="text-foreground/80">{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Infractions et pénalités
                  </h4>
                  <div className="space-y-4">
                    {advertiserViolations.map((violation, index) => (
                      <div key={index} className="glass-card p-3 rounded-lg border border-border">
                        <div className="font-medium text-base mb-1">Niveau {violation.level}</div>
                        <div className="text-sm text-foreground/70 mb-2">
                          <span className="font-medium">Exemples:</span> {violation.examples.join(", ")}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Sanction:</span> {violation.penalty}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Durée:</span> {violation.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Vérifications obligatoires</h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Vérification d'identité (KYC)</div>
                        <p className="text-sm text-foreground/60">Téléchargez une pièce d'identité valide</p>
                      </div>
                      {kycVerified ? (
                        <div className="flex items-center text-green-600 gap-1">
                          <Check className="h-4 w-4" />
                          <span>Vérifié</span>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          <FileCheck className="h-4 w-4 mr-2" />
                          Soumettre
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Vérification d'entreprise (KYB)</div>
                        <p className="text-sm text-foreground/60">Téléchargez les documents officiels de votre entreprise</p>
                      </div>
                      {kybVerified ? (
                        <div className="flex items-center text-green-600 gap-1">
                          <Check className="h-4 w-4" />
                          <span>Vérifié</span>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          <FileCheck className="h-4 w-4 mr-2" />
                          Soumettre
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleRequestAdvertiserVerification}
                    disabled={advertiserVerificationRequested}
                    className="w-full sm:w-auto"
                  >
                    {advertiserVerificationRequested 
                      ? "Demande en cours d'examen" 
                      : "Demander la vérification"}
                  </Button>
                  {advertiserVerificationRequested && (
                    <p className="text-sm text-foreground/60 mt-2">
                      Notre équipe examine votre demande. Vous recevrez une réponse dans les 48 heures.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {isAdvertiser && (
            <TabsContent value="advertiser" className="animate-fade-in">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6">Gestion des campagnes publicitaires</h3>
                
                <div className="space-y-6">
                  <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                    <h4 className="font-medium mb-2">Compte annonceur actif</h4>
                    <p className="text-sm">Votre compte annonceur a été vérifié et approuvé par l'équipe LAVUEPAYEE.</p>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-4 border-2 border-dashed border-primary/30 rounded-lg flex flex-col items-center justify-center text-center py-8">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <BadgeDollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">Créer une campagne</h3>
                      <p className="text-sm text-foreground/60 mb-4">Lancez votre première campagne publicitaire</p>
                      <Button>Commencer</Button>
                    </div>
                    
                    <div className="glass-card p-4 rounded-lg">
                      <h3 className="font-medium mb-4 flex items-center justify-between">
                        Statistiques
                        <span className="text-xs bg-secondary px-2 py-1 rounded">Cette semaine</span>
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-foreground/60 text-sm">Impressions</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60 text-sm">Clics</span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60 text-sm">Taux de conversion</span>
                          <span className="font-medium">0%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-card p-4 rounded-lg">
                      <h3 className="font-medium mb-4">Solde du compte</h3>
                      <div className="text-3xl font-bold mb-2">0.00€</div>
                      <p className="text-xs text-foreground/60 mb-4">Créditez votre compte pour lancer des campagnes</p>
                      <Button size="sm" className="w-full">Ajouter des fonds</Button>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Aucune campagne active</h4>
                    <p className="text-sm text-foreground/60">
                      Vous n'avez pas encore de campagnes publicitaires. Créez votre première campagne pour commencer à promouvoir vos produits ou services.
                    </p>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Rappel des règles publicitaires</h4>
                    <div className="glass-card p-4 rounded-lg bg-amber-50 border-amber-200">
                      <p className="text-sm mb-2">
                        <strong>Important:</strong> Le non-respect des règles publicitaires peut entraîner la suspension ou la suppression de votre compte annonceur.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Toutes les publicités doivent être conformes aux lois en vigueur</li>
                        <li>Les publicités trompeuses ou mensongères sont strictement interdites</li>
                        <li>Le contenu doit être approprié pour tous les publics</li>
                        <li>L'équipe LAVUEPAYEE se réserve le droit de refuser toute publicité</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">Consulter toutes les règles</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
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
