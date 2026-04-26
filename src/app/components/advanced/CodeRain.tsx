'use client';

import { useEffect, useRef, useState } from 'react';

interface CodeDrop {
  id: number;
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  life: number;
  maxLife: number;
}

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);

  // Cyberpunk code characters
  const characters = [
    // Binary
    '0', '1',
    // Hex
    'A', 'B', 'C', 'D', 'E', 'F',
    // Special characters
    '<', '>', '/', '\\', '|', '-', '+', '=',
    // Programming symbols
    '{', '}', '[', ']', '(', ')', ';', ':',
    // AI/Neural terms (shortened)
    'AI', 'ML', 'NN', 'DL', 'CV', 'NLP',
    // Tech symbols
    '@', '#', '$', '%', '^', '&', '*'
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drops: CodeDrop[] = [];
    let dropId = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize drops on resize
      initializeDrops();
    };

    const initializeDrops = () => {
      drops = [];
      const columns = Math.floor(canvas.width / 20);
      
      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.7) { // Sparse distribution
          drops.push(createDrop(i * 20));
        }
      }
    };

    const createDrop = (x: number): CodeDrop => {
      return {
        id: dropId++,
        x: x + Math.random() * 10 - 5, // Add slight horizontal variation
        y: -Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        char: characters[Math.floor(Math.random() * characters.length)],
        opacity: 0.1 + Math.random() * 0.3,
        life: 0,
        maxLife: 100 + Math.random() * 200
      };
    };

    const updateDrop = (drop: CodeDrop) => {
      drop.y += drop.speed;
      drop.life++;
      
      // Fade out as drop ages
      drop.opacity = Math.max(0, 0.4 - (drop.life / drop.maxLife) * 0.4);
      
      // Change character occasionally
      if (Math.random() < 0.02) {
        drop.char = characters[Math.floor(Math.random() * characters.length)];
      }
      
      // Reset drop when it goes off screen or dies
      if (drop.y > canvas.height + 50 || drop.life >= drop.maxLife) {
        drop.y = -50 - Math.random() * 100;
        drop.x = Math.random() * canvas.width;
        drop.life = 0;
        drop.opacity = 0.1 + Math.random() * 0.3;
        drop.char = characters[Math.floor(Math.random() * characters.length)];
      }
    };

    const render = () => {
      if (!isVisible) return;
      
      // Clear with slight fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';

      // Update and draw drops
      drops.forEach(drop => {
        updateDrop(drop);
        
        // Draw main character with glow
        ctx.fillStyle = `rgba(255, 0, 0, ${drop.opacity})`;
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 5;
        ctx.fillText(drop.char, drop.x, drop.y);
        
        // Draw trail effect
        for (let i = 1; i <= 3; i++) {
          const trailY = drop.y - i * 20;
          const trailOpacity = drop.opacity * (1 - i * 0.3);
          
          if (trailOpacity > 0.01) {
            ctx.fillStyle = `rgba(255, 0, 0, ${trailOpacity})`;
            ctx.shadowBlur = 2;
            ctx.fillText(drop.char, drop.x, trailY);
          }
        }
        
        ctx.shadowBlur = 0;
      });

      // Occasionally add new drops
      if (Math.random() < 0.003 && drops.length < 50) {
        drops.push(createDrop(Math.random() * canvas.width));
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    render();

    // Visibility change handler for performance
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Reduce animation on slow connections or reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsVisible(!e.matches);
    };

    setIsVisible(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
      aria-hidden="true"
    />
  );
};

export default CodeRain;