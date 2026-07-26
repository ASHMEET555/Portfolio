"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import type { ExperienceItem } from "@/lib/portfolio-local";

type Detail = NonNullable<ExperienceItem["detail"]>;

type Props = {
  item: ExperienceItem | null;
  onClose: () => void;
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.25;

function GalleryImage({
  src,
  alt,
  thumb = false,
  zoom = 1,
}: {
  src: string;
  alt: string;
  thumb?: boolean;
  zoom?: number;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div className="flex h-full min-h-[120px] w-full flex-col items-center justify-center gap-2 bg-zinc-950 px-3 text-center">
        <p className="text-sm text-zinc-400">Diagram preview unavailable</p>
        <p className="text-[11px] text-zinc-500">{alt}</p>
      </div>
    );
  }

  if (thumb) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="max-w-none origin-center object-contain transition-transform duration-200"
      style={{
        width: `${zoom * 100}%`,
        height: `${zoom * 100}%`,
        maxWidth: "none",
      }}
      onError={() => setFailed(true)}
    />
  );
}

export function ExperienceModal({ item, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item?.detail) return;
    setActiveImage(0);
    setZoom(1);
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
  }, [item, onClose]);

  if (!mounted || !item?.detail) return null;
  const detail = item.detail as Detail;
  const images = detail.images;
  const captions = detail.imageCaptions || [];

  const zoomIn = () =>
    setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100));
  const zoomOut = () =>
    setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100));
  const zoomReset = () => setZoom(1);

  const selectImage = (i: number) => {
    setActiveImage(i);
    setZoom(1);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close experience details"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-elegant md:w-[92vw]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-start gap-3">
            {item.logo && (
              <span
                className={`mt-0.5 grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-border p-1 ${
                  item.id === "queuebuster" ? "bg-[#0080FF]" : "bg-white"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.logo} alt="" className="h-full w-full object-contain" />
              </span>
            )}
            <div className="min-w-0">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                {item.period} · {item.org}
              </div>
              <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">{detail.headline}</p>
            </div>
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

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <aside className="mb-5 w-full overflow-hidden rounded-2xl border border-border/60 bg-zinc-950 md:float-left md:mb-4 md:mr-5 md:w-[62%] lg:w-[64%]">
            <div className="relative">
              <div className="aspect-[16/9] w-full overflow-auto">
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  style={{
                    minWidth: zoom > 1 ? `${zoom * 100}%` : "100%",
                    minHeight: zoom > 1 ? `${zoom * 100}%` : "100%",
                  }}
                >
                  <GalleryImage
                    src={images[activeImage]}
                    alt={captions[activeImage] || item.title}
                    zoom={zoom}
                  />
                </div>
              </div>

              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1 shadow-lg backdrop-blur-sm">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= ZOOM_MIN}
                  className="grid h-8 w-8 place-items-center rounded-full text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Zoom out"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2.75rem] text-center text-[11px] font-semibold tabular-nums text-white">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= ZOOM_MAX}
                  className="grid h-8 w-8 place-items-center rounded-full text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Zoom in"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={zoomReset}
                  disabled={zoom === 1}
                  className="grid h-8 w-8 place-items-center rounded-full text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto border-t border-white/10 px-2.5 py-2">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => selectImage(i)}
                    className={`relative h-12 w-[5.25rem] shrink-0 overflow-hidden rounded-md border bg-zinc-900 sm:h-14 sm:w-24 ${
                      i === activeImage
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-white/15 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <GalleryImage src={src} alt={captions[i] || ""} thumb />
                  </button>
                ))}
              </div>
            )}
            {captions[activeImage] && (
              <p className="border-t border-white/10 px-3 py-2 text-center text-[11px] leading-snug text-zinc-400">
                {captions[activeImage]}
              </p>
            )}
          </aside>

          <div className="space-y-5 text-sm leading-relaxed md:space-y-6">
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Overview
              </h4>
              <p className="mt-2 text-muted-foreground">{detail.summary}</p>
            </section>

            {(("context" in detail && detail.context) ||
              ("helix" in detail && detail.helix)) && (
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {"contextLabel" in detail && detail.contextLabel
                    ? detail.contextLabel
                    : "What Helix is"}
                </h4>
                <p className="mt-2 text-foreground/90">
                  {"context" in detail && detail.context
                    ? detail.context
                    : "helix" in detail
                      ? detail.helix
                      : null}
                </p>
              </section>
            )}

            <section>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                What I built
              </h4>
              <ul className="mt-2 space-y-2">
                {detail.work.map((w) => (
                  <li key={w} className="flex gap-2 text-muted-foreground">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full gradient-aurora" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </section>

            {"impact" in detail && detail.impact && detail.impact.length > 0 && (
              <section>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Impact
                </h4>
                <ul className="mt-2 space-y-2">
                  {detail.impact.map((w) => (
                    <li key={w} className="flex gap-2 text-muted-foreground">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="clear-both pt-1">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Challenges I faced
              </h4>
              <div className="mt-2 space-y-3">
                {detail.challenges.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-border bg-muted/25 px-3.5 py-3"
                  >
                    <div className="font-medium text-foreground">{c.title}</div>
                    <p className="mt-1 text-muted-foreground">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                New learnings
              </h4>
              <ul className="mt-2 space-y-2">
                {detail.learnings.map((w) => (
                  <li key={w} className="flex gap-2 text-muted-foreground">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Tech stack
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {detail.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {"recommendation" in detail && detail.recommendation && (
              <section className="rounded-2xl border border-border bg-muted/20 px-4 py-3.5">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Recommendation
                </h4>
                <p className="mt-2 text-muted-foreground">
                  Letter of recommendation from Dr. Durgesh Ameta for this research internship at IIT Mandi.
                </p>
                <a
                  href={detail.recommendation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-primary transition hover:border-primary/40"
                >
                  {detail.recommendation.label}
                  <span aria-hidden>↗</span>
                </a>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
