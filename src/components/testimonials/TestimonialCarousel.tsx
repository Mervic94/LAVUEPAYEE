
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  type: 'annonceur' | 'consommateur' | 'partenaire';
  avatarUrl?: string;
  quote: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Thomas Durand',
    role: 'Directeur Marketing',
    type: 'annonceur',
    quote: 'Grâce à LAVUEPAYEE, nous avons augmenté notre taux de conversion de 37% en seulement trois mois. La qualité du trafic et l\'engagement des utilisateurs sont exceptionnels.',
    company: 'TechStart SAS',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Marie Lefevre',
    role: 'Utilisatrice',
    type: 'consommateur',
    quote: 'Je gagne en moyenne 75€ par mois en regardant des publicités et en complétant des tâches. C\'est un excellent complément de revenu et les récompenses sont variées.',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Jean-Philippe Martin',
    role: 'CEO',
    type: 'partenaire',
    quote: 'Notre partenariat avec LAVUEPAYEE a transformé notre approche du marketing digital. Leur écosystème nous permet d\'atteindre des audiences qualifiées et engagées.',
    company: 'MediaPartners',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Sophie Dubois',
    role: 'Directrice de la Communication',
    type: 'annonceur',
    quote: 'Le format publicitaire de LAVUEPAYEE garantit que nos messages sont réellement vus et appréciés. Nous avons constaté un meilleur retour sur investissement par rapport aux canaux traditionnels.',
    company: 'BeautyPlus',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Alexandre Chen',
    role: 'Étudiant',
    type: 'consommateur',
    quote: 'En tant qu\'étudiant, cette plateforme est parfaite pour générer un revenu pendant mon temps libre. J\'ai même pu me payer mon nouvel ordinateur grâce aux points accumulés.',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Laure Mercier',
    role: 'Responsable des Partenariats',
    type: 'partenaire',
    quote: 'L\'intégration avec LAVUEPAYEE a été simple et rapide. Leur équipe est réactive et les résultats pour nos clients sont au rendez-vous.',
    company: 'DigitalGrowth',
    avatarUrl: '/placeholder.svg'
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'annonceur':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'consommateur':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'partenaire':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const TestimonialCarousel = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce qu'ils disent de nous</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez les témoignages de nos annonceurs, consommateurs et partenaires qui utilisent LAVUEPAYEE au quotidien.
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="pt-6">
                        <div className="mb-4">
                          <Badge className={`${getTypeColor(testimonial.type)}`}>
                            {testimonial.type.charAt(0).toUpperCase() + testimonial.type.slice(1)}
                          </Badge>
                        </div>
                        <blockquote className="text-lg italic mb-4">
                          "{testimonial.quote}"
                        </blockquote>
                      </CardContent>
                      <CardFooter className="flex items-center gap-4 pt-0">
                        <Avatar>
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
