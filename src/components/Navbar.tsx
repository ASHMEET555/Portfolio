"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useSite } from "@/components/PortfolioProvider";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const site = useSite();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-4 z-40 w-[min(960px,calc(100%-2rem))] -translate-x-1/2">
      <div
        className={`glass rounded-full p-1 shadow-elegant transition ${
          scrolled ? "ring-1 ring-primary/10" : ""
        }`}
      >
        <nav className="glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-full gradient-aurora text-xs font-bold text-white">
              {site.logoLetter}
            </span>
            <span className="text-sm">
              {site.brand}
              <span className="text-primary font-semibold">{site.brandSuffix}</span>
            </span>
          </a>

          <ul className="hidden gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-[oklch(0.55_0.22_265/0.08)] hover:text-foreground ${
                    active === link.href.slice(1)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.resumePath}
              download
              className="hidden lg:flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-black text-white hover:bg-zinc-800 transition shadow-elegant dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Resume <Download className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={(e) => toggle(e)}
              aria-label="Toggle theme"
              className="relative z-[70] grid h-8 w-8 place-items-center rounded-full glass text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden lg:inline-block rounded-full gradient-aurora px-4 py-1.5 text-xs font-medium text-white shadow-elegant"
            >
              Let&apos;s talk
            </a>
            <button
              type="button"
              className="lg:hidden text-muted-foreground"
              aria-label="Toggle Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="mt-2 glass-strong rounded-3xl p-4 shadow-elegant lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resumePath}
                download
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                Resume <Download className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
