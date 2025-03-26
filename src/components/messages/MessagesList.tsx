
import React from 'react';
import MessageBubble from './MessageBubble';
import { Message } from './types';

interface MessagesListProps {
  messages: Message[];
  userName: string;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, userName }) => {
  return (
    <>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          text={message.text}
          timestamp={message.timestamp}
          isUser={message.sender === 'me'}
          userName={userName}
        />
      ))}
    </>
  );
};

export default MessagesList;
