
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import ChatHeader from './ChatHeader';
import ChatMessageList from './ChatMessageList';
import ChatInputForm from './ChatInputForm';
import { useClientChat } from './hooks/useClientChat';

const ClientChat: React.FC = () => {
  const {
    isOpen,
    isMinimized,
    message,
    chatMessages,
    isTyping,
    userLvpBalance,
    fileInputRef,
    toggleChat,
    toggleMinimize,
    setMessage,
    handleSubmit,
    openFileSelector,
    handleFileSelected
  } = useClientChat();

  const isMobile = useIsMobile();

  return (
    <div className={`fixed ${isMobile ? 'bottom-16 right-4' : 'bottom-6 right-6'} z-50`}>
      {!isOpen && (
        <Button 
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={toggleChat}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelected}
      />

      {isOpen && (
        <div className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-sm transition-all">
          <ChatHeader 
            isMinimized={isMinimized} 
            toggleMinimize={toggleMinimize} 
            closeChat={toggleChat} 
          />
          
          {!isMinimized && (
            <>
              <ChatMessageList 
                messages={chatMessages}
                isTyping={isTyping}
              />
              
              <ChatInputForm 
                message={message}
                setMessage={setMessage}
                handleSubmit={handleSubmit}
                onSelectMediaType={openFileSelector}
                userLvpBalance={userLvpBalance}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientChat;
