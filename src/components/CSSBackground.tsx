import React from 'react';

interface CSSBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const CSSBackground: React.FC<CSSBackgroundProps> = ({
  className = '',
  style
}) => {
  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={style}
    >
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950" />

      {/* Animated gradient layers */}
      <div className="absolute inset-0 opacity-60">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/30 to-blue-900/20"
          style={{
            animation: 'pulse 6s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-purple-900/15 via-slate-800/20 to-blue-900/15"
          style={{
            animation: 'pulse 8s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute w-32 h-32 bg-blue-500/8 rounded-full blur-2xl"
          style={{
            top: '25%',
            left: '25%',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute w-24 h-24 bg-purple-500/8 rounded-full blur-2xl"
          style={{
            bottom: '33%',
            right: '25%',
            animation: 'float 12s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
        <div
          className="absolute w-20 h-20 bg-slate-500/8 rounded-full blur-2xl"
          style={{
            top: '66%',
            left: '50%',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <div
          className="absolute w-28 h-28 bg-indigo-500/6 rounded-full blur-2xl"
          style={{
            top: '10%',
            right: '10%',
            animation: 'float 14s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default CSSBackground;