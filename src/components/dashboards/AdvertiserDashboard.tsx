
import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, Users, Clock, History, Flag, 
  Upload, Filter, Search, Facebook, Youtube, Chrome, 
  Instagram, Twitter, Grid, ArrowRight, Plus, Globe,
  Download, UploadCloud, PlusCircle, Layers, MessageSquare
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  BarChart, LineChart, PieChart 
} from "@/components/ui/chart";

const AdvertiserDashboard = () => {
  const [adTitle, setAdTitle] = useState('');
  const [adDescription, setAdDescription] = useState('');
  const [adType, setAdType] = useState('banner');
  const [adBudget, setAdBudget] = useState('1000');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [activeIntegrationTab, setActiveIntegrationTab] = useState('facebook');
  
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
  
  const platformPerformanceData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'LAVUEPAYEE',
        data: [1200, 1500, 1700, 1800, 2100, 2300, 1900],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Facebook',
        data: [800, 1000, 1200, 1400, 1700, 1900, 1500],
        borderColor: 'rgb(59, 89, 152)',
        backgroundColor: 'rgba(59, 89, 152, 0.5)',
      },
      {
        label: 'Google',
        data: [600, 800, 1100, 1300, 1600, 1800, 1400],
        borderColor: 'rgb(66, 133, 244)',
        backgroundColor: 'rgba(66, 133, 244, 0.5)',
      },
      {
        label: 'YouTube',
        data: [400, 600, 900, 1100, 1400, 1600, 1200],
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      }
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
      platform: "LAVUEPAYEE",
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
      platform: "Facebook",
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
      platform: "Google",
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
    },
    {
      id: "camp-004",
      name: "Campagne de Noël",
      type: "Vidéo",
      platform: "YouTube",
      dateRange: "15/12/2023 - 05/01/2024",
      impressions: 31200,
      clicks: 2500,
      conversions: 480,
      budget: "11000 LVC",
      status: "completed",
      performance: [
        { date: "Sem 1", impressions: 10200, clicks: 820, conversions: 160 },
        { date: "Sem 2", impressions: 10800, clicks: 850, conversions: 170 },
        { date: "Sem 3", impressions: 10200, clicks: 830, conversions: 150 }
      ]
    }
  ];
  
  // Social media ad templates
  const adTemplates = [
    {
      id: "temp-001",
      name: "Bannière standard",
      platform: "LAVUEPAYEE",
      type: "Banner",
      description: "Format standard pour les emplacements publicitaires sur le site LAVUEPAYEE.",
      dimensions: "728x90, 300x250, 160x600",
      preview: "/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png"
    },
    {
      id: "temp-002",
      name: "Facebook Feed Ad",
      platform: "Facebook",
      type: "Feed",
      description: "Format publicitaire qui apparaît dans le fil d'actualité Facebook des utilisateurs.",
      dimensions: "1200x628",
      preview: "/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png"
    },
    {
      id: "temp-003",
      name: "Google Display",
      platform: "Google",
      type: "Display",
      description: "Format publicitaire pour le réseau Display de Google.",
      dimensions: "300x250, 728x90, 336x280",
      preview: "/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png"
    },
    {
      id: "temp-004",
      name: "YouTube Pre-roll",
      platform: "YouTube",
      type: "Video",
      description: "Annonce vidéo lue avant le contenu principal sur YouTube.",
      dimensions: "Video 16:9, min 12 seconds",
      preview: "/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png"
    }
  ];
  
  const platformIcons = {
    Facebook: <Facebook className="h-5 w-5 text-[#3b5998]" />,
    Google: <Chrome className="h-5 w-5 text-[#4285F4]" />,
    YouTube: <Youtube className="h-5 w-5 text-[#FF0000]" />,
    Instagram: <Instagram className="h-5 w-5 text-[#E1306C]" />,
    Twitter: <Twitter className="h-5 w-5 text-[#1DA1F2]" />,
    LAVUEPAYEE: (
      <div className="h-5 w-5 rounded-full flex items-center justify-center overflow-hidden">
        <img 
          src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
          alt="LVP" 
          className="w-full h-full object-contain"
        />
      </div>
    )
  };
  
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ad submitted:', { adTitle, adDescription, adType, adBudget });
    // Reset form or show success message
  };

  const handleCampaignSelect = (id: string) => {
    setSelectedCampaign(id === selectedCampaign ? null : id);
  };
  
  const renderPlatformIcon = (platform: keyof typeof platformIcons) => {
    return platformIcons[platform] || <Globe className="h-5 w-5" />;
  };
  
  const filteredCampaigns = selectedPlatform === 'all' 
    ? campaignHistory
    : campaignHistory.filter(campaign => campaign.platform.toLowerCase() === selectedPlatform.toLowerCase());
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="new-ad">Nouvelle Pub</TabsTrigger>
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
                      alt="LVP" 
                      className="w-full h-full object-contain"
                    />
                  </div>
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

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
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
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Performance multi-plateformes</CardTitle>
              <CardDescription>Comparaison des impressions quotidiennes</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={platformPerformanceData}
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
                className="aspect-[3/1]"
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impressions quotidiennes</CardTitle>
                <CardDescription>Performance sur LAVUEPAYEE</CardDescription>
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
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4 p-4">
          <h2 className="text-2xl font-bold mb-4">Vos campagnes publicitaires</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Select defaultValue="all" onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par plateforme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les plateformes</SelectItem>
                  <SelectItem value="lavuepayee">LAVUEPAYEE</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
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
            
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle campagne
            </Button>
          </div>
          
          <div className="glass-card rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-4 bg-secondary/50 font-medium">
              <div className="col-span-2">Nom de la campagne</div>
              <div>Plateforme</div>
              <div>Type</div>
              <div>Impressions</div>
              <div>Budget</div>
              <div>Statut</div>
            </div>
            
            <div className="divide-y">
              {filteredCampaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="grid grid-cols-7 gap-4 p-4 hover:bg-secondary/10 transition-colors cursor-pointer"
                  onClick={() => handleCampaignSelect(campaign.id)}
                >
                  <div className="col-span-2 font-medium">{campaign.name}</div>
                  <div className="flex items-center gap-2">
                    {renderPlatformIcon(campaign.platform as keyof typeof platformIcons)}
                    {campaign.platform}
                  </div>
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
        
        <TabsContent value="integrations" className="space-y-6 p-4">
          <h2 className="text-2xl font-bold mb-4">Intégrations publicitaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Plateformes connectées</CardTitle>
                <CardDescription>Gérez vos intégrations publicitaires externes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#3b5998]/10 rounded-full">
                      <Facebook className="h-6 w-6 text-[#3b5998]" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook Ads</p>
                      <p className="text-xs text-muted-foreground">Connecté</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4285F4]/10 rounded-full">
                      <Chrome className="h-6 w-6 text-[#4285F4]" />
                    </div>
                    <div>
                      <p className="font-medium">Google Ads</p>
                      <p className="text-xs text-muted-foreground">Connecté</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF0000]/10 rounded-full">
                      <Youtube className="h-6 w-6 text-[#FF0000]" />
                    </div>
                    <div>
                      <p className="font-medium">YouTube Ads</p>
                      <p className="text-xs text-muted-foreground">Connecté</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configurer</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#E1306C]/10 rounded-full">
                      <Instagram className="h-6 w-6 text-[#E1306C]" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram Ads</p>
                      <p className="text-xs text-muted-foreground">Non connecté</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connecter</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1DA1F2]/10 rounded-full">
                      <Twitter className="h-6 w-6 text-[#1DA1F2]" />
                    </div>
                    <div>
                      <p className="font-medium">Twitter Ads</p>
                      <p className="text-xs text-muted-foreground">Non connecté</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connecter</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistiques multi-plateformes</CardTitle>
                <CardDescription>Performance globale de vos campagnes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <div className="h-6 w-6 rounded-full flex items-center justify-center overflow-hidden">
                          <img 
                            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                            alt="LVP" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">LAVUEPAYEE</p>
                        <p className="text-xs text-muted-foreground">8 campagnes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">42,500</p>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#3b5998]/10 rounded-full">
                        <Facebook className="h-6 w-6 text-[#3b5998]" />
                      </div>
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-xs text-muted-foreground">5 campagnes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">28,700</p>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#4285F4]/10 rounded-full">
                        <Chrome className="h-6 w-6 text-[#4285F4]" />
                      </div>
                      <div>
                        <p className="font-medium">Google</p>
                        <p className="text-xs text-muted-foreground">4 campagnes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">35,600</p>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FF0000]/10 rounded-full">
                        <Youtube className="h-6 w-6 text-[#FF0000]" />
                      </div>
                      <div>
                        <p className="font-medium">YouTube</p>
                        <p className="text-xs text-muted-foreground">3 campagnes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">31,200</p>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <Tabs value={activeIntegrationTab} onValueChange={setActiveIntegrationTab}>
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="facebook" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </TabsTrigger>
                  <TabsTrigger value="google" className="flex items-center gap-2">
                    <Chrome className="h-4 w-4" />
                    Google
                  </TabsTrigger>
                  <TabsTrigger value="youtube" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {activeIntegrationTab === 'facebook' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Facebook Ads Manager</h3>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Créer une campagne Facebook
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Impressions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">28,700</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15.2% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Clics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3,200</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +10.8% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">CTR</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">11.1%</div>
                        <p className="text-xs text-amber-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          -0.7% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Campagnes Facebook actives</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom de la campagne</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Impressions</TableHead>
                          <TableHead>Clics</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Promotion de printemps</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>12,450</TableCell>
                          <TableCell>1,380</TableCell>
                          <TableCell>3,500€</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Gérer</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Nouveau produit XYZ</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              En pause
                            </span>
                          </TableCell>
                          <TableCell>8,230</TableCell>
                          <TableCell>940</TableCell>
                          <TableCell>2,800€</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Gérer</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              {activeIntegrationTab === 'google' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Google Ads Manager</h3>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Créer une campagne Google
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Impressions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">35,600</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +18.3% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Clics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2,800</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12.5% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">CTR</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">7.9%</div>
                        <p className="text-xs text-amber-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          -0.3% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Campagnes Google actives</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom de la campagne</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Impressions</TableHead>
                          <TableHead>Clics</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Services Premium</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>18,540</TableCell>
                          <TableCell>1,420</TableCell>
                          <TableCell>4,200€</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Gérer</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Recherche de marque</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>12,460</TableCell>
                          <TableCell>1,050</TableCell>
                          <TableCell>3,100€</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Gérer</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              {activeIntegrationTab === 'youtube' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">YouTube Ads Manager</h3>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Créer une campagne YouTube
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Impressions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">31,200</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +22.1% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Vues</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">15,300</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +18.7% depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Durée moyenne</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">00:15</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +2.1s depuis le mois dernier
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Campagnes YouTube actives</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom de la campagne</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Impressions</TableHead>
                          <TableHead>Vues</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Présentation produit</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </TableCell>
                          <TableCell>19,450</TableCell>
                          <TableCell>9,820</TableCell>
                          <TableCell>5,300€</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Gérer</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Témoignages clients</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              En pause
                            </span>
                          </TableCell>
                          <TableCell>8,750</TableCell>
                          <TableCell>4,190</TableCell>
                          <TableCell>2,400€</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Gérer</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              {activeIntegrationTab === 'instagram' && (
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <Instagram className="h-10 w-10 text-[#E1306C] mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Instagram Ads non connecté</h3>
                    <p className="text-muted-foreground mb-4">Connectez votre compte Instagram Ads pour accéder à vos campagnes</p>
                    <Button>Connecter Instagram</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6 p-4">
          <h2 className="text-2xl font-bold mb-4">Modèles publicitaires</h2>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-muted-foreground">Utilisez nos modèles pré-conçus pour créer rapidement des publicités efficaces</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par plateforme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les plateformes</SelectItem>
                  <SelectItem value="lavuepayee">LAVUEPAYEE</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Créer un modèle
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-video bg-secondary/30 flex items-center justify-center">
                  <Layers className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/30">
                      {renderPlatformIcon(template.platform as keyof typeof platformIcons)}
                    </div>
                  </div>
                  <CardDescription>{template.platform} - {template.type}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{template.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">Dimensions: {template.dimensions}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="ghost" size="sm">Aperçu</Button>
                  <Button size="sm" className="flex items-center gap-1">
                    Utiliser
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Modèles par plateforme</h3>
            
            <Tabs defaultValue="lavuepayee">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="lavuepayee" className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                      alt="LVP" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  LAVUEPAYEE
                </TabsTrigger>
                <TabsTrigger value="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </TabsTrigger>
                <TabsTrigger value="google" className="flex items-center gap-2">
                  <Chrome className="h-4 w-4" />
                  Google
                </TabsTrigger>
                <TabsTrigger value="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube
                </TabsTrigger>
                <TabsTrigger value="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lavuepayee">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Bannière standard</CardTitle>
                      <CardDescription className="text-xs">728x90, 300x250, 160x600</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Interstitiel</CardTitle>
                      <CardDescription className="text-xs">Format plein écran</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Vidéo pré-visionnage</CardTitle>
                      <CardDescription className="text-xs">15-30 secondes</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="facebook">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Publication Feed</CardTitle>
                      <CardDescription className="text-xs">1200x628</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Carrousel</CardTitle>
                      <CardDescription className="text-xs">Jusqu'à 10 images/vidéos</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Stories</CardTitle>
                      <CardDescription className="text-xs">1080x1920</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="google">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Responsive Display</CardTitle>
                      <CardDescription className="text-xs">Formats multiples</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recherche</CardTitle>
                      <CardDescription className="text-xs">Texte uniquement</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Shopping</CardTitle>
                      <CardDescription className="text-xs">Produits e-commerce</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="youtube">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Pre-roll</CardTitle>
                      <CardDescription className="text-xs">Avant la vidéo</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">In-stream</CardTitle>
                      <CardDescription className="text-xs">Pendant la vidéo</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Bumper</CardTitle>
                      <CardDescription className="text-xs">6 secondes non-skipable</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="instagram">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Feed</CardTitle>
                      <CardDescription className="text-xs">1080x1080 carré</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Stories</CardTitle>
                      <CardDescription className="text-xs">1080x1920 plein écran</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Reels</CardTitle>
                      <CardDescription className="text-xs">Vidéo verticale courte</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-24 bg-secondary/20 flex items-center justify-center">
                        <Grid className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end p-3">
                      <Button size="sm">Utiliser</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4 p-4">
          <h2 className="text-2xl font-bold mb-4">Historique des campagnes</h2>
          
          <div className="space-y-6">
            {campaignHistory.map((campaign) => (
              <Card key={campaign.id} className={`overflow-hidden transition-all duration-300 ${selectedCampaign === campaign.id ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="cursor-pointer" onClick={() => handleCampaignSelect(campaign.id)}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {renderPlatformIcon(campaign.platform as keyof typeof platformIcons)}
                      {campaign.name}
                    </CardTitle>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Terminée
                    </span>
                  </div>
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
                          alt="LVP" 
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
                  <Label htmlFor="ad-budget">Budget (LVP)</Label>
                  <Input 
                    id="ad-budget"
                    type="number"
                    value={adBudget}
                    onChange={(e) => setAdBudget(e.target.value)}
                    placeholder="Entrez votre budget"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ad-platform">Plateforme</Label>
                  <Select defaultValue="lavuepayee">
                    <SelectTrigger id="ad-platform" className="mt-1">
                      <SelectValue placeholder="Sélectionnez une plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lavuepayee">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full flex items-center justify-center overflow-hidden">
                            <img 
                              src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                              alt="LVP" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          LAVUEPAYEE
                        </div>
                      </SelectItem>
                      <SelectItem value="facebook">
                        <div className="flex items-center gap-2">
                          <Facebook className="h-4 w-4 text-[#3b5998]" />
                          Facebook
                        </div>
                      </SelectItem>
                      <SelectItem value="google">
                        <div className="flex items-center gap-2">
                          <Chrome className="h-4 w-4 text-[#4285F4]" />
                          Google
                        </div>
                      </SelectItem>
                      <SelectItem value="youtube">
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-[#FF0000]" />
                          YouTube
                        </div>
                      </SelectItem>
                      <SelectItem value="instagram">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4 text-[#E1306C]" />
                          Instagram
                        </div>
                      </SelectItem>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Toutes les plateformes
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
