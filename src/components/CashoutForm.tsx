
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CashoutFormManager from './cashout/CashoutFormManager';

// Define the ConvertLvpButton component first
export const ConvertLvpButton = ({ onClick, isLoading }: { onClick: () => void, isLoading: boolean }) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? "Traitement en cours..." : "Convertir mes LVP"}
    </Button>
  );
};

// Renamed component to avoid circular imports
export const CashoutFormComponent = ({ method, userPoints, onBack, onComplete }: { 
  method: any;
  userPoints: number;
  onBack: () => void;
  onComplete: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1500);
  };
  
  return (
    <CashoutFormManager 
      method={method} 
      userPoints={userPoints} 
      onBack={onBack} 
      onComplete={onComplete}
    />
  );
};

// Export a default component to fix the import error
export default CashoutFormComponent;
