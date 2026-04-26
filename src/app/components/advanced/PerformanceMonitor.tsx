'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  domNodes: number;
  connectionType: string;
  timestamp: number;
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    domNodes: 0,
    connectionType: 'unknown',
    timestamp: 0
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const renderStartRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let intervalId: NodeJS.Timeout;

    const measureFPS = () => {
      frameCountRef.current++;
      const now = performance.now();
      
      if (now - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        
        updateMetrics(fps);
      }
      
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    const updateMetrics = (fps: number) => {
      const now = performance.now();
      const renderTime = now - renderStartRef.current;
      
      // Memory usage (if available)
      let memoryUsage = 0;
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      }
      
      // DOM nodes count
      const domNodes = document.querySelectorAll('*').length;
      
      // Connection type
      let connectionType = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connectionType = connection.effectiveType || 'unknown';
      }
      
      const newMetrics: PerformanceMetrics = {
        fps,
        memoryUsage,
        renderTime,
        domNodes,
        connectionType,
        timestamp: now
      };
      
      setMetrics(newMetrics);
      
      // Keep history for trends (last 60 seconds)
      setHistory(prev => {
        const updated = [...prev, newMetrics];
        return updated.slice(-60); // Keep last 60 data points
      });
      
      renderStartRef.current = now;
    };

    // Start monitoring
    measureFPS();
    
    // Update metrics every second
    intervalId = setInterval(() => {
      // This will trigger the FPS calculation
    }, 1000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, []);

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return { status: 'EXCELLENT', color: 'text-green-400' };
    if (fps >= 45) return { status: 'GOOD', color: 'text-yellow-400' };
    if (fps >= 30) return { status: 'FAIR', color: 'text-orange-400' };
    return { status: 'POOR', color: 'text-red-400' };
  };

  const getMemoryStatus = (memory: number) => {
    if (memory < 50) return { status: 'OPTIMAL', color: 'text-green-400' };
    if (memory < 100) return { status: 'NORMAL', color: 'text-yellow-400' };
    if (memory < 200) return { status: 'HIGH', color: 'text-orange-400' };
    return { status: 'CRITICAL', color: 'text-red-400' };
  };

  const averageFPS = history.length > 0 
    ? Math.round(history.reduce((sum, m) => sum + m.fps, 0) / history.length)
    : 0;

  const performanceStatus = getPerformanceStatus(metrics.fps);
  const memoryStatus = getMemoryStatus(metrics.memoryUsage);

  return (
    <div className="fixed top-20 right-4 z-40">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-cyberpunk-dark/90 border border-cyberpunk-red/30 backdrop-blur-sm"
      >
        {/* Collapsed view */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-3 w-full text-left hover:bg-cyberpunk-red/10 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-cyberpunk-red text-xs tracking-wider">PERF_MONITOR</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.div>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="text-xs">
              <span className={performanceStatus.color}>{metrics.fps}</span>
              <span className="text-cyberpunk-text-dim ml-1">FPS</span>
            </div>
            {metrics.memoryUsage > 0 && (
              <div className="text-xs">
                <span className={memoryStatus.color}>{metrics.memoryUsage}</span>
                <span className="text-cyberpunk-text-dim ml-1">MB</span>
              </div>
            )}
          </div>
        </motion.button>

        {/* Expanded view */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 border-t border-cyberpunk-red/20 space-y-4">
                {/* Performance metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-cyberpunk-red tracking-wider mb-1">FPS</div>
                    <div className={`${performanceStatus.color} text-lg`}>{metrics.fps}</div>
                    <div className="text-cyberpunk-text-dim">{performanceStatus.status}</div>
                  </div>
                  
                  {metrics.memoryUsage > 0 && (
                    <div>
                      <div className="text-cyberpunk-red tracking-wider mb-1">MEMORY</div>
                      <div className={`${memoryStatus.color} text-lg`}>{metrics.memoryUsage}MB</div>
                      <div className="text-cyberpunk-text-dim">{memoryStatus.status}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-cyberpunk-red tracking-wider mb-1">DOM_NODES</div>
                    <div className="text-cyberpunk-text text-lg">{metrics.domNodes}</div>
                    <div className="text-cyberpunk-text-dim">ELEMENTS</div>
                  </div>
                  
                  <div>
                    <div className="text-cyberpunk-red tracking-wider mb-1">CONNECTION</div>
                    <div className="text-cyberpunk-text text-lg">{metrics.connectionType}</div>
                    <div className="text-cyberpunk-text-dim">TYPE</div>
                  </div>
                </div>

                {/* Performance history chart */}
                {history.length > 5 && (
                  <div>
                    <div className="text-cyberpunk-red text-xs tracking-wider mb-2">FPS_HISTORY</div>
                    <div className="h-16 relative bg-cyberpunk-gray/20 border border-cyberpunk-red/20">
                      <svg className="w-full h-full" viewBox="0 0 200 50">
                        <polyline
                          fill="none"
                          stroke="#ff0000"
                          strokeWidth="1"
                          points={
                            history.slice(-20).map((metric, index) => {
                              const x = (index / 19) * 200;
                              const y = 50 - (metric.fps / 60) * 50;
                              return `${x},${y}`;
                            }).join(' ')
                          }
                        />
                      </svg>
                      <div className="absolute bottom-1 left-1 text-xs text-cyberpunk-text-dim">
                        AVG: {averageFPS}
                      </div>
                    </div>
                  </div>
                )}

                {/* Performance recommendations */}
                {(metrics.fps < 30 || metrics.memoryUsage > 200) && (
                  <div className="border-t border-cyberpunk-red/20 pt-3">
                    <div className="text-cyberpunk-red text-xs tracking-wider mb-2">OPTIMIZATION_TIPS</div>
                    <div className="text-xs text-cyberpunk-text-dim space-y-1">
                      {metrics.fps < 30 && (
                        <div>• Reduce particle count or disable 3D effects</div>
                      )}
                      {metrics.memoryUsage > 200 && (
                        <div>• High memory usage detected</div>
                      )}
                      {metrics.domNodes > 5000 && (
                        <div>• Consider virtualizing large lists</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick actions */}
                <div className="border-t border-cyberpunk-red/20 pt-3">
                  <div className="text-cyberpunk-red text-xs tracking-wider mb-2">QUICK_ACTIONS</div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-2 py-1 text-xs border border-cyberpunk-red/30 text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-colors duration-200"
                    >
                      RELOAD
                    </button>
                    <button 
                      onClick={() => {
                        if ('memory' in performance) {
                          console.log('Performance memory:', (performance as any).memory);
                        }
                        console.log('Current metrics:', metrics);
                      }}
                      className="px-2 py-1 text-xs border border-cyberpunk-red/30 text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-colors duration-200"
                    >
                      DEBUG
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PerformanceMonitor;