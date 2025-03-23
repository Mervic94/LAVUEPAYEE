
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, Calendar, Clock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AdCard from '@/components/AdCard';
import PointsIndicator from '@/components/PointsIndicator';

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
  },
  {
    id: '4',
    title: 'Des cosmétiques naturels pour une peau parfaite',
    description: 'Ingrédients biologiques et formules sans produits chimiques nocifs.',
    thumbnail: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29zbWV0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    duration: 25,
    reward: 35
  },
  {
    id: '5',
    title: 'Abonnement streaming à prix réduit',
    description: 'Accédez à des milliers de films et séries en streaming HD pour un prix imbattable.',
    thumbnail: 'https://images.unsplash.com/photo-1522869635100-187f6605241d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWFtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    duration: 40,
    reward: 45
  },
  {
    id: '6',
    title: 'Révolutionnez votre cuisine avec ce robot multifonction',
    description: 'Préparez des repas délicieux en quelques minutes avec cet appareil innovant.',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2l0Y2hlbiUyMGFwcGxpYW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    duration: 55,
    reward: 65
  }
];

// Define predefined ad types to use
const adTypes: Array<"banner" | "interstitial" | "video" | "native" | "popup" | "audio"> = ['popup', 'audio', 'native'];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock statistics for the dashboard
  const stats = [
    { 
      title: 'Points gagnés', 
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
      icon: Clock
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 mx-auto max-w-7xl pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        
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
      </main>
    </div>
  );
};

export default Dashboard;
