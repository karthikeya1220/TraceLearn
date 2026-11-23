"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";

interface LastPlayedLesson {
  lessonSlug: string;
  courseSlug?: string;
  timestamp: number;
}

interface ProgressContextValue {
  completedLessons: Set<string>;
  lastPlayedLesson: LastPlayedLesson | null;
  isLoading: boolean;
  isCompleted: (lessonSlug: string) => boolean;
  toggleCompleted: (lessonSlug: string) => Promise<void>;
  updateLastPlayed: (lessonSlug: string, timestamp: number, courseSlug?: string) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue>({
  completedLessons: new Set(),
  lastPlayedLesson: null,
  isLoading: true,
  isCompleted: () => false,
  toggleCompleted: async () => {},
  updateLastPlayed: async () => {},
});

export function ProgressProvider({
  children,
  initialCompleted = [],
}: {
  children: ReactNode;
  initialCompleted?: string[];
}) {
  const { isSignedIn } = useUser();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(initialCompleted));
  const [lastPlayedLesson, setLastPlayedLesson] = useState<LastPlayedLesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (!isSignedIn) {
      return;
    }

    fetch("/api/progress")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data) return;
        setCompletedLessons(new Set(data.completedLessons ?? []));
        setLastPlayedLesson(data.lastPlayedLesson ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isSignedIn]);

  const isCompleted = useCallback(
    (lessonSlug: string) => completedLessons.has(lessonSlug),
    [completedLessons],
  );

  const toggleCompleted = useCallback(
    async (lessonSlug: string) => {
      // Optimistic update
      setCompletedLessons((prev) => {
        const next = new Set(prev);
        if (next.has(lessonSlug)) {
          next.delete(lessonSlug);
        } else {
          next.add(lessonSlug);
        }
        return next;
      });

      if (!isSignedIn) return;

      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toggleLesson: lessonSlug }),
        });
        if (res.ok) {
          const data = await res.json();
          setCompletedLessons(new Set(data.completedLessons ?? []));
        }
      } catch {
        // Ignored
      }
    },
    [isSignedIn],
  );

  const updateLastPlayed = useCallback(
    async (lessonSlug: string, timestamp: number, courseSlug?: string) => {
      const entry = { lessonSlug, timestamp, courseSlug };
      setLastPlayedLesson(entry);

      if (!isSignedIn) return;

      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lastPlayedLesson: entry }),
        });
      } catch {
        // Ignored
      }
    },
    [isSignedIn],
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        lastPlayedLesson,
        isLoading,
        isCompleted,
        toggleCompleted,
        updateLastPlayed,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useLearnerProgress() {
  return useContext(ProgressContext);
}
