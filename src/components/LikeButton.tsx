"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem("ashmeet-likes-v2") || "0");
    const did = localStorage.getItem("ashmeet-liked-v2") === "1";
    setLikes(Number.isFinite(stored) ? stored : 0);
    setLiked(did);
  }, []);

  const toggle = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikes((n) => {
        const value = next ? n + 1 : Math.max(0, n - 1);
        localStorage.setItem("ashmeet-likes-v2", String(value));
        return value;
      });
      localStorage.setItem("ashmeet-liked-v2", next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
      <button
        type="button"
        onClick={toggle}
        className="group relative flex items-center gap-2.5 h-11 px-4 rounded-full border shadow-elegant transition-all select-none bg-muted/50 dark:bg-zinc-950/45 backdrop-blur-xl border-border/80 dark:border-white/10 text-muted-foreground hover:text-foreground"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            liked
              ? "fill-rose-500 stroke-rose-500"
              : "stroke-rose-500/70 group-hover:stroke-rose-500"
          }`}
        />
        <span className="font-mono text-xs font-bold tracking-tight tabular-nums">
          {likes}
        </span>
      </button>
    </div>
  );
}
