'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxLayer {
  id: string;
  speed: number;
  element: React.ReactNode;
  zIndex?: number;
  opacity?: number;
}

interface ParallaxContainerProps {
  layers: ParallaxLayer[];
  height?: string;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  layers,
  height = '100vh',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {layers.map((layer) => {
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [0, layer.speed * 100]
        );

        return (
          <motion.div
            key={layer.id}
            style={{
              y,
              zIndex: layer.zIndex || 0,
              opacity: layer.opacity || 1
            }}
            className="absolute inset-0"
          >
            {layer.element}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParallaxContainer;