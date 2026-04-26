'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import HolographicCard from './advanced/HolographicCard';
import { projects, type Project } from '../data/projects';

type ProjectFilter = 'all' | 'ai-ml' | 'research';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<ProjectFilter>('all');

  const categories: Array<{ id: ProjectFilter; label: string; icon: string }> = [
    { id: 'all', label: 'ALL_PROJECTS', icon: '🌐' },
    { id: 'ai-ml', label: 'AI_ML_PROJECTS', icon: '🤖' },
    { id: 'research', label: 'RESEARCH_PROJECTS', icon: '🔬' }
  ];

  const filteredProjects: Project[] =
    filter === 'all' ? projects.filter((project) => project.featured) : projects.filter((project) => project.category === filter);

  const sectionTitleByFilter: Record<ProjectFilter, string> = {
    all: 'FEATURED_PROJECTS',
    'ai-ml': 'AI_ML_PROJECTS',
    research: 'RESEARCH_PROJECTS'
  };

  const openProjectPage = (projectId: string) => {
    window.history.pushState({}, '', `/projects/${projectId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={ref} id="projects" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl text-cyberpunk-text text-glow-red mb-6">&lt;PROJECT_ARCHIVE/&gt;</h2>
          <p className="text-xl text-cyberpunk-text-dim max-w-3xl mx-auto">
            Explore complete case studies with problem statements, solution design, demo media, and project links.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 border tracking-wider transition-all duration-300 relative overflow-hidden ${
                filter === category.id
                  ? 'border-cyberpunk-red bg-cyberpunk-red text-cyberpunk-text'
                  : 'border-cyberpunk-red/30 text-cyberpunk-text-dim hover:border-cyberpunk-red hover:text-cyberpunk-red'
              }`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </span>
              {filter === category.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-cyberpunk-red"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-cyberpunk-text-dim text-sm mb-12"
        >
          CLICK_ANY_PROJECT_CARD_TO_OPEN_FULL_CASE_STUDY_PAGE
        </motion.p>

        <h3 className="text-2xl text-cyberpunk-red tracking-wider mb-8 text-center">{sectionTitleByFilter[filter]}</h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <HolographicCard className="h-full cursor-pointer overflow-hidden" onClick={() => openProjectPage(project.id)}>
                  <div className="relative">
                    <div className="relative h-44 overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyberpunk-dark to-transparent" />

                      <div
                        className={`absolute top-3 right-3 px-2 py-1 text-xs tracking-wider border ${
                          project.status === 'completed'
                            ? 'border-green-400 text-green-400 bg-green-400/10'
                            : project.status === 'in-progress'
                              ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                              : 'border-blue-400 text-blue-400 bg-blue-400/10'
                        }`}
                      >
                        {project.status.toUpperCase().replace('-', '_')}
                      </div>

                      <div className="absolute top-3 left-3 px-2 py-1 text-xs tracking-wider border border-cyberpunk-red text-cyberpunk-red bg-cyberpunk-red/10">
                        FEATURED
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg text-cyberpunk-red">{project.title}</h4>
                        <span className="text-xs text-cyberpunk-text-dim">{project.year.split(' ')[0]}</span>
                      </div>

                      <p className="text-cyberpunk-text-dim text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs border border-cyberpunk-red/30 text-cyberpunk-red bg-cyberpunk-red/5">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs text-cyberpunk-text-dim">+{project.technologies.length - 3}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center mb-3">
                        <div>
                          <div className="text-cyberpunk-red text-sm">{project.metrics.performance}</div>
                          <div className="text-xs text-cyberpunk-text-dim">Performance</div>
                        </div>
                        <div>
                          <div className="text-cyberpunk-red text-sm">{project.metrics.impact}</div>
                          <div className="text-xs text-cyberpunk-text-dim">Impact</div>
                        </div>
                      </div>

                      <div className="text-xs text-cyberpunk-red text-center tracking-wider">OPEN_FULL_CASE_STUDY →</div>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
