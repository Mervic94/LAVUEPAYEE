
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SocialMediaTabProps {
  className?: string;
}

const SocialMediaTab: React.FC<SocialMediaTabProps> = ({ className }) => {
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    linkedin: false
  });

  const handleConnectAccount = (platform: keyof typeof connectedAccounts) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-6">Intégrations Réseaux Sociaux</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facebook */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Facebook className="h-6 w-6 text-blue-600" />
                <CardTitle>Facebook Ads</CardTitle>
              </div>
              <Badge variant={connectedAccounts.facebook ? "default" : "outline"}>
                {connectedAccounts.facebook ? 'Connecté' : 'Non connecté'}
              </Badge>
            </div>
            <CardDescription>
              Intégrez vos campagnes Facebook Ads pour analyser et optimiser vos performances.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              L'intégration avec Facebook Ads vous permet de suivre les conversions, optimiser les audiences et analyser vos campagnes publicitaires.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedAccounts.facebook ? "outline" : "default"}
              onClick={() => handleConnectAccount('facebook')}
            >
              {connectedAccounts.facebook ? 'Déconnecter' : 'Connecter'}
            </Button>
          </CardFooter>
        </Card>

        {/* Instagram */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Instagram className="h-6 w-6 text-pink-600" />
                <CardTitle>Instagram Ads</CardTitle>
              </div>
              <Badge variant={connectedAccounts.instagram ? "default" : "outline"}>
                {connectedAccounts.instagram ? 'Connecté' : 'Non connecté'}
              </Badge>
            </div>
            <CardDescription>
              Importez vos campagnes Instagram et mesurez leur performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Synchronisez vos campagnes Instagram pour analyser l'engagement et les conversions sur cette plateforme visuelle populaire.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedAccounts.instagram ? "outline" : "default"}
              onClick={() => handleConnectAccount('instagram')}
            >
              {connectedAccounts.instagram ? 'Déconnecter' : 'Connecter'}
            </Button>
          </CardFooter>
        </Card>

        {/* Twitter */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Twitter className="h-6 w-6 text-blue-400" />
                <CardTitle>Twitter Ads</CardTitle>
              </div>
              <Badge variant={connectedAccounts.twitter ? "default" : "outline"}>
                {connectedAccounts.twitter ? 'Connecté' : 'Non connecté'}
              </Badge>
            </div>
            <CardDescription>
              Connectez vos campagnes Twitter pour améliorer leur portée.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              L'intégration Twitter vous permet d'optimiser vos campagnes pour maximiser l'engagement et le retour sur investissement.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedAccounts.twitter ? "outline" : "default"}
              onClick={() => handleConnectAccount('twitter')}
            >
              {connectedAccounts.twitter ? 'Déconnecter' : 'Connecter'}
            </Button>
          </CardFooter>
        </Card>

        {/* LinkedIn */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Linkedin className="h-6 w-6 text-blue-800" />
                <CardTitle>LinkedIn Ads</CardTitle>
              </div>
              <Badge variant={connectedAccounts.linkedin ? "default" : "outline"}>
                {connectedAccounts.linkedin ? 'Connecté' : 'Non connecté'}
              </Badge>
            </div>
            <CardDescription>
              Gérez vos campagnes LinkedIn pour cibler les professionnels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              L'intégration LinkedIn est idéale pour les campagnes B2B et le ciblage de professionnels dans divers secteurs d'activité.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant={connectedAccounts.linkedin ? "outline" : "default"}
              onClick={() => handleConnectAccount('linkedin')}
            >
              {connectedAccounts.linkedin ? 'Déconnecter' : 'Connecter'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 bg-secondary/20 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Avantages de l'intégration</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Centralisation des données de toutes vos campagnes</li>
          <li>Optimisation des budgets publicitaires entre plateformes</li>
          <li>Analyse comparative des performances par réseau social</li>
          <li>Automatisation des rapports publicitaires</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialMediaTab;
