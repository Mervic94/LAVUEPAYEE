
import React, { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/navbar';
import CashoutDialog from '@/components/CashoutDialog';
import ProfileHeader from '@/components/profile/ProfileHeader';
import AffiliationSection from '@/components/profile/AffiliationSection';
import TransactionsHistory from '@/components/profile/TransactionsHistory';
import ProfileSettings from '@/components/profile/ProfileSettings';
import AdvertiserRegistration from '@/components/profile/AdvertiserRegistration';
import AdvertiserDashboard from '@/components/profile/AdvertiserDashboard';

const Profile = () => {
  const { toast } = useToast();
  const [cashoutDialogOpen, setCashoutDialogOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isAdvertiser, setIsAdvertiser] = useState(false);
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
  
  // Request advertiser verification
  const handleRequestAdvertiserVerification = () => {
    setAdvertiserVerificationRequested(true);
    toast({
      title: "Demande de vérification envoyée",
      description: "Votre demande a été soumise. Notre équipe examinera votre profil et vos documents dans les 48 heures."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
        
        {/* User Profile Card */}
        <ProfileHeader 
          userData={userData}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          isAdvertiser={isAdvertiser}
          setCashoutDialogOpen={setCashoutDialogOpen}
        />
        
        {/* Affiliation Section */}
        <AffiliationSection userData={userData} />
        
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
            <TransactionsHistory transactions={transactions} />
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <ProfileSettings 
              userData={userData}
              isAdvertiser={isAdvertiser}
              onToggleAdvertiser={handleToggleAdvertiser}
              kycVerified={kycVerified}
            />
          </TabsContent>
          
          <TabsContent value="advertiser-registration" className="animate-fade-in">
            <AdvertiserRegistration 
              kycVerified={kycVerified}
              kybVerified={kybVerified}
              advertiserVerificationRequested={advertiserVerificationRequested}
              onRequestVerification={handleRequestAdvertiserVerification}
              advertiserRequirements={advertiserRequirements}
              advertiserViolations={advertiserViolations}
            />
          </TabsContent>
          
          {isAdvertiser && (
            <TabsContent value="advertiser" className="animate-fade-in">
              <AdvertiserDashboard isVerified={true} />
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
