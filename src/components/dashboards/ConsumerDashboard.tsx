
import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Calendar, Clock, Users, Star, BookOpen } from 'lucide-react';
import AdCard from '@/components/AdCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ConsumerDashboardProps {
  stats: Array<{
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: any;
  }>;
  mockAds: Array<{
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    reward: number;
    adType?: "banner" | "interstitial" | "video" | "native" | "popup" | "audio";
  }>;
  adTypes: Array<"banner" | "interstitial" | "video" | "native" | "popup" | "audio">;
}

const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ stats, mockAds, adTypes }) => {
  const [activePackage, setActivePackage] = useState<string | null>(null);
  
  // Mock data for available packages
  const availablePackages = [
    {
      id: 'basic',
      name: 'Pack Basique',
      pointsMultiplier: 1,
      price: 'Gratuit',
      features: ['Accès aux publicités standard', 'Rémunération de base', 'Conversions LVP standards'],
      isActive: false
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      pointsMultiplier: 1.5,
      price: '9.99€/mois',
      features: ['Accès prioritaire aux publicités', '+50% de LVP par visionnage', 'Conversions LVP améliorées', 'Support premium'],
      isActive: false
    },
    {
      id: 'elite',
      name: 'Pack Élite',
      pointsMultiplier: 2,
      price: '19.99€/mois',
      features: ['Accès exclusif à toutes les publicités', 'Double LVP par visionnage', 'Taux de conversion LVP maximum', 'Support prioritaire 24/7', 'Accès aux offres spéciales'],
      isActive: false
    }
  ];
  
  // Mock data for training courses
  const trainingCourses = [
    {
      id: 'course-1',
      title: 'Les bases de LAVUEPAYEE',
      description: 'Apprenez comment fonctionne la plateforme et comment gagner vos premiers LVP.',
      progress: 100,
      duration: '45 min',
      modules: 5,
      completed: true
    },
    {
      id: 'course-2',
      title: 'Maximiser vos gains avec l\'affiliation',
      description: 'Découvrez les stratégies pour augmenter vos revenus grâce au programme d\'affiliation.',
      progress: 60,
      duration: '1h20',
      modules: 8,
      completed: false
    },
    {
      id: 'course-3',
      title: 'Stratégies avancées de monétisation',
      description: 'Apprenez à optimiser votre temps et maximiser vos gains sur la plateforme.',
      progress: 0,
      duration: '2h',
      modules: 10,
      completed: false
    },
    {
      id: 'course-4',
      title: 'Comprendre le marché publicitaire',
      description: 'Familiarisez-vous avec les différents types de publicités et leurs fonctionnements.',
      progress: 25,
      duration: '1h30',
      modules: 7,
      completed: false
    }
  ];
  
  const handlePackageActivation = (packageId: string) => {
    if (activePackage === packageId) {
      setActivePackage(null);
    } else {
      setActivePackage(packageId);
    }
  };
  
  return (
    <div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="packages">Packs LVP</TabsTrigger>
          <TabsTrigger value="training">Formation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <div className={`flex items-center mt-2 text-xs font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {typeof stat.icon === 'function' 
                      ? <stat.icon />
                      : React.createElement(stat.icon, { className: "h-5 w-5 text-primary" })
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recommended Ads */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Publicités recommandées</h2>
              <button 
                onClick={() => {}}
                className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm font-medium"
              >
                Voir tout
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAds.slice(0, 3).map((ad) => (
                <AdCard key={ad.id} {...ad} />
              ))}
            </div>
          </div>
          
          {/* Latest Ads */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Dernières publicités</h2>
              <button 
                onClick={() => {}}
                className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm font-medium"
              >
                Voir tout
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAds.slice(3, 6).map((ad, index) => (
                <AdCard 
                  key={ad.id} 
                  {...ad} 
                  adType={adTypes[index % adTypes.length]} 
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Packs de visionnage</h2>
            <p className="text-sm text-muted-foreground">Améliorez vos gains en activant un pack premium</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`overflow-hidden transition-all ${
                  activePackage === pkg.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription>Multiplicateur de LVP: x{pkg.pointsMultiplier}</CardDescription>
                    </div>
                    {pkg.id !== 'basic' && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        {pkg.id === 'premium' ? 'POPULAIRE' : 'EXCLUSIF'}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold">{pkg.price}</div>
                  
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Star className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full"
                    variant={activePackage === pkg.id ? "secondary" : "default"}
                    onClick={() => handlePackageActivation(pkg.id)}
                  >
                    {activePackage === pkg.id ? 'Désactiver' : 'Activer'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Informations sur les packs</CardTitle>
              <CardDescription>Choisissez le pack qui vous convient le mieux</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Les packs vous permettent d'augmenter vos gains sur LAVUEPAYEE. Vous ne pouvez activer qu'un seul pack à la fois.
                </p>
                
                <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                  <h4 className="font-medium flex items-center mb-2">
                    <Star className="h-4 w-4 text-amber-500 mr-2" />
                    Bon à savoir
                  </h4>
                  <p className="text-sm">
                    Le multiplicateur de LVP s'applique à tous les LVP gagnés par visionnage de publicités. 
                    Plus votre multiplicateur est élevé, plus vos gains seront importants !
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Formation en ligne</h2>
            <Button className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Tous les cours
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {course.title}
                      {course.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Complété
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{course.progress}% complété</span>
                    <span className="text-muted-foreground">{course.duration} · {course.modules} modules</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  
                  <div className="pt-2">
                    <Button 
                      variant={course.progress > 0 && !course.completed ? "default" : "outline"}
                      className="w-full"
                    >
                      {course.progress === 0 ? 'Commencer' : course.completed ? 'Revoir' : 'Continuer'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Pourquoi suivre nos formations ?</CardTitle>
              <CardDescription>Apprenez à maximiser vos gains sur LAVUEPAYEE</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-secondary/10">
                  <h3 className="font-medium flex items-center mb-2">
                    <Star className="h-4 w-4 text-primary mr-2" />
                    Augmentez vos gains
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Découvrez des astuces pour optimiser votre temps sur la plateforme et maximiser vos revenus.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border bg-secondary/10">
                  <h3 className="font-medium flex items-center mb-2">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    Développez votre réseau
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Apprenez les meilleures pratiques pour développer votre réseau d'affiliés et booster vos commissions.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border bg-secondary/10">
                  <h3 className="font-medium flex items-center mb-2">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    À votre rythme
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Suivez les formations quand vous le souhaitez et reprenez là où vous vous étiez arrêté.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsumerDashboard;
