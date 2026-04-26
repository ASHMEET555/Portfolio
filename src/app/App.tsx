'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'motion/react';

// Lazy load components for performance optimization
const Navigation = lazy(() => import('./components/Navigation'));
const ThreeDBackground = lazy(() => import('./components/ThreeDBackground'));
const HeroSection = lazy(() => import('./components/HeroSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage'));

// Phase 1 advanced components
const CodeRain = lazy(() => import('./components/advanced/CodeRain'));
const PerformanceMonitor = lazy(() => import('./components/advanced/PerformanceMonitor'));

// Loading component with cyberpunk theme
const LoadingComponent = () => (
  <div className="min-h-screen bg-cyberpunk-dark flex items-center justify-center">
    <div className="text-center">
      <div className="text-4xl text-cyberpunk-red text-glow-red tracking-wider mb-4 glitch">
        LOADING_NEURAL_INTERFACE...
      </div>
      <div className="w-64 h-1 bg-cyberpunk-gray border border-cyberpunk-red relative overflow-hidden mx-auto">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="h-full bg-cyberpunk-red loading-bar"
        />
      </div>
      <div className="mt-4 text-sm text-cyberpunk-text-dim tracking-wider">
        ESTABLISHING CONNECTION...
      </div>
    </div>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  useEffect(() => {
    // Check for reduced motion preference (accessibility)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Performance monitoring
    const checkPerformance = () => {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType) {
        setPerformanceMode(['slow-2g', '2g', '3g'].includes(connection.effectiveType));
      }
    };

    checkPerformance();

    // Custom cursor implementation with performance optimization
    let cursor: HTMLElement | null = null;
    
    const createCursor = () => {
      cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      document.body.appendChild(cursor);
    };

    const updateCursor = (e: MouseEvent) => {
      if (cursor && !reducedMotion) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
      }
    };

    const addHoverEffects = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea');
      
      const handleMouseEnter = (e: Event) => {
        if (cursor && !reducedMotion) {
          cursor.classList.add('hover');
        }
        (e.target as HTMLElement).style.transition = 'all 0.3s ease';
      };

      const handleMouseLeave = (e: Event) => {
        if (cursor) {
          cursor.classList.remove('hover');
        }
      };

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    if (!reducedMotion) {
      createCursor();
      document.addEventListener('mousemove', updateCursor);
    }

    const cleanupHoverEffects = addHoverEffects();

    // Enhanced intersection observer for section navigation
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newHash = `#${entry.target.id}`;
          if (window.location.hash !== newHash) {
            history.replaceState(null, '', newHash);
          }
          
          // Dispatch custom event for navigation updates
          window.dispatchEvent(new CustomEvent('sectionchange', { 
            detail: { section: entry.target.id } 
          }));
        }
      });
    }, observerOptions);

    // Observe sections when they're loaded
    const observeSections = () => {
      const currentSections = document.querySelectorAll('section[id]');
      currentSections.forEach(section => sectionObserver.observe(section));
    };

    // Hide loading screen after components are loaded
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      observeSections();
    }, 2500);

    // Cleanup function
    return () => {
      clearTimeout(loadingTimer);
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('mousemove', updateCursor);
      cleanupHoverEffects();
      sectionObserver.disconnect();
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, [reducedMotion]);

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Implement keyboard shortcuts for accessibility
      if (e.altKey && e.shiftKey) {
        switch (e.key) {
          case 'H':
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'A':
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'P':
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'S':
            document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'C':
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const isProjectRoute = currentPath.startsWith('/projects/');
  const projectId = isProjectRoute ? currentPath.split('/').filter(Boolean)[1] || '' : '';

  if (isProjectRoute) {
    return (
      <div className="min-h-screen bg-cyberpunk-dark text-cyberpunk-text overflow-x-hidden">
        <Suspense fallback={null}>
          {!performanceMode && !reducedMotion && <ThreeDBackground />}
        </Suspense>

        <Suspense fallback={null}>
          {!performanceMode && !reducedMotion && <CodeRain />}
        </Suspense>

        <main id="main" className="relative z-10" role="main">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingComponent /></div>}>
            <ProjectDetailPage projectId={projectId} />
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyberpunk-dark text-cyberpunk-text overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyberpunk-red text-cyberpunk-text border border-cyberpunk-red"
      >
        Skip to main content
      </a>

      {/* Performance monitor for development */}
      {process.env.NODE_ENV === 'development' && (
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>
      )}

      {/* Enhanced Three.js background with performance optimizations */}
      <Suspense fallback={null}>
        {!performanceMode && !reducedMotion && <ThreeDBackground />}
      </Suspense>

      {/* Code rain effect for enhanced cyberpunk atmosphere */}
      <Suspense fallback={null}>
        {!performanceMode && !reducedMotion && <CodeRain />}
      </Suspense>
      
      {/* Navigation with enhanced accessibility */}
      <Suspense fallback={<div className="h-16 bg-cyberpunk-dark/90" />}>
        <Navigation />
      </Suspense>
      
      {/* Main content with semantic HTML */}
      <main id="main" className="relative z-10" role="main">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingComponent /></div>}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-cyberpunk-dark" />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-cyberpunk-dark" />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-cyberpunk-dark" />}>
          <SkillsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-cyberpunk-dark" />}>
          <ContactSection />
        </Suspense>
      </main>
      
      {/* Enhanced Footer with better accessibility */}
      <footer className="relative z-10 border-t border-cyberpunk-red/30 bg-cyberpunk-dark/90 backdrop-blur-sm" role="contentinfo">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-cyberpunk-red tracking-wider mb-4">&lt;ASHMEET.SANDHU/&gt;</h3>
              <p className="text-sm text-cyberpunk-text-dim">
                Crafting the future through AI/ML research and production-grade systems
              </p>
              <div className="mt-4 text-xs text-cyberpunk-text-dim">
                <p>Keyboard shortcuts: Alt + Shift + [H/A/P/S/C]</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-cyberpunk-red tracking-wider mb-4">QUICK_LINKS</h4>
              <nav aria-label="Footer navigation">
                <div className="space-y-2">
                  {[
                    { label: 'HOME', target: '#home' },
                    { label: 'ABOUT', target: '#about' },
                    { label: 'PROJECTS', target: '#projects' },
                    { label: 'SKILLS', target: '#skills' },
                    { label: 'CONTACT', target: '#contact' }
                  ].map((link) => (
                    <button
                      key={link.label}
                      onClick={() => document.querySelector(link.target)?.scrollIntoView({ behavior: 'smooth' })}
                      className="block text-sm text-cyberpunk-text-dim hover:text-cyberpunk-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyberpunk-red focus:ring-offset-2 focus:ring-offset-cyberpunk-dark"
                      aria-label={`Navigate to ${link.label.toLowerCase()} section`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
            
            <div>
              <h4 className="text-cyberpunk-red tracking-wider mb-4">CONNECT</h4>
              <nav aria-label="Social media links">
                <div className="space-y-2">
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashmeet-sandhu-79a209324/', icon: '💼' },
                    { label: 'GitHub', href: 'https://github.com/ASHMEET555', icon: '💻' },
                    { label: 'Codeforces', href: 'https://codeforces.com/profile/sandhuashmeet40', icon: '🏁' },
                    { label: 'CodeChef', href: 'https://www.codechef.com/users/ashmeet555', icon: '🍜' },
                    { label: 'LeetCode', href: 'https://leetcode.com/ashmeet555', icon: '🧩' },
                    { label: 'X', href: 'https://x.com/AshmeetSandhu_', icon: '🐦' },
                    { label: 'Email', href: 'mailto:sandhuashmeet40@gmail.com', icon: '📧' },
                    { label: 'Phone', href: 'tel:+917357124419', icon: '📱' }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center space-x-2 text-sm text-cyberpunk-text-dim hover:text-cyberpunk-red transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyberpunk-red focus:ring-offset-2 focus:ring-offset-cyberpunk-dark"
                      aria-label={`Visit ${social.label} profile`}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span>{social.icon}</span>
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-cyberpunk-red/20 text-center">
            <p className="text-xs text-cyberpunk-text-dim tracking-wider">
              © 2026 ASHMEET SINGH SANDHU. ALL NEURAL PATTERNS RESERVED. DESIGNED FOR THE FUTURE.
            </p>
            <p className="text-xs text-cyberpunk-text-dim mt-2">
              Built with React, Three.js, and cutting-edge web technologies.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}