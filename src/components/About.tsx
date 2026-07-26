"use client";

import { GraduationCap } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { TechCluster } from "@/components/TechDecor";
import { GitHubContributions } from "@/components/GitHubContributions";
import { CodolioContributions } from "@/components/CodolioContributions";
import { usePortfolio } from "@/components/PortfolioProvider";

export function About() {
  const { data } = usePortfolio();
  const { site, education } = data;

  return (
    <section id="about" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" /> About
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {site.aboutHeadline}
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <TiltCard className="group relative rounded-3xl glass-strong p-1 shadow-elegant">
            <TechCluster className="-left-4 -top-4" size="lg" />
            <TechCluster className="-right-3 -bottom-3" size="lg" hexBehind />
            <div className="relative overflow-hidden rounded-[1.5rem] glass-strong p-8 font-mono text-sm leading-relaxed">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.2_27)]" />
                <span className="h-3 w-3 rounded-full bg-[oklch(0.85_0.16_80)]" />
                <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_160)]" />
                <span className="ml-2 text-xs text-muted-foreground">agent.py</span>
              </div>
              <pre className="text-muted-foreground overflow-x-auto pb-2 whitespace-pre-wrap">
                <span className="text-[oklch(0.55_0.22_300)]">from</span> langchain.agents{" "}
                <span className="text-[oklch(0.55_0.22_300)]">import</span> create_agent{"\n"}
                <span className="text-[oklch(0.55_0.22_300)]">from</span> openai{" "}
                <span className="text-[oklch(0.55_0.22_300)]">import</span> OpenAI{"\n"}
                <span className="text-[oklch(0.55_0.22_300)]">import</span> pinecone{"\n\n"}
                <span className="text-muted-foreground/60"># Initialize RAG & Agent</span>
                {"\n"}
                <span className="text-[oklch(0.55_0.22_265)]">index</span> = pinecone.Index(
                <span className="text-[oklch(0.5_0.18_160)]">&quot;ashmeet&quot;</span>)
                {"\n\n"}
                <span className="text-[oklch(0.55_0.22_265)]">agent</span> = create_agent(
                {"\n"}
                {"  "}model=<span className="text-[oklch(0.5_0.18_160)]">&quot;gpt-4o&quot;</span>,
                {"\n"}
                {"  "}tools=[search, code_exec, vector_store],{"\n"}
                {"  "}system=
                <span className="text-[oklch(0.5_0.18_160)]">
                  &quot;You are Ash — Ashmeet&apos;s AI.&quot;
                </span>
                {"\n"}){"\n\n"}
                agent.run(<span className="text-[oklch(0.5_0.18_160)]">&quot;ship a startup.&quot;</span>)
              </pre>
              <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-aurora" />
            </div>
          </TiltCard>

          <div>
            <p className="text-lg text-muted-foreground">
              I design and ship intelligent products — from RAG pipelines and ML
              systems to polished full-stack front-ends. My favorite zone is where{" "}
              <span className="text-foreground font-medium">elegant UI</span> meets{" "}
              <span className="text-foreground font-medium">deep AI infrastructure</span>.
            </p>

            <div className="mt-10">
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary" /> Education
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Where I studied.
              </h3>
            </div>

            <ol className="mt-6 relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-[-0.5px] top-0 bottom-0 w-[2px] overflow-hidden pointer-events-none">
                <div className="absolute w-full h-28 bg-gradient-to-b from-transparent via-primary/80 to-transparent animate-timeline-shine">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_oklch(0.55_0.22_265)]" />
                </div>
              </div>
              {education.map((item) => (
                <li key={item.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[38px] grid h-7 w-7 place-items-center rounded-full gradient-aurora text-white shadow-elegant">
                    <GraduationCap className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-xs text-primary">{item.years}</span>
                    <h4 className="font-medium">{item.title}</h4>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <CodolioContributions />
        <GitHubContributions />
      </div>
    </section>
  );
}
