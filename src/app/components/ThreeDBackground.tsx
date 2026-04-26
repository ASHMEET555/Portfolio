'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  trail: Array<{ x: number; y: number; z: number; alpha: number }>;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  pulse: number;
}

const ThreeDBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const [performanceMode, setPerformanceMode] = useState(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Performance detection
    const checkPerformance = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        setPerformanceMode(['slow-2g', '2g', '3g'].includes(connection.effectiveType));
      }
    };
    checkPerformance();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1
      };
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Canvas setup
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      initializeSystem();
    };

    const initializeSystem = () => {
      const particleCount = performanceMode ? 50 : 120;
      particlesRef.current = [];
      connectionsRef.current = [];

      // Create particles with enhanced properties
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: (Math.random() - 0.5) * 2000,
          y: (Math.random() - 0.5) * 2000,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          vz: (Math.random() - 0.5) * 2,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
          size: 1 + Math.random() * 2,
          trail: []
        });
      }

      // Create neural network connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          if (Math.random() < 0.1) { // 10% connection chance
            connectionsRef.current.push({
              from: i,
              to: j,
              strength: Math.random(),
              pulse: Math.random() * Math.PI * 2
            });
          }
        }
      }
    };

    // Enhanced projection with perspective
    const project = (x: number, y: number, z: number, camera: { x: number; y: number; z: number }) => {
      const distance = z - camera.z;
      const scale = Math.max(0.1, 800 / (distance + 800));
      return {
        x: (x - camera.x) * scale + canvas.width / 2,
        y: (y - camera.y) * scale + canvas.height / 2,
        scale: scale,
        distance: distance
      };
    };

    // Enhanced lighting calculation
    const calculateLighting = (particle: Particle, lightSources: Array<{ x: number; y: number; z: number; intensity: number }>) => {
      let totalIntensity = 0.2; // Ambient light
      
      lightSources.forEach(light => {
        const dx = light.x - particle.x;
        const dy = light.y - particle.y;
        const dz = light.z - particle.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const intensity = light.intensity / (1 + distance * 0.001);
        totalIntensity += intensity;
      });
      
      return Math.min(1, totalIntensity);
    };

    let time = 0;
    const camera = { x: 0, y: 0, z: -500 };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      time += 0.016;

      // Dynamic camera movement
      const mouse = mousePositionRef.current;
      const scroll = scrollPositionRef.current;
      
      camera.x = Math.sin(time * 0.3) * 50 + mouse.x * 100;
      camera.y = Math.cos(time * 0.2) * 30 + mouse.y * 50 + scroll * 200;
      camera.z = -500 + Math.sin(time * 0.1) * 100;

      // Dynamic light sources
      const lightSources = [
        {
          x: Math.sin(time) * 300,
          y: Math.cos(time * 0.7) * 200,
          z: 200 + Math.sin(time * 0.5) * 100,
          intensity: 0.8
        },
        {
          x: mouse.x * 500,
          y: mouse.y * 300,
          z: 0,
          intensity: 0.6
        }
      ];

      // Update particles
      particlesRef.current.forEach((particle, index) => {
        // Physics update
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        particle.life++;

        // Add to trail
        if (particle.trail.length > 8) {
          particle.trail.shift();
        }
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          z: particle.z,
          alpha: 1
        });

        // Update trail alpha
        particle.trail.forEach((point, i) => {
          point.alpha = i / particle.trail.length;
        });

        // Mouse interaction
        const mouseInfluence = 100;
        const dx = (mouse.x * 500) - particle.x;
        const dy = (mouse.y * 300) - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          particle.vx += dx * force * 0.001;
          particle.vy += dy * force * 0.001;
        }

        // Boundary conditions with wrapping
        if (particle.life >= particle.maxLife || particle.z > 1000) {
          particle.x = (Math.random() - 0.5) * 2000;
          particle.y = (Math.random() - 0.5) * 2000;
          particle.z = -500;
          particle.life = 0;
          particle.vx = (Math.random() - 0.5) * 1;
          particle.vy = (Math.random() - 0.5) * 1;
          particle.vz = (Math.random() - 0.5) * 2;
          particle.trail = [];
        }
      });

      // Update connections
      connectionsRef.current.forEach(connection => {
        connection.pulse += 0.1;
      });

      // Render connections with enhanced effects
      connectionsRef.current.forEach(connection => {
        const particleA = particlesRef.current[connection.from];
        const particleB = particlesRef.current[connection.to];
        
        if (!particleA || !particleB) return;

        const projectedA = project(particleA.x, particleA.y, particleA.z, camera);
        const projectedB = project(particleB.x, particleB.y, particleB.z, camera);

        if (projectedA.scale > 0.1 && projectedB.scale > 0.1) {
          const distance = Math.sqrt(
            (particleA.x - particleB.x) ** 2 +
            (particleA.y - particleB.y) ** 2 +
            (particleA.z - particleB.z) ** 2
          );

          if (distance < 300) {
            const alpha = (1 - distance / 300) * connection.strength * 0.3;
            const pulse = Math.sin(connection.pulse) * 0.5 + 0.5;
            const finalAlpha = alpha * (0.5 + pulse * 0.5);

            // Gradient line
            const gradient = ctx.createLinearGradient(
              projectedA.x, projectedA.y,
              projectedB.x, projectedB.y
            );
            gradient.addColorStop(0, `rgba(255, 0, 0, ${finalAlpha})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 100, ${finalAlpha * 1.5})`);
            gradient.addColorStop(1, `rgba(255, 0, 0, ${finalAlpha})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = (projectedA.scale + projectedB.scale) * 0.5;
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 5;
            
            ctx.beginPath();
            ctx.moveTo(projectedA.x, projectedA.y);
            ctx.lineTo(projectedB.x, projectedB.y);
            ctx.stroke();
            
            ctx.shadowBlur = 0;
          }
        }
      });

      // Render particles with enhanced effects
      particlesRef.current.forEach(particle => {
        const projected = project(particle.x, particle.y, particle.z, camera);
        
        if (projected.scale > 0.05) {
          const lighting = calculateLighting(particle, lightSources);
          const alpha = (particle.life / particle.maxLife) * projected.scale * lighting;
          const size = particle.size * projected.scale * (1 + lighting * 0.5);

          // Draw particle trail
          if (!performanceMode && particle.trail.length > 1) {
            for (let i = 1; i < particle.trail.length; i++) {
              const prevPoint = particle.trail[i - 1];
              const currPoint = particle.trail[i];
              
              const prevProjected = project(prevPoint.x, prevPoint.y, prevPoint.z, camera);
              const currProjected = project(currPoint.x, currPoint.y, currPoint.z, camera);
              
              if (prevProjected.scale > 0.05 && currProjected.scale > 0.05) {
                const trailAlpha = alpha * currPoint.alpha * 0.3;
                
                ctx.strokeStyle = `rgba(255, 0, 0, ${trailAlpha})`;
                ctx.lineWidth = size * 0.3;
                ctx.beginPath();
                ctx.moveTo(prevProjected.x, prevProjected.y);
                ctx.lineTo(currProjected.x, currProjected.y);
                ctx.stroke();
              }
            }
          }

          // Draw main particle
          const gradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, size * 2
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          gradient.addColorStop(0.4, `rgba(255, 0, 0, ${alpha})`);
          gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);

          ctx.fillStyle = gradient;
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = size * 2;
          
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 0;

          // Neural pulse effect
          if (!performanceMode && Math.random() < 0.001) {
            ctx.strokeStyle = `rgba(255, 0, 0, 0.8)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(projected.x, projected.y, size * 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [performanceMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%)',
        filter: performanceMode ? 'brightness(0.8)' : 'none'
      }}
      aria-hidden="true"
    />
  );
};

export default ThreeDBackground;