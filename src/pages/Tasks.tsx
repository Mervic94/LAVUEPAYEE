
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Calendar, Timer, ArrowRight, Gift, Clock, CalendarDays, CalendarClock, BarChart3 } from 'lucide-react';
import PointsIndicator from '@/components/PointsIndicator';
import OnlineTraining from '@/components/OnlineTraining';
import TaskPackages from '@/components/TaskPackages';
import AutoTaskAssigner from '@/components/dashboards/consumer/AutoTaskAssigner';

const Tasks = () => {
  const [activePackage, setActivePackage] = useState<string | null>('premium');
  
  // Mock user data
  const userLevel = 2;
  const userPoints = 3500;
  
  // Mock tasks data
  const dailyTasks = [
    {
      id: 'd1',
      title: "Regarder 5 publicités vidéo",
      description: "Visionnez 5 publicités vidéo complètes",
      reward: 150,
      progress: 3,
      total: 5,
      deadline: "Aujourd'hui, 23:59",
      completed: false
    },
    {
      id: 'd2',
      title: "Partager votre lien d'affiliation",
      description: "Partagez votre lien sur un réseau social",
      reward: 75,
      progress: 1,
      total: 1,
      deadline: "Aujourd'hui, 23:59",
      completed: true
    },
    {
      id: 'd3',
      title: "Mettre à jour votre profil",
      description: "Complétez toutes les informations de votre profil",
      reward: 100,
      progress: 0,
      total: 1,
      deadline: "Aujourd'hui, 23:59",
      completed: false
    }
  ];
  
  const weeklyTasks = [
    {
      id: 'w1',
      title: "Inviter un nouvel affilié",
      description: "Invitez un nouvel utilisateur qui s'inscrit avec votre code",
      reward: 350,
      progress: 0,
      total: 1,
      deadline: "Dim, 23:59",
      completed: false
    },
    {
      id: 'w2',
      title: "Regarder 25 publicités",
      description: "Visionnez un total de 25 publicités cette semaine",
      reward: 300,
      progress: 12,
      total: 25,
      deadline: "Dim, 23:59",
      completed: false
    }
  ];
  
  const monthlyTasks = [
    {
      id: 'm1',
      title: "Compléter une formation",
      description: "Terminez une formation en ligne complète",
      reward: 750,
      progress: 0,
      total: 1,
      deadline: "30 jours restants",
      completed: false
    }
  ];
  
  // Render task card
  const renderTaskCard = (task: typeof dailyTasks[0]) => {
    const progressPercent = (task.progress / task.total) * 100;
    
    return (
      <Card key={task.id} className={`overflow-hidden transition-all ${task.completed ? 'bg-green-50' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <PointsIndicator points={task.reward} size="sm" />
          </div>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Progression: {task.progress}/{task.total}</span>
            <span className={task.completed ? 'text-green-600' : 'text-foreground/60'}>
              {task.completed ? 'Complété' : task.deadline}
            </span>
          </div>
          <Progress value={progressPercent} className={`h-2 ${task.completed ? 'bg-green-100' : ''}`} />
        </CardContent>
        
        <CardFooter>
          {task.completed ? (
            <Button variant="outline" className="w-full" disabled>
              <Check className="h-4 w-4 mr-2" />
              Complété
            </Button>
          ) : (
            <Button className="w-full">
              Commencer
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">Missions & Tâches</h1>
        <p className="text-foreground/60 mb-8">
          Complétez des tâches pour gagner des points et débloquer des récompenses
        </p>
        
        {activePackage ? (
          <div className="space-y-10">
            <div className="glass-card rounded-xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Pack Premium Actif</h2>
                <p className="text-foreground/60">
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    Expire dans 23 jours
                  </span>
                </p>
              </div>
              <Button variant="outline">Renouveler</Button>
            </div>
            
            <Tabs defaultValue="auto" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="auto" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Auto-Tâches
                </TabsTrigger>
                <TabsTrigger value="daily" className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Quotidiennes
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Hebdomadaires
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Mensuelles
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="auto">
                <AutoTaskAssigner userPackage={activePackage} />
              </TabsContent>
              
              <TabsContent value="daily">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dailyTasks.map(renderTaskCard)}
                </div>
              </TabsContent>
              
              <TabsContent value="weekly">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {weeklyTasks.map(renderTaskCard)}
                </div>
              </TabsContent>
              
              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {monthlyTasks.map(renderTaskCard)}
                </div>
              </TabsContent>
            </Tabs>
            
            <OnlineTraining userLevel={userLevel} userPoints={userPoints} />
          </div>
        ) : (
          <TaskPackages />
        )}
      </main>
    </div>
  );
};

export default Tasks;
