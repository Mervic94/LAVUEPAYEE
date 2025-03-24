
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import CashoutFormManager from './cashout/CashoutFormManager';

interface CashoutMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  minPoints: number;
  conversionRate: number;
  processingTime: string;
  fees: string;
}

interface CashoutFormProps {
  method: CashoutMethod;
  userPoints: number;
  onBack: () => void;
  onComplete: () => void;
}

const CashoutForm: React.FC<CashoutFormProps> = ({ 
  method, 
  userPoints, 
  onBack, 
  onComplete 
}) => {
  const { toast } = useToast();
  
  // Handle form submission complete
  const handleComplete = () => {
    toast({
      title: "Demande de retrait envoyée",
      description: `Votre demande de retrait a été envoyée avec succès.`,
    });
    onComplete();
  };
  
  return (
    <CashoutFormManager
      method={method}
      userPoints={userPoints}
      onBack={onBack}
      onComplete={handleComplete}
    />
  );
};

export default CashoutForm;
