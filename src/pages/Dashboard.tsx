
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, Calendar, Clock, Users, User, UserCog, Store, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/navbar';
import AdCard from '@/components/AdCard';
import PointsIndicator from '@/components/PointsIndicator';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import AdvertiserDashboard from '@/components/dashboards/AdvertiserDashboard';
import ConsumerDashboard from '@/components/dashboards/ConsumerDashboard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for ads
const mockAds = [
  {
    id: '1',
    title: 'Nouvelle collection de vêtements écologiques',
    description: 'Découvrez notre nouvelle gamme de vêtements fabriqués à partir de matériaux recyclés.',
    thumbnail: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    duration: 45,
    reward: 50
  },
  {
    id: '2',
    title: 'Découvrez notre nouvelle gamme de smartphones',
    description: 'Des performances exceptionnelles dans un design élégant, avec une autonomie incroyable.',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    duration: 60,
    reward: 75
  },
  {
    id: '3',
    title: 'Voyagez plus loin pour moins cher',
    description: 'Profitez de nos offres spéciales sur les vols internationaux et découvrez le monde.',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    duration: 30,
    reward: 40
  }
];

const adTypes: Array<"banner" | "interstitial" | "video" | "native" | "popup" | "audio"> = ['popup', 'audio', 'native'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'admin' | 'advertiser' | 'consumer'>('consumer');
  
  // Quick actions based on user role
  const quickActions = [
    {
      title: 'Voir les tâches',
      description: 'Gérez vos tâches en cours',
      action: () => navigate('/tasks'),
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'Marketplace',
      description: 'Découvrez les offres',
      action: () => navigate('/marketplace'),
      icon: Store,
      color: 'bg-green-500'
    },
    {
      title: 'Mon portefeuille',
      description: 'Gérez vos gains',
      action: () => navigate('/wallet'),
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Parrainage',
      description: 'Invitez des amis',
      action: () => navigate('/affiliates'),
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  // Mock statistics for the dashboard
  const stats = [
    { 
      title: 'LVP gagnés', 
      value: '1,250', 
      change: '+125 aujourd\'hui', 
      positive: true,
      icon: () => (
        <div className="h-5 w-5 flex items-center justify-center">
          <img 
            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
            alt="LVP" 
            className="w-full h-full object-contain"
          />
        </div>
      )
    },
    { 
      title: 'Publicités visionnées', 
      value: '28', 
      change: '+3 cette semaine', 
      positive: true,
      icon: Eye
    },
    { 
      title: 'Temps total', 
      value: '210 min', 
      change: '+15 min aujourd\'hui', 
      positive: true,
      icon: Calendar
    },
    { 
      title: 'Affiliés', 
      value: '12', 
      change: '+2 ce mois', 
      positive: true,
      icon: Users
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
              <p className="text-muted-foreground">Bienvenue sur LAVUEPAYEE ! Voici un aperçu de votre activité.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/marketplace')} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle tâche
              </Button>
              <Button onClick={() => navigate('/analytics')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytiques
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Display appropriate dashboard based on user role */}
          {userRole === 'admin' && <AdminDashboard />}
          {userRole === 'advertiser' && <AdvertiserDashboard />}
          {userRole === 'consumer' && <ConsumerDashboard stats={stats} mockAds={mockAds} adTypes={adTypes} />}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
