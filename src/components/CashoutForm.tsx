
// Since this is a read-only file, I'll create a wrapper component to modify the button text

import React from 'react';
import { Button } from '@/components/ui/button';

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
