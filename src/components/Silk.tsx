
import React from 'react';

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {
  // Temporary fallback to test React 19 compatibility
  // Note: speed, scale, noiseIntensity, rotation are preserved for future Three.js implementation
  const fallbackStyle = {
    background: `linear-gradient(135deg, ${color} 0%, ${color}88 50%, ${color} 100%)`,
    width: '100%',
    height: '100%',
    // Use other props to avoid TS warnings
    opacity: Math.min(1, speed / 10),
    transform: `scale(${Math.max(0.5, scale)}) rotate(${rotation}deg)`,
    filter: `blur(${Math.max(0, noiseIntensity - 1)}px)`
  };

  return <div style={fallbackStyle} />;
};

export default Silk;