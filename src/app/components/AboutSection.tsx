'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import HolographicCard from './advanced/HolographicCard';
import DataVisualization from './advanced/DataVisualization';
import InteractiveTimeline from './advanced/InteractiveTimeline';
import ashmeetProfile from '../../imports/ashmeet-profile.jpg';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story', label: 'MY_JOURNEY', icon: '📖' },
    { id: 'vision', label: 'VISION', icon: '🔮' },
    { id: 'experience', label: 'EXPERIENCE', icon: '💼' },
    { id: 'metrics', label: 'METRICS', icon: '📊' }
  ];

  const achievements = [
    {
      number: '4',
      label: 'AI_SYSTEMS',
      description: 'Production-ready deployments',
      icon: '🚀'
    },
    {
      number: '4+',
      label: 'HACKATHONS',
      description: 'Built and shipped under pressure',
      icon: '🏆'
    },
    {
      number: '800+',
      label: 'PROBLEMS_SOLVED',
      description: 'Competitive programming',
      icon: '⚡'
    },
    {
      number: 'IIT',
      label: 'RESEARCH_INTERN',
      description: 'Medical AI and GenAI workflows',
      icon: '🔬'
    }
  ];

  const skills = [
    { name: 'Artificial Intelligence', level: 95, category: 'AI/ML' },
    { name: 'Machine Learning', level: 92, category: 'AI/ML' },
    { name: 'Deep Learning', level: 88, category: 'AI/ML' },
    { name: 'Computer Vision', level: 85, category: 'AI/ML' },
    { name: 'React/Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Three.js/WebGL', level: 88, category: 'Frontend' },
    { name: 'Python', level: 93, category: 'Backend' },
    { name: 'Node.js', level: 87, category: 'Backend' },
    { name: 'Cloud/DevOps', level: 85, category: 'Infrastructure' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-cyberpunk-text-dim">
              My journey into AI started at <span className="text-cyberpunk-red">IIIT Una</span>, where I'm currently pursuing B.Tech in Computer Science while diving deep into machine learning, deep learning, GenAI, and agentic systems.
            </p>
            
            <p className="leading-relaxed text-cyberpunk-text-dim">
              Currently working as a <span className="text-cyberpunk-red">Research Intern at IIT Mandi</span>, I've been pushing the boundaries of medical AI 
              by developing efficient ECG analysis systems using Small Language Models (SLMs) and Vision Transformers. My work focuses on making AI more accessible 
              and deployable in real-world healthcare scenarios.
            </p>
            
            <p className="leading-relaxed text-cyberpunk-text-dim">
              From building privacy-first medical assistants to creating real-time intelligence platforms and AI agents, 
              I combine theory with practical implementation. Competitive programming (800+ solved) and 4+ hackathons shape my problem-solving approach.
            </p>

            <div className="border-l-2 border-cyberpunk-red pl-6 bg-cyberpunk-red/5 p-4">
              <blockquote className="text-cyberpunk-red italic text-lg">
                "AI should be practical, accessible, and transformative - bridging the gap between research and real-world impact."
              </blockquote>
              <cite className="text-sm text-cyberpunk-text-dim mt-2 block">- Ashmeet Singh Sandhu</cite>
            </div>
          </motion.div>
        );

      case 'vision':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h4 className="text-2xl text-cyberpunk-red tracking-wider">THE_FUTURE_IS_COLLABORATIVE</h4>
            
            <p className="text-lg leading-relaxed text-cyberpunk-text-dim">
              I envision a future where AI and humans work in perfect harmony - where artificial 
              intelligence serves as an extension of human creativity and problem-solving capabilities.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="text-cyberpunk-red tracking-wider">NEAR_TERM (2024-2026)</h5>
                <ul className="space-y-2 text-cyberpunk-text-dim">
                  <li className="flex items-start space-x-2">
                    <span className="text-cyberpunk-red">▶</span>
                    <span>Democratized AI tools for creators</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyberpunk-red">▶</span>
                    <span>Real-time neural interfaces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyberpunk-red">▶</span>
                    <span>Seamless AR/VR integration</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="text-cyberpunk-red tracking-wider">LONG_TERM (2026+)</h5>
                <ul className="space-y-2 text-cyberpunk-text-dim">
                  <li className="flex items-start space-x-2">
                    <span className="text-cyberpunk-red">▶</span>
                    <span>AI-human creative partnerships</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyberpunk-red">▶</span>
                    <span>Quantum-enhanced computation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-cyberpunk-red">▶</span>
                    <span>Universal accessibility through AI</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h4 className="text-2xl text-cyberpunk-red tracking-wider">EXPERIENCE & EDUCATION</h4>
            
            <div className="grid gap-6">
              {[
                {
                  title: 'RESEARCH_INTERN @ IIT_MANDI',
                  period: 'Dec 2025 - Present',
                  description: 'Building ECG analysis systems with SLM + Vision Transformers. Achieved 68.26 macro-AUC on PTB-XL classification while maintaining clinical report quality.',
                  icon: '🔬'
                },
                {
                  title: 'B.TECH_CSE @ IIIT_UNA',
                  period: '2024 - 2028',
                  description: 'Specializing in AI/ML and system design while building production-grade solutions with practical impact.',
                  icon: '🎓'
                },
                {
                  title: 'COMPETITIVE_PROGRAMMER',
                  period: 'Ongoing',
                  description: '4-Star CodeChef, Codeforces Specialist (1472), and 800+ problems solved across major coding platforms.',
                  icon: '💻'
                },
                {
                  title: 'AI/ML_BUILDER',
                  period: '2025 - Present',
                  description: 'Developed 4+ production-ready AI systems including medical assistants, real-time intelligence platforms, and secure AI pipelines.',
                  icon: '🚀'
                }
              ].map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-cyberpunk-red/30 p-4 bg-cyberpunk-red/5 hover:border-cyberpunk-red/60 transition-colors duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-2xl">{experience.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-cyberpunk-red tracking-wider">{experience.title}</h5>
                        <span className="text-xs text-cyberpunk-text-dim">{experience.period}</span>
                      </div>
                      <p className="text-cyberpunk-text-dim text-sm">{experience.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'metrics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DataVisualization />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section ref={ref} id="about" className="py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl text-cyberpunk-text text-glow-red mb-6">
            &lt;ABOUT_ME/&gt;
          </h2>
          <p className="text-xl text-cyberpunk-text-dim max-w-3xl mx-auto">
            AI engineer focused on GenAI, Agentic AI, and secure real-world systems
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HolographicCard className="p-8">
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="relative mx-auto w-48 h-48 mb-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyberpunk-red via-transparent to-cyberpunk-red animate-spin"></div>
                  <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-cyberpunk-red">
                    <ImageWithFallback
                      src={ashmeetProfile}
                      alt="Ashmeet Singh Sandhu - AI Engineer"
                      className="w-full h-full object-cover object-[50%_12%]"
                    />
                    <div className="absolute inset-0 hologram"></div>
                  </div>
                  
                  {/* Floating tech indicators */}
                  <div className="absolute -inset-6">
                    {['AI', 'ML', 'CV', 'NLP'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        className={`absolute w-8 h-8 bg-cyberpunk-dark border border-cyberpunk-red text-xs flex items-center justify-center ${
                          index === 0 ? 'top-0 left-1/2 -translate-x-1/2' :
                          index === 1 ? 'right-0 top-1/2 -translate-y-1/2' :
                          index === 2 ? 'bottom-0 left-1/2 -translate-x-1/2' :
                          'left-0 top-1/2 -translate-y-1/2'
                        }`}
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bio Summary */}
                <div className="text-center">
                  <h3 className="text-2xl text-cyberpunk-red tracking-wider mb-4">
                    ASHMEET SINGH SANDHU
                  </h3>
                  <p className="text-cyberpunk-text-dim mb-6">
                    Research Intern @ IIT Mandi specializing in medical AI, GenAI, Agentic AI, and blockchain security use cases. 
                    B.Tech CSE student at IIIT Una building production-grade AI/ML systems.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border border-cyberpunk-red/30">
                      <div className="text-xl text-cyberpunk-red">8.87</div>
                      <div className="text-xs text-cyberpunk-text-dim">CGPA @ IIIT Una</div>
                    </div>
                    <div className="text-center p-3 border border-cyberpunk-red/30">
                      <div className="text-xl text-cyberpunk-red">IIT</div>
                      <div className="text-xs text-cyberpunk-text-dim">Research Intern</div>
                    </div>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Tabbed Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm tracking-wider border transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-cyberpunk-red bg-cyberpunk-red text-cyberpunk-text'
                      : 'border-cyberpunk-red/30 text-cyberpunk-text-dim hover:border-cyberpunk-red hover:text-cyberpunk-red'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <HolographicCard className="p-8 min-h-[400px]">
              {renderTabContent()}
            </HolographicCard>
          </motion.div>
        </div>

        {/* Achievement Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <HolographicCard className="p-6 text-center h-full">
                <div className="text-3xl mb-4">{achievement.icon}</div>
                <div className="text-3xl text-cyberpunk-red mb-2">{achievement.number}</div>
                <div className="text-sm text-cyberpunk-red tracking-wider mb-2">{achievement.label}</div>
                <div className="text-xs text-cyberpunk-text-dim">{achievement.description}</div>
              </HolographicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <InteractiveTimeline />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;