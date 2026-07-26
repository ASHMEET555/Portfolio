"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { ContributionHeatmap, type HeatDay } from "@/components/ContributionHeatmap";
import { useSite } from "@/components/PortfolioProvider";

type CodolioPayload = {
  profileName: string;
  profileUrl: string;
  stats: {
    totalSubmissions: number;
    totalQuestions: number;
    easy: number;
    medium: number;
    hard: number;
    maxStreak: number;
    currentStreak: number;
    activeDays: number;
  };
  platforms: { platform: string; handle: string; total: number }[];
  days: HeatDay[];
};

const LEVELS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const DARK_LEVELS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

export function CodolioContributions() {
  const site = useSite();
  const [data, setData] = useState<CodolioPayload | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/codolio", { cache: "no-store" });
        if (!res.ok) throw new Error("fail");
        const json = (await res.json()) as CodolioPayload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => {
    const days = data?.days || [];
    if (!days.length) return [] as HeatDay[][];
    const chunks: HeatDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      chunks.push(days.slice(i, i + 7));
    }
    return chunks;
  }, [data]);

  const profileUrl = data?.profileUrl || site.socials.codolio;
  const stats = data?.stats;

  return (
    <TiltCard className="group relative rounded-3xl glass-strong p-1 shadow-elegant mt-16">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-zinc-950 p-4 sm:py-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-400">
              <Code2 className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                DSA Submissions
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Live problem-solving activity from Codolio across LeetCode, Codeforces &amp; CodeChef.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 hover:scale-105 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25"
            >
              ashmeet555 codolio
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <div className="flex items-center gap-1.5">
              {[
                {
                  name: "Codeforces",
                  href: site.socials.codeforces,
                  src: "/platforms/codeforces.svg",
                },
                {
                  name: "LeetCode",
                  href: site.socials.leetcode,
                  src: "/platforms/leetcode.svg",
                },
                {
                  name: "CodeChef",
                  href: site.socials.codechef,
                  src: "/platforms/codechef.svg",
                },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.name} profile`}
                  title={p.name}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white transition hover:scale-110 hover:border-emerald-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-emerald-500/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt=""
                    className="h-5 w-5 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-800 dark:text-slate-200">
          <span>
            Submissions:{" "}
            <strong className="font-semibold tabular-nums text-slate-900 dark:text-white">
              {stats?.totalSubmissions?.toLocaleString() ?? "—"}
            </strong>
          </span>
          <span>
            Questions:{" "}
            <strong className="font-semibold tabular-nums text-slate-900 dark:text-white">
              {stats?.totalQuestions?.toLocaleString() ?? "—"}
            </strong>
          </span>
          <span>
            Max. Streak:{" "}
            <strong className="font-semibold tabular-nums text-slate-900 dark:text-white">
              {stats?.maxStreak ?? "—"}
            </strong>
          </span>
          <span>
            Current Streak:{" "}
            <strong className="font-semibold tabular-nums text-slate-900 dark:text-white">
              {stats?.currentStreak ?? "—"}
            </strong>
          </span>
        </div>

        {(stats?.easy || stats?.medium || stats?.hard) && (
          <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Easy {stats.easy}
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
              Medium {stats.medium}
            </span>
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
              Hard {stats.hard}
            </span>
            {data?.platforms?.map((p) => (
              <span
                key={p.platform}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 capitalize dark:bg-zinc-800 dark:text-slate-300"
              >
                {p.platform} {p.total}
              </span>
            ))}
          </div>
        )}

        <div className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 p-3 sm:px-5 sm:py-4 dark:border-zinc-800 dark:bg-zinc-900/80">
          {failed ? (
            <p className="text-sm text-slate-500 py-6 text-center dark:text-slate-400">
              Couldn&apos;t load Codolio activity.{" "}
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline underline-offset-2 dark:text-emerald-400"
              >
                Open profile
              </a>
            </p>
          ) : !data ? (
            <div className="h-[120px] w-full animate-pulse rounded-xl bg-slate-200/60 dark:bg-zinc-800" />
          ) : (
            <ContributionHeatmap
              weeks={weeks}
              levels={LEVELS}
              darkLevels={DARK_LEVELS}
              unitLabel="submissions"
              showLegend
            />
          )}
        </div>
      </div>
    </TiltCard>
  );
}
