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
            
            {

