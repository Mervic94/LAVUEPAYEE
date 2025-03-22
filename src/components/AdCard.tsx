
import React from 'react';
import { Play, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AdCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  reward: number; // points
  adType?: 'banner' | 'interstitial' | 'video' | 'native';
  provider?: string;
}

const AdCard: React.FC<AdCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  duration,
  reward,
  adType = 'banner',
  provider = 'LAVUEPAYEE'
}) => {
  // Format duration as MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get ad type label
  const getAdTypeLabel = () => {
    switch (adType) {
      case 'banner':
        return 'Bannière';
      case 'interstitial':
        return 'Interstitielle';
      case 'video':
        return 'Vidéo';
      case 'native':
        return 'Native';
      default:
        return 'Bannière';
    }
  };

  // Calculate actual reward based on ad type and duration
  const calculateReward = () => {
    let baseReward = reward;
    
    // Adjust based on ad type
    switch (adType) {
      case 'interstitial':
        baseReward *= 1.2; // 20% more for interstitial ads
        break;
      case 'video':
        baseReward *= 1.5; // 50% more for video ads
        break;
      case 'native':
        baseReward *= 1.3; // 30% more for native ads
        break;
      default:
        break;
    }
    
    // Adjust based on duration
    if (duration > 50) {
      baseReward *= 1.2; // 20% more for longer ads
    } else if (duration < 20) {
      baseReward *= 0.8; // 20% less for very short ads
    }
    
    return Math.round(baseReward);
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
              <div className="h-3 w-3 rounded-full bg-green-600 flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png" 
                  alt="LVP" 
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              {calculateReward()} pts
            </span>
            <span className="flex items-center gap-1 text-xs bg-amber-400/90 text-green-900 px-2 py-1 rounded-full backdrop-blur-xs">
              <Tag className="h-3 w-3" />
              {getAdTypeLabel()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <span className="text-xs text-gray-500">{provider}</span>
        </div>
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
