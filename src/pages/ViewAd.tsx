
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Clock, BadgeDollarSign, X, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ViewAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [adWatched, setAdWatched] = useState(false);
  const [points, setPoints] = useState(0);
  
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
      
      // Check if video has been watched at least 90%
      if (current >= videoDuration * 0.9 && !adWatched) {
        setAdWatched(true);
        setPoints(mockAd.reward);
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
                
                <button 
                  className="btn-primary w-full"
                  onClick={returnToDashboard}
                >
                  Retourner au tableau de bord
                </button>
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
