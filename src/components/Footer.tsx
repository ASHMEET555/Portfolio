"use client";

import {
  ExternalLink,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { useSite } from "@/components/PortfolioProvider";

export function Footer() {
  const site = useSite();

  return (
    <footer className="relative border-t border-border/40 bg-background/30 py-16 md:py-20 backdrop-blur-sm overflow-hidden">
      <div className="hidden md:flex pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 items-center justify-center overflow-hidden">
        <span className="text-[15vw] md:text-[18vw] font-extrabold tracking-normal text-foreground/[0.03] dark:text-foreground/[0.025] select-none uppercase leading-none">
          {site.watermark}
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:gap-8">
          <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <a href="#top" className="flex items-center gap-2 group">
              <span className="font-bold text-xl tracking-tight transition group-hover:text-primary">
                {site.brand}
                <span className="text-primary font-extrabold">
                  {site.brandSuffix}
                </span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {site.footerBlurb}
            </p>
            <div className="flex flex-wrap gap-3 pt-4 justify-center lg:justify-start">
              {[
                { href: site.socials.github, icon: GithubIcon, label: "GitHub" },
                { href: site.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: site.socials.x, icon: XIcon, label: "X" },
                { href: site.socials.email, icon: Mail, label: "Email" },
                { href: site.resumePath, icon: FileText, label: "Resume" },
              ].map(({ href, icon: Icon, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full glass transition hover:-translate-y-0.5 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground items-center lg:items-start">
              {site.services.map((s) => (
                <li key={s} className="hover:text-primary transition cursor-default">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground items-center lg:items-start">
              {[
                ["#about", "About"],
                ["#experience", "Experience"],
                ["#skills", "Skills"],
                ["#projects", "Projects"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-primary transition">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <span className="inline-flex items-center gap-1 text-muted-foreground/70">
                  Services Hub <ExternalLink className="h-3 w-3" /> (soon)
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground/80">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground items-center lg:items-start">
              <a
                href={site.socials.email}
                className="hover:text-primary transition flex items-center gap-2 break-all"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {site.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {site.locationDetail}
              </div>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4 shrink-0 text-primary" />
                Explore my open-source work
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition flex items-center gap-2"
              >
                <LinkedinIcon className="h-4 w-4 shrink-0 text-primary" />
                Connect with me professionally
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            Â© {new Date().getFullYear()} {site.name} â€” Engineered with care &amp;
            advanced AI.
          </div>
          <div className="font-mono flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>{site.version}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

