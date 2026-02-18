import React, { useEffect, useRef } from 'react';

interface BeautifulBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'blue' | 'purple' | 'green' | 'orange';
}

const BeautifulBackground: React.FC<BeautifulBackgroundProps> = ({
  className = '',
  style,
  variant = 'default'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      glowColor: string;
    }> = [];

    // Color schemes based on variant
    const colorSchemes = {
      default: {
        particles: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'],
        glows: ['#3b82f650', '#8b5cf650', '#06b6d450', '#10b98150'],
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      },
      blue: {
        particles: ['#3b82f6', '#1d4ed8', '#2563eb', '#1e40af'],
        glows: ['#3b82f650', '#1d4ed850', '#2563eb50', '#1e40af50'],
        gradient: 'linear-gradient(135deg, #0c1426 0%, #1e293b 50%, #0c1426 100%)'
      },
      purple: {
        particles: ['#8b5cf6', '#7c3aed', '#a855f7', '#9333ea'],
        glows: ['#8b5cf650', '#7c3aed50', '#a855f750', '#9333ea50'],
        gradient: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b69 50%, #1a0f2e 100%)'
      },
      green: {
        particles: ['#10b981', '#059669', '#34d399', '#06b6d4'],
        glows: ['#10b98150', '#05966950', '#34d39950', '#06b6d450'],
        gradient: 'linear-gradient(135deg, #0a2e1a 0%, #1f2937 50%, #0a2e1a 100%)'
      },
      orange: {
        particles: ['#f59e0b', '#d97706', '#f97316', '#ea580c'],
        glows: ['#f59e0b50', '#d9770650', '#f9731650', '#ea580c50'],
        gradient: 'linear-gradient(135deg, #2d1b0f 0%, #1f2937 50%, #2d1b0f 100%)'
      }
    };

    const scheme = colorSchemes[variant];

    // Create particles
    const createParticle = () => {
      const colorIndex = Math.floor(Math.random() * scheme.particles.length);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: scheme.particles[colorIndex],
        glowColor: scheme.glows[colorIndex]
      };
    };

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

    // Floating orbs
    const orbs: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      phase: number;
    }> = [];

    // Create orbs
    for (let i = 0; i < 8; i++) {
      const colorIndex = Math.floor(Math.random() * scheme.particles.length);
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 50 + 30,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.1 + 0.05,
        color: scheme.particles[colorIndex],
        phase: Math.random() * Math.PI * 2
      });
    }

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update orbs
      orbs.forEach((orb) => {
        // Update position
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        orb.phase += 0.02;

        // Bounce off edges
        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.speedX *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.speedY *= -1;

        // Breathing effect
        const breathe = Math.sin(orb.phase) * 0.3 + 1;
        const currentRadius = orb.radius * breathe;
        
        // Create gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
        gradient.addColorStop(0, orb.color + Math.floor(orb.opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, orb.color + '00');
        
        // Draw orb
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw and update particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Slight opacity fluctuation
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));

        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Glow effect
        ctx.shadowColor = particle.glowColor;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = scheme.particles[0] + '20';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [variant]);

  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={style}
    >
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: {
            default: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            blue: 'linear-gradient(135deg, #0c1426 0%, #1e293b 50%, #0c1426 100%)',
            purple: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b69 50%, #1a0f2e 100%)',
            green: 'linear-gradient(135deg, #0a2e1a 0%, #1f2937 50%, #0a2e1a 100%)',
            orange: 'linear-gradient(135deg, #2d1b0f 0%, #1f2937 50%, #2d1b0f 100%)'
            
          }[variant]
        }}
      />

      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
    </div>
  );
};

export default BeautifulBackground;