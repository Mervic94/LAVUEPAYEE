
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, Info } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string | null;
  lastSeen: string;
  isAffiliate?: boolean;
  level?: number;
}

interface ConversationHeaderProps {
  user: User;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ user }) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.avatar || undefined} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-medium flex items-center gap-2">
            {user.name}
            {user.isAffiliate && (
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Affilié N{user.level}
              </span>
            )}
          </h3>
          <p className="text-xs text-foreground/60">
            {user.lastSeen}
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
  );
};

export default ConversationHeader;
