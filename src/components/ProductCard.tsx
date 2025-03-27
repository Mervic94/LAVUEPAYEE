
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

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
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  // Format price with thousands separator
  const formattedPrice = new Intl.NumberFormat('fr-FR').format(price);

  const handlePurchase = () => {
    setPurchaseDialogOpen(true);
  };

  const confirmPurchase = () => {
    setProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setProcessing(false);
      setPurchaseDialogOpen(false);
      setConfirmationDialogOpen(true);
      
      toast({
        title: "Produit échangé avec succès !",
        description: `Vous avez échangé ${formattedPrice} LVP contre ${name}.`,
      });
    }, 1500);
  };

  return (
    <>
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
                  alt="LVP" 
                  className="w-full h-full object-contain"
                />
              </div>
              {formattedPrice} LVP
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 border-t">
          <h3 className="font-medium text-lg mb-2 line-clamp-1">{name}</h3>
          <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{description}</p>
          
          <Button 
            variant="default" 
            size="sm" 
            className="w-full group-hover:bg-primary transition-colors gap-2"
            onClick={handlePurchase}
          >
            <ShoppingCart className="h-4 w-4" />
            Échanger
          </Button>
        </div>
      </div>

      {/* Purchase Dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer l'échange</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point d'échanger {formattedPrice} LVP contre ce produit.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-medium">{name}</h4>
              <p className="text-sm text-foreground/70">{formattedPrice} LVP</p>
            </div>
          </div>
          
          <div className="bg-secondary/20 p-3 rounded-md">
            <p className="text-sm">
              Une fois l'échange confirmé, le montant sera débité de votre solde LVP et vous recevrez votre produit dans un délai de 3 à 5 jours ouvrés.
            </p>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setPurchaseDialogOpen(false)}>
              Annuler
            </Button>
            <Button disabled={processing} onClick={confirmPurchase}>
              {processing ? 'Traitement en cours...' : 'Confirmer l\'échange'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Échange réussi !
            </DialogTitle>
            <DialogDescription>
              Votre commande a été traitée avec succès.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-green-50 border border-green-100 p-4 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">Détails de la commande</h4>
            <ul className="text-sm space-y-1 text-green-700">
              <li>Produit : {name}</li>
              <li>Montant : {formattedPrice} LVP</li>
              <li>Référence : #ORD-{Math.floor(Math.random() * 1000000)}</li>
              <li>Date : {new Date().toLocaleDateString('fr-FR')}</li>
            </ul>
          </div>
          
          <p className="text-sm">
            Vous recevrez bientôt un email de confirmation avec les détails de livraison.
          </p>
          
          <DialogFooter>
            <Button onClick={() => setConfirmationDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
