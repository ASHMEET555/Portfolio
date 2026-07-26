"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FileText,
  Mail,
  Share2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ViewServicesButton } from "@/components/TechDecor";
import { TiltCard } from "@/components/TiltCard";
import { useSite } from "@/components/PortfolioProvider";

export function Hero() {
  const site = useSite();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const roles = site.roles?.length ? site.roles : ["AI/ML Engineer"];
    const current = roles[roleIndex % roles.length];
    const timeout = setTimeout(
      () => {
        if (!deleting && text === current) {
          setTimeout(() => setDeleting(true), 1200);
          return;
        }
        if (deleting && text === "") {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
          return;
        }
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
        );
      },
      deleting ? 40 : 70,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, site.roles]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: site.name, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 pb-10 md:pt-28 md:pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-8 h-[72vh]">
        <svg
          aria-hidden
          viewBox="0 0 1600 820"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hero-wave-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
              <stop offset="42%" stopColor="rgba(143,114,122,0.18)" />
              <stop offset="60%" stopColor="rgba(148,163,184,0.32)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.02)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M -120 ${468 + i * 10.5} C 210 ${486 + i * 11}, 470 ${450 + i * 9}, 790 ${468 + i * 10.5} S 1220 ${486 + i * 11}, 1720 ${468 + i * 10.5}`}
              fill="none"
              stroke="url(#hero-wave-fade)"
              strokeWidth="1"
              opacity={0.7}
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10">
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {site.taglineLead}{" "}
            <span className="gradient-text">{site.taglineHighlight}</span>{" "}
            {site.taglineTrail}
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            I&apos;m <span className="font-medium text-foreground">{site.name}</span>
            {" \u2014 "}a{" "}
            <span className="font-medium text-primary relative inline-block align-bottom min-w-[12ch]">
              <span className="gradient-text">{text}</span>
              <span className="ml-0.5 inline-block w-[2px] h-[0.9em] align-middle bg-[oklch(0.55_0.22_265)] animate-blink" />
            </span>
            <span className="block mt-2">{site.bioLine}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ViewServicesButton href="#projects" />

            <div className="hidden sm:block h-6 w-px bg-border/60" />

            <div className="flex items-center gap-3">
              {[
                { href: site.socials.github, icon: GithubIcon, label: "GitHub" },
                { href: site.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: site.socials.email, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full glass transition hover:scale-105 hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <button
                type="button"
                onClick={share}
                aria-label="Share Site"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full glass transition hover:scale-105 hover:-translate-y-0.5"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <div className="relative">
                <a
                  href={site.resumePath}
                  download
                  aria-label="Download Resume"
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full glass transition hover:scale-105 hover:-translate-y-0.5"
                >
                  <FileText className="h-4 w-4 text-primary" />
                </a>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <div className="glass-strong px-2.5 py-1 rounded-full border border-primary/30 text-[10px] font-bold text-primary whitespace-nowrap">
                    Resume ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] w-full max-w-[540px] mx-auto">
            <TiltCard className="relative w-full h-full rounded-[2rem] glass-strong p-1 shadow-elegant z-10">
              <div className="relative overflow-hidden rounded-[1.8rem] w-full h-full bg-[#d8dce2]">
                <Image
                  src={site.profileImage}
                  alt={site.name}
                  fill
                  priority
                  className="object-cover object-[46%_32%] scale-[1.08]"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ring-aurora" />
              </div>
            </TiltCard>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-12 w-3/4 rounded-full bg-[oklch(0.55_0.22_265/0.25)] blur-2xl z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

