
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Export the button component
export const ConvertLvpButton = ({ onClick, isLoading }: { onClick: () => void, isLoading: boolean }) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? "Traitement en cours..." : "Convertir mes lvp"}
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
  
  const handleConvert = () => {
    // This function is passed to the ConvertLvpButton
    // Logic for conversion is already in handleSubmit
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form content would go here */}
      <div className="space-y-6">
        <p className="text-foreground/70">
          Vous allez convertir vos points LVP en utilisant la méthode {method.name}.
        </p>
        
        <div className="flex space-x-4">
          <button 
            type="button" 
            onClick={onBack}
            className="btn-outline flex-1"
          >
            Retour
          </button>
          
          <ConvertLvpButton 
            onClick={handleConvert} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

// Export a default component to fix the import error
export default CashoutFormComponent;
