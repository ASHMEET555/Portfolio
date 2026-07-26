"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ExternalLink, Play, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/portfolio-local";

function youtubeEmbed(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}?rel=0`;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
  } catch {
    /* ignore */
  }
  return null;
}

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    setActiveImage(0);
    setShowVideo(Boolean(project.youtube));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  const embed = project.youtube ? youtubeEmbed(project.youtube) : null;
  const gallery = project.images?.length ? project.images : [project.image];

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close project details"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-elegant md:max-w-[72vw] lg:max-w-5xl">
        <div className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {project.category}
              {project.year ? ` · ${project.year}` : ""}
            </div>
            <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground transition hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              {embed && showVideo ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-sm">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-zinc-950 px-3 py-2">
                    <span className="text-[11px] font-mono text-zinc-300">
                      Demo player · YouTube
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowVideo(false)}
                      className="rounded-full px-2.5 py-1 text-[11px] text-zinc-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Show gallery
                    </button>
                  </div>
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={embed}
                      title={`${project.title} demo video`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-border bg-zinc-950/95 dark:bg-black">
                  <div className="relative aspect-[16/11] w-full min-h-[220px] sm:min-h-[280px]">
                    <Image
                      src={gallery[activeImage] || project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-1 sm:p-2"
                      sizes="(max-width: 1024px) 90vw, 50vw"
                    />
                  </div>
                  {gallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-zinc-900/80 p-2">
                      {gallery.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveImage(i)}
                          className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border bg-zinc-950 ${
                            i === activeImage
                              ? "border-primary ring-2 ring-primary/30"
                              : "border-white/15 opacity-80 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-contain p-0.5"
                            sizes="96px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                  {embed && (
                    <div className="border-t border-border p-2">
                      <button
                        type="button"
                        onClick={() => setShowVideo(true)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                      >
                        <Play className="h-4 w-4" />
                        Play demo video
                      </button>
                    </div>
                  )}
                </div>
              )}

              {project.highlights?.length ? (
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {project.longDescription}
              </p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Problem
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  {project.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Solution
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  {project.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Tech stack
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full gradient-aurora px-4 py-2 text-xs font-semibold text-white shadow-elegant"
                  >
                    Live demo
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.youtube && (
                  <a
                    href={project.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
                  >
                    <Play className="h-3.5 w-3.5" />
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
