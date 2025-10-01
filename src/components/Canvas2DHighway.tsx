import React, { useEffect, useRef, useState } from 'react';

interface Canvas2DHighwayProps {
  className?: string;
}

class HighwayRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private particles: Array<{
    x: number;
    y: number;
    z: number;
    speed: number;
    color: string;
    size: number;
    type: 'star' | 'light' | 'line';
    opacity: number;
  }> = [];
  private isSpeedUp: boolean = false;
  private time: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;

    // Enable better rendering
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';

    this.initParticles();
    this.animate = this.animate.bind(this);
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setSpeedUp(speedUp: boolean) {
    this.isSpeedUp = speedUp;
  }

  private initParticles() {
    this.particles = [];

    // Clean, sharp stars
    for (let i = 0; i < 150; i++) {
      const starType = Math.random();

      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        z: Math.random() * 1000,
        speed: 0.5 + Math.random() * 1.5,
        color: starType < 0.8 ? '#ffffff' : '#e0e0e0',
        size: starType < 0.9 ? 0.8 + Math.random() * 0.7 : 1.2 + Math.random() * 0.8,
        type: 'star',
        opacity: 0.7 + Math.random() * 0.3
      });
    }

    // Highway center lines removed for cleaner look

    // Beautiful flowing lights
    for (let i = 0; i < 40; i++) {
      const isLeft = i % 2 === 0;
      const colors = isLeft
        ? ['#ff6b6b', '#ff5252', '#f44336'] // Warm reds
        : ['#42a5f5', '#2196f3', '#1976d2']; // Cool blues

      this.particles.push({
        x: isLeft ? this.width * 0.15 + Math.random() * 50 : this.width * 0.85 - Math.random() * 50,
        y: Math.random() * this.height,
        z: Math.random() * 1000,
        speed: 1.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.2 + Math.random() * 1.5,
        type: 'light',
        opacity: 0.7 + Math.random() * 0.3
      });
    }

    // Add occasional shooting stars
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        z: Math.random() * 1000,
        speed: 3 + Math.random() * 4,
        color: '#ffffff',
        size: 0.8 + Math.random() * 0.7,
        type: 'shooting',
        opacity: 0.9
      });
    }
  }

  private drawHighwayPerspective() {
    // Highway road surface removed for cleaner space background
  }

  private updateAndDrawParticles() {
    const speedMultiplier = this.isSpeedUp ? 4 : 1;

    this.particles.forEach((particle, index) => {
      // Update position
      particle.z -= particle.speed * speedMultiplier;

      if (particle.z <= 0) {
        particle.z = 1000;
        particle.y = Math.random() * this.height;
        if (particle.type === 'light') {
          particle.x = (index % 2 === 0) ? this.width * 0.3 : this.width * 0.7;
        } else if (particle.type === 'line') {
          particle.x = this.width / 2;
        } else {
          particle.x = Math.random() * this.width;
        }
      }

      // Calculate perspective
      const scale = 200 / (particle.z + 200);
      const x2d = (particle.x - this.width / 2) * scale + this.width / 2;
      const y2d = (particle.y - this.height / 2) * scale + this.height / 2;
      const size = particle.size * scale;

      // Draw particle
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity * scale;

      if (particle.type === 'star') {
        // Sharp, clean stars without blur
        this.ctx.globalAlpha = particle.opacity * scale;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(x2d, y2d, Math.max(0.5, size), 0, Math.PI * 2);
        this.ctx.fill();
      } else if (particle.type === 'line') {
        // Center lines removed for cleaner look
      } else if (particle.type === 'light') {
        // Beautiful glowing orbs
        this.ctx.globalAlpha = particle.opacity * scale;

        // Main bright center
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(x2d, y2d, size * 0.8, 0, Math.PI * 2);
        this.ctx.fill();

        // Soft outer glow
        this.ctx.globalAlpha = (particle.opacity * scale) * 0.4;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(x2d, y2d, size * 1.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Very subtle trail dots
        this.ctx.globalAlpha = (particle.opacity * scale) * 0.6;
        for (let i = 1; i <= 3; i++) {
          const trailY = y2d + (i * 8 * scale);
          const trailSize = size * (0.6 - i * 0.15);
          if (trailSize > 0.3) {
            this.ctx.beginPath();
            this.ctx.arc(x2d, trailY, trailSize, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      } else if (particle.type === 'shooting') {
        // Shooting stars with elegant trails
        this.ctx.globalAlpha = particle.opacity * scale;

        // Main star
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        this.ctx.fill();

        // Elegant trail line
        this.ctx.strokeStyle = particle.color;
        this.ctx.lineWidth = size * 0.3;
        this.ctx.globalAlpha = (particle.opacity * scale) * 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(x2d, y2d);
        this.ctx.lineTo(x2d - (15 * scale), y2d + (10 * scale));
        this.ctx.stroke();
      }

      this.ctx.restore();
    });
  }

  private drawCosmicEffects() {
    this.time += 0.01;

    // Subtle vignette for depth
    const vignette = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) / 2
    );
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(0.7, 'transparent');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

    this.ctx.fillStyle = vignette;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  animate() {
    // Clear canvas with solid black background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Draw highway
    this.drawHighwayPerspective();

    // Draw cosmic effects
    this.drawCosmicEffects();

    // Update and draw particles
    this.updateAndDrawParticles();
  }
}

const Canvas2DHighway: React.FC<Canvas2DHighwayProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<HighwayRenderer | null>(null);
  const animationRef = useRef<number>(0);
  const [isSpeedUp, setIsSpeedUp] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      if (rendererRef.current) {
        rendererRef.current.resize(rect.width, rect.height);
      }
    };

    resizeCanvas();

    rendererRef.current = new HighwayRenderer(canvas);

    const animate = () => {
      if (rendererRef.current) {
        rendererRef.current.animate();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setSpeedUp(isSpeedUp);
    }
  }, [isSpeedUp]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} cursor-pointer`}
      onMouseDown={() => setIsSpeedUp(true)}
      onMouseUp={() => setIsSpeedUp(false)}
      onMouseLeave={() => setIsSpeedUp(false)}
      onTouchStart={() => setIsSpeedUp(true)}
      onTouchEnd={() => setIsSpeedUp(false)}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Canvas2DHighway;