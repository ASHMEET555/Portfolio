"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { Certification } from "@/lib/portfolio-local";

type Viewable = Extract<
  Certification,
  { view: unknown }
>["view"];

type Props = {
  cert: Certification | null;
  onClose: () => void;
};

export function CredentialsModal({ cert, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [activePdf, setActivePdf] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!cert || !("view" in cert) || !cert.view) return;
    setActivePdf(0);
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
  }, [cert, onClose]);

  if (!mounted || !cert || !("view" in cert) || !cert.view) return null;
  const view = cert.view as Viewable;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close certificate viewer"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-elegant md:w-[88vw]">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {cert.issuer} · Issued {cert.issued}
            </div>
            <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              {cert.title}
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

        <div className="min-h-0 flex-1 overflow-hidden">
          {view.kind === "image" ? (
            <div className="flex h-full max-h-[78vh] flex-col">
              <div className="min-h-0 flex-1 overflow-auto bg-zinc-100 p-3 dark:bg-zinc-950 sm:p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={view.src}
                  alt={cert.title}
                  className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-md"
                />
              </div>
              <div className="flex shrink-0 justify-end border-t border-border/60 px-4 py-3">
                <a
                  href={view.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-primary transition hover:border-primary/40"
                >
                  Open full size
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="flex h-full max-h-[78vh] flex-col md:flex-row">
              <aside className="max-h-40 shrink-0 overflow-y-auto border-b border-border/60 md:max-h-none md:w-64 md:border-b-0 md:border-r">
                <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                  {view.files.length} certificates
                </div>
                <ul className="space-y-0.5 px-2 pb-3">
                  {view.files.map((file, i) => (
                    <li key={file.src}>
                      <button
                        type="button"
                        onClick={() => setActivePdf(i)}
                        className={`w-full rounded-xl px-3 py-2 text-left text-xs transition ${
                          i === activePdf
                            ? "bg-primary/10 font-semibold text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        {file.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setActivePdf((i) =>
                          i === 0 ? view.files.length - 1 : i - 1,
                        )
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-foreground"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePdf((i) =>
                          i === view.files.length - 1 ? 0 : i + 1,
                        )
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-foreground"
                      aria-label="Next certificate"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="min-w-0 truncate text-xs font-medium">
                    {view.files[activePdf]?.title}
                  </p>
                  <a
                    href={view.files[activePdf]?.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-primary"
                  >
                    Open PDF
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="min-h-0 flex-1 bg-zinc-200 dark:bg-zinc-900">
                  <iframe
                    key={view.files[activePdf]?.src}
                    src={`${view.files[activePdf]?.src}#toolbar=1&navpanes=0`}
                    title={view.files[activePdf]?.title}
                    className="h-[min(70vh,640px)] w-full border-0 md:h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
