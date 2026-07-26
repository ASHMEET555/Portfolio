import { getSupabase } from "@/lib/supabase";

type Bucket = { hour: number; day: number; hourReset: number; dayReset: number };

const memory = new Map<string, Bucket>();

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function limits() {
  return {
    hour: Math.max(1, Number(process.env.CHAT_RATE_LIMIT_HOUR || 10)),
    day: Math.max(1, Number(process.env.CHAT_RATE_LIMIT_DAY || 30)),
    maxChars: Math.max(100, Number(process.env.CHAT_MAX_MESSAGE_CHARS || 800)),
  };
}

export function clientIp(req: Request): string {
  const h = (name: string) => req.headers.get(name) || "";
  const fwd = h("x-forwarded-for").split(",")[0]?.trim();
  return fwd || h("x-real-ip") || h("cf-connecting-ip") || "unknown";
}

function memoryCheck(ip: string, hourCap: number, dayCap: number) {
  const now = Date.now();
  let b = memory.get(ip);
  if (!b || now > b.hourReset) {
    b = {
      hour: 0,
      day: b && now <= b.dayReset ? b.day : 0,
      hourReset: now + HOUR_MS,
      dayReset: b && now <= b.dayReset ? b.dayReset : now + DAY_MS,
    };
  }
  if (now > b.dayReset) {
    b.day = 0;
    b.dayReset = now + DAY_MS;
  }

  if (b.hour >= hourCap || b.day >= dayCap) {
    const retryMs =
      b.hour >= hourCap ? b.hourReset - now : b.dayReset - now;
    return {
      ok: false as const,
      retryAfterSec: Math.max(60, Math.ceil(retryMs / 1000)),
      reason: b.hour >= hourCap ? "hourly" : "daily",
    };
  }

  b.hour += 1;
  b.day += 1;
  memory.set(ip, b);
  return { ok: true as const };
}

/** Persist count in Supabase so limits survive across Vercel instances. */
async function supabaseCheck(ip: string, hourCap: number, dayCap: number) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const now = new Date();
  const hourKey = `${ip}:h:${now.toISOString().slice(0, 13)}`; // YYYY-MM-DDTHH
  const dayKey = `${ip}:d:${now.toISOString().slice(0, 10)}`; // YYYY-MM-DD

  const bump = async (key: string) => {
    const { data } = await supabase
      .from("chat_rate_limits")
      .select("count")
      .eq("key", key)
      .maybeSingle();

    const next = (data?.count as number | undefined) || 0;
    if (data) {
      await supabase
        .from("chat_rate_limits")
        .update({ count: next + 1, updated_at: now.toISOString() })
        .eq("key", key);
    } else {
      await supabase.from("chat_rate_limits").insert({
        key,
        count: 1,
        updated_at: now.toISOString(),
      });
    }
    return next + 1;
  };

  try {
    const hourCount = await bump(hourKey);
    if (hourCount > hourCap) {
      return {
        ok: false as const,
        retryAfterSec: 3600,
        reason: "hourly" as const,
      };
    }
    const dayCount = await bump(dayKey);
    if (dayCount > dayCap) {
      return {
        ok: false as const,
        retryAfterSec: 86400,
        reason: "daily" as const,
      };
    }
    return { ok: true as const };
  } catch {
    return null;
  }
}

export async function enforceChatRateLimit(req: Request) {
  const { hour, day, maxChars } = limits();
  const ip = clientIp(req);

  const remote = await supabaseCheck(ip, hour, day);
  const result = remote ?? memoryCheck(ip, hour, day);

  return {
    ip,
    maxChars,
    hourLimit: hour,
    dayLimit: day,
    ...result,
  };
}

export function rateLimitReply(reason: "hourly" | "daily" | string) {
  if (reason === "daily") {
    return "You've reached today's chat limit. Please try again tomorrow, or email Ashmeet directly.";
  }
  return "Too many messages — try again later. For urgent queries, email Ashmeet directly.";
}
