
import React, { useState } from 'react';
import { Play, Clock, Tag, Gift, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import PointsIndicator from './PointsIndicator';


interface AdCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  reward: number; // points
  adType?: 'banner' | 'interstitial' | 'video' | 'native' | 'popup' | 'audio';
  provider?: string;
  onTaskComplete?: (reward: number) => void;
}

const AdCard: React.FC<AdCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  duration,
  reward,
  adType = 'banner',
  provider = 'LAVUEPAYEE',
  onTaskComplete
}) => {
  const [isWatching, setIsWatching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const { refreshProfile } = useAuth();

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
      case 'popup':
        return 'Popup';
      case 'audio':
        return 'Audio';
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
      case 'popup':
        baseReward *= 1.4; // 40% more for popup ads
        break;
      case 'audio':
        baseReward *= 1.2; // 20% more for audio ads
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

  const handleWatchAd = async () => {
    if (isWatching || isCompleted) return;

    // Désactive immédiatement le bouton pour éviter le spam-click
    setIsWatching(true);

    try {
      // Simule le visionnage (délai minimal côté UI)
      await new Promise(resolve => setTimeout(resolve, Math.min(duration * 100, 3000)));

      // Appel RPC sécurisé (cooldown 30s, anti-duplicata, crédit atomique côté serveur)
      const { data, error } = await supabase.rpc('claim_video_reward', {
        video_id: id,
      });

      if (error) {
        console.error('claim_video_reward error:', error);
        const msg = error.message || '';
        const isCooldown = /trop rapide|patientez/i.test(msg);
        const isDuplicate = /déjà réclamée/i.test(msg);
        toast({
          title: isCooldown ? '⏱️ Attendez un instant' : isDuplicate ? 'Déjà validé' : 'Validation refusée',
          description: msg || 'Impossible de valider la récompense.',
          variant: 'destructive',
        });
        return;
      }

      const earned = Number((data as any)?.points_earned) || calculateReward();
      setIsCompleted(true);
      onTaskComplete?.(earned);

      // Rafraîchit le solde affiché
      await refreshProfile();

      toast({
        title: 'Félicitations !',
        description: `Vous avez gagné ${earned} LVP !`,
      });
    } catch (err: any) {
      console.error('Error watching ad:', err);
      toast({
        title: 'Erreur',
        description: err?.message || 'Une erreur est survenue pendant le visionnage.',
        variant: 'destructive',
      });
    } finally {
      setIsWatching(false);
    }
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
          onError={(e) => {
            e.currentTarget.src = '/lovable-uploads/04282974-27aa-4e80-9818-043448844ed9.png';
          }}
        />
        
        {/* Ad Type Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-amber-400/90 text-green-900 border-none"
        >
          <Tag className="h-3 w-3 mr-1" />
          {getAdTypeLabel()}
        </Badge>

        {/* Duration Badge */}
        <Badge variant="secondary" className="absolute top-2 right-2 bg-black/70 text-white border-none">
          <Clock className="h-3 w-3 mr-1" />
          {formatDuration(duration)}
        </Badge>

        {/* Completion overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-lg font-semibold bg-green-500 px-4 py-2 rounded-full">
              ✓ Terminé
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs bg-primary/90 text-white px-2 py-1 rounded-full backdrop-blur-xs">
              <Gift className="h-3 w-3" />
              <PointsIndicator points={calculateReward()} size="sm" />
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
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-primary" />
            <PointsIndicator points={calculateReward()} size="sm" />
          </div>

          <Button 
            onClick={handleWatchAd}
            disabled={isWatching || isCompleted}
            variant={isCompleted ? "secondary" : "default"}
            size="sm"
            className="font-medium"
          >
            {isWatching ? (
              <><Loader2 className="h-3 w-3 mr-1 animate-spin" /> Validation...</>
            ) : isCompleted ? "Terminé" : "Regarder"}
          </Button>

        </div>
      </div>
    </div>
  );
};

export default AdCard;
