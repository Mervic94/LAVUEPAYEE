
import React from 'react';
import ConversationHeader from './ConversationHeader';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { Conversation, Message } from './types';

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isTyping?: boolean;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  isTyping = false
}) => {
  return (
    <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl overflow-hidden flex flex-col h-full">
      <ConversationHeader user={conversation.user} />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <MessagesList messages={messages} userName={conversation.user.name} />
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator userName={conversation.user.name} className="p-2 bg-secondary/30 rounded-lg" />
          </div>
        )}
      </div>
      <MessageInput 
        newMessage={newMessage} 
        onMessageChange={onMessageChange} 
        onSendMessage={onSendMessage} 
      />
    </div>
  );
};

export default ConversationView;
