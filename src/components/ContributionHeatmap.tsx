"use client";

import { useMemo, type CSSProperties } from "react";

export type HeatDay = { date: string; count: number; level: number };

type Props = {
  weeks: HeatDay[][];
  levels: string[];
  darkLevels?: string[];
  unitLabel?: string;
  showLegend?: boolean;
};

export function ContributionHeatmap({
  weeks,
  levels,
  darkLevels,
  unitLabel = "contributions",
  showLegend = false,
}: Props) {
  const monthLabels = useMemo(() => {
    if (!weeks.length) return [] as { label: string; index: number }[];
    const labels: { label: string; index: number }[] = [];
    let last = "";
    weeks.forEach((week, wi) => {
      const first = week[0]?.date;
      if (!first) return;
      const m = new Date(first + "T00:00:00").toLocaleString("en", { month: "short" });
      if (m !== last) {
        labels.push({ label: m, index: wi });
        last = m;
      }
    });
    return labels;
  }, [weeks]);

  const weekCount = Math.max(weeks.length, 1);
  const emptyLight = levels[0];
  const emptyDark = darkLevels?.[0] ?? "#161b22";

  return (
    <div className="w-full">
      <div className="relative mb-1.5 h-4 text-[10px] text-slate-400 dark:text-slate-500">
        {monthLabels.map((m) => (
          <span
            key={`${m.label}-${m.index}`}
            className="absolute"
            style={{ left: `calc(${(m.index / weekCount) * 100}% + 28px)` }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex w-full gap-1.5">
        <div className="flex w-7 shrink-0 flex-col justify-between py-0.5 text-[10px] text-slate-400 dark:text-slate-500">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div className="flex min-w-0 flex-1 gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex min-w-0 flex-1 flex-col gap-[3px]">
              {week.map((day) => {
                const level = Math.min(day.level, 4);
                const light = levels[level] ?? emptyLight;
                const dark = darkLevels?.[level] ?? light;
                return (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} ${unitLabel}`}
                    className="heatmap-cell w-full aspect-square rounded-[2px]"
                    style={
                      {
                        "--cell": light,
                        "--cell-dark": dark,
                      } as CSSProperties
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showLegend && (
        <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-slate-400 dark:text-slate-500">
          <span>Less</span>
          {levels.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="heatmap-cell h-[11px] w-[11px] rounded-[2px]"
              style={
                {
                  "--cell": c,
                  "--cell-dark": darkLevels?.[i] ?? c,
                } as CSSProperties
              }
            />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  );
}
