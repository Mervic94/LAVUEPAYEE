
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageBubbleProps {
  text: string;
  timestamp: string;
  isUser: boolean;
  userName: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  text, 
  timestamp, 
  isUser,
  userName
}) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary/30'
        }`}
      >
        <p className="text-sm">{text}</p>
        <span className="text-[10px] opacity-70 mt-1 block text-right">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
