
import React, { useState } from 'react';
import { Check, Clock, ArrowUp, BarChart, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PointsIndicator from '@/components/PointsIndicator';

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  deadline: string;
  completed: boolean;
  source?: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'standard';
  difficulty: 'easy' | 'medium' | 'hard';
  taskType: 'daily' | 'weekly' | 'monthly';
}

interface AutoTaskAssignerProps {
  userPackage: string | null;
}

const AutoTaskAssigner: React.FC<AutoTaskAssignerProps> = ({ userPackage }) => {
  // Task templates that would be assigned based on user package
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([
    {
      id: 'task-fb-1',
      title: "Interagir avec 3 publicités Facebook",
      description: "Visionnez et interagissez avec 3 publicités Facebook complètes",
      reward: 200,
      progress: 1,
      total: 3,
      deadline: "Aujourd'hui, 23:59",
      completed: false,
      source: 'facebook',
      difficulty: 'easy',
      taskType: 'daily',
    },
    {
      id: 'task-ig-1',
      title: "Regarder 5 publicités Instagram",
      description: "Visionnez 5 publicités Instagram complètes",
      reward: 250,
      progress: 0,
      total: 5,
      deadline: "Aujourd'hui, 23:59",
      completed: false,
      source: 'instagram',
      difficulty: 'medium',
      taskType: 'daily',
    },
    {
      id: 'task-tw-1',
      title: "Engager avec 4 publicités Twitter",
      description: "Visionnez et engagez avec 4 publicités Twitter",
      reward: 180,
      progress: 2,
      total: 4,
      deadline: "Dim, 23:59",
      completed: false,
      source: 'twitter',
      difficulty: 'medium',
      taskType: 'weekly',
    },
    {
      id: 'task-li-1',
      title: "Visiter 3 sites professionnels depuis LinkedIn",
      description: "Suivez les liens publicitaires de 3 sites professionnels depuis LinkedIn",
      reward: 300,
      progress: 0,
      total: 3,
      deadline: "30 jours restants",
      completed: false,
      source: 'linkedin',
      difficulty: 'hard',
      taskType: 'monthly',
    },
    {
      id: 'task-mix-1',
      title: "Comparer 10 publicités cross-platform",
      description: "Analysez et comparez 10 publicités de différentes plateformes",
      reward: 500,
      progress: 0,
      total: 10,
      deadline: "30 jours restants",
      completed: false,
      difficulty: 'hard',
      taskType: 'monthly',
    },
  ]);

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case 'facebook':
        return <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">f</div>;
      case 'instagram':
        return <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">i</div>;
      case 'twitter':
        return <div className="h-5 w-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold">t</div>;
      case 'linkedin':
        return <div className="h-5 w-5 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-bold">in</div>;
      default:
        return <Target className="h-5 w-5 text-primary" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTasksByType = (type: 'daily' | 'weekly' | 'monthly') => {
    return assignedTasks.filter(task => task.taskType === type);
  };

  const renderTaskCard = (task: Task) => {
    const progressPercent = (task.progress / task.total) * 100;
    
    return (
      <Card key={task.id} className={`overflow-hidden transition-all ${task.completed ? 'bg-green-50' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              {getSourceIcon(task.source)}
              <CardTitle className="text-lg">{task.title}</CardTitle>
            </div>
            <PointsIndicator points={task.reward} size="sm" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <Badge variant="outline" className={`${getDifficultyColor(task.difficulty)}`}>
              {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progression: {task.progress}/{task.total}</span>
            <span className={task.completed ? 'text-green-600' : 'text-foreground/60'}>
              {task.completed ? 'Complété' : task.deadline}
            </span>
          </div>
          <Progress value={progressPercent} className={`h-2 ${task.completed ? 'bg-green-100' : ''}`} />
          
          <div className="mt-4">
            {task.completed ? (
              <Button variant="outline" className="w-full" disabled>
                <Check className="h-4 w-4 mr-2" />
                Complété
              </Button>
            ) : (
              <Button className="w-full">
                {task.progress > 0 ? 'Continuer' : 'Commencer'}
                <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tâches automatiques</h2>
          <p className="text-muted-foreground">
            Ces tâches sont automatiquement générées en fonction de votre pack {userPackage} et des réseaux sociaux connectés
          </p>
        </div>
        
        <Button variant="outline">
          <BarChart className="h-4 w-4 mr-2" />
          Voir les statistiques
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> 
                Quotidiennes
              </CardTitle>
              <Badge className="bg-green-600">{getTasksByType('daily').length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTasksByType('daily').length > 0 ? (
                getTasksByType('daily').map(renderTaskCard)
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p>Aucune tâche quotidienne disponible actuellement</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" /> 
                Hebdomadaires
              </CardTitle>
              <Badge className="bg-amber-500">{getTasksByType('weekly').length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTasksByType('weekly').length > 0 ? (
                getTasksByType('weekly').map(renderTaskCard)
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p>Aucune tâche hebdomadaire disponible actuellement</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" /> 
                Mensuelles
              </CardTitle>
              <Badge className="bg-blue-600">{getTasksByType('monthly').length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTasksByType('monthly').length > 0 ? (
                getTasksByType('monthly').map(renderTaskCard)
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p>Aucune tâche mensuelle disponible actuellement</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuration des tâches automatiques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Préférences de contenu</p>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez les catégories de contenu qui vous intéressent
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configurer</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Plages horaires</p>
                <p className="text-sm text-muted-foreground">
                  Définissez vos heures préférées pour recevoir des tâches
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configurer</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Difficulté des tâches</p>
                <p className="text-sm text-muted-foreground">
                  Ajustez le niveau de difficulté des tâches automatiques
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configurer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoTaskAssigner;
