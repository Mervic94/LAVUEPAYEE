
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    progress: number;
    duration: string;
    modules: number;
    completed: boolean;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card key={course.id} className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2">
            {course.title}
            {course.completed && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Complété
              </Badge>
            )}
          </CardTitle>
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{course.progress}% complété</span>
          <span className="text-muted-foreground">{course.duration} · {course.modules} modules</span>
        </div>
        <Progress value={course.progress} className="h-2" />
        
        <div className="pt-2">
          <Button 
            variant={course.progress > 0 && !course.completed ? "default" : "outline"}
            className="w-full"
          >
            {course.progress === 0 ? 'Commencer' : course.completed ? 'Revoir' : 'Continuer'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
