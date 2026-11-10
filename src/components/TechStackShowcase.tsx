"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiVercel,
  SiHtml5
} from 'react-icons/si';

interface Technology {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const TechStackShowcase: React.FC = () => {
  const technologies: Technology[] = [
    { name: 'React', icon: <SiReact />, color: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    { name: 'Vercel', icon: <SiVercel />, color: '#000000' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          ტექნოლოგიები
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 text-center transition-all duration-300 hover:border-slate-500/50 hover:scale-105">
              <div
                className="text-4xl mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </div>
              <h3 className="text-sm font-medium text-white">
                {tech.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechStackShowcase;