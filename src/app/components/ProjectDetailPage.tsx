'use client';

import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getProjectById } from '../data/projects';

interface ProjectDetailPageProps {
  projectId: string;
}

const ProjectDetailPage = ({ projectId }: ProjectDetailPageProps) => {
  const project = getProjectById(projectId);

  const goBackToProjects = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.setTimeout(() => {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  if (!project) {
    return (
      <section className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl text-cyberpunk-red mb-6">PROJECT_NOT_FOUND</h2>
          <p className="text-cyberpunk-text-dim mb-8">The requested project case study does not exist.</p>
          <button
            onClick={goBackToProjects}
            className="px-6 py-3 border border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-colors duration-300"
          >
            BACK_TO_PROJECTS
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-20 pb-24" id="project-detail">
      <div className="container mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goBackToProjects}
          className="mb-8 px-5 py-2 border border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-colors duration-300"
        >
          ← BACK_TO_PROJECTS
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-cyberpunk-red/40 bg-cyberpunk-gray/20 overflow-hidden"
        >
          <div className="relative h-72 md:h-96 overflow-hidden">
            <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyberpunk-dark via-cyberpunk-dark/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl md:text-5xl text-cyberpunk-red mb-2">{project.title}</h1>
              <p className="text-cyberpunk-text-dim">{project.year}</p>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-cyberpunk-red/30 p-4">
                <div className="text-cyberpunk-red text-xl">{project.metrics.performance}</div>
                <div className="text-cyberpunk-text-dim text-sm">PERFORMANCE</div>
              </div>
              <div className="border border-cyberpunk-red/30 p-4">
                <div className="text-cyberpunk-red text-xl">{project.metrics.impact}</div>
                <div className="text-cyberpunk-text-dim text-sm">IMPACT</div>
              </div>
              {project.metrics.users && (
                <div className="border border-cyberpunk-red/30 p-4">
                  <div className="text-cyberpunk-red text-xl">{project.metrics.users}</div>
                  <div className="text-cyberpunk-text-dim text-sm">SCALE</div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-3">PROJECT_DESCRIPTION</h2>
              <p className="text-cyberpunk-text-dim leading-relaxed">{project.longDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-3">PROBLEM_STATEMENT</h2>
              <p className="text-cyberpunk-text-dim leading-relaxed">{project.problem}</p>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-3">SOLUTION</h2>
              <p className="text-cyberpunk-text-dim leading-relaxed">{project.solution}</p>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-3">HOW_IT_WAS_BUILT</h2>
              <p className="text-cyberpunk-text-dim leading-relaxed">{project.implementation}</p>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-3">IMPORTANT_TERMS</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 border border-cyberpunk-red/40 bg-cyberpunk-red/5 text-cyberpunk-red text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-4">DEMO_PHOTOS_AND_VIDEOS</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.demoMedia.map((item) => (
                  <div key={item.title} className="border border-cyberpunk-red/30 overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <ImageWithFallback
                        src={item.thumbnail || item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-2 py-1 text-xs border border-cyberpunk-red text-cyberpunk-red bg-cyberpunk-dark/80">
                        {item.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-cyberpunk-red mb-3">{item.title}</h3>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyberpunk-text-dim hover:text-cyberpunk-red transition-colors duration-200"
                      >
                        OPEN_MEDIA ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-4">PROJECT_LINKS</h2>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 border border-cyberpunk-red text-cyberpunk-red hover:bg-cyberpunk-red hover:text-cyberpunk-text transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-cyberpunk-red mb-4">SETUP_STEPS</h2>
              <div className="space-y-2 bg-cyberpunk-dark/60 border border-cyberpunk-red/30 p-4">
                {project.setup.map((step, index) => (
                  <div key={step} className="text-cyberpunk-text-dim text-sm">
                    <span className="text-cyberpunk-red mr-2">{index + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetailPage;
