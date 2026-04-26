'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'work' | 'education' | 'project' | 'award';
}

const InteractiveTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '2026',
      year: '2026',
      title: 'Research Intern',
      company: 'IIT Mandi',
      description: 'Building ECG analysis systems with Small Language Models and Vision Transformers for medical AI applications.',
      technologies: ['PyTorch', 'Vision Transformers', 'SLM', 'Python', 'ECG Analysis'],
      achievements: [
        'Achieved 68.26 macro-AUC on PTB-XL SUB classification',
        'Maintained ROUGE-L 5.99% for clinical report generation',
        'Built end-to-end training/inference pipeline with gradient checkpointing'
      ],
      type: 'work'
    },
    {
      id: '2025-hackathons',
      year: '2025',
      title: 'Hackathon Participation',
      company: 'University + Open Innovation Events',
      description: 'Participated in 4+ hackathons and built end-to-end AI prototypes under tight deadlines.',
      technologies: ['Rapid Prototyping', 'AI Workflows', 'Team Collaboration'],
      achievements: [
        'Built and demoed production-style MVPs',
        'Worked across full-stack AI implementation',
        'Improved speed, delivery, and problem framing skills'
      ],
      type: 'award'
    },
    {
      id: '2025-competitive',
      year: '2025-2026',
      title: 'Competitive Programming Growth',
      company: 'Competitive Programming',
      description: 'Strengthened algorithmic thinking through continuous practice across major platforms.',
      technologies: ['C++', 'Algorithms', 'Data Structures'],
      achievements: [
        '800+ problems solved across platforms',
        '4-Star CodeChef and Codeforces Specialist',
        'Improved systems thinking for AI engineering tasks'
      ],
      type: 'award'
    },
    {
      id: '2025-projects',
      year: '2025-2026',
      title: 'AI/ML Projects',
      company: 'Independent Development',
      description: 'Built production-ready AI/ML systems spanning medical AI, real-time intelligence, and agentic workflows.',
      technologies: ['FastAPI', 'MongoDB', 'LangChain', 'Qdrant', 'Docker', 'PyTorch'],
      achievements: [
        'MediNodus: Privacy-first medical AI with 100% local processing',
        'FlashPoint: Real-time intelligence with 50+ data sources',
        'ChainAudit AI: Fraud detection using secure analytics pipelines',
        'Emergency Triage: Risk stratification for 58,000+ patient records'
      ],
      type: 'project'
    },
    {
      id: '2024',
      year: '2024',
      title: 'B.Tech Computer Science',
      company: 'IIIT Una',
      description: 'Pursuing Bachelor of Technology in Computer Science and Engineering with focus on AI/ML.',
      technologies: ['AI/ML', 'Data Structures', 'Algorithms', 'System Design'],
      achievements: [
        'Specializing in AI/ML and deep learning',
        'Active participant in coding competitions and hackathons'
      ],
      type: 'education'
    },
    {
      id: '2023',
      year: '2023-2024',
      title: 'Senior Secondary Education',
      company: 'Sri Gururam Rai Public School',
      description: 'Completed senior secondary education with strong foundation in mathematics and computer science.',
      technologies: ['Mathematics', 'Computer Science', 'Physics'],
      achievements: [
        'Strong foundation in STEM subjects',
        'Started competitive programming journey',
        'Developed interest in AI and machine learning'
      ],
      type: 'education'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'border-cyan-400 text-cyan-400';
      case 'education':
        return 'border-green-400 text-green-400';
      case 'project':
        return 'border-purple-400 text-purple-400';
      case 'award':
        return 'border-yellow-400 text-yellow-400';
      default:
        return 'border-cyberpunk-red text-cyberpunk-red';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'education':
        return '🎓';
      case 'project':
        return '🚀';
      case 'award':
        return '🏆';
      default:
        return '📌';
    }
  };

  return (
    <div ref={ref} className="relative">
      <h3 className="text-2xl text-cyberpunk-red tracking-wider text-center mb-12">
        CAREER_TIMELINE
      </h3>

      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyberpunk-red via-cyberpunk-red/50 to-transparent"></div>

      <div className="space-y-12">
        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0;
          const isSelected = selectedEvent === event.id;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content */}
              <motion.div
                className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedEvent(isSelected ? null : event.id)}
              >
                <div className="cursor-pointer group">
                  <div className={`inline-block px-3 py-1 text-xs tracking-wider border mb-2 ${getTypeColor(event.type)}`}>
                    <span className="mr-1">{getTypeIcon(event.type)}</span>
                    {event.type.toUpperCase()}
                  </div>

                  <motion.div
                    className={`border-2 p-4 transition-all duration-300 ${
                      isSelected
                        ? 'border-cyberpunk-red bg-cyberpunk-red/10'
                        : 'border-cyberpunk-red/30 bg-cyberpunk-gray/10 group-hover:border-cyberpunk-red/60'
                    }`}
                    layout
                  >
                    <h4 className="text-lg text-cyberpunk-red tracking-wider mb-1">
                      {event.title}
                    </h4>
                    <p className="text-sm text-cyberpunk-text-dim mb-2">
                      {event.company}
                    </p>
                    <p className="text-sm text-cyberpunk-text-dim mb-3">
                      {event.description}
                    </p>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-1 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                      {event.technologies.slice(0, isSelected ? undefined : 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-cyberpunk-red/30 text-cyberpunk-red bg-cyberpunk-red/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {!isSelected && event.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-cyberpunk-text-dim">
                          +{event.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Achievements */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 pt-3 border-t border-cyberpunk-red/30"
                      >
                        <p className="text-xs text-cyberpunk-red tracking-wider">KEY_ACHIEVEMENTS:</p>
                        <ul className={`space-y-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                          {event.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-cyberpunk-text-dim flex items-start">
                              <span className={`text-cyberpunk-red mr-2 ${isLeft ? 'order-2 ml-2' : ''}`}>▸</span>
                              <span className="flex-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Click indicator */}
                    <div className={`text-xs text-cyberpunk-text-dim mt-2 ${isLeft ? 'text-right' : 'text-left'}`}>
                      {isSelected ? 'Click to collapse' : 'Click for details'}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Center dot */}
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-6 h-6 border-4 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'border-cyberpunk-red bg-cyberpunk-red'
                      : 'border-cyberpunk-red bg-cyberpunk-dark'
                  }`}
                  animate={{
                    boxShadow: isSelected
                      ? '0 0 20px rgba(255, 0, 0, 0.8)'
                      : '0 0 10px rgba(255, 0, 0, 0.3)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyberpunk-red"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Year */}
              <div className={`w-5/12 ${isLeft ? 'pl-8' : 'pr-8 text-right'}`}>
                <motion.div
                  className="text-3xl text-cyberpunk-red tracking-wider"
                  whileHover={{ scale: 1.1 }}
                >
                  {event.year}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 flex flex-wrap justify-center gap-6"
      >
        {[
          { type: 'work', label: 'WORK', color: 'border-cyan-400 text-cyan-400' },
          { type: 'education', label: 'EDUCATION', color: 'border-green-400 text-green-400' },
          { type: 'project', label: 'PROJECTS', color: 'border-purple-400 text-purple-400' },
          { type: 'award', label: 'AWARDS', color: 'border-yellow-400 text-yellow-400' }
        ].map((item) => (
          <div key={item.type} className="flex items-center space-x-2">
            <div className={`w-3 h-3 border-2 ${item.color}`}></div>
            <span className="text-xs text-cyberpunk-text-dim tracking-wider">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InteractiveTimeline;
