"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

const LIKED_KEY = "ashmeet-liked-v2";

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const ready = useRef(false);

  useEffect(() => {
    const did = localStorage.getItem(LIKED_KEY) === "1";
    setLiked(did);

    void (async () => {
      try {
        const res = await fetch("/api/likes", { cache: "no-store" });
        const data = await res.json();
        if (typeof data.count === "number") setLikes(data.count);
      } catch {
        // keep 0
      } finally {
        ready.current = true;
      }
    })();
  }, []);

  const toggle = async () => {
    if (!ready.current || busy) return;

    const nextLiked = !liked;
    const optimistic = nextLiked ? likes + 1 : Math.max(0, likes - 1);
    setLiked(nextLiked);
    setLikes(optimistic);
    localStorage.setItem(LIKED_KEY, nextLiked ? "1" : "0");
    setBusy(true);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: nextLiked ? "like" : "unlike" }),
      });
      const data = await res.json();
      if (res.ok && typeof data.count === "number") {
        setLikes(data.count);
      } else {
        // roll back UI if server failed
        setLiked(!nextLiked);
        setLikes(likes);
        localStorage.setItem(LIKED_KEY, !nextLiked ? "1" : "0");
      }
    } catch {
      setLiked(!nextLiked);
      setLikes(likes);
      localStorage.setItem(LIKED_KEY, !nextLiked ? "1" : "0");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
      <button
        type="button"
        onClick={() => void toggle()}
        disabled={busy}
        aria-label={liked ? "Unlike portfolio" : "Like portfolio"}
        className="group relative flex items-center gap-2.5 h-11 px-4 rounded-full border shadow-elegant transition-all select-none bg-muted/50 dark:bg-zinc-950/45 backdrop-blur-xl border-border/80 dark:border-white/10 text-muted-foreground hover:text-foreground disabled:opacity-70"
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
