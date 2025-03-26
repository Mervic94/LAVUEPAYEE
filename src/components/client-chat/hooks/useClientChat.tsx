
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  mediaType?: 'image' | 'audio' | 'video';
  mediaUrl?: string;
  mediaCost?: number;
}

export const useClientChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isUser: false, timestamp: new Date() }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userLvpBalance, setUserLvpBalance] = useState(1250); // Mock balance
  const [mediaType, setMediaType] = useState<'image' | 'audio' | 'video' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  return {
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
  };
};
