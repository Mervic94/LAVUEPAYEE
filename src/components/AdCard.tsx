
import React from 'react';
import { Play, Clock, BadgeDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AdCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  reward: number; // points
}

const AdCard: React.FC<AdCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  duration,
  reward
}) => {
  // Format duration as MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative rounded-xl overflow-hidden card-hover bg-white">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-xs">
              <Clock className="h-3 w-3" />
              {formatDuration(duration)}
            </span>
            <span className="flex items-center gap-1 text-xs bg-primary/90 text-white px-2 py-1 rounded-full backdrop-blur-xs">
              <BadgeDollarSign className="h-3 w-3" />
              {reward} pts
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{description}</p>
        
        <Button asChild variant="default" size="sm" className="w-full group-hover:bg-primary transition-colors">
          <Link to={`/view-ad/${id}`} className="flex items-center justify-center gap-2">
            <Play className="h-4 w-4" />
            Regarder et gagner
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdCard;
