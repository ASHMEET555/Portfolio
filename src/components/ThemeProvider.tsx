"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: (event?: MouseEvent<HTMLElement>) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_BG: Record<Theme, string> = {
  light: "#f8fafc",
  dark: "#090b0f",
};

function applyTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  localStorage.setItem("theme", next);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const animating = useRef(false);
  const themeRef = useRef<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const preferred =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    themeRef.current = preferred;
    setTheme(preferred);
    applyTheme(preferred);
  }, []);

  const toggle = useCallback((event?: MouseEvent<HTMLElement>) => {
    if (animating.current) return;

    const next: Theme = themeRef.current === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      applyTheme(next);
      themeRef.current = next;
      setTheme(next);
      animating.current = false;
    };

    if (reduce) {
      finish();
      return;
    }

    animating.current = true;

    const x = event?.clientX ?? window.innerWidth - 80;
    const y = event?.clientY ?? 40;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    overlay.className = "theme-circle-overlay";
    overlay.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483647",
      "pointer-events:none",
      `background:${THEME_BG[next]}`,
      `clip-path:circle(0px at ${x}px ${y}px)`,
      "will-change:clip-path",
    ].join(";");

    document.body.appendChild(overlay);

    // Force layout so the starting clip-path is applied before animating
    void overlay.offsetWidth;

    const animation = overlay.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${Math.ceil(endRadius)}px at ${x}px ${y}px)` },
      ],
      {
        duration: 650,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    animation.onfinish = () => {
      finish();
      // Keep overlay one frame so the theme paint matches, then remove
      requestAnimationFrame(() => {
        overlay.remove();
      });
    };

    animation.oncancel = () => {
      overlay.remove();
      finish();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
