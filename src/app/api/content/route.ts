import { NextResponse } from "next/server";
import { getLiveStats, getPortfolioContent } from "@/lib/portfolio-content";
import { hasSupabaseConfig } from "@/lib/supabase";

export async function GET() {
  const [{ data, source }, stats] = await Promise.all([
    getPortfolioContent(),
    getLiveStats("dsa"),
  ]);

  return NextResponse.json({
    configured: hasSupabaseConfig(),
    source,
    statsSource: stats.source,
    data,
    liveStats: stats.data,
  });
}
