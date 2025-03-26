
import React from 'react';
import { DollarSign } from 'lucide-react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  mediaType?: 'image' | 'audio' | 'video';
  mediaUrl?: string;
  mediaCost?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  text, 
  isUser, 
  timestamp, 
  mediaType, 
  mediaUrl, 
  mediaCost 
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`mb-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg px-3 py-2 ${
          isUser 
            ? 'bg-primary text-white' 
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {mediaUrl && (
          <div className="mb-2">
            {mediaType === 'image' && (
              <img src={mediaUrl} alt="Image" className="max-w-full rounded" />
            )}
            {mediaType === 'audio' && (
              <audio src={mediaUrl} controls className="max-w-full" />
            )}
            {mediaType === 'video' && (
              <video src={mediaUrl} controls className="max-w-full rounded" />
            )}
            {mediaCost && (
              <div className="text-xs mt-1 opacity-70 flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Coût: {mediaCost} LVP
              </div>
            )}
          </div>
        )}
        <p>{text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
