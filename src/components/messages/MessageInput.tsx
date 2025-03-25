
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface MessageInputProps {
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  newMessage, 
  onMessageChange, 
  onSendMessage 
}) => {
  return (
    <form onSubmit={onSendMessage} className="p-4 border-t flex gap-2">
      <Input
        type="text"
        placeholder="Écrivez votre message..."
        value={newMessage}
        onChange={(e) => onMessageChange(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" disabled={!newMessage.trim()}>
        <Send className="h-4 w-4 mr-2" />
        Envoyer
      </Button>
    </form>
  );
};

export default MessageInput;
