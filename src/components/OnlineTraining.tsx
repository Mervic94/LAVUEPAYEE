
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle, CheckCircle, Lock, Award } from "lucide-react";

export interface OnlineTrainingProps {
  userPoints?: number;
  userLevel?: number;
}

const OnlineTraining: React.FC<OnlineTrainingProps> = ({ 
  userPoints = 0,
  userLevel = 0
}) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  
  // Training modules data
  const modules = [
    {
      id: 1,
      title: "Démarrage rapide",
      description: "Apprenez les bases de la plateforme LAVUEPAYEE",
      progress: 100,
      completed: true,
      locked: false,
      reward: 50,
      lessons: 5
    },
    {
      id: 2,
      title: "Optimisation des gains",
      description: "Maximisez vos revenus sur la plateforme",
      progress: 60,
      completed: false,
      locked: false,
      reward: 100,
      lessons: 8
    },
    {
      id: 3,
      title: "Stratégies d'affiliation",
      description: "Développez votre réseau d'affiliés",
      progress: 0,
      completed: false,
      locked: userLevel < 1,
      reward: 150,
      lessons: 6
    },
    {
      id: 4,
      title: "Marketing avancé",
      description: "Techniques avancées pour promoteurs",
      progress: 0,
      completed: false,
      locked: userLevel < 2,
      reward: 200,
      lessons: 10
    }
  ];
  
  const handleStartModule = (moduleId: number) => {
    setActiveModule(moduleId);
    // Logic to start the module would go here
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Formation en ligne</h2>
        <div className="flex items-center gap-2">
          <Award className="text-amber-500 h-5 w-5" />
          <span className="text-sm font-medium">Niveau: {userLevel}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <Card key={module.id} className={module.locked ? "opacity-80" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  {module.completed ? 
                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                    <BookOpen className="h-5 w-5 text-primary" />
                  }
                  {module.title}
                </CardTitle>
                {module.locked && <Lock className="h-5 w-5 text-muted-foreground" />}
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{module.lessons} leçons</span>
                  <span>Récompense: {module.reward} LVP</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant={module.completed ? "outline" : "default"}
                disabled={module.locked}
                onClick={() => handleStartModule(module.id)}
              >
                {module.locked ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Niveau {module.id - 1} requis
                  </>
                ) : module.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Revoir le module
                  </>
                ) : module.progress > 0 ? (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Continuer
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Commencer
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OnlineTraining;
