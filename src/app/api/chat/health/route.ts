import { NextResponse } from "next/server";

/**
 * GET /api/chat/health — end-to-end provider check (no secrets returned).
 */
export async function GET() {
  const key = process.env.GEMINI_API_KEY?.trim() || "";
  const configuredModel = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";
  const provider = process.env.CHAT_PROVIDER || "auto";

  const report: Record<string, unknown> = {
    chatProvider: provider,
    gemini: {
      keyPresent: Boolean(key),
      keyPrefix: key ? `${key.slice(0, 4)}…` : null,
      keyLength: key.length,
      looksLikeClassicAiza: key.startsWith("AIza"),
      looksLikeAuthKeyAQ: key.startsWith("AQ."),
      configuredModel,
    },
    groq: {
      keyPresent: Boolean(process.env.GROQ_API_KEY?.trim()),
    },
    steps: [] as unknown[],
  };

  const steps = report.steps as Record<string, unknown>[];

  if (!key) {
    steps.push({
      step: "key",
      ok: false,
      detail: "GEMINI_API_KEY is empty in .env.local",
    });
    return NextResponse.json(report);
  }

  steps.push({
    step: "key",
    ok: true,
    detail: key.startsWith("AIza")
      ? "Classic AI Studio key shape (AIza…)"
      : key.startsWith("AQ.")
        ? "New AI Studio auth-key shape (AQ.…)"
        : "Unusual key prefix — may not be a Gemini API key",
  });

  // 1) List models
  let listStatus = 0;
  let listBody: Record<string, unknown> = {};
  try {
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
    );
    listStatus = listRes.status;
    listBody = await listRes.json().catch(() => ({}));
  } catch (e) {
    steps.push({
      step: "listModels",
      ok: false,
      detail: e instanceof Error ? e.message : "fetch failed",
    });
    return NextResponse.json(report);
  }

  const listError =
    (listBody.error as { message?: string; status?: string } | undefined)
      ?.message || null;
  const models = Array.isArray(listBody.models)
    ? (listBody.models as { name?: string; supportedGenerationMethods?: string[] }[])
        .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m) => String(m.name || "").replace(/^models\//, ""))
    : [];

  steps.push({
    step: "listModels",
    ok: listStatus === 200 && models.length > 0,
    httpStatus: listStatus,
    error: listError,
    availableFlashModels: models.filter((n) => /flash|lite/i.test(n)).slice(0, 8),
    availableModelCount: models.length,
  });

  if (listStatus !== 200 || !models.length) {
    steps.push({
      step: "generateContent",
      ok: false,
      skipped: true,
      detail:
        "Cannot generate until listModels succeeds. Fix the API key in Google AI Studio.",
    });
    return NextResponse.json(report);
  }

  // 2) generateContent — try several free-tier friendly models
  const candidates = [
    configuredModel,
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-2.0-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-2.0-flash",
    ...models.filter((n) => /flash/i.test(n)),
  ].filter((m, i, arr) => m && arr.indexOf(m) === i && models.includes(m));

  const modelAttempts: Record<string, unknown>[] = [];
  let workingModel: string | null = null;
  let replyPreview: string | null = null;

  for (const pick of candidates.slice(0, 6)) {
    try {
      const genRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${pick}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: "Reply with exactly: GEMINI_OK" }],
              },
            ],
          }),
        },
      );
      const genBody = await genRes.json().catch(() => ({}));
      const genError =
        (genBody.error as { message?: string } | undefined)?.message || null;
      const text = String(
        genBody.candidates?.[0]?.content?.parts?.[0]?.text || "",
      ).slice(0, 80);
      modelAttempts.push({
        model: pick,
        httpStatus: genRes.status,
        ok: genRes.status === 200 && Boolean(text),
        error: genError
          ? genError.includes("Quota exceeded")
            ? "Quota exceeded (free tier limit hit for this model)"
            : genError.slice(0, 160)
          : null,
        replyPreview: text || null,
      });
      if (genRes.status === 200 && text) {
        workingModel = pick;
        replyPreview = text;
        break;
      }
    } catch (e) {
      modelAttempts.push({
        model: pick,
        ok: false,
        error: e instanceof Error ? e.message : "generate failed",
      });
    }
  }

  steps.push({
    step: "generateContent",
    ok: Boolean(workingModel),
    workingModel,
    replyPreview,
    attempts: modelAttempts,
  });

  // 3) App chat route still prefers Gemini when configured
  steps.push({
    step: "appWiring",
    ok: true,
    detail: `CHAT_PROVIDER=${provider}. Chat uses Gemini first when generateContent works; otherwise falls back to Groq.`,
  });

  report.ok = steps.every((s) => s.ok !== false || s.skipped);
  return NextResponse.json(report);
}
