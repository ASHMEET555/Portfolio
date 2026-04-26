'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Node {
  id: string;
  x: number;
  y: number;
  value: number;
  layer: number;
  isActive: boolean;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  isActive: boolean;
}

const NeuralNetworkVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize neural network structure
    const initNetwork = () => {
      const newNodes: Node[] = [];
      const newConnections: Connection[] = [];
      
      // Create layers: input (4), hidden (6), hidden (4), output (2)
      const layers = [4, 6, 4, 2];
      const layerSpacing = canvas.width / (layers.length + 1);
      
      let nodeId = 0;
      layers.forEach((nodeCount, layerIndex) => {
        const nodeSpacing = canvas.height / (nodeCount + 1);
        
        for (let i = 0; i < nodeCount; i++) {
          newNodes.push({
            id: `node-${nodeId++}`,
            x: layerSpacing * (layerIndex + 1),
            y: nodeSpacing * (i + 1),
            value: Math.random(),
            layer: layerIndex,
            isActive: false
          });
        }
      });

      // Create connections between adjacent layers
      layers.forEach((_, layerIndex) => {
        if (layerIndex < layers.length - 1) {
          const currentLayerNodes = newNodes.filter(n => n.layer === layerIndex);
          const nextLayerNodes = newNodes.filter(n => n.layer === layerIndex + 1);
          
          currentLayerNodes.forEach(fromNode => {
            nextLayerNodes.forEach(toNode => {
              newConnections.push({
                from: fromNode.id,
                to: toNode.id,
                weight: (Math.random() - 0.5) * 2,
                isActive: false
              });
            });
          });
        }
      });

      setNodes(newNodes);
      setConnections(newConnections);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNetwork();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !nodes.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
          const opacity = connection.isActive ? 0.8 : 0.2;
          const weight = Math.abs(connection.weight);
          
          ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
          ctx.lineWidth = weight * 3;
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();

          // Add glow effect for active connections
          if (connection.isActive) {
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const radius = 8 + node.value * 4;
        const alpha = node.isActive ? 1 : 0.6;
        
        // Node background
        ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 2, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Node fill based on activation
        const fillAlpha = node.value * alpha;
        ctx.fillStyle = `rgba(255, 0, 0, ${fillAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius - 2, 0, Math.PI * 2);
        ctx.fill();

        // Add glow for active nodes
        if (node.isActive) {
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, connections]);

  const simulateTraining = () => {
    if (isTraining) return;

    setIsTraining(true);
    let step = 0;
    const maxSteps = 50;

    const trainingInterval = setInterval(() => {
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          value: Math.max(0, Math.min(1, node.value + (Math.random() - 0.5) * 0.2)),
          isActive: Math.random() > 0.7
        }))
      );

      setConnections(prevConnections =>
        prevConnections.map(conn => ({
          ...conn,
          weight: Math.max(-1, Math.min(1, conn.weight + (Math.random() - 0.5) * 0.1)),
          isActive: Math.random() > 0.8
        }))
      );

      step++;
      if (step >= maxSteps) {
        clearInterval(trainingInterval);
        setIsTraining(false);
        
        // Reset active states
        setNodes(prevNodes => 
          prevNodes.map(node => ({ ...node, isActive: false }))
        );
        setConnections(prevConnections =>
          prevConnections.map(conn => ({ ...conn, isActive: false }))
        );
      }
    }, 100);
  };

  return (
    <div className="relative w-full h-96 bg-cyberpunk-dark border border-cyberpunk-red/30">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      <div className="absolute top-4 left-4 space-y-2">
        <div className="text-cyberpunk-red text-sm tracking-wider">
          NEURAL NETWORK SIMULATOR
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={simulateTraining}
          disabled={isTraining}
          className={`px-4 py-2 text-xs tracking-wider border transition-all duration-300 ${
            isTraining
              ? 'border-cyberpunk-red/50 text-cyberpunk-text-dim cursor-not-allowed'
              : 'border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text'
          }`}
        >
          {isTraining ? 'TRAINING...' : 'START TRAINING'}
        </motion.button>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-cyberpunk-text-dim">
        <div>Input Layer → Hidden Layers → Output Layer</div>
        <div>Real-time weight adjustment simulation</div>
      </div>

      {/* Scan lines overlay */}
      <div className="absolute inset-0 scan-lines opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default NeuralNetworkVisualizer;