
import React, { useState } from 'react';
import { BadgeDollarSign, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import CashoutOptions from '@/components/CashoutOptions';
import { CashoutFormComponent } from '@/components/CashoutForm';

interface CashoutMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  image?: string;
  minPoints: number;
  conversionRate: number;
  processingTime: string;
  fees: string;
}

interface CashoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userPoints: number;
}

const CashoutDialog: React.FC<CashoutDialogProps> = ({ open, onOpenChange, userPoints }) => {
  const [selectedMethod, setSelectedMethod] = useState<CashoutMethod | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleMethodSelect = (method: CashoutMethod) => {
    setSelectedMethod(method);
  };
  
  const handleBack = () => {
    setSelectedMethod(null);
    setIsComplete(false);
  };
  
  const handleComplete = () => {
    setIsComplete(true);
  };
  
  const handleClose = () => {
    setTimeout(() => {
      setSelectedMethod(null);
      setIsComplete(false);
    }, 300);
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) handleClose();
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                alt="LVP" 
                className="w-full h-full object-contain"
              />
            </div>
            {!selectedMethod 
              ? "Retirer mes LVP" 
              : isComplete 
                ? "Retrait confirmé" 
                : `Retrait par ${selectedMethod.name}`
            }
          </DialogTitle>
          <DialogDescription>
            {!selectedMethod 
              ? "Choisissez votre méthode de retrait préférée." 
              : isComplete 
                ? "Votre demande de retrait a été traitée avec succès." 
                : "Veuillez compléter les informations nécessaires."
            }
          </DialogDescription>
        </DialogHeader>
        
        {!selectedMethod && (
          <CashoutOptions 
            userPoints={userPoints}
            onSelectMethod={handleMethodSelect}
          />
        )}
        
        {selectedMethod && !isComplete && (
          <CashoutFormComponent
            method={selectedMethod}
            userPoints={userPoints}
            onBack={handleBack}
            onComplete={handleComplete}
          />
        )}
        
        {isComplete && (
          <div className="text-center py-8">
            <div className="h-20 w-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-10 w-10 lvp-icon-container">
                <img 
                  src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
                  alt="LVP" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Retrait en cours de traitement</h3>
            <p className="text-foreground/70 mb-6">
              Votre demande a été enregistrée et sera traitée prochainement. 
              Vous pouvez suivre son statut dans l'historique de votre profil.
            </p>
            <DialogClose className="btn-primary">
              Retour au tableau de bord
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CashoutDialog;
