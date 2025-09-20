import React, { useState, useEffect, useRef } from 'react';
import { useDeviceOptimizations } from '../utils/mobileOptimizations';

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onLoadedData?: () => void;
  onError?: () => void;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  className = '',
  style,
  onLoadedData,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { shouldLoadMedia, settings, deviceInfo } = useDeviceOptimizations();

  useEffect(() => {
    // Desktop with good connection: Load video immediately
    // Mobile or slow connection: Use animated gradient instead
    const shouldLoadVideo = shouldLoadMedia('video');

    if (shouldLoadVideo) {
      const delay = deviceInfo.hasSlowConnection ? 1500 : 300;
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Never load video on mobile/slow connections - use beautiful animated background
      setIsLoading(false);
    }
  }, [shouldLoadMedia, deviceInfo.hasSlowConnection]);

  const handleLoadedData = () => {
    setIsLoading(false);
    onLoadedData?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // For mobile/slow connections or errors, show beautiful animated gradient
  if (hasError || !shouldLoadMedia('video')) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950 relative overflow-hidden`}
        style={style}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-800/30 to-transparent" />
        </div>

        {/* Subtle moving elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"
             style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse"
             style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute top-2/3 left-1/2 w-20 h-20 bg-slate-500/5 rounded-full blur-xl animate-pulse"
             style={{ animationDelay: '1s', animationDuration: '5s' }} />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Beautiful loading gradient while video loads */}
      {isLoading && shouldLoad && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950 ${className}`}
          style={style}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10 animate-pulse" />
        </div>
      )}

      {/* Video for desktop/good connections */}
      {shouldLoad && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
          style={style}
          onLoadedData={handleLoadedData}
          onError={handleError}
          preload={settings.videoPreload as 'none' | 'metadata' | 'auto'}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default OptimizedVideo;