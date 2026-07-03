import { useCallback, useEffect, useState } from "react";

const KEY = "learnbeats:progress:level-1";

type Progress = Record<string, boolean>;

function read(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function useLevel1Progress() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    setProgress(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setProgress(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const complete = useCallback((slug: string) => {
    const next = { ...read(), [slug]: true };
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setProgress(next);
  }, []);

  const reset = useCallback(() => {
    window.localStorage.removeItem(KEY);
    setProgress({});
  }, []);

  const doneCount = Object.values(progress).filter(Boolean).length;
  const isDone = (slug: string) => !!progress[slug];

  return { progress, complete, reset, doneCount, isDone };
}
