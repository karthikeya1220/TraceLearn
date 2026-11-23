"use client";

import { type ReactNode, useId, useRef, useState } from "react";
import { NotebookPen } from "lucide-react";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";
import { LessonChapters, type ChapterItem } from "@/components/lesson/lesson-chapters";
import { LessonTranscript, type TranscriptChunkItem } from "@/components/lesson/lesson-transcript";

type TabId = "content" | "chapters" | "transcript" | "notes";

interface LessonTabsProps {
  /** Server-rendered lesson body. */
  children: ReactNode;
  lessonSlug: string;
  chapters?: ChapterItem[];
  chunks?: TranscriptChunkItem[];
  startSeconds?: number;
}

/**
 * Lesson Content / Chapters / Transcript / Notes.
 */
export function LessonTabs({
  children,
  lessonSlug,
  chapters = [],
  chunks = [],
  startSeconds = 0,
}: LessonTabsProps) {
  const [active, setActive] = useState<TabId>("content");
  const baseId = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    content: null,
    chapters: null,
    transcript: null,
    notes: null,
  });

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "content", label: "Lesson Content" },
    ...(chapters.length > 0
      ? [{ id: "chapters" as TabId, label: "Chapters", count: chapters.length }]
      : []),
    ...(chunks.length > 0
      ? [{ id: "transcript" as TabId, label: "Transcript", count: chunks.length }]
      : []),
    { id: "notes", label: "Notes" },
  ];

  const select = (id: TabId) => {
    setActive(id);
    posthog.capture("lesson_tab_changed", { lesson_slug: lessonSlug, tab: id });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const index = tabs.findIndex((tab) => tab.id === active);
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + offset + tabs.length) % tabs.length];

    select(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Lesson"
        onKeyDown={onKeyDown}
        className="flex gap-8 border-b border-neutral-900"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(tab.id)}
              className={cn(
                "-mb-px flex items-center gap-2 border-b-2 px-1 pb-3 text-[15px] leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                isActive
                  ? "border-primary-500 font-semibold text-primary-500"
                  : "border-transparent text-neutral-500 hover:text-neutral-900",
              )}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-content-panel`}
        aria-labelledby={`${baseId}-content-tab`}
        hidden={active !== "content"}
        className="pt-8"
      >
        {children}
      </div>

      {chapters.length > 0 && (
        <div
          role="tabpanel"
          id={`${baseId}-chapters-panel`}
          aria-labelledby={`${baseId}-chapters-tab`}
          hidden={active !== "chapters"}
          tabIndex={0}
          className="pt-8"
        >
          <LessonChapters
            chapters={chapters}
            lessonSlug={lessonSlug}
            currentStartSeconds={startSeconds}
          />
        </div>
      )}

      {chunks.length > 0 && (
        <div
          role="tabpanel"
          id={`${baseId}-transcript-panel`}
          aria-labelledby={`${baseId}-transcript-tab`}
          hidden={active !== "transcript"}
          tabIndex={0}
          className="pt-8"
        >
          <LessonTranscript
            chunks={chunks}
            lessonSlug={lessonSlug}
            currentStartSeconds={startSeconds}
          />
        </div>
      )}

      <div
        role="tabpanel"
        id={`${baseId}-notes-panel`}
        aria-labelledby={`${baseId}-notes-tab`}
        hidden={active !== "notes"}
        tabIndex={0}
        className="pt-8"
      >
        <div className="flex flex-col items-center gap-3 rounded-none border border-dashed border-neutral-900 px-6 py-14 text-center">
          <NotebookPen className="size-6 text-neutral-300" strokeWidth={2} aria-hidden />
          <p className="text-[15px] leading-6 font-semibold text-neutral-900">
            Your notes will live here
          </p>
          <p className="max-w-80 text-[14px] leading-6 text-neutral-500">
            Note taking is not available yet. Nothing you type would be saved, so the tab stays
            read-only for now.
          </p>
        </div>
      </div>
    </div>
  );
}
