"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  Copy,
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  RefreshCw,
  Send,
  Square,
  User,
  X,
} from "lucide-react";
import { useSite } from "@/components/PortfolioProvider";

type Msg = {
  role: "user" | "assistant";
  content: string;
  time: string;
  streaming?: boolean;
};

const suggestions = [
  "About Ashmeet",
  "Top Tech Skills",
  "Recent Projects",
  "Contact & Resume",
];

function now() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Turn markdown-ish chat text into styled HTML (blue bullets, bold, links). */
export function formatChatHtml(raw: string) {
  const text = raw.replace(/\r\n/g, "\n").trimEnd();
  const lines = text.split("\n");
  const out: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  const inline = (line: string) => {
    let s = escapeHtml(line);
    const anchors: string[] = [];

    const token = (href: string, label: string) => {
      const safeHref = href.replace(/"/g, "%22");
      const text = label.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="chat-strong">$1</strong>',
      );
      anchors.push(
        `<a class="chat-link" href="${safeHref}" target="_blank" rel="noopener noreferrer">${text}</a>`,
      );
      return `@@LINK${anchors.length - 1}@@`;
    };

    s = s.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]+)\)/g,
      (_m, label: string, url: string) => token(url, label),
    );

    s = s.replace(/https?:\/\/[^\s<)]+/g, (url) => {
      const trailing = url.match(/[.,;:!?]+$/)?.[0] || "";
      const clean = trailing ? url.slice(0, -trailing.length) : url;
      return token(clean, clean.replace(/^https?:\/\//, "")) + trailing;
    });

    s = s.replace(
      /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g,
      (mail) => token(`mailto:${mail}`, mail),
    );

    s = s.replace(/\*\*(.+?)\*\*/g, '<strong class="chat-strong">$1</strong>');

    return s.replace(/@@LINK(\d+)@@/g, (_m, i: string) => anchors[Number(i)]);
  };

  for (const line of lines) {
    const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (bullet) {
      if (!inList) {
        out.push('<ul class="chat-bullets">');
        inList = true;
      }
      out.push(`<li><span class="chat-bullet-dot"></span><span class="chat-bullet-text">${inline(bullet[1])}</span></li>`);
      continue;
    }
    closeList();
    if (!line.trim()) {
      out.push('<div class="chat-gap"></div>');
      continue;
    }
    out.push(`<p class="chat-p">${inline(line)}</p>`);
  }
  closeList();
  return out.join("");
}

function streamChunks(full: string) {
  // Prefer sentence / line chunks for natural reveal
  const parts = full.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [full];
  return parts.map((p) => p);
}

export function Chatbot() {
  const site = useSite();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceHint, setVoiceHint] = useState("");
  const [hint, setHint] = useState("Hi");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm **Ash** — Ashmeet's AI assistant. Ask me about Ashmeet's background, skills, projects, experience, or how to get in touch.",
      time: now(),
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const streamTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<{
    stop: () => void;
    abort?: () => void;
  } | null>(null);

  useEffect(() => {
    const phrases = ["Hi", "Ask Ash", "AI"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % phrases.length;
      setHint(phrases[i]);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    return () => {
      if (streamTimer.current) clearTimeout(streamTimer.current);
      abortRef.current?.abort();
      recognitionRef.current?.abort?.();
    };
  }, []);

  /** Stop generation: cancel the request and freeze whatever has streamed in. */
  const stop = () => {
    if (streamTimer.current) {
      clearTimeout(streamTimer.current);
      streamTimer.current = null;
    }
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages((m) => {
      const copy = [...m];
      const last = copy[copy.length - 1];
      if (last?.role === "assistant" && last.streaming) {
        copy[copy.length - 1] = {
          ...last,
          content: last.content.trim() || "Stopped.",
          streaming: false,
        };
      }
      return copy;
    });
    setLoading(false);
  };

  const reset = () => {
    if (streamTimer.current) clearTimeout(streamTimer.current);
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
    setMessages([
      {
        role: "assistant",
        content: "Conversation reset. I'm Ash — ask me anything about Ashmeet.",
        time: now(),
      },
    ]);
  };

  const revealReply = (full: string) => {
    const chunks = streamChunks(full);
    let i = 0;
    let acc = "";

    setMessages((m) => [
      ...m,
      { role: "assistant", content: "", time: now(), streaming: true },
    ]);

    const tick = () => {
      if (i >= chunks.length) {
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") {
            copy[copy.length - 1] = {
              ...last,
              content: full,
              streaming: false,
            };
          }
          return copy;
        });
        setLoading(false);
        return;
      }
      acc += chunks[i];
      i += 1;
      const snapshot = acc;
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") {
          copy[copy.length - 1] = {
            ...last,
            content: snapshot,
            streaming: true,
          };
        }
        return copy;
      });
      streamTimer.current = setTimeout(tick, 28 + Math.min(snapshot.length % 40, 20));
    };
    tick();
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    if (streamTimer.current) clearTimeout(streamTimer.current);

    const history = messages
      .filter((m) => !m.streaming)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    setMessages((m) => [...m, { role: "user", content: trimmed, time: now() }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
        signal: controller.signal,
      });
      const data = await res.json();
      abortRef.current = null;
      const reply =
        String(data.reply || "").trim() ||
        "I couldn't answer that just now.";
      revealReply(reply);
    } catch (err) {
      abortRef.current = null;
      if ((err as Error)?.name === "AbortError") return;
      revealReply(
        `Network hiccup. Try again, or email Ashmeet at ${site.email}.`,
      );
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const startVoice = () => {
    setVoiceHint("");
    type Rec = {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      start: () => void;
      stop: () => void;
      abort: () => void;
      onstart: (() => void) | null;
      onend: (() => void) | null;
      onerror: ((ev: { error: string }) => void) | null;
      onresult:
        | ((ev: {
            results: ArrayLike<ArrayLike<{ transcript: string }>> & {
              length: number;
            };
          }) => void)
        | null;
    };

    const w = window as unknown as {
      webkitSpeechRecognition?: new () => Rec;
      SpeechRecognition?: new () => Rec;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setVoiceHint("Voice needs Chrome/Edge on HTTPS or localhost.");
      return;
    }

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = true;

    rec.onstart = () => {
      setListening(true);
      setVoiceHint("Listening… speak now");
    };
    rec.onend = () => {
      setListening(false);
      setVoiceHint("");
      recognitionRef.current = null;
    };
    rec.onerror = (ev) => {
      setListening(false);
      recognitionRef.current = null;
      const map: Record<string, string> = {
        "not-allowed": "Allow microphone permission in the browser.",
        "no-speech": "Didn't catch that — try again.",
        network: "Speech network error — check connection.",
        "service-not-allowed": "Speech service blocked — use Chrome.",
      };
      setVoiceHint(map[ev.error] || `Voice error: ${ev.error}`);
    };
    rec.onresult = (ev) => {
      let transcript = "";
      for (let i = 0; i < ev.results.length; i++) {
        transcript += ev.results[i][0]?.transcript || "";
      }
      if (transcript.trim()) setInput(transcript.trim());
    };

    try {
      rec.start();
    } catch {
      setListening(false);
      setVoiceHint("Could not start mic — click again.");
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 select-none md:bottom-6 md:right-6 chatbot-float-container">
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex items-center cursor-pointer border-none bg-transparent"
            aria-label="Toggle AI Assistant"
          >
            <div className="flex items-center">
              <div className="chatbot-pill-light relative font-extrabold text-[11px] h-[26px] flex items-center justify-center rounded-full shadow-md -mr-2.5 pr-4 pl-2.5 z-0 min-w-[64px]">
                <span className="chatbot-pill-label relative whitespace-nowrap inline-block text-center w-full">
                  {hint}
                </span>
              </div>
              <div className="chatbot-avatar-light relative z-10 shrink-0">
                <div className="relative h-12 w-12 rounded-full border-2 border-white dark:border-[#1e293b] shadow-lg flex items-center justify-center overflow-hidden bg-gradient-to-tr from-indigo-500 via-purple-600 to-cyan-500">
                  <Bot className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </button>
        )}
      </div>

      {open && (
        <div
          className={`fixed z-[60] flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-background shadow-elegant transition-[width,height,inset] duration-300 ${
            expanded
              ? "bottom-4 right-4 top-20 left-4 sm:left-auto sm:w-[min(560px,94vw)] md:right-6 md:bottom-6 md:top-24"
              : "bottom-20 right-4 left-4 md:left-auto md:right-6 md:bottom-24 md:w-[400px] h-[min(640px,75vh)]"
          }`}
        >
          <div className="gradient-aurora px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">Ash — AI Assistant</div>
                <div className="text-[11px] text-cyan-100 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ashmeet&apos;s AI Assistant Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                className="p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Reset"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-white/10"
                aria-label={expanded ? "Shrink" : "Expand"}
              >
                {expanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setExpanded(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Minimize"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              Today
              <div className="h-px flex-1 bg-border" />
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full gradient-aurora grid place-items-center shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="max-w-[85%]">
                  <div
                    className={`chat-bubble rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "bg-primary/10" : "bg-muted/60"
                    } ${m.streaming ? "chat-streaming" : ""}`}
                    dangerouslySetInnerHTML={{
                      __html:
                        m.role === "assistant"
                          ? formatChatHtml(m.content) +
                            (m.streaming
                              ? '<span class="chat-caret" aria-hidden="true"></span>'
                              : "")
                          : escapeHtml(m.content).replace(/\n/g, "<br/>"),
                    }}
                  />
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{m.time}</span>
                    {m.role === "assistant" && !m.streaming && m.content && (
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(m.content)}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        <Copy className="h-3 w-3" /> Copy
                      </button>
                    )}
                  </div>
                </div>
                {m.role === "user" && (
                  <div className="h-8 w-8 rounded-full border border-primary/40 grid place-items-center shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {loading && !messages.some((m) => m.streaming) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-8 w-8 rounded-full gradient-aurora grid place-items-center">
                  <Bot className="h-4 w-4 text-white animate-pulse" />
                </div>
                <span className="chat-thinking">Thinking…</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={loading}
                onClick={() => void send(s)}
                className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:border-primary/40 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="p-3 pt-1 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Ash is replying…" : "Ask Ash anything…"}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={startVoice}
              disabled={loading}
              className={`h-10 w-10 rounded-full text-white grid place-items-center transition ${
                listening
                  ? "bg-rose-500 animate-pulse ring-2 ring-rose-300"
                  : "gradient-aurora"
              }`}
              aria-label={listening ? "Stop listening" : "Voice input"}
              title={listening ? "Stop listening" : "Voice input"}
            >
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
            {loading ? (
              <button
                type="button"
                onClick={stop}
                className="h-10 w-10 rounded-full bg-rose-500 text-white grid place-items-center shadow-sm transition hover:bg-rose-600"
                aria-label="Stop generating"
                title="Stop generating"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-10 w-10 rounded-full bg-muted text-primary grid place-items-center disabled:opacity-40"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </form>
          {voiceHint ? (
            <p className="px-4 pb-1 text-center text-[10px] text-primary">
              {voiceHint}
            </p>
          ) : null}
          <p className="pb-3 text-center text-[10px] text-muted-foreground">
            Powered by RAG AI • developed for {site.shortName} 💛
          </p>
        </div>
      )}

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[70] h-12 w-12 rounded-full gradient-aurora text-white grid place-items-center shadow-elegant"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
