
import React from 'react';
import { Download, Mail, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CertificatesProps {
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

const Certificates: React.FC<CertificatesProps> = ({ courses }) => {
  const { toast } = useToast();
  
  const downloadCertificate = (courseId: string) => {
    toast({
      title: "Téléchargement démarré",
      description: "Votre attestation de formation est en cours de téléchargement."
    });
    // In a real app, this would trigger a download
  };
  
  const resendCertificateByEmail = (courseId: string) => {
    toast({
      title: "Attestation envoyée",
      description: "Votre attestation a été envoyée à votre adresse email."
    });
    // In a real app, this would send an email
  };
  
  const completedCourses = courses.filter(course => course.completed);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Mes attestations</h2>
        <p className="text-sm text-muted-foreground">Accédez à toutes vos attestations de formation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completedCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {course.title}
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Complété
                </Badge>
              </CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date d'obtention: 15/06/2023</span>
                <span className="text-muted-foreground">{course.duration} · {course.modules} modules</span>
              </div>
              
              <div className="pt-2 flex flex-col gap-2">
                <Button 
                  variant="default"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => downloadCertificate(course.id)}
                >
                  <Download className="h-4 w-4" />
                  Télécharger l'attestation
                </Button>
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => resendCertificateByEmail(course.id)}
                >
                  <Mail className="h-4 w-4" />
                  Recevoir par email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {completedCourses.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Aucune attestation disponible</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Complétez une formation pour obtenir une attestation. Vous pouvez consulter les formations disponibles dans l'onglet Formation.
            </p>
          </div>
        )}
      </div>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Attestations et certifications</CardTitle>
          <CardDescription>Valorisez vos compétences avec nos attestations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Chaque formation complétée vous donne droit à une attestation officielle LAVUEPAYEE. Ces attestations certifient les compétences acquises lors de votre parcours de formation.
            </p>
            
            <div className="p-4 rounded-lg border bg-secondary/10">
              <h3 className="font-medium flex items-center mb-2">
                <Star className="h-4 w-4 text-primary mr-2" />
                Comment obtenir une attestation ?
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Suivez l'intégralité d'une formation</li>
                <li>Passez l'examen final avec succès</li>
                <li>Recevez automatiquement votre attestation par email</li>
                <li>Retrouvez-la à tout moment dans cette section</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certificates;
