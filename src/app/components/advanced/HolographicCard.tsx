'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  hoverScale?: number;
  rotationIntensity?: number;
  enableTilt?: boolean;
  enableGlow?: boolean;
  enableScanlines?: boolean;
  onClick?: () => void;
}

const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className = '',
  intensity = 0.5,
  glowColor = '#ff0000',
  hoverScale = 1.05,
  rotationIntensity = 10,
  enableTilt = true,
  enableGlow = true,
  enableScanlines = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !enableTilt) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateY = (mouseX / rect.width) * rotationIntensity;
      const rotateX = -(mouseY / rect.height) * rotationIntensity;
      
      setMousePosition({ 
        x: (mouseX / rect.width) * 100, 
        y: (mouseY / rect.height) * 100 
      });
      setTransform({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform({ rotateX: 0, rotateY: 0 });
      setMousePosition({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [enableTilt, rotationIntensity]);

  const glowStyle = {
    boxShadow: isHovered && enableGlow
      ? `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20, 0 0 60px ${glowColor}10`
      : `0 0 10px ${glowColor}20`,
  };

  const transformStyle = enableTilt
    ? {
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${isHovered ? hoverScale : 1})`,
        transformStyle: 'preserve-3d' as const,
      }
    : {
        transform: `scale(${isHovered ? hoverScale : 1})`,
      };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden border border-cyberpunk-red/30 bg-cyberpunk-gray/10 backdrop-blur-sm transition-all duration-300 ${className}`}
      style={{
        ...transformStyle,
        ...glowStyle,
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Holographic overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, transparent 30%, ${glowColor}20 50%, transparent 70%)`,
          transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Reflection effect */}
      {enableTilt && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, ${glowColor}30 0%, transparent 50%)`,
            transition: 'background 0.1s ease-out',
          }}
        />
      )}

      {/* Scan lines */}
      {enableScanlines && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(transparent 50%, rgba(255, 0, 0, 0.03) 50%)',
            backgroundSize: '100% 4px',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0 0', '0 4px'] : '0 0',
          }}
          transition={{
            duration: 0.1,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        />
      )}

      {/* Border glow animation */}
      <motion.div
        className="absolute inset-0 border-2 pointer-events-none"
        style={{
          borderColor: glowColor,
          opacity: isHovered ? 0.6 : 0.2,
        }}
        animate={{
          opacity: isHovered ? [0.2, 0.6, 0.2] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />

      {/* Content wrapper with 3D transform */}
      <div
        className="relative z-10 w-full h-full"
        style={{
          transform: enableTilt ? 'translateZ(20px)' : 'none',
        }}
      >
        {children}
      </div>

      {/* Corner decorations */}
      {isHovered && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2"
            style={{ borderColor: glowColor }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2"
            style={{ borderColor: glowColor }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2"
            style={{ borderColor: glowColor }}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2"
            style={{ borderColor: glowColor }}
          />
        </>
      )}

      {/* Data stream effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-cyberpunk-red to-transparent"
              style={{
                left: `${20 + i * 30}%`,
                height: '100%',
              }}
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'linear',
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default HolographicCard;