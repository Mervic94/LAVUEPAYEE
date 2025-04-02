
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PackageCard from './PackageCard';

interface PackagesProps {
  packages: Array<{
    id: string;
    name: string;
    pointsMultiplier: number;
    price: string;
    features: string[];
    isActive: boolean;
  }>;
  activePackage: string | null;
  onPackageActivation: (packageId: string) => void;
}

const Packages: React.FC<PackagesProps> = ({ packages, activePackage, onPackageActivation }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Packs de visionnage</h2>
        <p className="text-sm text-muted-foreground">Améliorez vos gains en activant un pack premium</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard 
            key={pkg.id}
            pkg={pkg}
            isActive={activePackage === pkg.id}
            onActivate={onPackageActivation}
          />
        ))}
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Informations sur les packs</CardTitle>
          <CardDescription>Choisissez le pack qui vous convient le mieux</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Les packs vous permettent d'augmenter vos gains sur LAVUEPAYEE. Vous ne pouvez activer qu'un seul pack à la fois.
            </p>
            
            <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
              <h4 className="font-medium flex items-center mb-2">
                <Star className="h-4 w-4 text-amber-500 mr-2" />
                Bon à savoir
              </h4>
              <p className="text-sm">
                Le multiplicateur de LVP s'applique à tous les LVP gagnés par visionnage de publicités. 
                Plus votre multiplicateur est élevé, plus vos gains seront importants !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Packages;
