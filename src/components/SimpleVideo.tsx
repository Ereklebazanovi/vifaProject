import React, { useState } from 'react';

interface SimpleVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: () => void;
}

const SimpleVideo: React.FC<SimpleVideoProps> = ({
  src,
  className = '',
  style,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    console.error('Video failed to load:', src);
    setHasError(true);
    onError?.();
  };

  const handleLoad = () => {
    console.log('Video loaded successfully:', src);
    setIsLoaded(true);
  };

  if (hasError) {
    // Beautiful CSS-only animated background as fallback
    return (
      <div
        className={`${className} relative overflow-hidden`}
        style={style}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950" />

        {/* Animated overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/30 to-blue-900/20 animate-pulse"
               style={{ animationDuration: '4s' }} />
        </div>

        {/* Moving elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"
             style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse"
             style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute top-2/3 left-1/2 w-20 h-20 bg-slate-500/10 rounded-full blur-2xl animate-pulse"
             style={{ animationDelay: '1s', animationDuration: '5s' }} />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Always show background first */}
      <div className={`absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${className}`} style={style} />

      {/* Simple video - no complex logic */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        style={style}
        onLoadedData={handleLoad}
        onError={handleError}
        onCanPlay={() => console.log('Video can play:', src)}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SimpleVideo;