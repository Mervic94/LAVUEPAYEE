
import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const ClientChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean; timestamp: Date }[]>([
    { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isUser: false, timestamp: new Date() }
  ]);
  const isMobile = useIsMobile();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      setChatMessages([...chatMessages, { text: message, isUser: true, timestamp: new Date() }]);
      setMessage('');
      
      // Simulate response
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev, 
          { 
            text: "Merci pour votre message. Un conseiller vous répondra dans les plus brefs délais.", 
            isUser: false, 
            timestamp: new Date() 
          }
        ]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed ${isMobile ? 'bottom-16 right-4' : 'bottom-6 right-6'} z-50`}>
      {/* Chat button */}
      {!isOpen && (
        <Button 
          className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={toggleChat}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-sm transition-all">
          {/* Chat header */}
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
                  alt="LAVUEPAYEE" 
                  className="h-6 w-6 object-contain"
                />
              </div>
              {!isMinimized && <span className="font-medium">Support Client</span>}
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:text-white hover:bg-primary/80"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:text-white hover:bg-primary/80"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat body */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.isUser 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.isUser ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat input */}
              <form onSubmit={handleSubmit} className="border-t p-3 flex gap-2">
                <Input
                  placeholder="Écrivez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientChat;
