"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { TiltCard } from "@/components/TiltCard";
import { ProjectModal } from "@/components/ProjectModal";
import type { Project } from "@/lib/portfolio-local";
import { usePortfolio } from "@/components/PortfolioProvider";

export function Projects() {
  const { data } = usePortfolio();
  const { projects, site } = data;
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" /> Selected work
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Products, models and platforms I&apos;ve shipped.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Click any project to open a detailed case window — demos, stack, and walkthrough.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <TiltCard
              key={project.id}
              intensity={6.5}
              className="group relative rounded-3xl glass-strong p-1 shadow-elegant h-full cursor-pointer"
            >
              <button
                type="button"
                onClick={() => setActive(project)}
                className="relative overflow-hidden rounded-[1.5rem] glass-strong h-full flex flex-col text-left w-full"
                data-cursor="hover"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/45" />
                  <div className="absolute left-4 top-4 rounded-full glass px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white z-10">
                    {project.category}
                  </div>
                  <div className="absolute right-4 top-4 flex gap-2 z-30">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, "_blank", "noopener,noreferrer");
                      }}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          window.open(project.github, "_blank", "noopener,noreferrer");
                        }
                      }}
                      aria-label="GitHub"
                      className="grid h-8 w-8 place-items-center rounded-full glass text-white transition hover:scale-110"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                    </span>
                    {(project.live || project.youtube) && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            project.live || project.youtube || project.github,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.stopPropagation();
                            window.open(
                              project.live || project.youtube || project.github,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                        aria-label="Live or demo"
                        className="grid h-8 w-8 place-items-center rounded-full glass text-white transition hover:scale-110"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-aurora" />
              </button>
            </TiltCard>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium transition hover:text-primary hover:shadow-elegant ring-aurora"
          >
            <GithubIcon className="h-4 w-4" />
            Explore more projects
            <ExternalLink className="h-3.5 w-3.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
