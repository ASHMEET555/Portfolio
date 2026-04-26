'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MetricData {
  timestamp: string;
  value: number;
  label: string;
}

interface SkillData {
  name: string;
  value: number;
  color: string;
}

type MetricId = 'performance' | 'engagement' | 'efficiency';

interface MetricConfig {
  id: MetricId;
  label: string;
  unit: string;
  min: number;
  max: number;
  color: string;
}

const DataVisualization = () => {
  const [metricData, setMetricData] = useState<Record<MetricId, MetricData[]>>({
    performance: [],
    engagement: [],
    efficiency: []
  });
  const [skillData, setSkillData] = useState<SkillData[]>([]);
  const [activeMetric, setActiveMetric] = useState<MetricId>('performance');

  const metrics: MetricConfig[] = [
    { id: 'performance', label: 'PERFORMANCE', unit: 'FPS', min: 60, max: 100, color: '#ff0000' },
    { id: 'engagement', label: 'ENGAGEMENT', unit: '%', min: 45, max: 100, color: '#ff4d4d' },
    { id: 'efficiency', label: 'EFFICIENCY', unit: 'SCORE', min: 55, max: 100, color: '#ff8080' }
  ];

  useEffect(() => {
    const generateSeries = (config: MetricConfig) => {
      const data: MetricData[] = [];
      const now = Date.now();
      
      for (let i = 29; i >= 0; i--) {
        data.push({
          timestamp: new Date(now - i * 1000).toLocaleTimeString(),
          value: config.min + Math.random() * (config.max - config.min),
          label: `T-${i}`
        });
      }
      
      return data;
    };

    // Initialize skill data
    const skills: SkillData[] = [
      { name: 'ML', value: 94, color: '#ff0000' },
      { name: 'DL', value: 91, color: '#ff3333' },
      { name: 'GenAI', value: 93, color: '#ff6666' },
      { name: 'Agentic AI', value: 90, color: '#ff9999' },
      { name: 'Cloud / MLOps', value: 87, color: '#ffcccc' }
    ];

    setMetricData({
      performance: generateSeries(metrics[0]),
      engagement: generateSeries(metrics[1]),
      efficiency: generateSeries(metrics[2])
    });
    setSkillData(skills);

    // Update all metric streams every second so each tab has distinct live behavior.
    const interval = setInterval(() => {
      setMetricData(prev => {
        const nextData = { ...prev };

        metrics.forEach((config) => {
          const series = [...(nextData[config.id] || []).slice(1)];
          series.push({
            timestamp: new Date().toLocaleTimeString(),
            value: config.min + Math.random() * (config.max - config.min),
            label: 'T-0'
          });
          nextData[config.id] = series;
        });

        return nextData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeConfig = metrics.find((metric) => metric.id === activeMetric) || metrics[0];
  const activeSeries = metricData[activeMetric] || [];
  const currentValue = activeSeries.length ? activeSeries[activeSeries.length - 1].value : 0;
  const averageValue = activeSeries.length
    ? activeSeries.reduce((sum, d) => sum + d.value, 0) / activeSeries.length
    : 0;
  const peakValue = activeSeries.length ? Math.max(...activeSeries.map((d) => d.value)) : 0;

  return (
    <div className="w-full space-y-8">
      {/* Metric Selector */}
      <div className="flex flex-wrap gap-4 justify-center">
        {metrics.map((metric) => (
          <motion.button
            key={metric.id}
            onClick={() => setActiveMetric(metric.id as MetricId)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 border transition-all duration-300 ${
              activeMetric === metric.id
                ? 'border-cyberpunk-red bg-cyberpunk-red/20 text-cyberpunk-red'
                : 'border-cyberpunk-red/30 text-cyberpunk-text-dim hover:border-cyberpunk-red/60'
            }`}
          >
            <div className="text-sm tracking-wider">{metric.label}</div>
            <div className="text-xs opacity-60">{metric.unit}</div>
          </motion.button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Real-time Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-cyberpunk-gray/20 border border-cyberpunk-red/30 p-6"
        >
          <h3 className="text-cyberpunk-red tracking-wider mb-6">
            REAL_TIME_{activeConfig.label}
          </h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeSeries}>
                <XAxis 
                  dataKey="timestamp" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#cccccc', fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#cccccc', fontSize: 10 }}
                  domain={[activeConfig.min, activeConfig.max]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={activeConfig.color}
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="0"
                  filter={`drop-shadow(0 0 6px ${activeConfig.color})`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-cyberpunk-red text-xl">
                {currentValue.toFixed(1)}
              </div>
              <div className="text-xs text-cyberpunk-text-dim">CURRENT ({activeConfig.unit})</div>
            </div>
            <div>
              <div className="text-cyberpunk-red text-xl">
                {averageValue.toFixed(1)}
              </div>
              <div className="text-xs text-cyberpunk-text-dim">AVERAGE</div>
            </div>
            <div>
              <div className="text-cyberpunk-red text-xl">
                {peakValue.toFixed(1)}
              </div>
              <div className="text-xs text-cyberpunk-text-dim">PEAK</div>
            </div>
          </div>
        </motion.div>

        {/* Skills Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cyberpunk-gray/20 border border-cyberpunk-red/30 p-6"
        >
          <h3 className="text-cyberpunk-red tracking-wider mb-6">
            SKILL_DISTRIBUTION
          </h3>
          
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {skillData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 border border-cyberpunk-red/50"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="text-sm text-cyberpunk-text">{skill.name}</span>
                </div>
                <span className="text-cyberpunk-red text-sm">{skill.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-cyberpunk-gray/20 border border-cyberpunk-red/30 p-6"
      >
        <h3 className="text-cyberpunk-red tracking-wider mb-6">
          SYSTEM_STATUS
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'CPU_USAGE', value: '67%', status: 'OPTIMAL' },
            { label: 'MEMORY', value: '4.2GB', status: 'NORMAL' },
            { label: 'NETWORK', value: '142ms', status: 'STABLE' },
            { label: 'UPTIME', value: '99.8%', status: 'EXCELLENT' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 border border-cyberpunk-red/20 hover:border-cyberpunk-red/50 transition-colors duration-300"
            >
              <div className="text-2xl text-cyberpunk-red mb-2">{metric.value}</div>
              <div className="text-xs text-cyberpunk-text-dim mb-1">{metric.label}</div>
              <div className="text-xs text-green-400">{metric.status}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DataVisualization;