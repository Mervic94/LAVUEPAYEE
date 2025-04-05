
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SocialMediaAdsIntegrationProps {
  className?: string;
}

const SocialMediaAdsIntegration: React.FC<SocialMediaAdsIntegrationProps> = ({ className }) => {
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false
  });
  
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  
  const socialPlatforms = [
    { 
      id: 'facebook',
      name: 'Facebook Ads',
      icon: <Facebook className="h-5 w-5 text-blue-600" />,
      audience: '2.8B+ utilisateurs',
      benefits: ['Ciblage démographique précis', 'Formats publicitaires variés', 'Optimisation automatique']
    },
    { 
      id: 'instagram',
      name: 'Instagram Ads',
      icon: <Instagram className="h-5 w-5 text-pink-600" />,
      audience: '1.2B+ utilisateurs',
      benefits: ['Audience jeune et engagée', 'Formats visuels attrayants', 'Stories et Reels']
    },
    { 
      id: 'twitter',
      name: 'Twitter Ads',
      icon: <Twitter className="h-5 w-5 text-blue-400" />,
      audience: '330M+ utilisateurs actifs',
      benefits: ['Ciblage par centres d\'intérêt', 'Engagement en temps réel', 'Promotions tendances']
    },
    { 
      id: 'linkedin',
      name: 'LinkedIn Ads',
      icon: <Linkedin className="h-5 w-5 text-blue-700" />,
      audience: '740M+ professionnels',
      benefits: ['Ciblage B2B avancé', 'Leads qualifiés', 'Formats publicitaires professionnels']
    }
  ];

  // Mock accounts for demo purposes
  const mockAccounts = {
    facebook: [
      { id: 'fb1', name: 'Compte Business Principal', status: 'active' },
      { id: 'fb2', name: 'Compte Campagnes Saisonnières', status: 'active' }
    ],
    twitter: [
      { id: 'tw1', name: 'Compte Marketing', status: 'active' }
    ],
    instagram: [
      { id: 'ig1', name: 'Compte Business', status: 'active' },
      { id: 'ig2', name: 'Compte Influenceurs', status: 'pending' }
    ],
    linkedin: [
      { id: 'li1', name: 'Compte Entreprise', status: 'active' }
    ]
  };
  
  const handleConnect = (platformId: string) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };
  
  const handleSelectAccount = (accountId: string) => {
    setSelectedAccount(accountId === selectedAccount ? null : accountId);
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-2xl font-bold mb-2">Intégration des réseaux publicitaires</h2>
        <p className="text-muted-foreground">
          Connectez vos comptes publicitaires pour élargir la portée de vos campagnes et augmenter votre retour sur investissement.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => (
          <Card key={platform.id} className={`overflow-hidden transition-all ${connectedPlatforms[platform.id] ? 'border-primary' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {platform.icon}
                  <CardTitle>{platform.name}</CardTitle>
                </div>
                <Switch 
                  checked={connectedPlatforms[platform.id]} 
                  onCheckedChange={() => handleConnect(platform.id)}
                />
              </div>
              <CardDescription>
                {platform.audience}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                {platform.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {connectedPlatforms[platform.id] && (
                <div className="mt-4 pt-4 border-t">
                  <Label className="text-sm font-medium mb-2 block">Comptes connectés</Label>
                  <div className="space-y-2">
                    {mockAccounts[platform.id as keyof typeof mockAccounts]?.map((account) => (
                      <div 
                        key={account.id}
                        className={`p-2.5 rounded-md flex justify-between items-center cursor-pointer transition-all ${
                          selectedAccount === account.id 
                            ? 'bg-primary/10 border-primary/30 border' 
                            : 'hover:bg-secondary/50 border border-transparent'
                        }`}
                        onClick={() => handleSelectAccount(account.id)}
                      >
                        <div className="flex items-center gap-3">
                          {platform.icon}
                          <div>
                            <p className="font-medium text-sm">{account.name}</p>
                            <Badge variant={account.status === 'active' ? 'outline' : 'secondary'} className="mt-1">
                              {account.status === 'active' ? 'Actif' : 'En attente'}
                            </Badge>
                          </div>
                        </div>
                        
                        {selectedAccount === account.id && (
                          <Button size="sm" variant="outline">
                            Configurer
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      + Ajouter un compte
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className={`bg-secondary/20 flex justify-between ${!connectedPlatforms[platform.id] ? 'opacity-50' : ''}`}>
              <Button 
                variant="ghost" 
                size="sm"
                disabled={!connectedPlatforms[platform.id]}
              >
                Synchroniser les données
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                disabled={!connectedPlatforms[platform.id]}
              >
                Paramètres avancés
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Paramètres de synchronisation</CardTitle>
          <CardDescription>
            Configurez le comportement de synchronisation entre LAVUEPAYEE et les plateformes publicitaires
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="audiences">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="audiences">Audiences</TabsTrigger>
              <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
              <TabsTrigger value="analytics">Analytiques</TabsTrigger>
            </TabsList>
            
            <TabsContent value="audiences" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sync-audiences" className="font-medium">Synchronisation bidirectionnelle des audiences</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Partagez automatiquement les audiences entre LAVUEPAYEE et les plateformes connectées
                  </p>
                </div>
                <Switch id="sync-audiences" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lookalike-audiences" className="font-medium">Création d'audiences similaires</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Créez automatiquement des audiences similaires basées sur vos meilleurs segments
                  </p>
                </div>
                <Switch id="lookalike-audiences" />
              </div>
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cross-platform" className="font-medium">Déploiement multi-plateformes</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Déployez automatiquement vos campagnes sur toutes les plateformes connectées
                  </p>
                </div>
                <Switch id="cross-platform" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budget-sync" className="font-medium">Synchronisation des budgets</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Répartissez automatiquement votre budget entre les plateformes selon la performance
                  </p>
                </div>
                <Switch id="budget-sync" />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="unified-reporting" className="font-medium">Rapports unifiés</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Visualisez les performances combinées de toutes vos campagnes dans un tableau de bord unique
                  </p>
                </div>
                <Switch id="unified-reporting" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-optimization" className="font-medium">Optimisation automatique</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Optimisez automatiquement vos campagnes en fonction des performances observées
                  </p>
                </div>
                <Switch id="auto-optimization" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaAdsIntegration;
