
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    pointsMultiplier: number;
    price: string;
    features: string[];
    isActive: boolean;
  };
  isActive: boolean;
  onActivate: (packageId: string) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, isActive, onActivate }) => {
  return (
    <Card 
      key={pkg.id} 
      className={`overflow-hidden transition-all ${
        isActive ? 'ring-2 ring-primary' : ''
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pkg.name}</CardTitle>
            <CardDescription>Multiplicateur de LVP: x{pkg.pointsMultiplier}</CardDescription>
          </div>
          {pkg.id !== 'basic' && (
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {pkg.id === 'premium' ? 'POPULAIRE' : 'EXCLUSIF'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold">{pkg.price}</div>
        
        <ul className="space-y-2">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-center">
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full"
          variant={isActive ? "secondary" : "default"}
          onClick={() => onActivate(pkg.id)}
        >
          {isActive ? 'Désactiver' : 'Activer'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
