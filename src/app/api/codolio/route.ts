import { NextResponse } from "next/server";

export const revalidate = 120; // refresh from Codolio about every 2 minutes

const CODOLIO_USER = "ashmeet555";

type CalendarMap = Record<string, number>;

type PlatformProfile = {
  platform?: string;
  userStats?: { handle?: string | null };
  totalQuestionStats?: {
    totalQuestionCounts?: number | null;
    easyQuestionCounts?: number | null;
    mediumQuestionCounts?: number | null;
    hardQuestionCounts?: number | null;
    basicQuestionCounts?: number | null;
    schoolQuestionCounts?: number | null;
  } | null;
  dailyActivityStatsResponse?: {
    submissionCalendar?: CalendarMap | null;
  } | null;
};

function toDateKey(unixSec: number) {
  const d = new Date(unixSec * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dayDiff(a: string, b: string) {
  const ms = Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z");
  return Math.round(ms / 86400000);
}

function computeStreaks(activeDates: string[]) {
  if (!activeDates.length) return { maxStreak: 0, currentStreak: 0 };

  const sorted = [...activeDates].sort();
  let maxStreak = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (dayDiff(sorted[i - 1], sorted[i]) === 1) {
      run += 1;
      maxStreak = Math.max(maxStreak, run);
    } else {
      run = 1;
    }
  }

  const today = new Date();
  const todayKey = toDateKey(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) /
      1000,
  );
  const yest = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1));
  const yestKey = toDateKey(yest.getTime() / 1000);

  const set = new Set(sorted);
  let currentStreak = 0;
  let cursor = set.has(todayKey) ? todayKey : set.has(yestKey) ? yestKey : null;
  while (cursor && set.has(cursor)) {
    currentStreak += 1;
    const prev = new Date(Date.parse(cursor + "T00:00:00Z") - 86400000);
    cursor = toDateKey(prev.getTime() / 1000);
  }

  return { maxStreak, currentStreak };
}

function levelFromCount(count: number) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.codolio.com/profile?userKey=${CODOLIO_USER}`,
      {
        headers: {
          Accept: "*/*",
          Referer: "https://codolio.com/",
          Origin: "https://codolio.com",
        },
        next: { revalidate: 120 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Codolio responded ${res.status}` },
        { status: 502 },
      );
    }

    const json = await res.json();
    const platforms: PlatformProfile[] =
      json?.data?.platformProfiles?.platformProfiles || [];

    const calendar: CalendarMap = {};
    const platformStats: {
      platform: string;
      handle: string;
      total: number;
      easy: number;
      medium: number;
      hard: number;
    }[] = [];

    let totalQuestions = 0;
    let easy = 0;
    let medium = 0;
    let hard = 0;

    for (const p of platforms) {
      const name = String(p.platform || "unknown");
      const qs = p.totalQuestionStats || {};
      const total = Number(qs.totalQuestionCounts || 0);
      const e =
        Number(qs.easyQuestionCounts || 0) +
        Number(qs.basicQuestionCounts || 0) +
        Number(qs.schoolQuestionCounts || 0);
      const m = Number(qs.mediumQuestionCounts || 0);
      const h = Number(qs.hardQuestionCounts || 0);

      totalQuestions += total;
      easy += e;
      medium += m;
      hard += h;

      platformStats.push({
        platform: name,
        handle: String(p.userStats?.handle || ""),
        total,
        easy: e,
        medium: m,
        hard: h,
      });

      const cal = p.dailyActivityStatsResponse?.submissionCalendar || {};
      for (const [unix, count] of Object.entries(cal)) {
        const key = String(unix);
        calendar[key] = (calendar[key] || 0) + Number(count || 0);
      }
    }

    // Build last ~53 weeks of days (same window as GitHub charts)
    const end = new Date();
    end.setUTCHours(0, 0, 0, 0);
    // Align end to Saturday like many heatmaps ending "today"
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 52 * 7);
    // Align start to Sunday
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());

    const byDate: Record<string, number> = {};
    for (const [unix, count] of Object.entries(calendar)) {
      byDate[toDateKey(Number(unix))] = count;
    }

    const days: { date: string; count: number; level: number }[] = [];
    const cursor = new Date(start);
    let visibleSubmissions = 0;
    while (cursor <= end) {
      const key = toDateKey(cursor.getTime() / 1000);
      const count = byDate[key] || 0;
      visibleSubmissions += count;
      days.push({ date: key, count, level: levelFromCount(count) });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const activeDates = Object.keys(byDate).filter((d) => (byDate[d] || 0) > 0);
    const { maxStreak, currentStreak } = computeStreaks(activeDates);
    const totalSubmissions = visibleSubmissions;

    return NextResponse.json({
      profileName: json?.data?.profileName || CODOLIO_USER,
      profileUrl: `https://codolio.com/profile/${CODOLIO_USER}`,
      stats: {
        totalSubmissions,
        totalQuestions,
        easy,
        medium,
        hard,
        maxStreak,
        currentStreak,
        activeDays: activeDates.length,
      },
      platforms: platformStats,
      days,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch Codolio" },
      { status: 500 },
    );
  }
}
