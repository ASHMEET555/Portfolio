"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Peak corner tilt in degrees — medium default (~5) */
  intensity?: number;
};

export function TiltCard({ children, className = "", intensity = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 left → 1 right
    const py = (e.clientY - rect.top) / rect.height; // 0 top → 1 bottom

    // Left → left presses into screen, right rises toward viewer
    // Right → right presses in, left rises
    const rotateY = (px - 0.5) * 2 * intensity;
    const rotateX = (0.5 - py) * 2 * intensity;

    el.style.transition = "none";
    el.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s ease-out";
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      data-cursor="hover"
    >
      {children}
    </div>
  );
}
