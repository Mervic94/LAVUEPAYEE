
import React from 'react';
import ConversationHeader from './ConversationHeader';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import { Conversation, Message } from './types';

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage
}) => {
  return (
    <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl overflow-hidden flex flex-col h-full">
      <ConversationHeader user={conversation.user} />
      <MessagesList messages={messages} userName={conversation.user.name} />
      <MessageInput 
        newMessage={newMessage} 
        onMessageChange={onMessageChange} 
        onSendMessage={onSendMessage} 
      />
    </div>
  );
};

export default ConversationView;
