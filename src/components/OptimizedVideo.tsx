import React, { useState, useEffect, useRef } from 'react';
import { useDeviceOptimizations } from '../utils/mobileOptimizations';

interface OptimizedVideoProps {
  src: string;
  fallbackImage?: string;
  className?: string;
  style?: React.CSSProperties;
  onLoadedData?: () => void;
  onError?: () => void;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  fallbackImage,
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
    // Use device-aware loading strategy
    const shouldLoadVideo = shouldLoadMedia('video');

    if (shouldLoadVideo) {
      // Load immediately on desktop with good connection
      const delay = deviceInfo.hasSlowConnection ? 2000 : 500;
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);
      return () => clearTimeout(timer);
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

  // Force load video (for user interaction)
  const forceLoad = () => {
    setShouldLoad(true);
  };

  const showLoadButton = !shouldLoadMedia('video') && !shouldLoad;

  if (hasError || showLoadButton) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center`}
        style={style}
      >
        {showLoadButton && (
          <button
            onClick={forceLoad}
            className="bg-blue-500/20 border border-blue-400/30 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            {deviceInfo.isMobile ? 'Tap to Load Video' : 'Load Video'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Loading state */}
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${className}`}
          style={style}
        />
      )}

      {/* Video */}
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
          controls={settings.showVideoControls}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default OptimizedVideo;