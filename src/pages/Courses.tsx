
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, CheckCircle, Clock, Users, Star, Award, Download } from 'lucide-react';
import Navbar from '@/components/navbar';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  progress: number;
  completed: boolean;
  rating: number;
  students: number;
  category: string;
  thumbnail: string;
  lessons: number;
}

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Débuter sur LaVuePayee',
      description: 'Apprenez les bases pour maximiser vos gains sur la plateforme',
      duration: '2h 30min',
      level: 'Débutant',
      progress: 75,
      completed: false,
      rating: 4.8,
      students: 1250,
      category: 'Démarrage',
      thumbnail: '/placeholder.svg',
      lessons: 8
    },
    {
      id: '2',
      title: 'Stratégies de parrainage avancées',
      description: 'Techniques pour optimiser votre réseau de parrainage',
      duration: '3h 15min',
      level: 'Avancé',
      progress: 0,
      completed: false,
      rating: 4.9,
      students: 890,
      category: 'Marketing',
      thumbnail: '/placeholder.svg',
      lessons: 12
    },
    {
      id: '3',
      title: 'Gestion financière et retraits',
      description: 'Comment gérer efficacement vos gains et optimiser vos retraits',
      duration: '1h 45min',
      level: 'Intermédiaire',
      progress: 100,
      completed: true,
      rating: 4.7,
      students: 2100,
      category: 'Finance',
      thumbnail: '/placeholder.svg',
      lessons: 6
    },
    {
      id: '4',
      title: 'Sécurité et bonnes pratiques',
      description: 'Protégez votre compte et vos gains avec les bonnes pratiques',
      duration: '2h 00min',
      level: 'Débutant',
      progress: 30,
      completed: false,
      rating: 4.6,
      students: 1560,
      category: 'Sécurité',
      thumbnail: '/placeholder.svg',
      lessons: 7
    },
    {
      id: '5',
      title: 'Analyse et optimisation des performances',
      description: 'Utilisez les analytics pour améliorer vos résultats',
      duration: '4h 20min',
      level: 'Avancé',
      progress: 0,
      completed: false,
      rating: 4.8,
      students: 650,
      category: 'Analytics',
      thumbnail: '/placeholder.svg',
      lessons: 15
    },
    {
      id: '6',
      title: 'Communication et réseaux sociaux',
      description: 'Maîtrisez la promotion sur les réseaux sociaux',
      duration: '2h 45min',
      level: 'Intermédiaire',
      progress: 60,
      completed: false,
      rating: 4.5,
      students: 980,
      category: 'Communication',
      thumbnail: '/placeholder.svg',
      lessons: 10
    }
  ];

  const categories = ['Tous', 'Démarrage', 'Marketing', 'Finance', 'Sécurité', 'Analytics', 'Communication'];

  const filteredCourses = activeTab === 'all' 
    ? courses 
    : activeTab === 'completed'
    ? courses.filter(course => course.completed)
    : activeTab === 'in-progress'
    ? courses.filter(course => course.progress > 0 && !course.completed)
    : courses.filter(course => course.category === activeTab);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.completed).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && !c.completed).length;
  const overallProgress = (completedCourses / totalCourses) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 mx-auto max-w-6xl pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Centre de formation</h1>
          <p className="text-muted-foreground">
            Développez vos compétences et maximisez vos gains avec nos formations
          </p>
        </div>

        {/* Statistiques de progression */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations totales</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses}</div>
              <p className="text-xs text-muted-foreground">
                Certifications obtenues
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses}</div>
              <p className="text-xs text-muted-foreground">
                Formations actives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="in-progress">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
            {categories.slice(1).map(category => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 rounded-t-lg flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </div>
                      {course.completed && (
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <Badge className={getLevelColor(course.level)} variant="secondary">
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} leçons
                    </div>

                    {course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    )}

                    <Button 
                      className="w-full"
                      variant={course.completed ? "outline" : "default"}
                      onClick={() => setSelectedCourse(course)}
                    >
                      {course.completed ? (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger certificat
                        </>
                      ) : course.progress > 0 ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Continuer
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Commencer
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucune formation trouvée dans cette catégorie</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Formations recommandées */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Formations recommandées pour vous</CardTitle>
            <CardDescription>
              Basées sur votre profil et vos objectifs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className={getLevelColor(course.level)} variant="secondary">
                      {course.level}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Courses;
