
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Gift, Crown, Zap } from 'lucide-react';
import PointsIndicator from '@/components/PointsIndicator';

interface TaskPackagesProps {
  className?: string;
}

const TaskPackages: React.FC<TaskPackagesProps> = ({ className }) => {
  const packages = [
    {
      id: 'standard',
      name: 'Pack Standard',
      price: 3500,
      features: [
        'Tâches quotidiennes (3)',
        'Tâches hebdomadaires (1)',
        'Support par email',
        'Récompenses standards'
      ],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-400',
      icon: <Zap className="h-8 w-8" />,
      popular: false
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      price: 7000,
      features: [
        'Tâches quotidiennes (5)',
        'Tâches hebdomadaires (2)',
        'Tâches mensuelles (1)',
        'Support prioritaire',
        'Récompenses premium',
        'Formations exclusives'
      ],
      color: 'bg-gradient-to-br from-amber-500 to-amber-300',
      icon: <Gift className="h-8 w-8" />,
      popular: true
    },
    {
      id: 'elite',
      name: 'Pack Elite',
      price: 12000,
      features: [
        'Tâches quotidiennes (8)',
        'Tâches hebdomadaires (4)',
        'Tâches mensuelles (2)',
        'Support VIP 24/7',
        'Récompenses élites',
        'Formations exclusives',
        'Accès anticipé aux nouveautés'
      ],
      color: 'bg-gradient-to-br from-purple-600 to-pink-500',
      icon: <Crown className="h-8 w-8" />,
      popular: false
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Choisissez votre pack de tâches</h2>
        <p className="text-foreground/60 max-w-2xl mx-auto">
          Activez des tâches quotidiennes, hebdomadaires et mensuelles et gagnez plus de LVP en accomplissant des objectifs personnalisés.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`overflow-hidden relative ${pkg.popular ? 'border-amber-400 shadow-lg scale-105' : ''}`}>
            {pkg.popular && (
              <Badge className="absolute top-4 right-4 bg-amber-400 text-foreground">Populaire</Badge>
            )}
            
            <div className={`${pkg.color} text-white p-8`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  <div className="flex items-center mt-1">
                    <PointsIndicator points={pkg.price} size="sm" />
                  </div>
                </div>
                <div className="rounded-full bg-white/20 p-3">
                  {pkg.icon}
                </div>
              </div>
            </div>
            
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full">Activer pour {pkg.price} LVP</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 glass-card rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Comment fonctionnent les packs de tâches ?</h3>
            <p className="text-foreground/70 mb-2">
              Chaque pack vous donne accès à un nombre spécifique de tâches quotidiennes, hebdomadaires et mensuelles. Une fois activé, votre pack est valable pendant 30 jours.
            </p>
            <p className="text-foreground/70">
              Accomplissez ces tâches dans les délais impartis pour gagner des récompenses en LVP et débloquer des produits exclusifs sur la plateforme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPackages;
