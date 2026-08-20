import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ROW_ID = "main";

async function ensureRow(
  supabase: NonNullable<ReturnType<typeof getSupabase>>,
) {
  const { data } = await supabase
    .from("site_likes")
    .select("count")
    .eq("id", ROW_ID)
    .maybeSingle();

  if (data) return Number(data.count) || 0;

  await supabase.from("site_likes").insert({ id: ROW_ID, count: 0 });
  return 0;
}

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ count: 0, source: "local" });
    }
    const count = await ensureRow(supabase);
    return NextResponse.json({ count, source: "supabase" });
  } catch {
    return NextResponse.json({ count: 0, source: "error" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body?.action === "unlike" ? "unlike" : "like";
    const delta = action === "like" ? 1 : -1;

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Likes storage is not configured", count: 0 },
        { status: 503 },
      );
    }

    // Prefer atomic RPC if the user created it; fall back to read-modify-write.
    const { data: rpcCount, error: rpcError } = await supabase.rpc(
      "bump_site_likes",
      { delta },
    );

    if (!rpcError && typeof rpcCount === "number") {
      return NextResponse.json({
        count: rpcCount,
        action,
        source: "supabase",
      });
    }

    const current = await ensureRow(supabase);
    const next = Math.max(0, current + delta);
    const { error } = await supabase
      .from("site_likes")
      .update({ count: next, updated_at: new Date().toISOString() })
      .eq("id", ROW_ID);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update likes", count: current },
        { status: 500 },
      );
    }

    return NextResponse.json({ count: next, action, source: "supabase" });
  } catch {
    return NextResponse.json(
      { error: "Failed to update likes", count: 0 },
      { status: 500 },
    );
  }
}
