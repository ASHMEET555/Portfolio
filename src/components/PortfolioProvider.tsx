"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  localPortfolio,
  type PortfolioData,
} from "@/lib/portfolio-local";

type PortfolioContextValue = {
  data: PortfolioData;
  source: "supabase" | "local" | "loading";
  refreshing: boolean;
  refresh: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const fallback = useMemo(() => localPortfolio(), []);
  const [data, setData] = useState<PortfolioData>(fallback);
  const [source, setSource] = useState<"supabase" | "local" | "loading">(
    "loading",
  );
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) throw new Error("content fetch failed");
      const json = await res.json();
      if (json?.data) {
        setData(json.data as PortfolioData);
        setSource(json.source === "supabase" ? "supabase" : "local");
      } else {
        setData(fallback);
        setSource("local");
      }
    } catch {
      setData(fallback);
      setSource("local");
    } finally {
      setRefreshing(false);
    }
  }, [fallback]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<PortfolioContextValue>(
    () => ({ data, source, refreshing, refresh }),
    [data, source, refreshing, refresh],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    return {
      data: localPortfolio(),
      source: "local",
      refreshing: false,
      refresh: async () => undefined,
    };
  }
  return ctx;
}

export function useSite() {
  return usePortfolio().data.site;
}
