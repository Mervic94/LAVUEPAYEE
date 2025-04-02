
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './consumer/Overview';
import Packages from './consumer/Packages';
import Training from './consumer/Training';
import Certificates from './consumer/Certificates';

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
      price: '0 Vc',
      features: ['Accès aux publicités standard', 'Rémunération de base', 'Conversions LVP standards'],
      isActive: false
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      pointsMultiplier: 1.5,
      price: '14.3 Vc',
      features: ['Accès prioritaire aux publicités', '+50% de LVP par visionnage', 'Conversions LVP améliorées', 'Support premium'],
      isActive: false
    },
    {
      id: 'elite',
      name: 'Pack Élite',
      pointsMultiplier: 2,
      price: '28.6 Vc',
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
      completed: true,
      certificate: true
    },
    {
      id: 'course-2',
      title: 'Maximiser vos gains avec l\'affiliation',
      description: 'Découvrez les stratégies pour augmenter vos revenus grâce au programme d\'affiliation.',
      progress: 60,
      duration: '1h20',
      modules: 8,
      completed: false,
      certificate: false
    },
    {
      id: 'course-3',
      title: 'Stratégies avancées de monétisation',
      description: 'Apprenez à optimiser votre temps et maximiser vos gains sur la plateforme.',
      progress: 0,
      duration: '2h',
      modules: 10,
      completed: false,
      certificate: false
    },
    {
      id: 'course-4',
      title: 'Comprendre le marché publicitaire',
      description: 'Familiarisez-vous avec les différents types de publicités et leurs fonctionnements.',
      progress: 25,
      duration: '1h30',
      modules: 7,
      completed: false,
      certificate: false
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
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="packages">Packs LVP</TabsTrigger>
          <TabsTrigger value="training">Formation</TabsTrigger>
          <TabsTrigger value="certificates">Attestations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Overview stats={stats} mockAds={mockAds} adTypes={adTypes} />
        </TabsContent>
        
        <TabsContent value="packages">
          <Packages 
            packages={availablePackages}
            activePackage={activePackage}
            onPackageActivation={handlePackageActivation}
          />
        </TabsContent>
        
        <TabsContent value="training">
          <Training courses={trainingCourses} />
        </TabsContent>
        
        <TabsContent value="certificates">
          <Certificates courses={trainingCourses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsumerDashboard;
