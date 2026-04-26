'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import MorphingText from './advanced/MorphingText';
import ashmeetProfile from '../../imports/ashmeet-profile.jpg';

const HeroSection = () => {
  const roles = [
    'AI ENGINEER',
    'ML RESEARCHER', 
    'RESEARCH INTERN',
    'FULL STACK DEV',
    'AI INNOVATOR',
    'DATA SCIENTIST',
    'PROBLEM SOLVER'
  ];

  const glitchVariants = {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, -2, 2, -1, 1, 0],
      y: [0, 1, -1, 2, -2, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-12">
      {/* Scan lines overlay */}
      <div className="absolute inset-0 scan-lines pointer-events-none"></div>
      
      {/* Matrix background pattern */}
      <div className="absolute inset-0 matrix-bg opacity-20"></div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Profile image with holographic effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="relative mx-auto w-48 h-48 mb-8 mt-6"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyberpunk-red via-transparent to-cyberpunk-red animate-spin"></div>
            <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-cyberpunk-red glow-red">
              <ImageWithFallback
                src={ashmeetProfile}
                alt="Ashmeet Singh Sandhu - AI Engineer" 
                className="w-full h-full object-cover object-[50%_14%]"
              />
              <div className="absolute inset-0 hologram"></div>
            </div>
            
            {/* Floating data indicators */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -inset-8"
            >
              {[
                { icon: '🧠', pos: 'top-0 left-1/2 -translate-x-1/2', label: 'AI' },
                { icon: '⚡', pos: 'right-0 top-1/2 -translate-y-1/2', label: 'ML' },
                { icon: '🔬', pos: 'bottom-0 left-1/2 -translate-x-1/2', label: 'RESEARCH' },
                { icon: '💻', pos: 'left-0 top-1/2 -translate-y-1/2', label: 'CODE' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`absolute ${item.pos} w-12 h-12 bg-cyberpunk-dark border border-cyberpunk-red flex items-center justify-center`}
                  animate={{ 
                    rotate: [0, -360],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Name with enhanced glitch effect */}
          <motion.div
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl text-cyberpunk-text text-glow-red tracking-wider relative">
              ASHMEET SINGH SANDHU
              {/* Cyberpunk text decoration */}
              <motion.div
                className="absolute -top-2 -left-2 text-xs text-cyberpunk-red opacity-60"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &lt;AI_ENGINEER&gt;
              </motion.div>
            </h1>
            
            <div className="h-16 flex items-center justify-center">
              <MorphingText
                words={roles}
                className="text-2xl md:text-4xl text-cyberpunk-red tracking-widest"
                duration={3000}
                pauseDuration={2000}
                glitchEffect={true}
              />
            </div>
          </motion.div>

          {/* Enhanced tagline with data streams */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="relative"
          >
            <p className="text-xl md:text-2xl text-cyberpunk-text-dim max-w-4xl mx-auto leading-relaxed">
              Research Intern at IIT Mandi | B.Tech CSE @ IIIT Una | Pioneering AI solutions 
              across medical intelligence, GenAI, Agentic AI, and real-time systems.
            </p>
            
            {/* Data stream decorations */}
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyberpunk-red to-transparent opacity-50"></div>
            <div className="absolute -right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyberpunk-red to-transparent opacity-50"></div>
          </motion.div>

          {/* Enhanced action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(255, 0, 0, 0.5)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-cyberpunk-red text-cyberpunk-text tracking-wider border-2 border-cyberpunk-red hover:bg-transparent transition-all duration-300 overflow-hidden"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <motion.div
                className="absolute inset-0 bg-cyberpunk-red/20"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              {/* Corner brackets */}
              <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-cyberpunk-text group-hover:border-cyberpunk-red transition-colors"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-cyberpunk-text group-hover:border-cyberpunk-red transition-colors"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 border-2 border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text tracking-wider transition-all duration-300 overflow-hidden"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">NEURAL LINK</span>
              <motion.div
                className="absolute inset-0 bg-cyberpunk-red"
                initial={{ y: '100%' }}
                whileHover={{ y: '0%' }}
                transition={{ duration: 0.3 }}
              />
              {/* Scan line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-cyberpunk-red opacity-0 group-hover:opacity-100"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.button>
          </motion.div>

          {/* Enhanced tech specs display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'AI_PROJECTS', value: '4', icon: '🚀' },
              { label: 'PROBLEMS_SOLVED', value: '800+', icon: '⚡' },
              { label: 'HACKATHONS', value: '4+', icon: '🏆' },
              { label: 'RESEARCH', value: 'IIT', icon: '🔬' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group text-center p-4 border border-cyberpunk-red/30 bg-cyberpunk-gray/30 backdrop-blur-sm hover:border-cyberpunk-red hover:bg-cyberpunk-red/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-xs text-cyberpunk-red mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl text-cyberpunk-red group-hover:text-glow-red transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-cyberpunk-text-dim tracking-wider">{stat.label}</div>
                </div>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyberpunk-red/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="text-xs text-cyberpunk-red tracking-wider">SCROLL_DOWN</div>
            <div className="w-6 h-10 border-2 border-cyberpunk-red rounded-full flex justify-center relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-cyberpunk-red rounded-full mt-2"
              />
              {/* Scan effect */}
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyberpunk-red/50 to-transparent w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;