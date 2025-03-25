
import React from 'react';
import { User, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyConversationProps {
  onNewConversation: () => void;
}

const EmptyConversation: React.FC<EmptyConversationProps> = ({ onNewConversation }) => {
  return (
    <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl flex flex-col items-center justify-center p-10">
      <User className="h-16 w-16 text-foreground/30 mb-4" />
      <h3 className="text-xl font-medium mb-2">Aucune conversation sélectionnée</h3>
      <p className="text-foreground/60 text-center mb-6">
        Sélectionnez une conversation existante ou démarrez une nouvelle conversation
      </p>
      <Button onClick={onNewConversation}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Nouvelle conversation
      </Button>
    </div>
  );
};

export default EmptyConversation;
