"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/components/PortfolioProvider";

export function PageLoader() {
  const site = useSite();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const letters = ["A", "S", "H"];

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-500">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="loader flex items-center justify-center gap-2 sm:gap-3">
          <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
            <defs>
              <linearGradient id="grad-a" x1="0" y1="62" x2="0" y2="2">
                <stop stopColor="#973BED" />
                <stop offset="1" stopColor="#007CFF" />
              </linearGradient>
              <linearGradient id="grad-s" x1="0" y1="62" x2="0" y2="2">
                <stop stopColor="#007CFF" />
                <stop offset="1" stopColor="#00E0ED" />
              </linearGradient>
              <linearGradient id="grad-h" x1="0" y1="62" x2="0" y2="2">
                <stop stopColor="#00E0ED" />
                <stop offset="1" stopColor="#00DA72" />
              </linearGradient>
            </defs>
          </svg>
          {letters.map((l, i) => (
            <span
              key={l}
              className="inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-border/40 glass-strong text-xl sm:text-3xl font-bold gradient-text"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm font-medium text-muted-foreground tracking-widest uppercase animate-pulse">
          {site.title}
        </p>
      </div>
    </div>
  );
}
