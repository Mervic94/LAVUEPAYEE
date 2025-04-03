
import React from 'react';
import { Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  closeChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isMinimized, 
  toggleMinimize, 
  closeChat 
}) => {
  return (
    <div className="bg-primary text-white p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 lvp-icon-container">
          <img 
            src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
            alt="LAVUEPAYEE" 
            className="h-6 w-6 object-contain"
          />
        </div>
        {!isMinimized && <span className="font-medium">Support Client</span>}
      </div>
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-white hover:text-white hover:bg-primary/80"
          onClick={toggleMinimize}
        >
          {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-white hover:text-white hover:bg-primary/80"
          onClick={closeChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
