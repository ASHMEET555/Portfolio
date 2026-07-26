import { NextRequest, NextResponse } from "next/server";
import {
  buildSystemPrompt,
  getPortfolioContent,
} from "@/lib/portfolio-content";
import { getSupabase } from "@/lib/supabase";
import type { PortfolioData } from "@/lib/portfolio-local";
import {
  enforceChatRateLimit,
  rateLimitReply,
} from "@/lib/chat-rate-limit";

function hasWord(q: string, ...words: string[]) {
  return words.some((w) => new RegExp(`\\b${w}\\b`, "i").test(q));
}

/** Projects come from JSON, so optional fields vary per entry. */
function field(obj: unknown, key: string): string {
  const v = (obj as Record<string, unknown> | null)?.[key];
  return typeof v === "string" ? v : "";
}

function localReply(message: string, content: PortfolioData): string {
  const site = content.site;
  const q = message.toLowerCase();
  const edu = content.education[0];
  const qb = content.experience[0];
  const research = content.experience[1];
  const cgpa = edu?.detail?.match(/CGPA\s*\d+(?:\.\d+)?/i)?.[0];

  if (
    hasWord(q, "github", "linkedin", "contact", "email", "resume", "phone") ||
    q.includes("get in touch") ||
    q.includes("reach him") ||
    q.includes("get his resume")
  ) {
    return `You can reach **${site.name}** directly:

- **Email:** [${site.email}](mailto:${site.email})
- **Phone:** ${site.phone}
- **Resume:** [Download Resume (PDF)](${site.resumePath})
- **LinkedIn:** [Ashmeet Sandhu](${site.socials.linkedin})
- **GitHub:** [@${site.githubHandle}](${site.socials.github})

Email is the fastest way to reach him about roles or collaborations.`;
  }

  if (
    hasWord(q, "available", "availability", "opportunity", "opportunities") ||
    q.includes("full-time") ||
    q.includes("full time") ||
    q.includes("looking for")
  ) {
    return `${site.name} is **${site.availability}**. He's currently an **${qb?.title}** at **${qb?.org}**, and open to AI/ML and full-stack roles. Best reach-out: **${site.email}** or LinkedIn (${site.socials.linkedin}).`;
  }

  if (
    hasWord(q, "education", "degree", "cgpa", "academically", "academic", "college", "university") ||
    q.includes("strongest at academically")
  ) {
    return `Ashmeet is pursuing a **${edu?.title || "B.Tech in CSE"}** at **IIIT Una**${cgpa ? ` with a **${cgpa}**` : ""}. Academically he is strongest in **AI systems, LLMs, and production ML pipelines** — applying CS fundamentals to research ML (IIT Mandi ECG–language work) and production AI (QueueBuster fraud/anomaly systems), not only coursework.`;
  }

  if (
    q.includes("queuebuster") ||
    (q.includes("build") && q.includes("queue")) ||
    (hasWord(q, "fraud", "anomaly") && hasWord(q, "built", "build", "work", "did"))
  ) {
    const bullets = qb?.bullets?.slice(0, 3) || [];
    return `At **QueueBuster**, Ashmeet built the **fraud & anomaly detection layer** inside Helix on ~12M live invoices across merchant, customer, and global risk surfaces.\n\n${bullets.map((b) => `• ${b}`).join("\n")}`;
  }

  if (
    hasWord(q, "challenge", "challenges", "hardest", "difficult") ||
    q.includes("hard technical") ||
    q.includes("technical challenge")
  ) {
    return `A recent hard challenge was production fraud intelligence at **QueueBuster**: keeping detections correct and fast on multi-tenant PoS/payment traffic while protecting ClickHouse and enforcing RBAC. He stabilized grain-correct anomaly keys, lifecycle state under re-detects, fail-closed partner-share rules, and pushed ML shadow scoring (~0.95 AUC) with realtime inference around **200–210 ms** (p95 under 500 ms) via L1 + Redis caching — without overclaiming “fraud probability” under weak labels.`;
  }

  if (
    q.includes("research to production") ||
    q.includes("research into production") ||
    q.includes("ideas to production") ||
    (q.includes("research") && q.includes("production"))
  ) {
    return `Ashmeet’s pattern is: prove the signal in research, then harden it for ops. At **IIT Mandi** he compressed a multimodal ECG–language stack into a deployable pipeline under tight GPUs; at **QueueBuster** he turned anomaly research into Go APIs, ClickHouse scans, Redis-backed latency, and analyst workflows. Projects like **FlashPoint** (Live RAG) and **ChainAuditAI** (ML + on-chain audit) follow the same research → product path.`;
  }

  if (
    q.includes("end-to-end") ||
    q.includes("end to end") ||
    (hasWord(q, "system") && hasWord(q, "designed", "design", "explain"))
  ) {
    const p =
      content.projects.find((x) => x.id === "flashpoint") || content.projects[1];
    const live = field(p, "live");
    const github = field(p, "github");
    return `Yes — **${p.title}** is a clear end-to-end example. ${field(p, "longDescription") || field(p, "description")}\n\nTechnologies: ${p.tech.join(", ")}.${live ? `\nLive: ${live}` : ""}${github ? `\nGitHub: ${github}` : ""}`;
  }

  if (hasWord(q, "medinodus") || (q.includes("privacy") && q.includes("infer"))) {
    const p = content.projects.find((x) => x.id === "medinodus") || content.projects[0];
    return `**MediNodus** addresses medical literacy and polypharmacy risk: it translates pathology reports, flags abnormalities, and supports drug-safety checks.\n\nPrivacy-first inference means core medical reasoning runs in the user’s own environment — not via third-party LLM APIs for sensitive records — so health data stays local while still giving actionable insights.\n\nTech: ${p.tech.join(", ")}.`;
  }

  if (
    hasWord(q, "skill", "skills", "stack") ||
    /\btech skills?\b/.test(q) ||
    q.includes("llms, rag") ||
    (q.includes("llm") && q.includes("rag") && q.includes("backend")) ||
    q.includes("top tech")
  ) {
    return `Ashmeet's top tech skills for an AI/ML role include:

- **Programming Languages:** Python, C++, TypeScript, JavaScript, SQL, Go
- **Frameworks:** PyTorch, FastAPI, Next.js, React, LangChain, LangGraph, Flask
- **Platforms:** PostgreSQL, ClickHouse, MongoDB, Redis, Qdrant, AWS
- **Tools:** Docker, Git, GitHub Actions, CI/CD, Linux
- **AI/ML Expertise:** Deep Learning, LLMs, RAG, Computer Vision, Multimodal ML, Model Fine-tuning, Embeddings
- **AI Systems & SaaS:** Production AI agents, Live RAG pipelines, fraud/anomaly ML systems, and full-stack AI product delivery

These skills demonstrate his capability in developing and deploying advanced AI solutions.`;
  }

  if (hasWord(q, "project", "projects")) {
    const top = content.projects.slice(0, 3);
    const blocks = top.map((p) => {
      const body = field(p, "longDescription") || field(p, "description");
      const liveUrl = field(p, "live");
      const githubUrl = field(p, "github");
      const live = liveUrl
        ? `\nYou can explore this project at ${liveUrl}.`
        : "";
      const github = githubUrl && !liveUrl ? `\nGitHub: ${githubUrl}` : "";
      return `**${p.title} — ${p.category}:**\n${body}\nTechnologies used include ${p.tech.join(", ")}.${live}${github}`;
    });
    return `Ashmeet's most notable projects are:\n\n${blocks.join("\n\n")}\n\nThese projects showcase his expertise in AI, machine learning, and full-stack development.`;
  }

  if (
    hasWord(q, "experience", "internship", "intern") ||
    q.includes("where did he work") ||
    q.includes("work experience")
  ) {
    return `Ashmeet is currently an **${qb?.title}** at **${qb?.org}**, where he built production fraud and anomaly intelligence on live invoice-scale data. He also served as a **${research?.title}** at **${research?.org}**, developing a deployable multimodal ECG–language pipeline under tight compute budgets.`;
  }

  if (
    hasWord(q, "mlops", "devops", "infrastructure", "infra", "deployment", "deploy", "latency") ||
    q.includes("backend-heavy") ||
    q.includes("backend heavy")
  ) {
    return `Yes — the backend and MLOps side is where Ashmeet spends most of his time.

- **Serving:** production **Go** APIs and **FastAPI** services over multi-tenant PoS, payment, and settlement traffic, with RBAC-protected scoring paths.
- **Latency:** real-time inference at ~200–210 ms with L1 + **Redis** caching, holding p95 under 500 ms.
- **Data:** **PostgreSQL**, **ClickHouse**, **MongoDB**, **Qdrant**, and Kafka-style streaming ingestion.
- **Ops:** **Docker**, AWS, Git, GitHub Actions CI/CD, Linux, and experiment tracking.
- **Models in prod:** shadow-scored ML at ~0.95 AUC on ~12M live invoices, plus SLM compression at IIT Mandi to fit tight compute budgets.

He is comfortable owning a model from training through serving, caching, and monitoring.`;
  }

  if (
    hasWord(q, "fit", "hire", "suit", "suited", "suitable") ||
    (hasWord(q, "role") && hasWord(q, "engineer"))
  ) {
    return `Ashmeet is a strong fit for an AI Engineer role due to his specialized skills and hands-on background in production AI systems. His expertise in **LLMs**, **RAG pipelines**, **AI agents**, and **computer vision / multimodal ML** aligns well with what modern AI engineering roles demand.

His internship at **QueueBuster** — building fraud and anomaly detection on ~12M live invoices with low-latency scoring — and his **IIT Mandi** research on a deployable ECG–language multimodal pipeline show he can move models from notebooks into real systems.

${edu ? `His ${edu.title}${cgpa ? ` (${cgpa})` : ""} provides a solid foundation,` : "His CS foundation,"} and his practical stack (**Python**, **PyTorch**, **LangChain**, **FastAPI**, production data systems) makes him ready to build and ship robust AI products end to end.`;
  }

  if (
    hasWord(q, "about", "background", "who", "specialize", "specializes", "specialization") ||
    q.includes("who is ashmeet")
  ) {
    return `Ashmeet Singh Sandhu is an AI/ML Engineer who specializes in real-time and production intelligent systems, focusing on large language models (LLMs), retrieval-augmented generation (RAG) pipelines, AI agents, and computer vision / multimodal ML. He builds scalable AI applications that move from research into reliable product delivery — including low-latency inference paths and polished full-stack interfaces.

${edu ? `He is pursuing a ${edu.title}${cgpa ? ` with a ${cgpa}` : ""}, with coursework and projects centered on AI systems and production ML pipelines.` : ""} His strongest zone is where elegant UI meets deep AI infrastructure.`;
  }

  return genericFallback(content);
}

function genericFallback(content: PortfolioData) {
  const site = content.site;
  return `I'm **Ash**, ${site.shortName}'s assistant. Ask about his background, AI/ML skills, projects, experience, or how to contact him (${site.email}).`;
}

async function logChat(message: string, reply: string, mode: string) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("chat_logs").insert({ message, reply, mode });
  } catch {
    // non-blocking
  }
}

/**
 * "broken" = unusable output (prompt leak, stub, cut-off) — always replace.
 * "meh" = generic content dump — replace only when we have a specific local answer.
 */
function replyIssue(reply: string): "broken" | "meh" | null {
  const t = reply.toLowerCase();
  const trimmed = reply.trim();
  const words = trimmed.split(/\s+/).filter(Boolean).length;

  if (/rule-based ai/.test(t)) return "broken";
  if (/end with one confident|third person\?|word count|answer pattern|hard rule/i.test(reply))
    return "broken";
  if (/^(yes|no)\.?\s*$/i.test(trimmed)) return "broken";
  if (/\*\*[^*]*$/.test(trimmed) && trimmed.length < 160) return "broken";
  if (words < 12) return "broken";

  if (/here(?:'s| is) some information about/.test(t)) return "meh";
  if (
    /key highlights include/.test(t) &&
    /ai\/ml engineering/.test(t) &&
    /full-stack development/.test(t)
  ) {
    return "meh";
  }
  if (
    words < 90 &&
    (t.match(/\n\s*[*\-•]/g) || []).length >= 3 &&
    /medinodus|flashpoint|chainaudit/.test(t) &&
    !/technologies used/.test(t)
  ) {
    return "meh";
  }
  return null;
}

function polishReply(message: string, content: PortfolioData, reply: string) {
  const raw = reply?.trim() || "";
  const local = localReply(message, content);
  const localIsGeneric = local === genericFallback(content);

  if (!raw) return local;
  const issue = replyIssue(raw);
  if (!issue) return raw;
  // A generic greeting is worse than an imperfect grounded answer.
  if (issue === "meh" && localIsGeneric) return raw;
  return local;
}

function chatMessages(
  system: string,
  history: { role: string; content: string }[],
  message: string,
) {
  return [
    { role: "system", content: system },
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-6)
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    { role: "user", content: message },
  ];
}

async function askGroq(
  messages: { role: string; content: string }[],
) {
  if (!process.env.GROQ_API_KEY) return null;
  const call = () =>
    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 1200,
        messages,
      }),
    });

  let res = await call();
  if (!res.ok && (res.status === 429 || res.status >= 500)) {
    await new Promise((r) => setTimeout(r, 1200));
    res = await call();
  }
  if (!res.ok) return null;
  const data = await res.json();
  return String(data.choices?.[0]?.message?.content || "");
}

async function listGeminiModels(key: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    const names: string[] = (data.models || [])
      .filter(
        (m: { name?: string; supportedGenerationMethods?: string[] }) =>
          m.supportedGenerationMethods?.includes("generateContent"),
      )
      .map((m: { name?: string }) => String(m.name || "").replace(/^models\//, ""))
      .filter(Boolean);
    // Prefer flash / lite models for chat
    const preferred = names.filter((n) => /flash|lite/i.test(n));
    return preferred.length ? preferred : names;
  } catch {
    return [];
  }
}

async function askGemini(system: string, message: string): Promise<{
  text: string | null;
  error?: string;
}> {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return { text: null, error: "GEMINI_API_KEY missing" };

  const discovered = await listGeminiModels(key);
  const models = [
    process.env.GEMINI_MODEL?.trim(),
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash",
    ...discovered.slice(0, 8),
  ].filter((m, i, arr): m is string => Boolean(m) && arr.indexOf(m) === i);

  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: message }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 1200 },
  };

  let lastError = "unknown";
  for (const model of models) {
    const attempts: { url: string; headers: Record<string, string> }[] = [
      {
        url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
        headers: { "Content-Type": "application/json" },
      },
      {
        url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key,
        },
      },
    ];

    for (const attempt of attempts) {
      try {
        const res = await fetch(attempt.url, {
          method: "POST",
          headers: attempt.headers,
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          lastError = data?.error?.message || `HTTP ${res.status} on ${model}`;
          continue;
        }
        const text = String(
          data.candidates?.[0]?.content?.parts?.[0]?.text || "",
        ).trim();
        if (text) return { text };
        lastError = `Empty response from ${model}`;
      } catch (e) {
        lastError = e instanceof Error ? e.message : "Gemini fetch failed";
      }
    }
  }

  if (/API key not valid|API_KEY_INVALID|PERMISSION_DENIED|invalid/i.test(lastError)) {
    lastError +=
      " — Create a key at https://aistudio.google.com/apikey (usually starts with AIza) and put it in GEMINI_API_KEY.";
  }
  return { text: null, error: lastError };
}

async function askOpenAI(
  messages: { role: string; content: string }[],
) {
  if (!process.env.OPENAI_API_KEY) return null;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 1200,
      messages,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return String(data.choices?.[0]?.message?.content || "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = String(body.message || "").trim();
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const limit = await enforceChatRateLimit(req);
    if (message.length > limit.maxChars) {
      return NextResponse.json(
        {
          reply: `Please keep messages under ${limit.maxChars} characters.`,
          mode: "rate_limit",
          source: "local",
        },
        { status: 413 },
      );
    }
    if (!limit.ok) {
      return NextResponse.json(
        {
          reply: rateLimitReply(limit.reason || "hourly"),
          mode: "rate_limit",
          source: "local",
          retryAfterSec: limit.retryAfterSec,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfterSec || 3600),
          },
        },
      );
    }

    const { data: content, source } = await getPortfolioContent();
    const system = buildSystemPrompt(content);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    const messages = chatMessages(system, history, message);

    const provider = (process.env.CHAT_PROVIDER || "auto").toLowerCase();
    const order =
      provider === "gemini"
        ? (["gemini", "groq", "openai"] as const)
        : provider === "groq"
          ? (["groq", "gemini", "openai"] as const)
          : (["gemini", "groq", "openai"] as const);

    let geminiError: string | undefined;

    for (const p of order) {
      let raw: string | null = null;
      if (p === "gemini") {
        const g = await askGemini(system, message);
        raw = g.text;
        if (!g.text && g.error) geminiError = g.error;
      } else if (p === "groq") {
        raw = await askGroq(messages);
      } else {
        raw = await askOpenAI(messages);
      }
      if (raw) {
        const reply = polishReply(message, content, raw);
        await logChat(message, reply, `${p}:${source}`);
        return NextResponse.json({
          reply,
          mode: p,
          source,
          ...(geminiError && p !== "gemini" ? { geminiError } : {}),
        });
      }
    }

    const reply = localReply(message, content);
    await logChat(message, reply, `local:${source}`);
    return NextResponse.json({
      reply,
      mode: "local",
      source,
      ...(geminiError ? { geminiError } : {}),
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "I'm Ash — ask about Ashmeet's background, skills, projects, or contact.",
        mode: "fallback",
        source: "local",
      },
      { status: 200 },
    );
  }
}
