"use client";

type MotifSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<MotifSize, string> = {
  sm: "w-6 h-6",
  md: "w-9 h-9",
  lg: "w-11 h-11",
};

/** Flat technical node — no soft glow / light bloom */
function TechNode({
  size = "md",
  className = "",
  variant = "hex",
}: {
  size?: MotifSize;
  className?: string;
  variant?: "hex" | "chip" | "ring";
}) {
  return (
    <div className={`tech-spin relative ${SIZE_MAP[size]} ${className}`} aria-hidden>
      {variant === "hex" && (
        <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
          <path
            className="tech-fill"
            d="M16 2.5 L27.5 9.2 V22.8 L16 29.5 L4.5 22.8 V9.2 Z"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="1.25"
          />
          <circle cx="16" cy="16" r="3.2" fill="#fff" />
          <circle cx="16" cy="16" r="1.4" fill="#0369a1" />
        </svg>
      )}
      {variant === "chip" && (
        <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
          <rect
            className="tech-fill"
            x="8"
            y="8"
            width="16"
            height="16"
            rx="2"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="1.25"
          />
          <rect x="12" y="12" width="8" height="8" rx="1" fill="#fff" />
          <path
            stroke="#0284c7"
            strokeWidth="1.25"
            d="M12 4v4M16 4v4M20 4v4M12 24v4M16 24v4M20 24v4M4 12h4M4 16h4M4 20h4M24 12h4M24 16h4M24 20h4"
          />
        </svg>
      )}
      {variant === "ring" && (
        <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
          <circle className="tech-stroke" cx="16" cy="16" r="11" stroke="#38bdf8" strokeWidth="2" />
          <circle className="tech-stroke" cx="16" cy="16" r="6.5" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="2.2" fill="#0ea5e9" />
          <path stroke="#38bdf8" strokeWidth="1.5" d="M16 2v4M16 26v4M2 16h4M26 16h4" />
        </svg>
      )}
    </div>
  );
}

export function TechCluster({
  className = "",
  size = "md",
  /** bottom-right: mirror of top-left (hex on the right) */
  hexBehind = false,
}: {
  className?: string;
  size?: MotifSize;
  hexBehind?: boolean;
}) {
  const gearSize = size === "lg" ? "md" : "sm";

  return (
    <div
      className={`tech-cluster pointer-events-none absolute z-20 ${className} ${
        hexBehind ? "tech-cluster-br" : "tech-cluster-tl"
      }`}
    >
      {hexBehind ? (
        <>
          {/* Mirror of top-left: chip/ring kiss hex from the left */}
          <div className="absolute left-[1.15rem] top-0 z-10">
            <TechNode size={size} variant="hex" />
          </div>
          <div className="absolute left-0 top-[0.1rem] z-20">
            <TechNode size={gearSize} variant="chip" />
          </div>
          <div className="absolute left-[0.15rem] top-[1.55rem] z-20 opacity-90">
            <TechNode size="sm" variant="ring" />
          </div>
        </>
      ) : (
        <>
          {/* Hex left; chip/ring kiss its right + bottom-right edge only */}
          <div className="absolute left-0 top-0 z-10">
            <TechNode size={size} variant="hex" />
          </div>
          <div className="absolute left-[1.7rem] top-[0.1rem] z-20">
            <TechNode size={gearSize} variant="chip" />
          </div>
          <div className="absolute left-[1.85rem] top-[1.55rem] z-20 opacity-90">
            <TechNode size="sm" variant="ring" />
          </div>
        </>
      )}
    </div>
  );
}

export function ViewServicesButton({ href = "#projects" }: { href?: string }) {
  return (
    <a
      href={href}
      className="view-services-btn group relative inline-flex items-center justify-center min-w-[220px] min-h-[64px] px-10 py-4"
      data-cursor="hover"
    >
      <div className="view-services-motifs absolute inset-[-18px] pointer-events-none">
        <span className="vs-motif m1">
          <TechNode size="lg" variant="hex" />
        </span>
        <span className="vs-motif m2">
          <TechNode size="md" variant="chip" className="opacity-75" />
        </span>
        <span className="vs-motif m3">
          <TechNode size="lg" variant="ring" />
        </span>
        <span className="vs-motif m4">
          <TechNode size="md" variant="hex" className="opacity-70" />
        </span>
        <span className="vs-motif m5">
          <TechNode size="lg" variant="chip" />
        </span>
      </div>
      <span className="relative z-10 text-[15px] font-semibold tracking-tight text-foreground">
        View Services
      </span>
    </a>
  );
}
