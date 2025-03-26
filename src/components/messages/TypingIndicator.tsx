
import React from 'react';
import { Loader } from 'lucide-react';

interface TypingIndicatorProps {
  userName?: string;
  className?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  userName,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {userName && <span>{userName} est en train d'écrire</span>}
      {!userName && <span>En train d'écrire</span>}
      <Loader className="h-3 w-3 animate-spin" />
    </div>
  );
};

export default TypingIndicator;
