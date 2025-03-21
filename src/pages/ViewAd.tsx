
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Clock, BadgeDollarSign, X, CheckCircle, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ViewAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
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
  const mockAd = {
    id: '1',
    title: 'Nouvelle collection de vêtements écologiques',
    description: 'Découvrez notre nouvelle gamme de vêtements fabriqués à partir de matériaux recyclés. Notre engagement pour l\'environnement se reflète dans chaque pièce de notre collection, conçue pour durer et minimiser l\'impact sur la planète.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Sample video
    thumbnail: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    duration: 45,
    reward: 50
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
  
  // Handle clicking on progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      
      const newTime = clickPosition * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPosition * 100);
    }
  };
  
  // Handle verification submit
  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInputCode === verificationCode) {
      setAdWatched(true);
      setShowVerification(false);
      setPoints(mockAd.reward);
      toast({
        title: "Félicitations!",
        description: `Vous avez gagné ${mockAd.reward} points!`,
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
                    <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
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
                      <Button type="submit" className="flex-grow">
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
                className="w-full h-1.5 bg-white/30 rounded-full mb-4 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-primary rounded-full"
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
                    <span>{adWatched ? 'Points gagnés!' : `${mockAd.reward} points à gagner`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ad Information */}
          <div className="p-6">
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
                    <p className="text-foreground/70">Vous avez gagné {points} points en regardant cette publicité.</p>
                  </div>
                </div>
                
                <Button 
                  onClick={returnToDashboard}
                  className="w-full"
                >
                  Retourner au tableau de bord
                </Button>
              </div>
            ) : (
              <div className="glass-card rounded-lg p-4 bg-primary/5 border border-primary/20">
                <p className="text-center text-foreground/70">
                  Regardez cette publicité jusqu'à la fin pour gagner {mockAd.reward} points.
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
