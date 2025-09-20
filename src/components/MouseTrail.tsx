import React, { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  opacity: number;
  size: number;
  age: number;
  velocity: { x: number; y: number };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

interface RippleEffect {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  startTime: number;
  color: string;
}

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

const MouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<RippleEffect[]>([]);
  const animationId = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothMousePos = useRef({ x: -100, y: -100 });
  const lastMoveTime = useRef<number>(0);
  const lastMousePos = useRef({ x: -100, y: -100 });
  const mouseSpeed = useRef<number>(0);
  const isMoving = useRef<boolean>(false);
  const isHovering = useRef<boolean>(false);
  const currentTheme = useRef<ColorTheme>({
    primary: '59, 130, 246',
    secondary: '99, 102, 241',
    accent: '147, 51, 234',
    glow: '139, 92, 246'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Enhanced color themes based on page sections
    const getColorTheme = (y: number): ColorTheme => {
      const windowHeight = window.innerHeight;
      const section = Math.floor((y / windowHeight) * 4);

      switch (section) {
        case 0: // Header/Hero
          return {
            primary: '59, 130, 246', // Blue
            secondary: '99, 102, 241',
            accent: '147, 51, 234',
            glow: '139, 92, 246'
          };
        case 1: // Services
          return {
            primary: '16, 185, 129', // Green
            secondary: '5, 150, 105',
            accent: '6, 182, 212',
            glow: '14, 165, 233'
          };
        case 2: // About/Process
          return {
            primary: '245, 101, 101', // Red/Pink
            secondary: '236, 72, 153',
            accent: '168, 85, 247',
            glow: '217, 70, 239'
          };
        default: // Footer
          return {
            primary: '251, 146, 60', // Orange
            secondary: '245, 101, 101',
            accent: '236, 72, 153',
            glow: '168, 85, 247'
          };
      }
    };

    // Check if hovering over interactive elements
    const checkHoverState = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      isHovering.current = !!(element && (
        element.tagName === 'BUTTON' ||
        element.tagName === 'A' ||
        element.getAttribute('role') === 'button' ||
        element.classList.contains('cursor-pointer') ||
        element.closest('button') ||
        element.closest('a') ||
        element.closest('.cursor-pointer')
      ));
    };

    // Create particles based on mouse speed
    const createParticles = (x: number, y: number, speed: number) => {
      if (speed < 3) return; // Only create particles when moving fast

      const particleCount = Math.min(Math.floor(speed / 5), 8);
      const theme = currentTheme.current;

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * speed * 0.3,
          vy: (Math.random() - 0.5) * speed * 0.3,
          life: 1,
          maxLife: 30 + Math.random() * 30,
          size: 1 + Math.random() * 3,
          color: [theme.primary, theme.secondary, theme.accent][Math.floor(Math.random() * 3)],
          alpha: 0.8
        });
      }

      // Limit particle count for performance
      if (particles.current.length > 150) {
        particles.current = particles.current.slice(0, 150);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      lastMoveTime.current = now;
      isMoving.current = true;

      // Calculate mouse speed
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      mouseSpeed.current = Math.sqrt(dx * dx + dy * dy);

      lastMousePos.current = { x: e.clientX, y: e.clientY };
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update color theme based on position
      currentTheme.current = getColorTheme(e.clientY);

      // Check hover state
      checkHoverState(e.clientX, e.clientY);

      // Create particles based on speed
      createParticles(e.clientX, e.clientY, mouseSpeed.current);
    };

    const handleClick = (e: MouseEvent) => {
      const theme = currentTheme.current;

      // Create click ripple effect
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: isHovering.current ? 80 : 60,
        opacity: 1,
        startTime: Date.now(),
        color: isHovering.current ? theme.accent : theme.primary
      });

      // Create burst particles on click
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const speed = 5 + Math.random() * 8;

        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 20 + Math.random() * 20,
          size: 2 + Math.random() * 3,
          color: theme.accent,
          alpha: 1
        });
      }
    };

    const animate = () => {
      const now = Date.now();

      // Check if mouse stopped moving
      if (now - lastMoveTime.current > 150) {
        isMoving.current = false;
      }

      // Smooth mouse position interpolation for ultra-smooth movement
      const lerp = 0.15;
      smoothMousePos.current.x += (mousePos.current.x - smoothMousePos.current.x) * lerp;
      smoothMousePos.current.y += (mousePos.current.y - smoothMousePos.current.y) * lerp;

      // Add new trail points continuously for ultra-smooth trail
      if (isMoving.current) {
        const lastPoint = trailPoints.current[0];
        const distance = lastPoint ?
          Math.sqrt((smoothMousePos.current.x - lastPoint.targetX) ** 2 + (smoothMousePos.current.y - lastPoint.targetY) ** 2) : 10;

        if (distance > 2 || !lastPoint) {
          trailPoints.current.unshift({
            x: smoothMousePos.current.x,
            y: smoothMousePos.current.y,
            targetX: smoothMousePos.current.x,
            targetY: smoothMousePos.current.y,
            opacity: 1,
            size: 3,
            age: 0,
            velocity: { x: 0, y: 0 }
          });

          // Longer, more elegant trail
          if (trailPoints.current.length > 60) {
            trailPoints.current = trailPoints.current.slice(0, 60);
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and render particles
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98; // Friction
        particle.vy *= 0.98;
        particle.life--;
        particle.alpha = particle.life / particle.maxLife;

        // Render particle
        if (particle.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          gradient.addColorStop(0, `rgba(${particle.color}, 1)`);
          gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.restore();
        }

        return particle.life > 0;
      });

      // Update and render ripples
      ripples.current = ripples.current.filter(ripple => {
        const elapsed = now - ripple.startTime;
        const progress = elapsed / 800; // 800ms duration

        if (progress >= 1) return false;

        ripple.radius = ripple.maxRadius * progress;
        ripple.opacity = 1 - progress;

        // Render ripple
        ctx.save();
        ctx.globalAlpha = ripple.opacity * 0.6;
        ctx.strokeStyle = `rgba(${ripple.color}, 1)`;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        return true;
      });

      // Update trail points with physics-based smooth motion
      trailPoints.current = trailPoints.current.map((point, index) => {
        const nextPoint = trailPoints.current[index - 1];

        if (nextPoint && index > 0) {
          // Create spring-like following behavior
          const springStrength = 0.3;
          const damping = 0.85;

          const dx = nextPoint.x - point.x;
          const dy = nextPoint.y - point.y;

          point.velocity.x += dx * springStrength;
          point.velocity.y += dy * springStrength;

          point.velocity.x *= damping;
          point.velocity.y *= damping;

          point.x += point.velocity.x;
          point.y += point.velocity.y;
        }

        // Ultra-smooth aging with multiple easing curves
        const normalizedAge = index / Math.max(trailPoints.current.length - 1, 1);
        const easedAge1 = 1 - Math.pow(1 - normalizedAge, 3);
        const easedAge2 = Math.sin(normalizedAge * Math.PI * 0.5);
        const combinedEase = (easedAge1 + easedAge2) / 2;

        return {
          ...point,
          age: point.age + 0.015,
          opacity: Math.max(0, (1 - combinedEase) * 0.8),
          size: Math.max(0, 3 * (1 - combinedEase * 0.9))
        };
      }).filter(point => point.opacity > 0.03);

      // Enhanced trail drawing with Bezier curves
      if (trailPoints.current.length > 3) {
        ctx.globalCompositeOperation = 'lighter';

        // Draw multiple layers for depth
        for (let layer = 0; layer < 2; layer++) {
          const layerOpacity = layer === 0 ? 1 : 0.5;
          const layerWidth = layer === 0 ? 1 : 0.7;

          ctx.beginPath();

          for (let i = 0; i < trailPoints.current.length - 3; i++) {
            const p0 = trailPoints.current[i];
            const p1 = trailPoints.current[i + 1];
            const p2 = trailPoints.current[i + 2];
            const p3 = trailPoints.current[i + 3];

            if (!p0 || !p1 || !p2 || !p3) continue;

            // Create smooth Catmull-Rom spline curves
            const tension = 0.5;

            for (let t = 0; t <= 1; t += 0.1) {
              const t2 = t * t;
              const t3 = t2 * t;

              const q0 = -tension * t3 + 2 * tension * t2 - tension * t;
              const q1 = (2 - tension) * t3 + (tension - 3) * t2 + 1;
              const q2 = (tension - 2) * t3 + (3 - 2 * tension) * t2 + tension * t;
              const q3 = tension * t3 - tension * t2;

              const x = p0.x * q0 + p1.x * q1 + p2.x * q2 + p3.x * q3;
              const y = p0.y * q0 + p1.y * q1 + p2.y * q2 + p3.y * q3;

              if (t === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }

            // Create beautiful gradient
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            const alpha1 = p1.opacity * 0.4 * layerOpacity;
            const alpha2 = p2.opacity * 0.4 * layerOpacity;

            const theme = currentTheme.current;
            gradient.addColorStop(0, `rgba(${theme.primary}, ${alpha1})`);
            gradient.addColorStop(0.3, `rgba(${theme.secondary}, ${(alpha1 + alpha2) * 0.6})`);
            gradient.addColorStop(0.7, `rgba(${theme.glow}, ${(alpha1 + alpha2) * 0.7})`);
            gradient.addColorStop(1, `rgba(${theme.accent}, ${alpha2})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.max(0.3, (p1.size + p2.size) * 0.5 * layerWidth);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            ctx.beginPath();
          }
        }

        ctx.globalCompositeOperation = 'source-over';
      }

      // Enhanced cursor glow with pulsing effect
      if (trailPoints.current.length > 0 && isMoving.current) {
        const currentPoint = trailPoints.current[0];
        const pulse = Math.sin(now * 0.003) * 0.3 + 0.7;
        const theme = currentTheme.current;
        const hoverMultiplier = isHovering.current ? 1.5 : 1;
        const speedMultiplier = Math.min(mouseSpeed.current / 10, 2);

        // Multiple glow layers for depth
        for (let i = 0; i < 3; i++) {
          const radius = (25 + i * 8) * hoverMultiplier * (1 + speedMultiplier * 0.3);
          const intensity = (0.25 - i * 0.06) * pulse * (isHovering.current ? 1.3 : 1);

          const glowGradient = ctx.createRadialGradient(
            currentPoint.x, currentPoint.y, 0,
            currentPoint.x, currentPoint.y, radius
          );

          glowGradient.addColorStop(0, `rgba(${theme.primary}, ${intensity})`);
          glowGradient.addColorStop(0.3, `rgba(${theme.secondary}, ${intensity * 0.6})`);
          glowGradient.addColorStop(0.6, `rgba(${theme.accent}, ${intensity * 0.3})`);
          glowGradient.addColorStop(1, `rgba(${theme.accent}, 0)`);

          ctx.beginPath();
          ctx.arc(currentPoint.x, currentPoint.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Elegant center dot with hover effects
        const centerSize = (1 + pulse * 0.5) * (isHovering.current ? 1.5 : 1);
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, centerSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isHovering.current ? theme.accent : theme.primary}, ${0.9 * pulse})`;
        ctx.fill();

        // Special hover ring effect
        if (isHovering.current) {
          ctx.beginPath();
          ctx.arc(currentPoint.x, currentPoint.y, 8 + pulse * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${theme.accent}, ${0.6 * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationId.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Performance optimization for mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);

    // Disable on mobile or reduced motion
    if (isMobile || isReducedMotion) {
      canvas.style.display = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MouseTrail;