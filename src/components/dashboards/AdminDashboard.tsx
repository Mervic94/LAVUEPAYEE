
import React, { useState } from 'react';
import { 
  Users, TrendingUp, BarChart2, DollarSign, Calendar, 
  Facebook, Youtube, Globe, MessageSquare, PieChart,
  Search, Download, Filter, MoreHorizontal, ChevronDown, Check,
  UserCog, Settings, Shield, BadgeAlert, Server, Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  BarChart, LineChart, PieChart as PieChartComponent 
} from '@/components/ui/chart';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for charts
  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Revenus',
        data: [12500, 15000, 18000, 16000, 21000, 22000, 24000, 27000, 25000, 28000, 30000, 32000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      }
    ],
  };
  
  const userGrowthData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Nouveaux utilisateurs',
        data: [120, 150, 180, 210, 250, 280, 320, 350, 380, 410, 450, 500],
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.5)',
      }
    ],
  };
  
  const adTypeData = {
    labels: ['Bannière', 'Vidéo', 'Native', 'Popup', 'Audio', 'Interstitiel'],
    datasets: [
      {
        label: 'Distribution par type',
        data: [35, 25, 15, 10, 10, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(52, 211, 153, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(168, 85, 247, 0.7)'
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(52, 211, 153)',
          'rgb(249, 115, 22)',
          'rgb(236, 72, 153)',
          'rgb(14, 165, 233)',
          'rgb(168, 85, 247)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const platformDistribution = {
    labels: ['LAVUEPAYEE', 'Facebook', 'Google', 'YouTube', 'Instagram', 'Autres'],
    datasets: [
      {
        label: 'Distribution par plateforme',
        data: [40, 25, 15, 10, 5, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(59, 89, 152, 0.7)',
          'rgba(66, 133, 244, 0.7)',
          'rgba(255, 0, 0, 0.7)',
          'rgba(225, 48, 108, 0.7)',
          'rgba(160, 160, 160, 0.7)'
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(59, 89, 152)',
          'rgb(66, 133, 244)',
          'rgb(255, 0, 0)',
          'rgb(225, 48, 108)',
          'rgb(160, 160, 160)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Mock users for CRM
  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com', role: 'Consommateur', status: 'Actif', registered: '12/04/2023', lvpBalance: 345, adsViewed: 28 },
    { id: 2, name: 'Marie Laurent', email: 'marie.laurent@example.com', role: 'Annonceur', status: 'Actif', registered: '15/03/2023', lvpBalance: 1240, adsViewed: 0 },
    { id: 3, name: 'Thomas Bernard', email: 'thomas.bernard@example.com', role: 'Consommateur', status: 'Inactif', registered: '23/05/2023', lvpBalance: 121, adsViewed: 12 },
    { id: 4, name: 'Sophie Martin', email: 'sophie.martin@example.com', role: 'Consommateur', status: 'Actif', registered: '08/01/2023', lvpBalance: 890, adsViewed: 67 },
    { id: 5, name: 'Entreprise XYZ', email: 'contact@xyz.com', role: 'Annonceur', status: 'Actif', registered: '10/02/2023', lvpBalance: 5600, adsViewed: 0 },
  ];
  
  // Mock campaigns for CRM
  const campaigns = [
    { id: 1, name: 'Promo Été 2023', advertiser: 'Entreprise XYZ', platform: 'LAVUEPAYEE', type: 'Vidéo', status: 'Active', budget: '5000 LVP', impressions: 12500, clicks: 820 },
    { id: 2, name: 'Nouveaux Produits', advertiser: 'Marie Laurent', platform: 'Facebook', type: 'Bannière', status: 'Active', budget: '3500 LVP', impressions: 8700, clicks: 540 },
    { id: 3, name: 'Grande Ouverture', advertiser: 'Commerce ABC', platform: 'Google', type: 'Native', status: 'Planifiée', budget: '7200 LVP', impressions: 0, clicks: 0 },
    { id: 4, name: 'Soldes Hiver', advertiser: 'Entreprise XYZ', platform: 'YouTube', type: 'Vidéo', status: 'Terminée', budget: '4800 LVP', impressions: 15200, clicks: 1150 },
    { id: 5, name: 'App Mobile', advertiser: 'Tech Solutions', platform: 'Instagram', type: 'Interstitiel', status: 'Active', budget: '6300 LVP', impressions: 9100, clicks: 720 },
  ];
  
  // Mock transactions for CRM
  const transactions = [
    { id: 1, date: '15/11/2023', user: 'Jean Dupont', type: 'Conversion LVP', amount: '250 LVP', status: 'Approuvée' },
    { id: 2, date: '14/11/2023', user: 'Entreprise XYZ', type: 'Achat Campagne', amount: '5000 LVP', status: 'Complétée' },
    { id: 3, date: '12/11/2023', user: 'Sophie Martin', type: 'Retrait', amount: '100 LVP', status: 'En traitement' },
    { id: 4, date: '10/11/2023', user: 'Thomas Bernard', type: 'Visionnage Publicité', amount: '10 LVP', status: 'Complétée' },
    { id: 5, date: '08/11/2023', user: 'Marie Laurent', type: 'Achat Campagne', amount: '3500 LVP', status: 'Complétée' },
  ];
  
  const systemStats = [
    { name: 'Utilisateurs en ligne', value: '247', change: '+12%', icon: Users },
    { name: 'Serveurs actifs', value: '8/8', change: '99.9% uptime', icon: Server },
    { name: 'Base de données', value: 'Opérationnelle', change: '32ms ping', icon: Database },
    { name: 'Alertes système', value: '0', change: 'Aucune alerte', icon: BadgeAlert },
  ];

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,854</div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">+12%</span> ce mois
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-primary" />
                  Revenus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">84,250€</div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">+8%</span> ce mois
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                  LVP en circulation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,253,420</div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">+15%</span> ce mois
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Campagnes actives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">43</div>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">+5</span> cette semaine
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Croissance des utilisateurs</CardTitle>
                <CardDescription>Nouveaux utilisateurs par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={userGrowthData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }} 
                  className="aspect-[2/1]"
                />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenus mensuels</CardTitle>
                <CardDescription>Évolution sur l'année</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart 
                  data={revenueData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }} 
                  className="aspect-[2/1]"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Types de publicités</CardTitle>
                <CardDescription>Distribution par format</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartComponent 
                  data={adTypeData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }} 
                  className="aspect-[2/1]"
                />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Distribution par plateforme</CardTitle>
                <CardDescription>Répartition des campagnes</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartComponent 
                  data={platformDistribution} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }} 
                  className="aspect-[2/1]"
                />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des plateformes intégrées</CardTitle>
              <CardDescription>Performance des campagnes par plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 border rounded-lg gap-4">
                  <div className="p-2 bg-[#3b5998]/10 rounded-full">
                    <Facebook className="h-8 w-8 text-[#3b5998]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Facebook Ads</p>
                    <p className="text-2xl font-bold">12,840</p>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg gap-4">
                  <div className="p-2 bg-[#FF0000]/10 rounded-full">
                    <Youtube className="h-8 w-8 text-[#FF0000]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">YouTube Ads</p>
                    <p className="text-2xl font-bold">8,320</p>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-lg gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Google Ads</p>
                    <p className="text-2xl font-bold">15,460</p>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="consumer">Consommateurs</SelectItem>
                  <SelectItem value="advertiser">Annonceurs</SelectItem>
                  <SelectItem value="admin">Administrateurs</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                Ajouter
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead>Solde LVP</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          user.role === 'Annonceur' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${
                          user.status === 'Actif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.registered}</TableCell>
                      <TableCell>{user.lvpBalance}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <UserCog className="h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Contacter
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Shield className="h-4 w-4" />
                              Suspendre
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Affichage de 1 à 5 sur 3,854 utilisateurs</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px] bg-primary/10">1</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px]">2</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px]">3</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Gestion des campagnes</h2>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button>
                Ajouter
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom de campagne</TableHead>
                    <TableHead>Annonceur</TableHead>
                    <TableHead>Plateforme</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.id}</TableCell>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.advertiser}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {campaign.platform === 'Facebook' && <Facebook className="h-4 w-4 mr-2 text-[#3b5998]" />}
                          {campaign.platform === 'YouTube' && <Youtube className="h-4 w-4 mr-2 text-[#FF0000]" />}
                          {campaign.platform === 'Google' && <Globe className="h-4 w-4 mr-2 text-[#4285F4]" />}
                          {campaign.platform === 'LAVUEPAYEE' && (
                            <div className="h-4 w-4 mr-2 rounded-full flex items-center justify-center overflow-hidden">
                              <img 
                                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                                alt="LVP" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          {campaign.platform}
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          campaign.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : campaign.status === 'Terminée'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.budget}</TableCell>
                      <TableCell>{new Intl.NumberFormat('fr-FR').format(campaign.impressions)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Settings className="h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <PieChart className="h-4 w-4" />
                              Statistiques
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Shield className="h-4 w-4" />
                              Désactiver
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Affichage de 1 à 5 sur 43 campagnes</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px] bg-primary/10">1</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px]">2</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px]">3</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Historique des transactions</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="conversion">Conversion LVP</SelectItem>
                  <SelectItem value="campaign">Achat Campagne</SelectItem>
                  <SelectItem value="withdrawal">Retrait</SelectItem>
                  <SelectItem value="viewing">Visionnage Publicité</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Rechercher..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.user}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          transaction.status === 'Complétée' 
                            ? 'bg-green-100 text-green-800' 
                            : transaction.status === 'En traitement'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Settings className="h-4 w-4" />
                              Détails
                            </DropdownMenuItem>
                            {transaction.status === 'En traitement' && (
                              <>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Check className="h-4 w-4" />
                                  Approuver
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <Shield className="h-4 w-4" />
                                  Rejeter
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Affichage de 1 à 5 sur 842 transactions</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px] bg-primary/10">1</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px]">2</Button>
              <Button variant="outline" size="sm" className="px-3 min-w-[40px]">3</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Administration Système</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </Button>
              <Button className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Sécurité
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {systemStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <stat.icon className="h-4 w-4 mr-2 text-primary" />
                    {stat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Intégrations des plateformes</CardTitle>
                <CardDescription>Statut des connexions API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#3b5998]/10 rounded-full">
                      <Facebook className="h-5 w-5 text-[#3b5998]" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook Ads API</p>
                      <p className="text-xs text-muted-foreground">Dernière synchronisation: il y a 5 minutes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4285F4]/10 rounded-full">
                      <Globe className="h-5 w-5 text-[#4285F4]" />
                    </div>
                    <div>
                      <p className="font-medium">Google Ads API</p>
                      <p className="text-xs text-muted-foreground">Dernière synchronisation: il y a 12 minutes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF0000]/10 rounded-full">
                      <Youtube className="h-5 w-5 text-[#FF0000]" />
                    </div>
                    <div>
                      <p className="font-medium">YouTube Ads API</p>
                      <p className="text-xs text-muted-foreground">Dernière synchronisation: il y a 8 minutes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#E1306C]/10 rounded-full">
                      <div className="h-5 w-5 text-[#E1306C]">I</div>
                    </div>
                    <div>
                      <p className="font-medium">Instagram Ads API</p>
                      <p className="text-xs text-muted-foreground">Dernière synchronisation: il y a 15 minutes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Logs système</CardTitle>
                <CardDescription>Dernières activités enregistrées</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] overflow-y-auto">
                <div className="space-y-2 text-sm font-mono">
                  <div>
                    <span className="text-blue-500">[INFO]</span> <span className="text-gray-500">2023-11-15 15:43:22</span> - Synchronisation des campagnes Facebook terminée avec succès
                  </div>
                  <div>
                    <span className="text-green-500">[SUCCESS]</span> <span className="text-gray-500">2023-11-15 15:42:10</span> - Paiement traité pour l'utilisateur #2458 (250 LVP)
                  </div>
                  <div>
                    <span className="text-blue-500">[INFO]</span> <span className="text-gray-500">2023-11-15 15:40:05</span> - Début de la synchronisation des campagnes Facebook
                  </div>
                  <div>
                    <span className="text-amber-500">[WARNING]</span> <span className="text-gray-500">2023-11-15 15:38:14</span> - Tentative de connexion échouée pour l'utilisateur admin@lavuepayee.com
                  </div>
                  <div>
                    <span className="text-blue-500">[INFO]</span> <span className="text-gray-500">2023-11-15 15:35:42</span> - Synchronisation des campagnes Google terminée avec succès
                  </div>
                  <div>
                    <span className="text-blue-500">[INFO]</span> <span className="text-gray-500">2023-11-15 15:33:17</span> - Début de la synchronisation des campagnes Google
                  </div>
                  <div>
                    <span className="text-green-500">[SUCCESS]</span> <span className="text-gray-500">2023-11-15 15:30:22</span> - Nouvel utilisateur enregistré: marie.dupont@example.com
                  </div>
                  <div>
                    <span className="text-red-500">[ERROR]</span> <span className="text-gray-500">2023-11-15 15:28:05</span> - Échec de traitement de la transaction #4582 - Solde insuffisant
                  </div>
                  <div>
                    <span className="text-blue-500">[INFO]</span> <span className="text-gray-500">2023-11-15 15:25:18</span> - Synchronisation des campagnes YouTube terminée avec succès
                  </div>
                  <div>
                    <span className="text-blue-500">[INFO]</span> <span className="text-gray-500">2023-11-15 15:23:45</span> - Début de la synchronisation des campagnes YouTube
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Configuration du serveur</CardTitle>
              <CardDescription>Paramètres et performances du système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Ressources système</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">CPU</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Mémoire</span>
                        <span className="text-sm text-muted-foreground">3.2 GB / 8 GB</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Stockage</span>
                        <span className="text-sm text-muted-foreground">145 GB / 500 GB</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '29%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Bande passante</span>
                        <span className="text-sm text-muted-foreground">120 Mbps / 1 Gbps</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Actions rapides</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <DollarSign className="h-4 w-4" />
                      Taux de conversion LVP
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Database className="h-4 w-4" />
                      Sauvegarde de la base
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Server className="h-4 w-4" />
                      État des serveurs
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Shield className="h-4 w-4" />
                      Sécurité du système
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Settings className="h-4 w-4" />
                      Configuration API
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 justify-start">
                      <Users className="h-4 w-4" />
                      Gestion des rôles
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
