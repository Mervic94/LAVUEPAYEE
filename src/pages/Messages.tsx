import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar';
import { toast } from '@/components/ui/use-toast';
import ConversationList from '@/components/messages/ConversationList';
import ConversationView from '@/components/messages/ConversationView';
import EmptyConversation from '@/components/messages/EmptyConversation';
import { Conversation, Message } from '@/components/messages/types';

const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Marie Laurent',
      avatar: null,
      lastSeen: 'En ligne',
      isAffiliate: true,
      level: 1
    },
    lastMessage: {
      text: 'Merci pour votre aide !',
      timestamp: '10:42',
      isRead: true,
      sender: '101'
    },
    unread: 0
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Thomas Dubois',
      avatar: null,
      lastSeen: 'Il y a 5 min',
      isAffiliate: false
    },
    lastMessage: {
      text: 'Comment puis-je gagner plus de points ?',
      timestamp: '09:33',
      isRead: false,
      sender: '102'
    },
    unread: 3
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Sophie Martin',
      avatar: null,
      lastSeen: 'Hier',
      isAffiliate: true,
      level: 2
    },
    lastMessage: {
      text: 'Avez-vous vu les nouvelles publicités disponibles ?',
      timestamp: 'Hier',
      isRead: true,
      sender: 'me'
    },
    unread: 0
  },
  {
    id: '4',
    user: {
      id: '104',
      name: 'Lucas Bernard',
      avatar: null,
      lastSeen: 'Il y a 3 heures',
      isAffiliate: true,
      level: 1
    },
    lastMessage: {
      text: 'Je viens de rejoindre votre réseau d\'affiliation !',
      timestamp: 'Mar',
      isRead: true,
      sender: '104'
    },
    unread: 0
  },
  {
    id: '5',
    user: {
      id: '105',
      name: 'Emma Petit',
      avatar: null,
      lastSeen: 'En ligne',
      isAffiliate: false
    },
    lastMessage: {
      text: 'Comment fonctionne le système de retrait ?',
      timestamp: 'Lun',
      isRead: true,
      sender: '105'
    },
    unread: 0
  }
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    sender: '102',
    text: 'Bonjour ! Comment puis-je gagner plus de points sur la plateforme ?',
    timestamp: 'Aujourd\'hui 09:30'
  },
  {
    id: 'm2',
    sender: 'me',
    text: 'Bonjour Thomas ! Vous pouvez gagner plus de points en visionnant des publicités vidéo qui rapportent 50% de plus que les bannières standards.',
    timestamp: 'Aujourd\'hui 09:32'
  },
  {
    id: 'm3',
    sender: '102',
    text: 'Merci pour l\'info ! Y a-t-il d\'autres moyens d\'augmenter mes gains ?',
    timestamp: 'Aujourd\'hui 09:33'
  },
  {
    id: 'm4',
    sender: 'me',
    text: 'Bien sûr ! Vous pouvez également participer à notre programme d\'affiliation pour gagner des commissions sur les points gagnés par vos affiliés.',
    timestamp: 'Aujourd\'hui 09:35'
  },
  {
    id: 'm5',
    sender: 'me',
    text: 'De plus, nous proposons des tâches quotidiennes, hebdomadaires et mensuelles qui vous permettent de gagner des bonus supplémentaires.',
    timestamp: 'Aujourd\'hui 09:36'
  },
  {
    id: 'm6',
    sender: '102',
    text: 'C\'est intéressant ! Comment accéder à ces tâches ?',
    timestamp: 'Aujourd\'hui 09:38'
  },
  {
    id: 'm7',
    sender: 'me',
    text: 'Vous pouvez accéder aux tâches en achetant des packs dans la section "Tâches" de votre tableau de bord. Nous proposons trois packs différents : Standard, Premium et Elite.',
    timestamp: 'Aujourd\'hui 09:40'
  },
  {
    id: 'm8',
    sender: '102',
    text: 'Parfait, je vais explorer tout ça. Merci beaucoup pour ces informations !',
    timestamp: 'Aujourd\'hui 09:42'
  }
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[1]);
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth');
    if (!userAuth) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à la messagerie",
        variant: "destructive"
      });
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    if (conversation.id !== '1') {
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }, 1000);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }, 1500);
    }
  };

  const handleNewConversation = () => {
    console.log('New conversation');
  };
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[70vh]">
          <ConversationList 
            conversations={mockConversations}
            searchQuery={searchQuery}
            selectedConversation={selectedConversation}
            onSearchChange={setSearchQuery}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
          
          {selectedConversation ? (
            <ConversationView 
              conversation={selectedConversation}
              messages={mockMessages}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          ) : (
            <EmptyConversation onNewConversation={handleNewConversation} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
