"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import posthog from "posthog-js";
import { formatDuration } from "@/lib/format";
import { lessonHref } from "@/lib/routes";

export interface ChapterItem {
  _key: string;
  startSeconds: number | null;
  label: string | null;
}

interface LessonChaptersProps {
  chapters: ChapterItem[];
  lessonSlug: string;
  currentStartSeconds?: number;
}

export function LessonChapters({
  chapters,
  lessonSlug,
  currentStartSeconds = 0,
}: LessonChaptersProps) {
  if (chapters.length === 0) {
    return (
      <div className="rounded-md border border-neutral-200 bg-surface p-6 text-center text-neutral-500">
        No chapter markers available for this lesson video.
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-neutral-200 border border-neutral-900 bg-surface shadow-xs">
      {chapters.map((chapter, index) => {
        const seconds = chapter.startSeconds ?? 0;
        const timeFormatted = formatDuration(seconds) ?? "0:00";
        const isActive =
          currentStartSeconds >= seconds &&
          (index === chapters.length - 1 ||
            (chapters[index + 1]?.startSeconds ?? Infinity) > currentStartSeconds);

        return (
          <li key={chapter._key ?? index}>
            <Link
              href={lessonHref(lessonSlug, seconds)}
              onClick={() => {
                posthog.capture("lesson_chapter_clicked", {
                  lesson_slug: lessonSlug,
                  chapter_label: chapter.label,
                  start_seconds: seconds,
                });
              }}
              className={`flex items-center justify-between gap-4 p-4 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive ? "bg-primary-50/60" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-900 bg-surface text-primary-500">
                  <Play className="size-3 fill-current" aria-hidden />
                </span>
                <span className="text-[15px] font-medium text-neutral-900">
                  {chapter.label ?? `Chapter ${index + 1}`}
                </span>
              </div>

              <span className="rounded-xs border border-neutral-300 bg-neutral-100 px-2 py-0.5 font-mono text-[12px] font-semibold text-neutral-700">
                {timeFormatted}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
