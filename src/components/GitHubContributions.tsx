"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { TiltCard } from "@/components/TiltCard";
import { ContributionHeatmap, type HeatDay } from "@/components/ContributionHeatmap";
import { useSite } from "@/components/PortfolioProvider";

const LEVELS = ["#ebedf0", "#9ecbff", "#64a8ff", "#3784c5", "#1f5f9a"];
const DARK_LEVELS = ["#161b22", "#0d3158", "#145a9e", "#1f6feb", "#58a6ff"];

function levelFromCount(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function GitHubContributions() {
  const site = useSite();
  const [days, setDays] = useState<HeatDay[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${site.githubHandle}?y=last`,
        );
        if (!res.ok) throw new Error("fail");
        const data = await res.json();
        const mapped: HeatDay[] = (data.contributions || []).map(
          (d: { date: string; count: number; level?: number }) => ({
            date: d.date,
            count: d.count,
            level: typeof d.level === "number" ? d.level : levelFromCount(d.count),
          }),
        );
        if (!cancelled) setDays(mapped);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [site.githubHandle]);

  const weeks = useMemo(() => {
    if (!days.length) return [] as HeatDay[][];
    const chunks: HeatDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      chunks.push(days.slice(i, i + 7));
    }
    return chunks;
  }, [days]);

  return (
    <TiltCard className="group relative rounded-3xl glass-strong p-1 shadow-elegant mt-8">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-zinc-950 p-4 sm:py-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8f1ff] text-[#3784c5] shadow-sm dark:bg-[#1f5f9a]/25 dark:text-[#64a8ff]">
              <GithubIcon className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                GitHub Contributions
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                My recent code contributions and open-source activities.
              </p>
            </div>
          </div>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1ff] px-4 py-2 text-xs font-semibold text-[#3784c5] transition hover:bg-[#d6e8ff] hover:scale-105 w-fit dark:bg-[#1f5f9a]/25 dark:text-[#9ecbff] dark:hover:bg-[#1f5f9a]/40"
          >
            @{site.githubHandle}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 p-3 sm:px-5 sm:py-4 dark:border-zinc-800 dark:bg-zinc-900/80">
          {failed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://ghchart.rshah.org/3784c5/${site.githubHandle}`}
              alt={`${site.githubHandle}'s GitHub Contribution Calendar`}
              className="w-full max-w-none"
              draggable={false}
            />
          ) : !days.length ? (
            <div className="h-[120px] w-full animate-pulse rounded-xl bg-slate-200/60 dark:bg-zinc-800" />
          ) : (
            <ContributionHeatmap
              weeks={weeks}
              levels={LEVELS}
              darkLevels={DARK_LEVELS}
              unitLabel="contributions"
              showLegend
            />
          )}
        </div>
      </div>
    </TiltCard>
  );
}
