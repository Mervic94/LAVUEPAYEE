import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Image, FileMusic, Video, User, PaperclipIcon, DollarSign, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import TypingIndicator from '@/components/messages/TypingIndicator';

const ClientChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ 
    text: string; 
    isUser: boolean; 
    timestamp: Date;
    mediaType?: 'image' | 'audio' | 'video';
    mediaUrl?: string;
    mediaCost?: number;
  }[]>([
    { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isUser: false, timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userLvpBalance, setUserLvpBalance] = useState(1250); // Mock balance
  const [mediaType, setMediaType] = useState<'image' | 'audio' | 'video' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const calculateMediaCost = (fileSize: number, type: 'image' | 'audio' | 'video'): number => {
    const fileSizeInMB = fileSize / (1024 * 1024);
    
    if (fileSizeInMB < 5) {
      return 2;
    }
    
    switch (type) {
      case 'image': return 3;
      case 'audio': return 4;
      case 'video': return 5;
      default: return 2;
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages([...chatMessages, { text: message, isUser: true, timestamp: new Date() }]);
      setMessage('');
      
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setChatMessages(prev => [
          ...prev, 
          { 
            text: "Merci pour votre message. Un conseiller vous répondra dans les plus brefs délais.", 
            isUser: false, 
            timestamp: new Date() 
          }
        ]);
      }, 2000);
    }
  };

  const openFileSelector = (type: 'image' | 'audio' | 'video') => {
    setMediaType(type);
    if (fileInputRef.current) {
      switch (type) {
        case 'image':
          fileInputRef.current.accept = 'image/*';
          break;
        case 'audio':
          fileInputRef.current.accept = 'audio/*';
          break;
        case 'video':
          fileInputRef.current.accept = 'video/*';
          break;
      }
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !mediaType) return;

    const cost = calculateMediaCost(file.size, mediaType);
    
    if (userLvpBalance < cost) {
      toast({
        title: "Solde insuffisant",
        description: `Vous n'avez pas assez de LVP pour envoyer ce média. Coût: ${cost} LVP`,
        variant: "destructive"
      });
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    
    setUserLvpBalance(prev => prev - cost);
    
    setChatMessages(prev => [
      ...prev,
      {
        text: `A envoyé un fichier ${mediaType}`,
        isUser: true,
        timestamp: new Date(),
        mediaType,
        mediaUrl: fileUrl,
        mediaCost: cost
      }
    ]);
    
    toast({
      title: "Média envoyé",
      description: `${cost} LVP ont été déduits de votre solde`,
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
                      {msg.mediaUrl && (
                        <div className="mb-2">
                          {msg.mediaType === 'image' && (
                            <img src={msg.mediaUrl} alt="Image" className="max-w-full rounded" />
                          )}
                          {msg.mediaType === 'audio' && (
                            <audio src={msg.mediaUrl} controls className="max-w-full" />
                          )}
                          {msg.mediaType === 'video' && (
                            <video src={msg.mediaUrl} controls className="max-w-full rounded" />
                          )}
                          {msg.mediaCost && (
                            <div className="text-xs mt-1 opacity-70 flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Coût: {msg.mediaCost} LVP
                            </div>
                          )}
                        </div>
                      )}
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.isUser ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
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
              
              <form onSubmit={handleSubmit} className="border-t p-3">
                <div className="flex gap-2 mb-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => openFileSelector('image')}
                    title="Envoyer une image (3 LVP)"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => openFileSelector('audio')}
                    title="Envoyer un fichier audio (4 LVP)"
                  >
                    <FileMusic className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => openFileSelector('video')}
                    title="Envoyer une vidéo (5 LVP)"
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <div className="ml-auto flex items-center gap-2 text-sm text-foreground/60">
                    <DollarSign className="h-4 w-4" />
                    {userLvpBalance} LVP
                  </div>
                </div>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientChat;
