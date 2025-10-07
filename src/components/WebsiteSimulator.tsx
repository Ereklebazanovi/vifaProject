"use client";

import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo, FaCode, FaDesktop, FaRocket, FaCheckCircle, FaHtml5, FaPalette, FaBolt, FaMobile } from 'react-icons/fa';

interface SimulationStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  icon: React.ReactNode;
  color: string;
  codeElement: React.ReactNode;
  visualElement: React.ReactNode;
}

const WebsiteSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const simulationSteps: SimulationStep[] = [
    {
      id: 1,
      title: "HTML სტრუქტურა",
      description: "ვებსაიტის ძირითადი ღერძი და კონტენტის სტრუქტურა",
      duration: 1500,
      icon: <FaHtml5 />,
      color: "from-orange-500 to-red-500",
      codeElement: (
        <div className="text-xs text-orange-300 font-mono space-y-1">
          <div className="animate-typing">{'<!DOCTYPE html>'}</div>
          <div className="animate-typing" style={{animationDelay: '0.2s'}}>{'<html>'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.4s'}}>{'<head>'}</div>
          <div className="animate-typing ml-4" style={{animationDelay: '0.6s'}}>{'<title>მყარი საფუძველი</title>'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.8s'}}>{'</head>'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '1s'}}>{'<body>'}</div>
          <div className="animate-typing ml-4" style={{animationDelay: '1.2s'}}>{'<h1>თქვენი ვებსაიტი</h1>'}</div>
        </div>
      ),
      visualElement: (
        <div className="h-24 bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-400/50 rounded-lg p-3 text-white">
          <div className="animate-fade-in text-base font-bold text-orange-300" style={{animationDelay: '1.2s'}}>
            თქვენი ვებსაიტი
          </div>
          <div className="animate-fade-in text-xs text-orange-200" style={{animationDelay: '1.4s'}}>
            🏗️ სტრუქტურა შექმნილია
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "CSS სტილიზაცია",
      description: "ვიზუალური დიზაინი, ფერები და ლეიაუტი",
      duration: 1800,
      icon: <FaPalette />,
      color: "from-blue-500 to-purple-500",
      codeElement: (
        <div className="text-xs text-purple-300 font-mono space-y-1">
          <div className="animate-typing">{'body {'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.2s'}}>{'background: linear-gradient...'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.4s'}}>{'font-family: "Inter", sans-serif;'}</div>
          <div className="animate-typing" style={{animationDelay: '0.6s'}}>{'}'}</div>
          <div className="animate-typing" style={{animationDelay: '0.8s'}}>{'h1 {'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '1s'}}>{'color: #3b82f6;'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '1.2s'}}>{'text-align: center;'}</div>
          <div className="animate-typing" style={{animationDelay: '1.4s'}}>{'}'}</div>
        </div>
      ),
      visualElement: (
        <div className="h-24 bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-blue-500/60 rounded-lg p-3 text-white backdrop-blur-sm">
          <div className="animate-color-change text-base font-bold text-center text-blue-300" style={{animationDelay: '1s'}}>
            თქვენი ვებსაიტი
          </div>
          <div className="animate-fade-in text-xs text-center text-purple-300" style={{animationDelay: '1.4s'}}>
            🎨 მშვენიერი დიზაინი
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "JavaScript ინტერაქტივობა",
      description: "დინამიური ფუნქციები და მომხმარებლის ინტერაქცია",
      duration: 2000,
      icon: <FaBolt />,
      color: "from-yellow-500 to-orange-500",
      codeElement: (
        <div className="text-xs text-yellow-300 font-mono space-y-1">
          <div className="animate-typing">{'function enhanceUX() {'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.3s'}}>{'const magic = true;'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.6s'}}>{'addInteractivity();'}</div>
          <div className="animate-typing" style={{animationDelay: '0.9s'}}>{'}'}</div>
          <div className="animate-typing" style={{animationDelay: '1.2s'}}>{'document.addEventListener("load", () => {'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '1.5s'}}>{'enhanceUX();'}</div>
          <div className="animate-typing" style={{animationDelay: '1.8s'}}>{'});'}</div>
        </div>
      ),
      visualElement: (
        <div className="h-24 bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-yellow-400/70 rounded-lg p-3 text-white relative overflow-hidden backdrop-blur-sm">
          <div className="text-base font-bold text-center text-blue-300 animate-bounce" style={{animationDelay: '0.8s'}}>
            თქვენი ვებსაიტი
          </div>
          <div className="text-xs text-center text-purple-300">🎨 მშვენიერი დიზაინი</div>
          <button
            className="animate-pulse bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-0.5 rounded text-xs mx-auto block mt-1 font-medium"
            style={{animationDelay: '1.5s'}}
          >
            ⚡ ინტერაქტიული
          </button>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '1.8s'}}></div>
        </div>
      )
    },
    {
      id: 4,
      title: "რესპონსივობა",
      description: "ყველა მოწყობილობაზე სრულყოფილი ხედი",
      duration: 1500,
      icon: <FaMobile />,
      color: "from-green-500 to-teal-500",
      codeElement: (
        <div className="text-xs text-green-300 font-mono space-y-1">
          <div className="animate-typing">{'@media (max-width: 768px) {'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.2s'}}>{'h1 { font-size: 1.5rem; }'}</div>
          <div className="animate-typing ml-2" style={{animationDelay: '0.4s'}}>{'padding: 1rem;'}</div>
          <div className="animate-typing" style={{animationDelay: '0.6s'}}>{'}'}</div>
          <div className="animate-typing" style={{animationDelay: '0.8s'}}>{'/* ყველა მოწყობილობაზე */'}</div>
          <div className="animate-typing" style={{animationDelay: '1s'}}>{'/* იდეალური ხედი */'}</div>
        </div>
      ),
      visualElement: (
        <div className="h-24 bg-gradient-to-br from-blue-900/80 to-purple-900/80 border border-green-400/70 rounded-lg p-2 text-white backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-1 h-full">
            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded flex flex-col items-center justify-center animate-scale-in border border-green-400/30" style={{animationDelay: '0.3s'}}>
              <FaDesktop className="text-green-400 text-sm" />
              <span className="text-xs text-green-300">PC</span>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded flex flex-col items-center justify-center animate-scale-in border border-green-400/30" style={{animationDelay: '0.6s'}}>
              <span className="text-sm">📱</span>
              <span className="text-xs text-green-300">ტაბლეტი</span>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded flex flex-col items-center justify-center animate-scale-in border border-green-400/30" style={{animationDelay: '0.9s'}}>
              <span className="text-sm">📱</span>
              <span className="text-xs text-green-300">მობაილი</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "გაეშვება!",
      description: "ვებსაიტი მზად არის და ხელმისაწვდომია ყველასთვის",
      duration: 1500,
      icon: <FaRocket />,
      color: "from-emerald-500 to-cyan-500",
      codeElement: (
        <div className="text-xs text-emerald-300 font-mono space-y-1">
          <div className="animate-typing">{'npm run build'}</div>
          <div className="animate-typing" style={{animationDelay: '0.2s'}}>{'✓ Build გამზადებულია!'}</div>
          <div className="animate-typing" style={{animationDelay: '0.4s'}}>{'Deploying to server...'}</div>
          <div className="animate-typing" style={{animationDelay: '0.6s'}}>{'✓ Deployment წარმატებული!'}</div>
          <div className="animate-typing text-emerald-400 font-bold" style={{animationDelay: '0.8s'}}>{'🚀 საიტი ცოცხალია!'}</div>
          <div className="animate-typing text-cyan-400" style={{animationDelay: '1s'}}>{'🌐 www.yoursite.com'}</div>
        </div>
      ),
      visualElement: (
        <div className="h-24 bg-gradient-to-br from-emerald-800/80 to-cyan-900/80 border border-emerald-400/70 rounded-lg p-3 text-white relative backdrop-blur-sm">
          <div className="text-center">
            <FaRocket className="text-emerald-400 text-xl mx-auto animate-bounce" style={{animationDelay: '0.6s'}} />
            <div className="text-sm font-bold text-emerald-300 animate-glow" style={{animationDelay: '1s'}}>
              🎉 ცოცხალია!
            </div>
            <div className="text-xs text-cyan-300 animate-fade-in" style={{animationDelay: '1.2s'}}>
              www.yoursite.com
            </div>
          </div>
          <div className="absolute top-1 right-1 flex space-x-0.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && currentStep < simulationSteps.length) {
      const stepDuration = simulationSteps[currentStep].duration;

      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (stepDuration / 100));

          if (newProgress >= 100) {
            setCompletedSteps(prev => [...prev, currentStep]);
            setCurrentStep(prev => prev + 1);
            setProgress(0);

            if (currentStep + 1 >= simulationSteps.length) {
              setIsPlaying(false);
            }
          }

          return Math.min(newProgress, 100);
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, simulationSteps.length]);

  const handlePlay = () => {
    if (currentStep >= simulationSteps.length) {
      setCurrentStep(0);
      setProgress(0);
      setCompletedSteps([]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
    setCompletedSteps([]);
  };

  const handleStepClick = (stepIndex: number) => {
    if (!isPlaying) {
      setCurrentStep(stepIndex);
      setProgress(0);
      setCompletedSteps(Array.from({ length: stepIndex }, (_, i) => i));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Enhanced Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          როგორ იშენება თქვენი ვებსაიტი?
        </h3>
        <p className="text-slate-300 text-sm">
          ნახეთ ვებ განვითარების პროცესი რეალურ დროში - ინტერაქციული სიმულატორი
        </p>
      </div>

      {/* Perfect Symmetrical Control Panel */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
        >
          {isPlaying ? <FaPause className="text-sm" /> : <FaPlay className="text-sm" />}
          <span>{isPlaying ? 'პაუზა' : currentStep >= simulationSteps.length ? 'თავიდან' : 'დაწყება'}</span>
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaRedo className="text-sm" />
          <span>Reset</span>
        </button>
      </div>

      {/* Perfect Symmetrical Progress Steps */}
      <div className="flex justify-center items-center gap-4 mb-8">
        {simulationSteps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => handleStepClick(index)}
            className="cursor-pointer transition-all duration-300 hover:scale-110 flex flex-col items-center"
          >
            <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-lg ${
              completedSteps.includes(index)
                ? `bg-gradient-to-r ${step.color} border-green-400 text-white shadow-green-500/30`
                : index === currentStep
                ? `bg-gradient-to-r ${step.color} border-blue-400 text-white animate-pulse shadow-blue-500/40`
                : 'bg-gray-700/80 border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-600/80'
            }`}>
              {completedSteps.includes(index) ? <FaCheckCircle className="text-sm" /> : step.icon}
            </div>
            <div className={`text-xs text-center mt-2 transition-colors duration-300 font-medium w-16 ${
              index === currentStep ? 'text-blue-400' : completedSteps.includes(index) ? 'text-green-400' : 'text-gray-400'
            }`}>
              {step.title.split(' ')[0]}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && currentStep < simulationSteps.length && (
        <div className="mb-8">
          <div className="bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${simulationSteps[currentStep]?.color} h-full transition-all duration-100 ease-linear rounded-full shadow-sm`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Enhanced Current Step Display */}
      {currentStep < simulationSteps.length && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Code Panel */}
          <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6 shadow-lg shadow-cyan-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <FaCode className="text-cyan-400 text-sm" />
              </div>
              <h3 className="text-white font-semibold text-sm">კოდი</h3>
            </div>
            <div className="bg-gray-900/80 rounded-lg p-4 h-24 overflow-hidden border border-gray-700/50">
              {simulationSteps[currentStep]?.codeElement}
            </div>
          </div>

          {/* Visual Panel */}
          <div className="bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6 shadow-lg shadow-purple-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <FaDesktop className="text-purple-400 text-sm" />
              </div>
              <h3 className="text-white font-semibold text-sm">შედეგი</h3>
            </div>
            {simulationSteps[currentStep]?.visualElement}
          </div>
        </div>
      )}

      {/* Enhanced Step Info */}
      {currentStep < simulationSteps.length && (
        <div className="text-center bg-black/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${simulationSteps[currentStep]?.color} rounded-lg flex items-center justify-center shadow-lg`}>
              <span className="text-white text-lg">{simulationSteps[currentStep]?.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              {simulationSteps[currentStep]?.title}
            </h3>
          </div>
          <p className="text-slate-300 text-sm">
            {simulationSteps[currentStep]?.description}
          </p>
        </div>
      )}

      {/* Enhanced Completion Message */}
      {currentStep >= simulationSteps.length && !isPlaying && (
        <div className="text-center bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-8 shadow-2xl">
          <FaRocket className="text-emerald-400 text-4xl mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold text-white mb-3">
            ✨ თქვენი ვებსაიტი მზადაა!
          </h3>
          <p className="text-slate-300 text-sm mb-6">
            ასე იშენება თქვენი ვებსაიტი - ნაბიჯ-ნაბიჯ, პროფესიონალურად და ტექნოლოგიურად სრულყოფილად
          </p>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            კიდევ ერთხელ ნახვა
          </button>
        </div>
      )}

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes typing {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes color-change {
          from { color: #ffffff; }
          to { color: #3b82f6; }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
          50% { text-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6); }
        }

        .animate-typing {
          animation: typing 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-color-change {
          animation: color-change 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WebsiteSimulator;