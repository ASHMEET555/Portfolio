"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let moveRaf = 0;
    let readyRaf = 0;
    let attached = false;

    const onMove = (e: MouseEvent) => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const tick = () => {
      const ring = ringRef.current;
      if (ring) {
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
      }
      moveRaf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = Boolean(
        t?.closest(
          "a, button, input, textarea, label, [data-cursor='hover'], .tilt-card, .view-services-btn",
        ),
      );
      setHovering(interactive);
      document.documentElement.classList.toggle("cursor-hovering", interactive);
    };

    const attach = () => {
      if (!dotRef.current || !ringRef.current) {
        readyRaf = requestAnimationFrame(attach);
        return;
      }
      if (attached) return;
      attached = true;
      document.documentElement.classList.add("has-custom-cursor");
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver, { passive: true });
      moveRaf = requestAnimationFrame(tick);
    };

    readyRaf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(readyRaf);
      cancelAnimationFrame(moveRaf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor", "cursor-hovering");
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        ref={ringRef}
        className={`ash-cursor-ring ${hovering ? "is-hover" : ""}`}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={`ash-cursor-dot ${hovering ? "is-hover" : ""}`}
        aria-hidden
      />
    </>,
    document.body,
  );
}
