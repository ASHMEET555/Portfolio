'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'about', label: 'ABOUT', icon: '👤' },
    { id: 'projects', label: 'PROJECTS', icon: '🚀' },
    { id: 'skills', label: 'SKILLS', icon: '⚡' },
    { id: 'contact', label: 'CONTACT', icon: '📡' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = (e: CustomEvent) => {
      setActiveSection(e.detail.section);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('sectionchange', handleSectionChange as EventListener);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('sectionchange', handleSectionChange as EventListener);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-cyberpunk-dark/95 backdrop-blur-md border-b border-cyberpunk-red/30' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Holographic scan line effect */}
        <div className="absolute inset-0 scan-lines opacity-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with glitch effect */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <h1 className="text-2xl text-cyberpunk-red tracking-wider relative">
                &lt;A.SANDHU/&gt;
                <motion.div
                  className="absolute inset-0 text-cyan-400"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    x: [-2, 2, -2]
                  }}
                  transition={{ 
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  &lt;A.SANDHU/&gt;
                </motion.div>
              </h1>
              
              {/* Logo decorations */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-cyberpunk-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-cyberpunk-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm tracking-wider transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-cyberpunk-red border border-cyberpunk-red bg-cyberpunk-red/10'
                      : 'text-cyberpunk-text-dim hover:text-cyberpunk-red border border-transparent hover:border-cyberpunk-red/50'
                  }`}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-cyberpunk-red/10"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ originX: 0 }}
                  />
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyberpunk-red"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyberpunk-red opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyberpunk-red opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 border border-cyberpunk-red bg-cyberpunk-red/10 flex items-center justify-center"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-cyberpunk-red"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </motion.div>
              
              {/* Scan line */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyberpunk-red/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.button>

            {/* System Status Indicator */}
            <div className="hidden lg:flex items-center space-x-3 ml-6">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full glow-red"
                />
                <span className="text-xs text-cyberpunk-text-dim tracking-wider">ONLINE</span>
              </div>
              
              <div className="w-px h-6 bg-cyberpunk-red/30"></div>
              
              <div className="text-xs text-cyberpunk-text-dim tracking-wider">
                {new Date().toLocaleTimeString('en-US', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Data stream decoration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyberpunk-red to-transparent"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-cyberpunk-dark/90 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-cyberpunk-dark border-l border-cyberpunk-red z-50 md:hidden"
            >
              {/* Mobile menu header */}
              <div className="p-6 border-b border-cyberpunk-red/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl text-cyberpunk-red tracking-wider">NAVIGATION</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 border border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-colors duration-200"
                    aria-label="Close mobile menu"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Mobile navigation items */}
              <nav className="p-6" aria-label="Mobile navigation">
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full p-4 text-left border transition-all duration-300 ${
                        activeSection === item.id
                          ? 'border-cyberpunk-red bg-cyberpunk-red/20 text-cyberpunk-red'
                          : 'border-cyberpunk-red/30 text-cyberpunk-text-dim hover:border-cyberpunk-red hover:text-cyberpunk-red'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.icon}</span>
                        <span className="tracking-wider">{item.label}</span>
                      </div>
                      
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-cyberpunk-red"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </nav>

              {/* Mobile menu footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="border-t border-cyberpunk-red/30 pt-6">
                  <div className="text-center">
                    <div className="text-xs text-cyberpunk-text-dim tracking-wider mb-2">
                      NEURAL INTERFACE v2.1.0
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                      <span className="text-xs text-cyberpunk-text-dim">CONNECTION STABLE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile scan lines */}
              <div className="absolute inset-0 scan-lines opacity-5 pointer-events-none"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;