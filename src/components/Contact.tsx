"use client";

import { FormEvent, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Clock,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { TiltCard } from "@/components/TiltCard";
import { TechCluster } from "@/components/TechDecor";
import { useSite } from "@/components/PortfolioProvider";

export function Contact() {
  const site = useSite();
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle",
  );
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
          publicKey,
        );
      }

      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" /> Contact
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build something intelligent together.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="space-y-4">
            <p className="text-muted-foreground max-w-md">
              Whether it&apos;s an AI feature, an MVP, or a full product â€” I&apos;m
              open to internships, founding-engineer roles, and collaboration.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { href: site.socials.github, icon: GithubIcon, label: "GitHub" },
                { href: site.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: site.socials.x, icon: XIcon, label: "X" },
                { href: site.socials.email, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full glass transition hover:-translate-y-0.5 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="pt-6">
              <TiltCard className="group relative rounded-3xl glass-strong p-1 shadow-elegant w-full max-w-md">
                <div className="relative overflow-hidden rounded-[1.5rem] p-5 glass-strong flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{site.location}</span>
                    <span className="text-muted-foreground/60">â€¢</span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {time} ({site.timezone})
                    </span>
                  </div>
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block w-full h-40 rounded-xl overflow-hidden border border-border/20 group/map"
                  >
                    <iframe
                      title={site.locationDetail}
                      src={site.mapsEmbed}
                      className="absolute inset-0 w-full h-full border-0 saturate-[0.6] invert-[0.92] hue-rotate-[180deg] opacity-85 transition-all duration-300 group-hover/map:opacity-100 pointer-events-none"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-background/90 text-foreground text-[10px] font-medium px-2 py-1 rounded-full shadow-lg border border-border/40">
                        View on Google Maps
                      </span>
                    </div>
                  </a>
                </div>
              </TiltCard>
            </div>
          </div>

          <TiltCard className="group relative rounded-3xl glass-strong p-1 shadow-elegant">
            <TechCluster className="-left-4 -top-4" size="lg" />
            <TechCluster className="-right-3 -bottom-3" size="lg" hexBehind />
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-[1.5rem] glass-strong p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Jane Doe"
                    className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[oklch(0.55_0.22_265/0.2)]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="jane@studio.com"
                    className="w-full rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[oklch(0.55_0.22_265/0.2)]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[oklch(0.55_0.22_265/0.2)]"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full gradient-aurora px-6 py-3 text-sm font-medium text-white shadow-elegant transition disabled:opacity-75"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                  <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
                {status === "ok" && (
                  <span className="text-xs text-emerald-500">
                    Message received — I&apos;ll reply soon.
                  </span>
                )}
                {status === "err" && (
                  <span className="text-xs text-rose-500">
                    Something went wrong. Email me directly.
                  </span>
                )}
              </div>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

