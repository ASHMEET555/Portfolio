'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import skillsDevelopmentImage from '../../imports/skills-development.jpg';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('ai-ml');
  const profileImage = skillsDevelopmentImage;

  const skillCategories = {
    'ai-ml': {
      title: "AI/ML & DATA SCIENCE",
      icon: "🧠",
      skills: [
        { name: "PyTorch & Deep Learning", level: 95, description: "Neural networks, model optimization, training pipelines" },
        { name: "Machine Learning Frameworks", level: 92, description: "Scikit-learn, XGBoost, LightGBM, ClinicalBERT" },
        { name: "NLP & LLM Engineering", level: 92, description: "Transformers, prompt pipelines, evaluation" },
        { name: "RAG & Agentic AI", level: 91, description: "LangGraph, vector retrieval, tool-calling workflows" },
        { name: "Computer Vision", level: 85, description: "ECG-ViT, image processing, medical imaging" },
        { name: "Data Science Stack", level: 93, description: "NumPy, Pandas, Matplotlib, Seaborn, analysis" }
      ]
    },
    backend: {
      title: "BACKEND & DATABASES",
      icon: "⚡",
      skills: [
        { name: "FastAPI & Flask", level: 94, description: "API development, async processing, microservices" },
        { name: "Python Development", level: 96, description: "Advanced Python, system design, optimization" },
        { name: "Database Systems", level: 88, description: "MongoDB, MySQL, PostgreSQL, TimescaleDB, Qdrant" },
        { name: "GenAI & Agentic AI", level: 90, description: "LangGraph workflows, tool-calling, planning, memory" },
        { name: "Distributed Systems", level: 84, description: "Redis queues, Celery workers, asynchronous processing" }
      ]
    },
    mlops: {
      title: "MLOPS & CLOUD",
      icon: "☁️",
      skills: [
        { name: "Docker & Containerization", level: 88, description: "Image building, compose stacks, reproducible environments" },
        { name: "Model Deployment", level: 87, description: "FastAPI serving, inference endpoints, rollout strategies" },
        { name: "Vector Databases", level: 89, description: "Qdrant indexing, retrieval tuning, hybrid search" },
        { name: "Experiment Tracking", level: 82, description: "Run management, metrics tracking, model comparison" },
        { name: "Cloud Tooling", level: 80, description: "Scalable infra setup, storage, and deployment workflows" }
      ]
    },
    frontend: {
      title: "FRONTEND (WORKING KNOWLEDGE)",
      icon: "💻",
      skills: [
        { name: "React Basics", level: 72, description: "Component-level UI for dashboards and tools" },
        { name: "TypeScript/JavaScript", level: 70, description: "Frontend integration and utility development" },
        { name: "HTML/CSS", level: 74, description: "Responsive layout work for product demos" }
      ]
    },
    languages: {
      title: "PROGRAMMING LANGUAGES",
      icon: "🔧",
      skills: [
        { name: "C++", level: 95, description: "1000+ DSA and CP problems solved in C++" },
        { name: "Python", level: 93, description: "Primary language for AI/ML research and backend systems" },
        { name: "SQL", level: 87, description: "Complex queries, optimization, database design" },
        { name: "C Language", level: 84, description: "Low-level and systems programming fundamentals" }
      ]
    }
  };

  const achievements = [
    {
      title: "4-STAR CODECHEF",
      value: "1800+",
      description: "Peak rating in competitive programming",
      icon: "⭐"
    },
    {
      title: "CODEFORCES SPECIALIST",
      value: "1472",
      description: "Consistent problem-solving performance",
      icon: "🎯"
    },
    {
      title: "PROBLEMS SOLVED",
      value: "1000+",
      description: "DSA and CP solved primarily in C++",
      icon: "💡"
    },
    {
      title: "HACKATHONS",
      value: "4+",
      description: "Participated and shipped real solutions",
      icon: "🚀"
    },
    {
      value: "4+",
      title: "AI PROJECTS",
      description: "Production-ready AI systems delivered",
      icon: "🤖"
    },
    {
      title: "RESEARCH INTERNSHIP",
      value: "IIT",
      description: "Applied ML research in real-world healthcare",
      icon: "🔬"
    }
  ];

  const SkillBar = ({ skill, index }: { skill: any, index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="space-y-3 group"
      >
        <div className="flex justify-between items-center">
          <span className="text-cyberpunk-text tracking-wider">{skill.name}</span>
          <span className="text-cyberpunk-red text-sm">{skill.level}%</span>
        </div>
        
        <div className="relative h-2 bg-cyberpunk-gray border border-cyberpunk-red/30">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.5, delay: index * 0.1 + 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyberpunk-red to-red-400 relative overflow-hidden"
          >
            <div className="absolute inset-0 hologram opacity-50"></div>
          </motion.div>
        </div>
        
        <p className="text-xs text-cyberpunk-text-dim group-hover:text-cyberpunk-text transition-colors duration-200">
          {skill.description}
        </p>
      </motion.div>
    );
  };

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 matrix-bg opacity-5"></div>
      
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl text-cyberpunk-text text-glow-red mb-6">
            &lt;SKILLS_MATRIX/&gt;
          </h2>
          <p className="text-xl text-cyberpunk-text-dim max-w-3xl mx-auto">
            Technical arsenal built through competitive programming, research, and production deployments
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyberpunk-red to-transparent mx-auto mt-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Left side - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl text-cyberpunk-red tracking-wider mb-8">SKILL_CATEGORIES</h3>
            
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                type="button"
                aria-pressed={activeCategory === key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full p-4 text-left border transition-all duration-300 ${
                  activeCategory === key
                    ? 'border-cyberpunk-red bg-cyberpunk-red/20 text-cyberpunk-text'
                    : 'border-cyberpunk-red/30 bg-cyberpunk-gray/10 text-cyberpunk-text-dim hover:border-cyberpunk-red/60 hover:text-cyberpunk-text'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="tracking-wider text-sm">{category.title}</span>
                </div>
                {activeCategory === key && (
                  <motion.div
                    layoutId="active-category"
                    className="absolute inset-0 border-2 border-cyberpunk-red pointer-events-none"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Augmented image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 relative"
            >
              <div className="relative overflow-hidden border-2 border-cyberpunk-red/30">
                <img 
                  src={profileImage}
                  alt="AI Engineer Profile"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 hologram opacity-30"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-cyberpunk-dark/80 p-3 border border-cyberpunk-red/50">
                  <div className="text-xs text-cyberpunk-red tracking-wider">COMPETITIVE_CODER: ACTIVE</div>
                  <div className="text-xs text-cyberpunk-text-dim">Problem-solving: 1000+ solved</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Skills */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl text-cyberpunk-red tracking-wider">
                {skillCategories[activeCategory as keyof typeof skillCategories].title}
              </h3>
              
              <div className="space-y-8">
                {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>

              {/* Overall proficiency */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 p-6 border border-cyberpunk-red/30 bg-cyberpunk-gray/10"
              >
                <h4 className="text-cyberpunk-red tracking-wider mb-4">TOOLS_&_TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'PyTorch',
                    'Scikit-learn',
                    'XGBoost',
                    'LightGBM',
                    'Transformers',
                    'LangChain',
                    'LangGraph',
                    'Qdrant',
                    'FAISS',
                    'FastAPI',
                    'Flask',
                    'Docker',
                    'Redis',
                    'Celery',
                    'MongoDB',
                    'PostgreSQL',
                    'MySQL',
                    'TimescaleDB',
                    'Git',
                    'GitHub',
                    'Linux',
                    'OpenCV',
                    'Pandas',
                    'NumPy',
                    'Matplotlib',
                    'Seaborn',
                    'Jupyter',
                    'Weights&Biases',
                    'MLflow',
                    'LaTeX'
                  ].map((tool) => (
                    <span key={tool} className="px-3 py-1 text-sm border border-cyberpunk-red/30 text-cyberpunk-red bg-cyberpunk-red/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl text-cyberpunk-red tracking-wider text-center mb-8">
            ACHIEVEMENTS_AND_IMPACT
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="border border-cyberpunk-red/30 p-6 bg-cyberpunk-gray/10 hover:border-cyberpunk-red hover:bg-cyberpunk-red/10 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{achievement.icon}</div>
                  <div className="text-3xl text-cyberpunk-red mb-2">{achievement.value}</div>
                  <div className="text-sm text-cyberpunk-red tracking-wider mb-2">{achievement.title}</div>
                  <div className="text-xs text-cyberpunk-text-dim">{achievement.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating skill tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 relative h-32 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {['C++', 'PyTorch', 'FastAPI', 'LangGraph', 'Qdrant', 'Redis', 'Docker', 'MLflow'].map((tech, index) => (
              <motion.div
                key={tech}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10 + index,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 2,
                }}
                className="absolute px-3 py-1 text-xs text-cyberpunk-red border border-cyberpunk-red/50 bg-cyberpunk-dark/80 tracking-wider"
                style={{
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 80}%`,
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
