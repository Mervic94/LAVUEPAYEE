
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SubmitButtonProps {
  isAmountValid: boolean;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isAmountValid, isSubmitting }) => {
  return (
    <Button 
      type="submit" 
      className="w-full gap-2" 
      disabled={!isAmountValid || isSubmitting}
    >
      {isSubmitting ? "Traitement en cours..." : "Confirmer le retrait"} 
      {!isSubmitting && <ChevronRight className="h-4 w-4" />}
    </Button>
  );
};

export default SubmitButton;
