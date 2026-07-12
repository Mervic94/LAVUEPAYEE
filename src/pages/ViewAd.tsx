
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Clock, Eye, X, CheckCircle, Shield, Facebook, Instagram, Youtube, BadgeDollarSign, Loader2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';

const ViewAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { refreshProfile } = useAuth();

  
  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [adWatched, setAdWatched] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [points, setPoints] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  
  // Mock ad data - In a real app, this would be fetched based on the ID
  const mockAds = [
    {
      id: '1',
      title: 'Nouvelle collection de vêtements écologiques',
      description: 'Découvrez notre nouvelle gamme de vêtements fabriqués à partir de matériaux recyclés. Notre engagement pour l\'environnement se reflète dans chaque pièce de notre collection, conçue pour durer et minimiser l\'impact sur la planète.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      duration: 45,
      reward: 50,
      provider: 'Facebook',
      adType: 'banner'
    },
    {
      id: '2',
      title: 'Promotion exclusive sur notre gamme de smartphones',
      description: 'Profitez de remises exceptionnelles sur notre nouvelle gamme de smartphones. Des performances incroyables et un design élégant à prix réduit pour une durée limitée.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      duration: 30,
      reward: 35,
      provider: 'Google Ads',
      adType: 'interstitial'
    },
    {
      id: '3',
      title: 'Découvrez notre nouvelle plateforme de streaming',
      description: 'Des milliers de films et séries vous attendent sur notre plateforme. Profitez du premier mois gratuit et découvrez un catalogue varié pour toute la famille.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1522869635100-187f6605241d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWFtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      duration: 55,
      reward: 65,
      provider: 'Youtube',
      adType: 'video'
    },
    {
      id: '4',
      title: 'Offre spéciale voyage: -30% sur votre prochain séjour',
      description: 'Planifiez vos vacances et bénéficiez de -30% sur votre prochain séjour dans l\'un de nos hôtels partenaires. Une occasion unique de découvrir des destinations de rêve à prix mini.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      duration: 40,
      reward: 45,
      provider: 'Instagram',
      adType: 'native'
    }
  ];
  
  const mockAd = mockAds.find(ad => ad.id === id) || mockAds[0];
  
  // Calculate reward based on ad type, duration and provider
  const calculateReward = () => {
    let baseReward = mockAd.reward;
    
    // Adjust based on ad type
    switch (mockAd.adType) {
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
    if (mockAd.duration > 50) {
      baseReward *= 1.2; // 20% more for longer ads
    } else if (mockAd.duration < 20) {
      baseReward *= 0.8; // 20% less for very short ads
    }
    
    // Adjust based on provider
    switch (mockAd.provider) {
      case 'Facebook':
      case 'Instagram':
        baseReward *= 1.1; // 10% more for social media ads
        break;
      case 'Youtube':
        baseReward *= 1.2; // 20% more for YouTube ads
        break;
      default:
        break;
    }
    
    return Math.round(baseReward);
  };
  
  // Generate verification code
  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
    return code;
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handle video play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / videoDuration) * 100);
      
      // Check if video has been watched at least 90% and show verification
      if (current >= videoDuration * 0.9 && !showVerification && !adWatched) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowVerification(true);
        generateVerificationCode();
      }
    }
  };
  
  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // Handle clicking on progress bar - Disabled to prevent skipping
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // No operation - skipping is disabled
    toast({
      title: "Contrôle de lecture désactivé",
      description: "Vous devez regarder la publicité en entier pour gagner des LVP.",
      variant: "destructive",
    });
  };
  
  // Handle verification submit
  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInputCode === verificationCode) {
      const calculatedReward = calculateReward();
      setAdWatched(true);
      setShowVerification(false);
      setPoints(calculatedReward);
      toast({
        title: "Félicitations!",
        description: `Vous avez gagné ${calculatedReward} LVP!`,
      });
    } else {
      setVerificationAttempts(prev => prev + 1);
      
      if (verificationAttempts >= 2) {
        toast({
          title: "Trop de tentatives incorrectes",
          description: "Veuillez réessayer plus tard.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Code incorrect",
          description: "Veuillez réessayer.",
          variant: "destructive",
        });
        // Generate a new code after failed attempt
        generateVerificationCode();
        setUserInputCode('');
      }
    }
  };
  
  // Return to dashboard
  const returnToDashboard = () => {
    navigate('/dashboard');
  };
  
  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Video play failed:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  // Get the appropriate provider icon
  const getProviderIcon = () => {
    switch (mockAd.provider) {
      case 'Facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'Youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      case 'Google Ads':
        return <div className="flex h-5 w-5 items-center justify-center font-bold text-xs">G</div>;
      default:
        return <Eye className="h-5 w-5" />;
    }
  };

  // Get advertisement type label
  const getAdTypeLabel = () => {
    switch (mockAd.adType) {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-6 mx-auto max-w-7xl pt-20 pb-12">
        <div className="glass-card rounded-xl overflow-hidden shadow-lg">
          {/* Video Player */}
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src={mockAd.videoUrl}
              poster={mockAd.thumbnail}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
            />
            
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 h-10 w-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
              onClick={returnToDashboard}
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Verification overlay */}
            {showVerification && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 p-6">
                <div className="glass-card bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-green-600/20 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Vérification humaine</h3>
                      <p className="text-white/70">Entrez le code ci-dessous pour confirmer que vous êtes humain</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <p className="text-4xl font-mono text-center tracking-widest text-white">{verificationCode}</p>
                  </div>
                  
                  <form onSubmit={handleVerificationSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="verificationCode" className="block text-sm font-medium text-white/70 mb-1">
                        Code de vérification
                      </label>
                      <Input 
                        id="verificationCode" 
                        type="text" 
                        maxLength={4}
                        value={userInputCode}
                        onChange={(e) => setUserInputCode(e.target.value)}
                        placeholder="Entrez le code à 4 chiffres"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button type="submit" className="flex-grow bg-green-600 hover:bg-green-700">
                        Valider
                      </Button>
                      <Button variant="outline" type="button" onClick={returnToDashboard} className="bg-transparent border-white/30 text-white hover:bg-white/10">
                        Annuler
                      </Button>
                    </div>
                    
                    <p className="text-sm text-white/50 text-center">
                      Il vous reste {3 - verificationAttempts} tentative(s)
                    </p>
                  </form>
                </div>
              </div>
            )}
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col">
              {/* Progress bar */}
              <div 
                className="w-full h-1.5 bg-white/30 rounded-full mb-4 cursor-not-allowed"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause button */}
                  <button 
                    className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white" />
                    )}
                  </button>
                  
                  {/* Timer */}
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Points indicator */}
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-sm font-medium ${
                    adWatched ? 'bg-green-500' : 'bg-white/20 backdrop-blur-sm'
                  } transition-colors`}>
                    {adWatched ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <BadgeDollarSign className="h-4 w-4" />
                    )}
                    <span>{adWatched ? 'Points gagnés!' : `${calculateReward()} LVP à gagner`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ad Information */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {getProviderIcon()}
                </div>
                <span className="text-sm font-medium text-gray-600">Publicité {mockAd.provider}</span>
              </div>
              <div className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                {getAdTypeLabel()}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{mockAd.title}</h1>
            <p className="text-foreground/70 mb-6">{mockAd.description}</p>
            
            {adWatched ? (
              <div className="glass-card rounded-lg p-4 bg-green-50 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Félicitations!</h3>
                    <p className="text-foreground/70">
                      Vous avez gagné {points} LVP en regardant cette publicité.
                      {points >= 700 && (
                        <span className="block mt-1 text-green-600 font-medium">
                          Cela équivaut à {(points / 700).toFixed(2)} Vuecoins!
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={returnToDashboard}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Retourner au tableau de bord
                </Button>
              </div>
            ) : (
              <div className="glass-card rounded-lg p-4 bg-green-600/5 border border-green-600/20">
                <p className="text-center text-foreground/70">
                  Regardez cette publicité jusqu'à la fin pour gagner {calculateReward()} LVP.
                  <span className="block mt-1 text-xs text-foreground/50">
                    Le déplacement dans la vidéo n'est pas autorisé pour garantir l'intégrité du visionnage
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewAd;
