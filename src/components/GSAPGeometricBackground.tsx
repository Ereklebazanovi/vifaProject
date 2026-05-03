import React, { useEffect, useRef, useState } from 'react';

interface GSAPGeometricBackgroundProps {
  className?: string;
}

const GSAPGeometricBackground: React.FC<GSAPGeometricBackgroundProps> = ({
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpeedUp, setIsSpeedUp] = useState(false);

  useEffect(() => {
    // Dynamic import of GSAP for lazy loading
    const initGSAP = async () => {
      const { gsap } = await import('gsap');

      if (!containerRef.current) return;

      // Set up timeline
      const tl = gsap.timeline({ repeat: -1 });

      // Animate geometric shapes
      gsap.set('.geo-shape', {
        opacity: 0,
        scale: 0,
        rotation: 0
      });

      // Staggered entrance
      tl.to('.geo-shape', {
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 2,
        stagger: 0.1,
        ease: 'power2.out'
      })
      .to('.geo-shape', {
        rotation: '+=360',
        duration: 10,
        ease: 'none'
      }, 0)
      .to('.floating-orb', {
        y: -30,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      }, 0);

      // Particle system
      gsap.set('.particle', {
        opacity: 0,
        scale: 0,
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight
      });

      gsap.to('.particle', {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.02,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      // Speed up effect
      const speedUpHandler = () => {
        gsap.to(tl, { timeScale: 3, duration: 0.3 });
        gsap.to('.speed-line', {
          scaleX: 2,
          opacity: 1,
          duration: 0.2,
          stagger: 0.02
        });
      };

      const normalSpeedHandler = () => {
        gsap.to(tl, { timeScale: 1, duration: 0.5 });
        gsap.to('.speed-line', {
          scaleX: 1,
          opacity: 0.3,
          duration: 0.5,
          stagger: 0.02
        });
      };

      return { speedUpHandler, normalSpeedHandler };
    };

    initGSAP().then(() => {
      // GSAP animations initialized
    });

    return () => {
      // Cleanup GSAP animations
      if (typeof window !== 'undefined' && window.gsap) {
        window.gsap.killTweensOf('*');
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} overflow-hidden cursor-pointer relative`}
      onMouseDown={() => setIsSpeedUp(true)}
      onMouseUp={() => setIsSpeedUp(false)}
      onMouseLeave={() => setIsSpeedUp(false)}
      onTouchStart={() => setIsSpeedUp(true)}
      onTouchEnd={() => setIsSpeedUp(false)}
    >
      {/* Background gradient */}
      {isSpeedUp && <div className="sr-only">Speed up active</div>}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      {/* Geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`geo-${i}`}
            className="geo-shape absolute border-2 border-blue-400/30"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 25}%`,
              width: `${40 + Math.random() * 60}px`,
              height: `${40 + Math.random() * 60}px`,
              borderRadius: i % 3 === 0 ? '50%' : i % 2 === 0 ? '0' : '20%',
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="floating-orb absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-70"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Speed lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`speed-${i}`}
            className="speed-line absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            style={{
              left: '0',
              right: '0',
              top: `${i * 5}%`,
              transform: 'scaleX(1)',
              transformOrigin: 'left center',
            }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Central focus point */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 border-2 border-blue-400/40 rounded-full animate-ping" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 border-2 border-purple-400/60 rounded-full animate-pulse" />
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default GSAPGeometricBackground;