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

const MouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const animationId = useRef<number>();
  const mousePos = useRef({ x: -100, y: -100 });
  const smoothMousePos = useRef({ x: -100, y: -100 });
  const lastMoveTime = useRef<number>(0);
  const isMoving = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      lastMoveTime.current = now;
      isMoving.current = true;

      mousePos.current = { x: e.clientX, y: e.clientY };
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

            gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha1})`);
            gradient.addColorStop(0.3, `rgba(99, 102, 241, ${(alpha1 + alpha2) * 0.6})`);
            gradient.addColorStop(0.7, `rgba(139, 92, 246, ${(alpha1 + alpha2) * 0.7})`);
            gradient.addColorStop(1, `rgba(147, 51, 234, ${alpha2})`);

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

        // Multiple glow layers for depth
        for (let i = 0; i < 3; i++) {
          const radius = 30 + i * 10;
          const intensity = (0.2 - i * 0.05) * pulse;

          const glowGradient = ctx.createRadialGradient(
            currentPoint.x, currentPoint.y, 0,
            currentPoint.x, currentPoint.y, radius
          );

          glowGradient.addColorStop(0, `rgba(59, 130, 246, ${intensity})`);
          glowGradient.addColorStop(0.3, `rgba(99, 102, 241, ${intensity * 0.6})`);
          glowGradient.addColorStop(0.6, `rgba(147, 51, 234, ${intensity * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');

          ctx.beginPath();
          ctx.arc(currentPoint.x, currentPoint.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Elegant center dot with subtle animation
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, 1 + pulse * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.9 * pulse})`;
        ctx.fill();
      }

      animationId.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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