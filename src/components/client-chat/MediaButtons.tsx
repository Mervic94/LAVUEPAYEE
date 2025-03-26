
import React from 'react';
import { Image, FileMusic, Video, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaButtonsProps {
  onSelectMediaType: (type: 'image' | 'audio' | 'video') => void;
  userLvpBalance: number;
}

const MediaButtons: React.FC<MediaButtonsProps> = ({ onSelectMediaType, userLvpBalance }) => {
  return (
    <div className="flex gap-2 mb-2">
      <Button 
        type="button" 
        variant="outline" 
        size="icon"
        onClick={() => onSelectMediaType('image')}
        title="Envoyer une image (3 LVP)"
      >
        <Image className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="icon"
        onClick={() => onSelectMediaType('audio')}
        title="Envoyer un fichier audio (4 LVP)"
      >
        <FileMusic className="h-4 w-4" />
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        size="icon"
        onClick={() => onSelectMediaType('video')}
        title="Envoyer une vidéo (5 LVP)"
      >
        <Video className="h-4 w-4" />
      </Button>
      <div className="ml-auto flex items-center gap-2 text-sm text-foreground/60">
        <DollarSign className="h-4 w-4" />
        {userLvpBalance} LVP
      </div>
    </div>
  );
};

export default MediaButtons;
