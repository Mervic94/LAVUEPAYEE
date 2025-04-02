
import React from 'react';
import { BookOpen, Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CourseCard from './CourseCard';

interface TrainingProps {
  courses: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    duration: string;
    modules: number;
    completed: boolean;
    certificate?: boolean;
  }>;
}

const Training: React.FC<TrainingProps> = ({ courses }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Formation en ligne</h2>
        <Button className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Tous les cours
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
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
    </div>
  );
};

export default Training;
