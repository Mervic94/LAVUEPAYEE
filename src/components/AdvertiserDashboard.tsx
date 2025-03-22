
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { UploadCloud, BarChart2, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

interface AdvertiserDashboardProps {
  className?: string;
}

const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ className }) => {
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adType, setAdType] = useState('banner');
  const [adBudget, setAdBudget] = useState('1000');
  
  // Mock data for charts
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
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
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
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };
  
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ad submitted:', { adTitle, adDescription, adType, adBudget });
    // Reset form or show success message
  };
  
  return (
    <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
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
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  Budget Dépensé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,420 LVP</div>
                <p className="text-xs text-foreground/60 flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  Mis à jour il y a 3 heures
                </p>
              </CardContent>
            </Card>
          </div>
          
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
            
            {/* Mock campaign data */}
            {[
              { id: 1, name: "Promotion estivale", type: "Vidéo", impressions: 12430, budget: "5000 LVP", status: "active" },
              { id: 2, name: "Nouveaux produits", type: "Bannière", impressions: 8211, budget: "3500 LVP", status: "active" },
              { id: 3, name: "Offre spéciale", type: "Interstitielle", impressions: 4192, budget: "2000 LVP", status: "completed" },
              { id: 4, name: "Lancement application", type: "Native", impressions: 9845, budget: "7500 LVP", status: "active" },
              { id: 5, name: "Soldes d'hiver", type: "Bannière", impressions: 0, budget: "4000 LVP", status: "inactive" },
            ].map((campaign) => (
              <div key={campaign.id} className="grid grid-cols-6 gap-4 p-4 border-t border-border hover:bg-secondary/10 cursor-pointer">
                <div className="col-span-2 font-medium">{campaign.name}</div>
                <div>{campaign.type}</div>
                <div>{campaign.impressions.toLocaleString('fr-FR')}</div>
                <div>{campaign.budget}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {campaign.status === 'active' ? 'Active' :
                     campaign.status === 'inactive' ? 'Inactive' :
                     'Terminée'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new-ad" className="p-4">
          <h2 className="text-2xl font-bold mb-4">Créer une nouvelle publicité</h2>
          
          <form onSubmit={handleAdSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ad-title">Titre de la publicité</Label>
                  <Input 
                    id="ad-title" 
                    placeholder="Entrez un titre accrocheur" 
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="ad-description">Description</Label>
                  <Textarea 
                    id="ad-description" 
                    placeholder="Décrivez votre publicité" 
                    value={adDescription}
                    onChange={(e) => setAdDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ad-type">Type de publicité</Label>
                    <Select 
                      value={adType} 
                      onValueChange={setAdType}
                    >
                      <SelectTrigger id="ad-type">
                        <SelectValue placeholder="Sélectionner un type" />
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
                    <Label htmlFor="ad-budget">Budget (LVP)</Label>
                    <Input 
                      id="ad-budget" 
                      type="number" 
                      min="500" 
                      placeholder="Budget" 
                      value={adBudget}
                      onChange={(e) => setAdBudget(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Contenu média</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:bg-secondary/10 transition-colors cursor-pointer">
                  <UploadCloud className="h-12 w-12 mx-auto text-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Glissez-déposez vos fichiers ici</h3>
                  <p className="text-sm text-foreground/60 mb-4">PNG, JPG, GIF, MP4, AVI jusqu'à 10MB</p>
                  <Button variant="outline" type="button">
                    Sélectionner un fichier
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor="ad-targeting">Ciblage</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="ad-targeting">
                      <SelectValue placeholder="Audience cible" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les utilisateurs</SelectItem>
                      <SelectItem value="new">Nouveaux utilisateurs</SelectItem>
                      <SelectItem value="returning">Utilisateurs existants</SelectItem>
                      <SelectItem value="affiliates">Affiliés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full md:w-auto">Créer la publicité</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserDashboard;
