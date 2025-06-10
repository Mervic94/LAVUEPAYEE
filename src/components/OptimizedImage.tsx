
import React, { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  quality?: number;
  lazy?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  quality = 80,
  lazy = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Générer l'URL optimisée (simulé - à adapter selon le service utilisé)
  const getOptimizedUrl = (originalSrc: string, w?: number, h?: number, q?: number) => {
    if (!w && !h) return originalSrc;
    
    // Pour un vrai service d'optimisation d'images
    // return `https://your-image-service.com/transform?url=${encodeURIComponent(originalSrc)}&w=${w}&h=${h}&q=${q}`;
    
    return originalSrc;
  };

  const optimizedSrc = getOptimizedUrl(src, width, height, quality);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          style={{ width, height }}
        >
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={alt}
              className="blur-sm opacity-50"
              style={{ width, height }}
            />
          ) : (
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          )}
        </div>
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ width, height }}
      />
    </div>
  );
};

export default OptimizedImage;
