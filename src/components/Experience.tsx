"use client";

import { useState } from "react";
import type { ExperienceItem } from "@/lib/portfolio-local";
import { TiltCard } from "@/components/TiltCard";
import { ExperienceModal } from "@/components/ExperienceModal";
import { usePortfolio } from "@/components/PortfolioProvider";

export function Experience() {
  const { data } = usePortfolio();
  const experience = data.experience;
  const [active, setActive] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" /> Experience
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            A short, fast trajectory.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Click QueueBuster or the research internship for full case studies — architecture, challenges, and stack.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {experience.map((job) => {
            const clickable = Boolean(job.detail);
            return (
              <TiltCard
                key={job.id}
                className={`group relative h-full rounded-2xl glass-strong p-1 shadow-elegant ${
                  clickable ? "cursor-pointer" : ""
                }`}
              >
                <div
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onClick={() => {
                    if (clickable) setActive(job);
                  }}
                  onKeyDown={(e) => {
                    if (clickable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setActive(job);
                    }
                  }}
                  className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-6 glass-strong text-left outline-none"
                  data-cursor={clickable ? "hover" : undefined}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-mono text-xs text-primary">{job.period}</div>
                    {job.logo && (
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-border p-1 ${
                          job.id === "queuebuster" ? "bg-[#0080FF]" : "bg-white"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={job.logo}
                          alt={`${job.org} logo`}
                          className="h-full w-full object-contain"
                        />
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {job.title}
                  </h3>
                  <div className="text-sm text-muted-foreground">{job.org}</div>
                  <ul className="mt-4 flex-1 space-y-2 text-sm">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full gradient-aurora" />
                        <span className="text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 min-h-[1.25rem] text-[11px] font-medium text-primary">
                    {clickable ? "Open full case study →" : "\u00A0"}
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-aurora" />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      <ExperienceModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
