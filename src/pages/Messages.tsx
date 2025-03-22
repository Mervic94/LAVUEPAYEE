
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Send, User, PlusCircle, Phone, Video, Info } from 'lucide-react';

// Mock data for conversations
const mockConversations = [
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

// Mock messages for conversation
const mockMessages = [
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
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[1]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, you would send this to an API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };
  
  const filteredConversations = searchQuery
    ? mockConversations.filter(convo => 
        convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockConversations;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[70vh]">
          {/* Conversations sidebar */}
          <div className="md:col-span-1 glass-card rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-secondary/20 transition-colors flex items-center gap-3 ${
                      selectedConversation?.id === conversation.id ? 'bg-secondary/30' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.user.avatar || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      {conversation.user.lastSeen === 'En ligne' && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-foreground/60 whitespace-nowrap ml-2">{conversation.lastMessage.timestamp}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-foreground/70 truncate">
                          {conversation.lastMessage.sender === 'me' ? 'Vous: ' : ''}
                          {conversation.lastMessage.text}
                        </p>
                        
                        {conversation.unread > 0 && (
                          <span className="ml-2 flex-shrink-0 h-5 w-5 bg-primary rounded-full text-[10px] flex items-center justify-center text-white">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-foreground/60">
                  Aucun utilisateur trouvé
                </div>
              )}
            </div>
            
            <div className="p-4 border-t mt-auto">
              <Button className="w-full" variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouvelle conversation
              </Button>
            </div>
          </div>
          
          {/* Chat area */}
          {selectedConversation ? (
            <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl overflow-hidden flex flex-col h-full">
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.user.avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedConversation.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {selectedConversation.user.name}
                      {selectedConversation.user.isAffiliate && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Affilié N{selectedConversation.user.level}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-foreground/60">
                      {selectedConversation.user.lastSeen}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="rounded-full" title="Appel vocal">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" title="Appel vidéo">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" title="Informations">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'me' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {selectedConversation.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/30'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-[10px] opacity-70 mt-1 block text-right">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <Input
                  type="text"
                  placeholder="Écrivez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </form>
            </div>
          ) : (
            <div className="md:col-span-2 lg:col-span-3 glass-card rounded-xl flex flex-col items-center justify-center p-10">
              <User className="h-16 w-16 text-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">Aucune conversation sélectionnée</h3>
              <p className="text-foreground/60 text-center mb-6">
                Sélectionnez une conversation existante ou démarrez une nouvelle conversation
              </p>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouvelle conversation
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
