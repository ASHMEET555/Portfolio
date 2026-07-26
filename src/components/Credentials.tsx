"use client";

import { useState } from "react";
import { Award, Binary, Brain, CodeXml, Cpu, Eye, ShieldCheck } from "lucide-react";
import type { Certification } from "@/lib/portfolio-local";
import { TiltCard } from "@/components/TiltCard";
import { CredentialsModal } from "@/components/CredentialsModal";
import { usePortfolio } from "@/components/PortfolioProvider";

const icons = [ShieldCheck, CodeXml, Brain, Award, Cpu, Binary];
const tones: Record<string, string> = {
  emerald: "from-emerald-500/20 to-teal-500/10 text-emerald-500",
  teal: "from-teal-500/20 to-emerald-500/10 text-teal-500",
  blue: "from-blue-500/20 to-indigo-500/10 text-blue-500",
  indigo: "from-indigo-500/20 to-purple-500/10 text-indigo-500",
  amber: "from-amber-500/20 to-yellow-500/10 text-amber-500",
  sky: "from-sky-500/20 to-blue-500/10 text-sky-500",
};

function hasView(
  cert: Certification,
): cert is Certification & { view: NonNullable<unknown> } {
  return "view" in cert && Boolean((cert as { view?: unknown }).view);
}

export function Credentials() {
  const { data } = usePortfolio();
  const certifications = data.certifications;
  const [active, setActive] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" /> Credentials
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Validated expertise in systems and analytics.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const Icon = icons[i % icons.length];
            const viewable = hasView(cert);
            return (
              <TiltCard
                key={cert.id}
                intensity={6}
                className={`group relative h-full rounded-3xl glass-strong p-1 shadow-elegant ${
                  viewable ? "cursor-pointer" : ""
                }`}
              >
                <div
                  role={viewable ? "button" : undefined}
                  tabIndex={viewable ? 0 : undefined}
                  onClick={() => {
                    if (viewable) setActive(cert);
                  }}
                  onKeyDown={(e) => {
                    if (viewable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setActive(cert);
                    }
                  }}
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-6 glass-strong text-left outline-none"
                  data-cursor={viewable ? "hover" : undefined}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {cert.issuer}
                      </span>
                      <div
                        className={`relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[cert.tone]}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight">
                      {cert.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">
                      Issued {cert.issued}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {cert.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="my-1 h-px bg-border/40" />
                    <div className="flex items-center justify-between pt-2">
                      {viewable ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                          <Eye className="h-3.5 w-3.5" />
                          {"view" in cert &&
                          cert.view &&
                          "label" in cert.view
                            ? String(cert.view.label)
                            : "View"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                          Highlight
                        </span>
                      )}
                      <Award className="h-4 w-4 text-muted-foreground/30" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-aurora" />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      <CredentialsModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}
