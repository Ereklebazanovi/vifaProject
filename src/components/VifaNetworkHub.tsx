"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaCode, FaBrain, FaChartLine, FaPalette, FaDatabase, FaMobile, FaRocket, FaShieldAlt } from 'react-icons/fa';

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const VifaNetworkHub: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const services: Service[] = [
    { id: 'web', title: 'Web Development', icon: <FaCode />, color: '#00ff41', description: 'Full-stack solutions' },
    { id: 'ai', title: 'AI Solutions', icon: <FaBrain />, color: '#ff0080', description: 'Smart automation' },
    { id: 'marketing', title: 'Digital Marketing', icon: <FaChartLine />, color: '#ff8000', description: 'Growth hacking' },
    { id: 'design', title: 'UI/UX Design', icon: <FaPalette />, color: '#8000ff', description: 'User experience' },
    { id: 'database', title: 'Database', icon: <FaDatabase />, color: '#00ffff', description: 'Data architecture' },
    { id: 'mobile', title: 'Mobile Apps', icon: <FaMobile />, color: '#ffff00', description: 'Cross-platform' },
    { id: 'performance', title: 'Performance', icon: <FaRocket />, color: '#ff4000', description: 'Speed optimization' },
    { id: 'security', title: 'Security', icon: <FaShieldAlt />, color: '#4000ff', description: 'Cyber protection' }
  ];

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    const chars = '01VIFAWEB{}[]<>/\\|';
    const drops: number[] = [];
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isScanning ? '#00ff41' : '#004400';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 100);
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-96 bg-black/90 border border-green-500/30 rounded-lg overflow-hidden">

      {/* Matrix background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-20"
      />

      {/* Scanning line effect */}
      {isScanning && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-0.5 bg-green-400 shadow-lg animate-pulse"
               style={{
                 animation: 'scan 2s linear infinite',
                 boxShadow: '0 0 20px #00ff41'
               }} />
        </div>
      )}

      {/* Main interface */}
      <div className="relative z-20 p-6 h-full flex flex-col">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block border border-green-400/50 rounded px-4 py-2 bg-green-950/30">
            <div className="text-green-400 font-mono text-lg tracking-wider">VIFA WEB SYSTEMS</div>
            <div className="text-green-300/70 text-xs font-mono">// DIGITAL SOLUTIONS MATRIX</div>
          </div>
        </div>

        {/* Service grid */}
        <div className="flex-1 grid grid-cols-4 gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative group cursor-pointer transition-all duration-300 ${
                activeService === service.id ? 'scale-110' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              onClick={handleScan}
            >

              {/* Service node */}
              <div className={`w-full h-16 border rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                activeService === service.id
                  ? 'border-green-400 bg-green-950/50 shadow-lg'
                  : 'border-gray-600/50 bg-gray-900/30 hover:border-gray-400/70'
              }`}
              style={{
                boxShadow: activeService === service.id ? `0 0 20px ${service.color}40` : 'none'
              }}>

                <div className={`text-lg transition-colors duration-300 ${
                  activeService === service.id ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {service.icon}
                </div>

                <div className={`text-xs font-mono mt-1 transition-colors duration-300 ${
                  activeService === service.id ? 'text-green-300' : 'text-gray-500'
                }`}>
                  {service.title.split(' ')[0]}
                </div>
              </div>

              {/* Hover panel */}
              {activeService === service.id && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="bg-black/90 border border-green-400/50 rounded px-3 py-2 text-center whitespace-nowrap">
                    <div className="text-green-400 font-mono text-sm">{service.title}</div>
                    <div className="text-green-300/70 text-xs">{service.description}</div>
                  </div>
                </div>
              )}

              {/* Connection lines */}
              {activeService === service.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-green-400 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-4 flex justify-between items-center text-xs font-mono">
          <div className="text-green-400">
            STATUS: {isScanning ? 'SCANNING...' : 'READY'}
          </div>
          <div className="text-green-300/70">
            NODES: {services.length} | ACTIVE: {activeService ? '1' : '0'}
          </div>
        </div>
      </div>

    </div>
  );
};

export default VifaNetworkHub;