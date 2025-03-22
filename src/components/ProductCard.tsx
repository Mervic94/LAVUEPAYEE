
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number; // in points
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  image,
  price
}) => {
  // Format price with thousands separator
  const formattedPrice = new Intl.NumberFormat('fr-FR').format(price);

  return (
    <div className="group relative rounded-xl overflow-hidden card-hover bg-white">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 text-xs font-medium bg-primary text-white px-2 py-1 rounded-full">
            <div className="h-3 w-3 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                alt="LVC" 
                className="w-full h-full object-contain"
              />
            </div>
            {formattedPrice} LVC
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 border-t">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{name}</h3>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{description}</p>
        
        <Button variant="default" size="sm" className="w-full group-hover:bg-primary transition-colors gap-2">
          <ShoppingCart className="h-4 w-4" />
          Échanger
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
