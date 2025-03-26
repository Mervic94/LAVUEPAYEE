
import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MediaButtons from './MediaButtons';

interface ChatInputFormProps {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onSelectMediaType: (type: 'image' | 'audio' | 'video') => void;
  userLvpBalance: number;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  message,
  setMessage,
  handleSubmit,
  onSelectMediaType,
  userLvpBalance
}) => {
  return (
    <form onSubmit={handleSubmit} className="border-t p-3">
      <MediaButtons 
        onSelectMediaType={onSelectMediaType}
        userLvpBalance={userLvpBalance}
      />
      <div className="flex gap-2">
        <Input
          placeholder="Écrivez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInputForm;
