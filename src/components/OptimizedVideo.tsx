import React, { useEffect, useRef, useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onCanPlay?: () => void;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className = '',
  style,
  muted = true,
  loop = true,
  autoPlay = true,
  playsInline = true,
  preload = 'metadata',
  onCanPlay
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !videoRef.current) return;

    const video = videoRef.current;

    const handleCanPlay = () => {
      setIsLoaded(true);
      onCanPlay?.();
    };

    const handleError = () => {
      setError(true);
      console.error('Video failed to load:', src);
    };

    const handleLoadedData = () => {
      if (autoPlay && video.paused) {
        video.play().catch(() => {
          console.warn('Autoplay prevented for video:', src);
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    // Only set src when visible to trigger loading
    if (!video.src && isVisible) {
      video.src = src;
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isVisible, src, autoPlay, onCanPlay]);

  if (error) {
    return (
      <div className={`bg-slate-800 flex items-center justify-center ${className}`}>
        <div className="text-center text-slate-400">
          <div className="text-4xl mb-2">⚠️</div>
          <p>ვიდეოს ჩატვირთვა ვერ მოხერხდა</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">ვიდეო იტვირთება...</p>
          </div>
        </div>
      )}

      {/* Poster image as fallback */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        poster={poster}
        style={{
          transform: 'translateZ(0)', // Hardware acceleration
          backfaceVisibility: 'hidden',
          ...style
        }}
      >
        <source src={isVisible ? src : undefined} type="video/mp4" />
        თქვენი ბრაუზერი არ უჭერს მხარს ვიდეო ელემენტს.
      </video>
    </div>
  );
};

export default OptimizedVideo;