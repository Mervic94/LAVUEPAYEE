
import React, { useState } from 'react';
import { BadgeDollarSign, BarChart2, PlusCircle, FileText, Settings, TrendingUp, Users, Clock, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CampaignCreationForm from '@/components/advertiser/CampaignCreationForm';
import CampaignsList from '@/components/advertiser/CampaignsList';
import StatisticsPanel from '@/components/advertiser/StatisticsPanel';
import BillingSection from '@/components/advertiser/BillingSection';
import SocialMediaAdsIntegration from '@/components/advertiser/SocialMediaAdsIntegration';

interface AdvertiserDashboardProps {
  isVerified: boolean;
}

const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ isVerified }) => {
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  // Simulated data (à remplacer par des données réelles de l'API)
  const accountBalance = 0;
  const statistics = {
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0
  };
  
  const handleCreateCampaign = () => {
    setShowNewCampaign(true);
  };
  
  const handleCancelCampaign = () => {
    setShowNewCampaign(false);
  };
  
  if (showNewCampaign) {
    return <CampaignCreationForm onCancel={handleCancelCampaign} />;
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Gestion des campagnes publicitaires</h3>
        <Button onClick={handleCreateCampaign} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Nouvelle campagne
        </Button>
      </div>
      
      {isVerified ? (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-6">
          <h4 className="font-medium mb-2">Compte annonceur actif</h4>
          <p className="text-sm">Votre compte annonceur a été vérifié et approuvé par l'équipe LAVUEPAYEE.</p>
        </Alert>
      ) : (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 mb-6">
          <h4 className="font-medium mb-2">Compte en attente de vérification</h4>
          <p className="text-sm">Votre demande est en cours d'examen. Vous recevrez une notification dès que votre compte sera approuvé.</p>
        </Alert>
      )}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-primary" />
                  Impressions Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{statistics.impressions.toLocaleString()}</div>
                <p className="text-xs text-foreground/60 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Mis à jour en temps réel
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Taux de Clic (CTR)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{statistics.ctr}%</div>
                <p className="text-xs text-foreground/60 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Moyenne de vos campagnes
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BadgeDollarSign className="h-4 w-4 mr-2 text-primary" />
                  Solde du compte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{accountBalance.toLocaleString()} LVC</div>
                <p className="text-xs text-foreground/60 mt-1">
                  Créditez votre compte pour lancer des campagnes
                </p>
                <Button size="sm" className="mt-3 w-full">Ajouter des fonds</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4 rounded-lg">
              <h4 className="font-medium mb-3">Campagnes récentes</h4>
              <div className="bg-secondary/20 rounded-lg p-4 text-center">
                <FileText className="h-6 w-6 mx-auto text-foreground/60 mb-2" />
                <p className="text-sm text-foreground/60">
                  Vous n'avez pas encore de campagnes actives.
                </p>
                <Button variant="outline" size="sm" className="mt-3" onClick={handleCreateCampaign}>
                  Créer votre première campagne
                </Button>
              </div>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <h4 className="font-medium mb-3">Guides et ressources</h4>
              <div className="space-y-3">
                <a href="#" className="block p-3 rounded-lg hover:bg-secondary/10 transition-all flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Optimisez vos campagnes</p>
                    <p className="text-xs text-foreground/60">Découvrez les meilleures pratiques pour maximiser vos résultats</p>
                  </div>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-secondary/10 transition-all flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Ciblage efficace</p>
                    <p className="text-xs text-foreground/60">Guide pour atteindre votre audience idéale</p>
                  </div>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-secondary/10 transition-all flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Share2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Intégration réseaux sociaux</p>
                    <p className="text-xs text-foreground/60">Comment étendre vos campagnes sur les réseaux sociaux</p>
                  </div>
                </a>
              </div>
            </div>
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
        </TabsContent>
        
        <TabsContent value="campaigns">
          <CampaignsList />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialMediaAdsIntegration />
        </TabsContent>
        
        <TabsContent value="stats">
          <StatisticsPanel />
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserDashboard;
