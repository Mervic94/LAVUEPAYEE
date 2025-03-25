
import React from 'react';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface MessagesListProps {
  messages: Message[];
  userName: string;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, userName }) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          text={message.text}
          timestamp={message.timestamp}
          isUser={message.sender === 'me'}
          userName={userName}
        />
      ))}
    </div>
  );
};

export default MessagesList;
