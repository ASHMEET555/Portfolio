"use client";

/** Row A — frontend / ML */
const ROW_A = [
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "6B7280" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "FastAPI", slug: "fastapi", color: "009688" },
  { name: "Hugging Face", slug: "huggingface", color: "FFD21E" },
  { name: "Go", slug: "go", color: "00ADD8" },
] as const;

/** Row B — infra / data (no overlap with Row A) */
const ROW_B = [
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "AWS", slug: "aws", color: "FF9900" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Redis", slug: "redis", color: "DC382D" },
  { name: "Kafka", slug: "apachekafka", color: "6B7280" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Linux", slug: "linux", color: "FCC624" },
] as const;

function AwsLogo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
      alt=""
      width={28}
      height={22}
      className={className ?? "h-[22px] w-[28px] object-contain"}
      loading="eager"
    />
  );
}

function LogoChip({
  name,
  slug,
  color,
}: {
  name: string;
  slug: string;
  color: string;
}) {
  const isAws = slug === "aws";

  return (
    <div
      className="tech-logo-chip relative flex shrink-0 items-center gap-2.5 rounded-2xl border border-border/70 bg-background px-4 py-2.5 shadow-sm transition duration-300 hover:z-20 hover:scale-110 hover:border-primary/55 hover:shadow-elegant"
      title={name}
    >
      {isAws ? (
        <AwsLogo className="h-[22px] w-[22px]" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}/${color}`}
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] object-contain"
          loading="eager"
          decoding="async"
        />
      )}
      <span className="whitespace-nowrap text-xs font-semibold tracking-tight text-foreground/80">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse = false,
  durationSec,
}: {
  logos: readonly { name: string; slug: string; color: string }[];
  reverse?: boolean;
  durationSec: number;
}) {
  // Triple the list so the loop stays seamless on wide screens
  const track = [...logos, ...logos, ...logos];

  return (
    <div className="tech-marquee relative overflow-hidden py-1.5">
      <div
        className="flex w-max gap-3"
        style={{
          animation: `${reverse ? "tech-marquee-rtl" : "tech-marquee-ltr"} ${durationSec}s linear infinite`,
        }}
      >
        {track.map((logo, i) => (
          <LogoChip key={`${logo.slug}-${i}`} {...logo} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-background to-transparent sm:w-16" />
    </div>
  );
}

export function TechLogoMarquee() {
  return (
    <div className="relative mt-10 space-y-3" aria-label="Major technologies">
      <MarqueeRow logos={ROW_A} durationSec={22} />
      <MarqueeRow logos={ROW_B} reverse durationSec={26} />
    </div>
  );
}
