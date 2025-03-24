
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormHeaderProps {
  userPoints: number;
  onBack: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ userPoints, onBack }) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={onBack} className="gap-1">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Button>
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png" 
            alt="LVP" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-medium">{userPoints} LVP disponibles</span>
      </div>
    </div>
  );
};

export default FormHeader;
