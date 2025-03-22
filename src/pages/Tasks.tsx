
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, Lock, Star } from 'lucide-react';
import PointsIndicator from '@/components/PointsIndicator';

// Types for task packs
interface TaskPack {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

// Types for tasks
interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeRemaining: number | null; // in seconds, null if not started
  completed: boolean;
  locked: boolean;
  progress?: number; // 0-100
  requiredPack: 'standard' | 'premium' | 'elite';
}

// Mock data for task packs
const taskPacks: TaskPack[] = [
  {
    id: 'standard',
    name: 'Pack Standard',
    price: 5,
    description: 'Accès aux tâches quotidiennes',
    features: [
      'Tâches quotidiennes',
      'Jusqu\'à 500 LVP par jour',
      '3 tâches actives simultanées',
      'Support de base'
    ]
  },
  {
    id: 'premium',
    name: 'Pack Premium',
    price: 12,
    description: 'Accès aux tâches quotidiennes et hebdomadaires',
    features: [
      'Toutes les fonctionnalités du pack Standard',
      'Tâches hebdomadaires',
      'Jusqu\'à 2000 LVP par semaine',
      '5 tâches actives simultanées',
      'Support prioritaire'
    ],
    popular: true
  },
  {
    id: 'elite',
    name: 'Pack Elite',
    price: 25,
    description: 'Accès à toutes les tâches',
    features: [
      'Toutes les fonctionnalités du pack Premium',
      'Tâches mensuelles',
      'Jusqu\'à 10000 LVP par mois',
      'Tâches illimitées',
      'Support VIP',
      'Accès anticipé aux nouveaux produits'
    ]
  }
];

// Mock data for tasks
const dailyTasks: Task[] = [
  {
    id: 't1',
    title: 'Visionner 5 publicités',
    description: 'Visionnez 5 publicités pour recevoir une récompense bonus.',
    reward: 100,
    timeRemaining: 3600, // 1 hour
    completed: false,
    locked: false,
    progress: 60,
    requiredPack: 'standard'
  },
  {
    id: 't2',
    title: 'Partager sur les réseaux sociaux',
    description: 'Partagez LAVUEPAYEE sur un réseau social de votre choix.',
    reward: 50,
    timeRemaining: null,
    completed: true,
    locked: false,
    requiredPack: 'standard'
  },
  {
    id: 't3',
    title: 'Inviter un ami',
    description: 'Invitez un nouvel utilisateur à rejoindre la plateforme.',
    reward: 200,
    timeRemaining: null,
    completed: false,
    locked: false,
    requiredPack: 'standard'
  },
  {
    id: 't4',
    title: 'Visionner une publicité vidéo de 2 minutes',
    description: 'Visionnez une publicité vidéo longue pour un bonus spécial.',
    reward: 120,
    timeRemaining: null,
    completed: false,
    locked: false,
    requiredPack: 'standard'
  }
];

const weeklyTasks: Task[] = [
  {
    id: 'tw1',
    title: 'Visionner 30 publicités',
    description: 'Visionnez 30 publicités cette semaine pour recevoir une récompense importante.',
    reward: 500,
    timeRemaining: 259200, // 3 days
    completed: false,
    locked: false,
    progress: 70,
    requiredPack: 'premium'
  },
  {
    id: 'tw2',
    title: 'Parrainez 3 nouveaux utilisateurs',
    description: 'Parrainez 3 nouveaux utilisateurs cette semaine.',
    reward: 750,
    timeRemaining: null,
    completed: false,
    locked: false,
    progress: 33,
    requiredPack: 'premium'
  },
  {
    id: 'tw3',
    title: 'Visionner 10 publicités de Google',
    description: 'Visionnez 10 publicités provenant de Google cette semaine.',
    reward: 300,
    timeRemaining: null,
    completed: false,
    locked: true,
    requiredPack: 'premium'
  }
];

const monthlyTasks: Task[] = [
  {
    id: 'tm1',
    title: 'Visionner 100 publicités',
    description: 'Visionnez 100 publicités ce mois pour recevoir une récompense exceptionnelle.',
    reward: 2000,
    timeRemaining: 1209600, // 14 days
    completed: false,
    locked: false,
    progress: 45,
    requiredPack: 'elite'
  },
  {
    id: 'tm2',
    title: 'Parrainez 10 nouveaux utilisateurs',
    description: 'Parrainez 10 nouveaux utilisateurs ce mois-ci.',
    reward: 3000,
    timeRemaining: null,
    completed: false,
    locked: true,
    requiredPack: 'elite'
  },
  {
    id: 'tm3',
    title: 'Visionnez toutes les publicités Facebook',
    description: 'Visionnez toutes les publicités Facebook disponibles ce mois-ci.',
    reward: 1500,
    timeRemaining: null,
    completed: false,
    locked: true,
    requiredPack: 'elite'
  }
];

// Helper function to format time
const formatTimeRemaining = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

const Tasks = () => {
  const [activePack, setActivePack] = useState<string | null>('premium'); // Mock user has Premium pack
  
  const handleActivatePack = (packId: string) => {
    // In a real app, this would trigger a payment flow
    console.log('Activating pack:', packId);
    setActivePack(packId);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-6">Tâches</h1>
        
        {/* Task Packs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Packs disponibles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taskPacks.map((pack) => (
              <Card key={pack.id} className={`relative overflow-hidden ${pack.popular ? 'border-primary shadow-lg' : ''}`}>
                {pack.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                    Populaire
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle>{pack.name}</CardTitle>
                  <CardDescription>{pack.description}</CardDescription>
                  <div className="mt-4 text-3xl font-bold">
                    {pack.price} <span className="text-lg font-normal">Vc</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={activePack === pack.id ? "outline" : "default"}
                    onClick={() => handleActivatePack(pack.id)}
                    disabled={activePack === pack.id}
                  >
                    {activePack === pack.id ? 'Pack actif' : 'Activer ce pack'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Tasks Tabs */}
        <section>
          <Tabs defaultValue="daily">
            <TabsList className="mb-6">
              <TabsTrigger value="daily">Tâches quotidiennes</TabsTrigger>
              <TabsTrigger value="weekly" disabled={activePack === 'standard' || !activePack}>Tâches hebdomadaires</TabsTrigger>
              <TabsTrigger value="monthly" disabled={activePack !== 'elite'}>Tâches mensuelles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dailyTasks.map((task) => (
                  <Card key={task.id} className={`
                    ${task.completed ? 'bg-green-50 border-green-200' : ''} 
                    ${task.locked ? 'opacity-70' : ''}
                  `}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        {task.locked && <Lock className="h-5 w-5 text-foreground/40" />}
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      {task.progress !== undefined && !task.completed && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-foreground/60">Progression</span>
                            <span className="text-xs font-medium">{task.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <PointsIndicator points={task.reward} size="sm" />
                        
                        {task.timeRemaining && !task.completed && (
                          <div className="flex items-center gap-1 text-xs text-foreground/70">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatTimeRemaining(task.timeRemaining)}</span>
                          </div>
                        )}
                        
                        {task.completed && (
                          <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                            <Check className="h-4 w-4" />
                            Complété
                          </span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={task.completed ? "outline" : "default"}
                        disabled={task.completed || task.locked || (!activePack || (task.requiredPack === 'premium' && activePack === 'standard') || (task.requiredPack === 'elite' && activePack !== 'elite'))}
                      >
                        {task.completed 
                          ? 'Tâche complétée' 
                          : task.locked 
                            ? 'Débloquée prochainement' 
                            : task.timeRemaining 
                              ? 'Continuer la tâche' 
                              : 'Démarrer la tâche'
                        }
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklyTasks.map((task) => (
                  <Card key={task.id} className={`
                    ${task.completed ? 'bg-green-50 border-green-200' : ''} 
                    ${task.locked ? 'opacity-70' : ''}
                  `}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        {task.locked && <Lock className="h-5 w-5 text-foreground/40" />}
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      {task.progress !== undefined && !task.completed && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-foreground/60">Progression</span>
                            <span className="text-xs font-medium">{task.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <PointsIndicator points={task.reward} size="sm" />
                        
                        {task.timeRemaining && !task.completed && (
                          <div className="flex items-center gap-1 text-xs text-foreground/70">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatTimeRemaining(task.timeRemaining)}</span>
                          </div>
                        )}
                        
                        {task.completed && (
                          <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                            <Check className="h-4 w-4" />
                            Complété
                          </span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={task.completed ? "outline" : "default"}
                        disabled={task.completed || task.locked || activePack === 'standard' || !activePack}
                      >
                        {task.completed 
                          ? 'Tâche complétée' 
                          : task.locked 
                            ? 'Débloquée prochainement' 
                            : task.timeRemaining 
                              ? 'Continuer la tâche' 
                              : 'Démarrer la tâche'
                        }
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthlyTasks.map((task) => (
                  <Card key={task.id} className={`
                    ${task.completed ? 'bg-green-50 border-green-200' : ''} 
                    ${task.locked ? 'opacity-70' : ''}
                  `}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        {task.locked && <Lock className="h-5 w-5 text-foreground/40" />}
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      {task.progress !== undefined && !task.completed && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-foreground/60">Progression</span>
                            <span className="text-xs font-medium">{task.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <PointsIndicator points={task.reward} size="sm" />
                        
                        {task.timeRemaining && !task.completed && (
                          <div className="flex items-center gap-1 text-xs text-foreground/70">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatTimeRemaining(task.timeRemaining)}</span>
                          </div>
                        )}
                        
                        {task.completed && (
                          <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                            <Check className="h-4 w-4" />
                            Complété
                          </span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={task.completed ? "outline" : "default"}
                        disabled={task.completed || task.locked || activePack !== 'elite'}
                      >
                        {task.completed 
                          ? 'Tâche complétée' 
                          : task.locked 
                            ? 'Débloquée prochainement' 
                            : task.timeRemaining 
                              ? 'Continuer la tâche' 
                              : 'Démarrer la tâche'
                        }
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Tasks;
