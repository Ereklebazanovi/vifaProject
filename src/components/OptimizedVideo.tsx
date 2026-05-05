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
    const shouldLoadVideo = shouldLoadMedia('video');

    // Debug logging
    console.log('OptimizedVideo debug:', {
      shouldLoadVideo,
      isMobile: deviceInfo.isMobile,
      hasSlowConnection: deviceInfo.hasSlowConnection,
      screenWidth: deviceInfo.screenWidth,
      src
    });

    // Always try to load video for desktop - simplified logic
    if (shouldLoadVideo || deviceInfo.screenWidth > 1024) {
      console.log('Setting shouldLoad to true for:', src);
      const delay = deviceInfo.hasSlowConnection ? 1000 : 100;
      const timer = setTimeout(() => {
        setShouldLoad(true);
        console.log('shouldLoad state updated to true for:', src);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Show animated background initially, but try loading video after delay
      setIsLoading(false);
      console.log('Using animated background initially for:', src);

      // Fallback: Try loading video after 3 seconds anyway (for better UX)
      const fallbackTimer = setTimeout(() => {
        console.log('Fallback: Attempting to load video after delay for:', src);
        setShouldLoad(true);
      }, 3000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [shouldLoadMedia, deviceInfo.hasSlowConnection, deviceInfo.isMobile, deviceInfo.screenWidth, src]);

  const handleLoadedData = () => {
    console.log('Video loaded successfully:', src);
    setIsLoading(false);
    onLoadedData?.();
  };

  const handleError = (e: any) => {
    console.error('Video failed to load:', src, e);
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Check what should be rendered
  console.log('Render decision for', src, {
    hasError,
    shouldLoadMedia: shouldLoadMedia('video'),
    shouldLoad,
    isLoading
  });

  // For mobile/slow connections or errors, show beautiful animated gradient
  if (hasError || (!shouldLoadMedia('video') && deviceInfo.screenWidth <= 1024)) {
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
          onLoadStart={() => console.log('Video load started:', src)}
          onCanPlay={() => console.log('Video can play:', src)}
          onPlaying={() => console.log('Video is playing:', src)}
          preload={settings.videoPreload as 'none' | 'metadata' | 'auto'}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Debug info */}
      {shouldLoad && (
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs p-2 rounded z-50">
          Video: {src.split('/').pop()}<br/>
          Loading: {isLoading ? 'Yes' : 'No'}<br/>
          ShouldLoad: {shouldLoad ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo;