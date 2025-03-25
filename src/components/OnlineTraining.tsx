
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Book, Award, Clock, CheckCircle } from 'lucide-react';

interface OnlineTrainingProps {
  className?: string;
}

const OnlineTraining: React.FC<OnlineTrainingProps> = ({ className }) => {
  const courses = [
    {
      id: '1',
      title: 'Débutant sur LAVUEPAYEE',
      description: 'Apprenez les bases pour gagner vos premiers LVP',
      duration: '30 minutes',
      modules: 5,
      level: 'Débutant',
      completed: false,
      reward: 100
    },
    {
      id: '2',
      title: 'Marketing d\'Affiliation Avancé',
      description: 'Maximisez vos gains avec l\'affiliation',
      duration: '1 heure',
      modules: 8,
      level: 'Intermédiaire',
      completed: false,
      reward: 250
    },
    {
      id: '3',
      title: 'Devenir Annonceur Pro',
      description: 'Créez des campagnes publicitaires performantes',
      duration: '2 heures',
      modules: 12,
      level: 'Avancé',
      completed: false,
      reward: 500
    }
  ];

  return (
    <div className={className}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Formation en ligne</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Développez vos compétences et gagnez des LVP en suivant nos formations adaptées à votre niveau.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-primary/20 to-transparent">
              <div className="flex justify-between items-start">
                <Badge variant={course.completed ? "default" : "outline"}>
                  {course.completed ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Terminé
                    </span>
                  ) : course.level}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </Badge>
              </div>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-foreground/70">
                  <Book className="h-4 w-4" />
                  <span>{course.modules} modules</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <Award className="h-4 w-4" />
                  <span>Récompense: {course.reward} LVP</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full" variant={course.completed ? "outline" : "default"}>
                <Play className="h-4 w-4 mr-2" />
                {course.completed ? "Revoir le cours" : "Commencer"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OnlineTraining;
