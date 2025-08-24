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
import AdvertiserSettings from '@/components/advertiser/AdvertiserSettings';
import AdCreativeLibrary from '@/components/advertiser/AdCreativeLibrary';
import CampaignsList from '@/components/advertiser/CampaignsList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorDisplay from '@/components/ui/ErrorDisplay';
import { useUserData } from '@/hooks/useUserData';

const Profile = () => {
  const { toast } = useToast();
  const { loading, userProfile, userWallet, transactions, updateUserProfile, refreshData } = useUserData();
  const [cashoutDialogOpen, setCashoutDialogOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(userProfile?.avatar_url || null);
  const [isAdvertiser, setIsAdvertiser] = useState(userProfile?.role === 'advertiser');
  const [kycVerified, setKycVerified] = useState(false);
  const [kybVerified, setKybVerified] = useState(false);
  const [advertiserVerificationRequested, setAdvertiserVerificationRequested] = useState(false);
  
  // Transform user data for components
  const userData = {
    name: `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim() || userProfile?.username || 'Utilisateur',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    points: userProfile?.points || 0,
    affiliationCode: userProfile?.referral_code || 'TEMP123',
    affiliationLink: `https://lavuepayee.com/ref/${userProfile?.referral_code || 'TEMP123'}`,
    affiliationStats: {
      totalAffiliates: 12, // TODO: Calculate from referrals table
      level1: 5,
      level2: 4,
      level3: 2,
      level4: 1,
      level5: 0,
      earnings: 387 // TODO: Calculate from referral earnings
    }
  };
  
  // Transform transactions for TransactionsHistory component
  const transformedTransactions = transactions.map((transaction, index) => ({
    id: index + 1,
    type: transaction.type === 'earning' ? 'earning' : 
          transaction.type === 'withdrawal' ? 'spending' : 
          transaction.type === 'cashout' ? 'spending' : 'earning',
    description: transaction.description || 'Transaction',
    amount: transaction.type === 'earning' ? transaction.points : -Math.abs(transaction.points),
    date: transaction.created_at
  }));
  
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background transition-theme">
        <Navbar />
        <main className="container px-4 md:px-6 mx-auto max-w-7xl pt-24 pb-12">
          <LoadingSpinner size="lg" text="Chargement de votre profil..." className="h-64" />
        </main>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background transition-theme">
        <Navbar />
        <main className="container px-4 md:px-6 mx-auto max-w-7xl pt-24 pb-12">
          <ErrorDisplay 
            title="Profil indisponible"
            message="Impossible de charger votre profil. Veuillez vous reconnecter."
            onRetry={refreshData}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-theme">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-7xl pt-24 pb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Mon Profil</h1>
        
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
          <TabsList className="mb-6 flex flex-wrap md:flex-nowrap overflow-x-auto tabs-list">
            <TabsTrigger value="history" className="text-sm md:text-base tab-trigger">Historique</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm md:text-base tab-trigger">Paramètres</TabsTrigger>
            {isAdvertiser && (
              <TabsTrigger value="advertiser" className="text-sm md:text-base tab-trigger">Annonceur</TabsTrigger>
            )}
            {!isAdvertiser && (
              <TabsTrigger value="advertiser-registration" className="text-sm md:text-base tab-trigger">Devenir Annonceur</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="history" className="animate-fade-in">
            <TransactionsHistory transactions={transformedTransactions} />
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
