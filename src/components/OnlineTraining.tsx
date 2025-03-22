
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Video, BookOpen, ArrowRight, Check, Clock, Book } from 'lucide-react';

interface OnlineTrainingProps {
  userLevel: number;
  userPoints: number;
  className?: string;
}

const OnlineTraining: React.FC<OnlineTrainingProps> = ({ userLevel, userPoints, className }) => {
  const [activeTab, setActiveTab] = useState('available');
  
  // Mock training courses
  const availableCourses = [
    {
      id: 1,
      title: "Art Oratoire - Niveau 1",
      description: "Apprenez les bases de l'art oratoire pour captiver votre audience",
      level: 1,
      pointsRequired: 1000,
      duration: "4 heures",
      modules: 8,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png",
      instructor: "Sophie Dupont",
      isAvailable: userLevel >= 1 || userPoints >= 1000
    },
    {
      id: 2,
      title: "Entrepreneuriat - Les bases",
      description: "Comment démarrer une entreprise dans n'importe quel secteur",
      level: 1,
      pointsRequired: 1500,
      duration: "6 heures",
      modules: 10,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png",
      instructor: "Marc Leroy",
      isAvailable: userLevel >= 1 || userPoints >= 1500
    },
    {
      id: 3,
      title: "Gestion d'entreprise",
      description: "Les meilleures pratiques pour gérer efficacement votre entreprise",
      level: 2,
      pointsRequired: 2500,
      duration: "8 heures",
      modules: 12,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png",
      instructor: "Jeanne Martin",
      isAvailable: userLevel >= 2 || userPoints >= 2500
    },
    {
      id: 4,
      title: "Leadership & Management",
      description: "Développez vos compétences de leader pour inspirer votre équipe",
      level: 3,
      pointsRequired: 5000,
      duration: "10 heures",
      modules: 15,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png",
      instructor: "Thomas Bernard",
      isAvailable: userLevel >= 3 || userPoints >= 5000
    },
    {
      id: 5,
      title: "Marketing Digital Avancé",
      description: "Stratégies de marketing digital pour développer votre présence en ligne",
      level: 4,
      pointsRequired: 7500,
      duration: "12 heures",
      modules: 18,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png",
      instructor: "Élise Dubois",
      isAvailable: userLevel >= 4 || userPoints >= 7500
    },
    {
      id: 6,
      title: "Recherche de Financement",
      description: "Comment trouver et sécuriser des financements pour votre projet",
      level: 5,
      pointsRequired: 10000,
      duration: "8 heures",
      modules: 12,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png",
      instructor: "Pierre Laurent",
      isAvailable: userLevel >= 5 || userPoints >= 10000
    }
  ];
  
  // Mock in progress courses
  const inProgressCourses = [
    {
      id: 1,
      title: "Art Oratoire - Niveau 1",
      description: "Apprenez les bases de l'art oratoire pour captiver votre audience",
      progress: 65,
      lastActivity: "Il y a 2 jours",
      nextModule: "Module 6: Techniques de persuasion",
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png"
    }
  ];
  
  // Mock completed courses
  const completedCourses = [
    {
      id: 2,
      title: "Entrepreneuriat - Les bases",
      description: "Comment démarrer une entreprise dans n'importe quel secteur",
      completionDate: "15/06/2023",
      certificateAvailable: true,
      thumbnail: "/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png"
    }
  ];
  
  return (
    <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          Formation en ligne
        </h2>
        <p className="text-foreground/60">
          Développez vos compétences avec nos formations exclusives
        </p>
      </div>
      
      <Tabs defaultValue="available" onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">
              Disponibles
              <Badge variant="outline" className="ml-2">
                {availableCourses.filter(c => c.isAvailable).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              En cours
              <Badge variant="outline" className="ml-2">
                {inProgressCourses.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminées
              <Badge variant="outline" className="ml-2">
                {completedCourses.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="available" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className={`overflow-hidden ${!course.isAvailable ? 'opacity-60' : ''}`}>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-white">Niveau {course.level}</Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 text-xs text-foreground/70 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Book className="h-3 w-3" />
                      {course.modules} modules
                    </span>
                  </div>
                  <p className="text-sm">Instructeur: {course.instructor}</p>
                </CardContent>
                
                <CardFooter>
                  {course.isAvailable ? (
                    <Button className="w-full gap-2">
                      Commencer
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="w-full">
                      <p className="text-xs text-foreground/70 mb-1">
                        Débloqué au niveau {course.level} ou {course.pointsRequired} LVP
                      </p>
                      <Button variant="outline" className="w-full" disabled>
                        Verrouillé
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="p-6">
          {inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square relative">
                      <img 
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="md:w-2/3 p-4">
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-foreground/70 mb-3">{course.description}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression: {course.progress}%</span>
                          <span>{course.lastActivity}</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      
                      <p className="text-sm font-medium mb-3">Prochaine leçon: {course.nextModule}</p>
                      
                      <Button className="w-full">Continuer la formation</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune formation en cours</h3>
              <p className="text-foreground/60 mb-6">Commencez une formation pour suivre votre progression ici</p>
              <Button onClick={() => setActiveTab('available')}>Voir les formations disponibles</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="p-6">
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 aspect-video md:aspect-square relative">
                      <img 
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <div className="bg-green-500 text-white rounded-full p-2">
                          <Check className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-4">
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-foreground/70 mb-3">{course.description}</p>
                      
                      <p className="text-sm mb-1">
                        <span className="font-medium">Complété le:</span> {course.completionDate}
                      </p>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="flex-1">Revoir</Button>
                        {course.certificateAvailable && (
                          <Button className="flex-1">Télécharger le certificat</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto text-foreground/30 mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune formation terminée</h3>
              <p className="text-foreground/60 mb-6">Terminez vos formations pour les voir apparaître ici</p>
              <Button onClick={() => setActiveTab('available')}>Voir les formations disponibles</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnlineTraining;
