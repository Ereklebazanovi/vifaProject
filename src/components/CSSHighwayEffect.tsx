import React, { useState, useRef } from 'react';

interface CSSHighwayEffectProps {
  className?: string;
}

const CSSHighwayEffect: React.FC<CSSHighwayEffectProps> = ({ className = '' }) => {
  const [isSpeedUp, setIsSpeedUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`${className} overflow-hidden cursor-pointer`}
      onMouseDown={() => setIsSpeedUp(true)}
      onMouseUp={() => setIsSpeedUp(false)}
      onMouseLeave={() => setIsSpeedUp(false)}
      onTouchStart={() => setIsSpeedUp(true)}
      onTouchEnd={() => setIsSpeedUp(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

      {/* Highway lines */}
      <div className="absolute inset-0 perspective-1000">
        {/* Center divider lines */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`center-${i}`}
            className={`absolute w-1 bg-white transform-gpu ${
              isSpeedUp ? 'animate-highway-fast' : 'animate-highway'
            }`}
            style={{
              left: '50%',
              height: `${Math.random() * 20 + 10}px`,
              top: `${i * 4}%`,
              animationDelay: `${i * 0.1}s`,
              transform: 'translateX(-50%) rotateX(75deg)',
            }}
          />
        ))}

        {/* Side barriers */}
        <div className={`absolute inset-0 ${isSpeedUp ? 'animate-barrier-fast' : 'animate-barrier'}`}>
          {[...Array(30)].map((_, i) => (
            <React.Fragment key={`barriers-${i}`}>
              {/* Left barrier */}
              <div
                className="absolute w-2 h-8 bg-blue-400 transform-gpu"
                style={{
                  left: '20%',
                  top: `${i * 6}%`,
                  transform: 'rotateX(75deg)',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
              {/* Right barrier */}
              <div
                className="absolute w-2 h-8 bg-blue-400 transform-gpu"
                style={{
                  right: '20%',
                  top: `${i * 6}%`,
                  transform: 'rotateX(75deg)',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Moving light trails - Left side (red) */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`red-${i}`}
            className={`absolute transform-gpu ${
              isSpeedUp ? 'animate-lights-red-fast' : 'animate-lights-red'
            }`}
            style={{
              left: `${25 + (i % 2) * 8}%`,
              width: '3px',
              height: `${50 + Math.random() * 100}px`,
              background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.8), transparent)',
              animationDelay: `${i * 0.3}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Moving light trails - Right side (blue) */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`blue-${i}`}
            className={`absolute transform-gpu ${
              isSpeedUp ? 'animate-lights-blue-fast' : 'animate-lights-blue'
            }`}
            style={{
              right: `${25 + (i % 2) * 8}%`,
              width: '3px',
              height: `${50 + Math.random() * 100}px`,
              background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.8), transparent)',
              animationDelay: `${i * 0.4}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Particle stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`absolute w-1 h-1 bg-white rounded-full transform-gpu ${
              isSpeedUp ? 'animate-stars-fast' : 'animate-stars'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 -translate-x-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default CSSHighwayEffect;