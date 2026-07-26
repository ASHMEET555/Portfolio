"use client";

import { TiltCard } from "@/components/TiltCard";
import { TechLogoMarquee } from "@/components/TechLogoMarquee";
import { usePortfolio } from "@/components/PortfolioProvider";

export function Skills() {
  const { data } = usePortfolio();
  const skillGroups = data.skillGroups;

  return (
    <section id="skills" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" /> Stack
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tools I use to build intelligent products.
          </h2>
        </div>

        <TechLogoMarquee />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <TiltCard
              key={group.title}
              intensity={4}
              className="group relative h-full rounded-3xl glass-strong p-1 shadow-elegant"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-6 glass-strong">
                <h3 className="text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="pointer-events-none select-none rounded-full border border-border bg-muted/30 px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-aurora" />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
