import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
    });

    if (error) {
      console.error("contact_messages insert failed:", error.message);
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
