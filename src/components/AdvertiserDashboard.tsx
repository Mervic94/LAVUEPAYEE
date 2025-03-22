
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { UploadCloud, BarChart2, TrendingUp, Users, Clock, History, Flag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import LightbulbIcon from './icons/LightbulbIcon';

interface AdvertiserDashboardProps {
  className?: string;
}

const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ className }) => {
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adType, setAdType] = useState('banner');
  const [adBudget, setAdBudget] = useState('1000');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const impressionsData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Impressions',
        data: [1200, 1900, 3000, 5000, 6000, 7000, 4000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ],
  };
  
  const conversionData = {
    labels: ['Vues', 'Clics', 'Conversions'],
    datasets: [
      {
        label: 'Taux',
        data: [5000, 1500, 300],
        backgroundColor: [
          'rgba(155, 135, 245, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(217, 70, 239, 0.7)'
        ],
        borderColor: [
          'rgb(155, 135, 245)',
          'rgb(14, 165, 233)',
          'rgb(217, 70, 239)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const audienceData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        label: 'Audience',
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          'rgba(249, 115, 22, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(217, 70, 239, 0.7)',
          'rgba(142, 145, 150, 0.7)'
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(14, 165, 233)',
          'rgb(139, 92, 246)',
          'rgb(217, 70, 239)',
          'rgb(142, 145, 150)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const campaignSuggestions = [
    {
      id: 1,
      title: "Optimisez pour les 25-34 ans",
      description: "Ce groupe démographique a montré le meilleur taux de conversion pour vos publicités précédentes.",
      improvement: "+15% de conversions potentielles"
    },
    {
      id: 2,
      title: "Augmentez votre budget le vendredi",
      description: "Vos impressions sont les plus élevées en fin de semaine, augmentez votre budget pour maximiser l'impact.",
      improvement: "+22% de visibilité estimée"
    },
    {
      id: 3,
      title: "Utilisez plus de vidéos interstitielles",
      description: "Les publicités vidéo ont un taux d'engagement 3x supérieur à vos bannières actuelles.",
      improvement: "+30% d'engagement estimé"
    }
  ];

  const campaignHistory = [
    {
      id: "camp-001",
      name: "Promotion estivale 2023",
      type: "Vidéo",
      dateRange: "01/06/2023 - 31/08/2023",
      impressions: 42500,
      clicks: 3800,
      conversions: 720,
      budget: "15000 LVC",
      status: "completed",
      performance: [
        { date: "Juin", impressions: 12000, clicks: 1100, conversions: 210 },
        { date: "Juillet", impressions: 15500, clicks: 1400, conversions: 260 },
        { date: "Août", impressions: 15000, clicks: 1300, conversions: 250 }
      ]
    },
    {
      id: "camp-002",
      name: "Lancement nouvelle application",
      type: "Native",
      dateRange: "15/09/2023 - 15/10/2023",
      impressions: 28700,
      clicks: 3200,
      conversions: 650,
      budget: "12000 LVC",
      status: "completed",
      performance: [
        { date: "Sem 1-2", impressions: 14000, clicks: 1600, conversions: 320 },
        { date: "Sem 3-4", impressions: 14700, clicks: 1600, conversions: 330 }
      ]
    },
    {
      id: "camp-003",
      name: "Offres de fin d'année",
      type: "Bannière",
      dateRange: "01/12/2023 - 31/12/2023",
      impressions: 35600,
      clicks: 2800,
      conversions: 560,
      budget: "13500 LVC",
      status: "completed",
      performance: [
        { date: "Sem 1", impressions: 8500, clicks: 650, conversions: 130 },
        { date: "Sem 2", impressions: 9000, clicks: 700, conversions: 140 },
        { date: "Sem 3", impressions: 9500, clicks: 750, conversions: 150 },
        { date: "Sem 4", impressions: 8600, clicks: 700, conversions: 140 }
      ]
    }
  ];
  
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ad submitted:', { adTitle, adDescription, adType, adBudget });
    // Reset form or show success message
  };

  const handleCampaignSelect = (id: string) => {
    setSelectedCampaign(id === selectedCampaign ? null : id);
  };
  
  return (
    <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="new-ad">Nouvelle Publicité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="space-y-6 p-4">
          <h2 className="text-2xl font-bold mb-4">Tableau de bord Annonceur</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-primary" />
                  Impressions Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24,842</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Taux de Conversion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6.2%</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.8% depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="h-4 w-4 mr-2 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                      alt="LVC" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  Budget Dépensé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,420 LVC</div>
                <p className="text-xs text-foreground/60 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Mis à jour il y a 3 heures
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightbulbIcon className="h-5 w-5 text-amber-500" />
                Suggestions d'optimisation
              </CardTitle>
              <CardDescription>
                Basées sur l'analyse de vos campagnes précédentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {campaignSuggestions.map(suggestion => (
                  <div key={suggestion.id} className="p-4 rounded-lg border bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <h3 className="font-medium text-primary mb-2">{suggestion.title}</h3>
                    <p className="text-sm text-foreground/70 mb-2">{suggestion.description}</p>
                    <p className="text-sm font-medium text-green-600">{suggestion.improvement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impressions quotidiennes</CardTitle>
                <CardDescription>Performance sur les 7 derniers jours</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={impressionsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                      title: {
                        display: false,
                      },
                    },
                  }}
                  className="aspect-[2/1]"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Répartition de l'audience</CardTitle>
                <CardDescription>Par tranches d'âge</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart 
                  data={audienceData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right' as const,
                      },
                    },
                  }}
                  className="aspect-[2/1]"
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance de conversion</CardTitle>
                <CardDescription>Taux de vues, clics et conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart 
                  data={conversionData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                    },
                  }}
                  className="aspect-[3/1]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4 p-4">
          <h2 className="text-2xl font-bold mb-4">Vos campagnes publicitaires</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les campagnes</SelectItem>
                  <SelectItem value="active">Campagnes actives</SelectItem>
                  <SelectItem value="inactive">Campagnes inactives</SelectItem>
                  <SelectItem value="completed">Campagnes terminées</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="banner">Bannières</SelectItem>
                  <SelectItem value="video">Vidéos</SelectItem>
                  <SelectItem value="interstitial">Interstitielles</SelectItem>
                  <SelectItem value="native">Natives</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>Nouvelle campagne</Button>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 bg-secondary/50 font-medium">
              <div className="col-span-2">Nom de la campagne</div>
              <div>Type</div>
              <div>Impressions</div>
              <div>Budget</div>
              <div>Statut</div>
            </div>
            
            <div className="divide-y">
              {campaignHistory.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="grid grid-cols-6 gap-4 p-4 hover:bg-secondary/10 transition-colors cursor-pointer"
                  onClick={() => handleCampaignSelect(campaign.id)}
                >
                  <div className="col-span-2 font-medium">{campaign.name}</div>
                  <div>{campaign.type}</div>
                  <div>{new Intl.NumberFormat('fr-FR').format(campaign.impressions)}</div>
                  <div>{campaign.budget}</div>
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Terminée
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 p-4">
          <h2 className="text-2xl font-bold mb-4">Historique des campagnes</h2>
          
          <div className="space-y-6">
            {campaignHistory.map((campaign) => (
              <Card key={campaign.id} className={`overflow-hidden transition-all duration-300 ${selectedCampaign === campaign.id ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="cursor-pointer" onClick={() => handleCampaignSelect(campaign.id)}>
                  <CardTitle>{campaign.name}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-x-4 gap-y-2">
                    <span className="flex items-center gap-1">
                      <History className="h-4 w-4 text-foreground/60" />
                      {campaign.dateRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 className="h-4 w-4 text-foreground/60" />
                      {new Intl.NumberFormat('fr-FR').format(campaign.impressions)} impressions
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                          alt="LVC" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {campaign.budget}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                {selectedCampaign === campaign.id && (
                  <CardContent>
                    <h4 className="font-medium mb-3">Détails de performance</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3">Période</th>
                            <th className="text-right py-2 px-3">Impressions</th>
                            <th className="text-right py-2 px-3">Clics</th>
                            <th className="text-right py-2 px-3">Conversions</th>
                            <th className="text-right py-2 px-3">Taux de clic</th>
                            <th className="text-right py-2 px-3">Taux de conversion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaign.performance.map((period, index) => {
                            const ctr = ((period.clicks / period.impressions) * 100).toFixed(2);
                            const convRate = ((period.conversions / period.clicks) * 100).toFixed(2);
                            
                            return (
                              <tr key={index} className="border-b border-border/50 hover:bg-secondary/5">
                                <td className="py-2 px-3">{period.date}</td>
                                <td className="text-right py-2 px-3">{new Intl.NumberFormat('fr-FR').format(period.impressions)}</td>
                                <td className="text-right py-2 px-3">{new Intl.NumberFormat('fr-FR').format(period.clicks)}</td>
                                <td className="text-right py-2 px-3">{new Intl.NumberFormat('fr-FR').format(period.conversions)}</td>
                                <td className="text-right py-2 px-3">{ctr}%</td>
                                <td className="text-right py-2 px-3">{convRate}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new-ad" className="p-4">
          <h2 className="text-2xl font-bold mb-6">Créer une nouvelle publicité</h2>
          
          <form onSubmit={handleAdSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ad-title">Titre de la publicité</Label>
                  <Input 
                    id="ad-title"
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    placeholder="Entrez un titre accrocheur"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ad-description">Description</Label>
                  <Textarea 
                    id="ad-description"
                    value={adDescription}
                    onChange={(e) => setAdDescription(e.target.value)}
                    placeholder="Décrivez votre produit ou service"
                    className="mt-1 h-32"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ad-type">Type de publicité</Label>
                  <Select 
                    value={adType}
                    onValueChange={setAdType}
                  >
                    <SelectTrigger id="ad-type" className="mt-1">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Bannière</SelectItem>
                      <SelectItem value="video">Vidéo</SelectItem>
                      <SelectItem value="interstitial">Interstitielle</SelectItem>
                      <SelectItem value="native">Native</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="ad-budget">Budget (LVC)</Label>
                  <Input 
                    id="ad-budget"
                    type="number"
                    value={adBudget}
                    onChange={(e) => setAdBudget(e.target.value)}
                    placeholder="Entrez votre budget"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Télécharger vos médias</Label>
                  <div className="mt-1 border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center">
                    <UploadCloud className="h-8 w-8 mx-auto text-foreground/60" />
                    <p className="mt-2 text-sm text-foreground/70">
                      Glissez-déposez vos fichiers ici ou cliquez pour parcourir
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Parcourir les fichiers
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Ciblage</Label>
                  <div className="mt-1 p-4 rounded-lg border border-foreground/20">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="age-target" className="text-sm">Âge</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="age-target" className="mt-1">
                            <SelectValue placeholder="Sélectionnez une tranche d'âge" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les âges</SelectItem>
                            <SelectItem value="18-24">18-24 ans</SelectItem>
                            <SelectItem value="25-34">25-34 ans</SelectItem>
                            <SelectItem value="35-44">35-44 ans</SelectItem>
                            <SelectItem value="45-54">45-54 ans</SelectItem>
                            <SelectItem value="55+">55 ans et plus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="gender-target" className="text-sm">Genre</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="gender-target" className="mt-1">
                            <SelectValue placeholder="Sélectionnez un genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous</SelectItem>
                            <SelectItem value="male">Homme</SelectItem>
                            <SelectItem value="female">Femme</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="location-target" className="text-sm">Localisation</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="location-target" className="mt-1">
                            <SelectValue placeholder="Sélectionnez une localisation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toute la France</SelectItem>
                            <SelectItem value="paris">Paris et région parisienne</SelectItem>
                            <SelectItem value="lyon">Lyon et sa périphérie</SelectItem>
                            <SelectItem value="marseille">Marseille et sa périphérie</SelectItem>
                            <SelectItem value="custom">Personnalisé...</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button">
                Enregistrer le brouillon
              </Button>
              <Button type="submit">
                Créer la publicité
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserDashboard;
