"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Play } from "lucide-react";
import posthog from "posthog-js";
import { formatDuration } from "@/lib/format";
import { lessonHref } from "@/lib/routes";

export interface TranscriptChunkItem {
  _key: string;
  startSeconds: number | null;
  text: string | null;
}

interface LessonTranscriptProps {
  chunks: TranscriptChunkItem[];
  lessonSlug: string;
  currentStartSeconds?: number;
}

export function LessonTranscript({
  chunks,
  lessonSlug,
  currentStartSeconds = 0,
}: LessonTranscriptProps) {
  const [filter, setFilter] = useState("");

  if (chunks.length === 0) {
    return (
      <div className="rounded-md border border-neutral-200 bg-surface p-6 text-center text-neutral-500">
        No transcript chunks available for this video yet.
      </div>
    );
  }

  const query = filter.trim().toLowerCase();
  const visibleChunks = query
    ? chunks.filter((chunk) => chunk.text?.toLowerCase().includes(query))
    : chunks;

  return (
    <div className="flex flex-col gap-4">
      {/* Search within transcript */}
      <div className="relative">
        <Search
          className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-neutral-400"
          aria-hidden
        />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter spoken dialogue in this lesson..."
          className="h-10 w-full rounded-none border border-neutral-900 bg-surface pr-4 pl-10 text-[14px] text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      </div>

      {visibleChunks.length === 0 ? (
        <div className="py-8 text-center text-[14px] text-neutral-500">
          No transcript lines match &ldquo;{filter}&rdquo;.
        </div>
      ) : (
        <div className="max-h-120 overflow-y-auto divide-y divide-neutral-200 border border-neutral-900 bg-surface">
          {visibleChunks.map((chunk, index) => {
            const seconds = chunk.startSeconds ?? 0;
            const timeFormatted = formatDuration(seconds) ?? "0:00";
            const isActive =
              currentStartSeconds >= seconds &&
              (index === visibleChunks.length - 1 ||
                (visibleChunks[index + 1]?.startSeconds ?? Infinity) > currentStartSeconds);

            return (
              <div
                key={chunk._key ?? index}
                className={`group flex items-start gap-4 p-3.5 transition-colors hover:bg-neutral-50 ${
                  isActive ? "bg-primary-50/50" : ""
                }`}
              >
                <Link
                  href={lessonHref(lessonSlug, seconds)}
                  onClick={() => {
                    posthog.capture("lesson_transcript_jump", {
                      lesson_slug: lessonSlug,
                      start_seconds: seconds,
                    });
                  }}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xs border border-neutral-300 bg-neutral-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-neutral-700 transition-colors group-hover:border-primary-500 group-hover:bg-primary-100 group-hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  <Play className="size-2.5 fill-current" aria-hidden />
                  <span>{timeFormatted}</span>
                </Link>

                <p className="min-w-0 flex-1 text-[14px] leading-6 text-neutral-800">
                  {chunk.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
