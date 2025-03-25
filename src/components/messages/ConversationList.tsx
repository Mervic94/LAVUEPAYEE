
import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
    lastSeen: string;
    isAffiliate?: boolean;
    level?: number;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
    sender: string;
  };
  unread: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  searchQuery: string;
  selectedConversation: Conversation | null;
  onSearchChange: (query: string) => void;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  searchQuery,
  selectedConversation,
  onSearchChange,
  onSelectConversation,
  onNewConversation
}) => {
  const filteredConversations = searchQuery
    ? conversations.filter(convo => 
        convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="md:col-span-1 glass-card rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
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
              onClick={() => onSelectConversation(conversation)}
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
        <Button className="w-full" variant="outline" onClick={onNewConversation}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouvelle conversation
        </Button>
      </div>
    </div>
  );
};

export default ConversationList;
