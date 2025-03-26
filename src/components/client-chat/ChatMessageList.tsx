
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from '@/components/messages/TypingIndicator';

interface ChatMessageListProps {
  messages: Array<{
    text: string;
    isUser: boolean;
    timestamp: Date;
    mediaType?: 'image' | 'audio' | 'video';
    mediaUrl?: string;
    mediaCost?: number;
  }>;
  isTyping: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
      {messages.map((msg, index) => (
        <ChatMessage key={index} {...msg} />
      ))}
      
      {isTyping && (
        <div className="flex justify-start mb-3">
          <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2">
            <TypingIndicator />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
