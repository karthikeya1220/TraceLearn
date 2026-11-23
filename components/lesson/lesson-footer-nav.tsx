"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import posthog from "posthog-js";
import type { CurriculumLesson } from "@/components/lesson/lesson-curriculum";
import { LessonFooterNavLink } from "@/components/lesson/lesson-footer-nav-link";
import { buttonClasses } from "@/components/ui/button";
import { formatDuration } from "@/lib/format";
import { lessonHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface LessonFooterNavProps {
  previous: CurriculumLesson | null;
  next: CurriculumLesson | null;
  /** The lesson being navigated away from, so the move has a direction in analytics. */
  currentLessonSlug: string;
  className?: string;
}

/** Moves through the curriculum in order: the lesson before and after this one, plus completion toggle. */
export function LessonFooterNav({
  previous,
  next,
  currentLessonSlug,
  className,
}: LessonFooterNavProps) {
  const [completed, setCompleted] = useState(false);

  const toggleComplete = () => {
    const nextState = !completed;
    setCompleted(nextState);
    posthog.capture("lesson_completion_toggled", {
      lesson_slug: currentLessonSlug,
      completed: nextState,
    });
  };

  return (
    <nav
      aria-label="Lesson navigation"
      className={cn(
        "flex flex-col justify-between gap-4 border-t border-neutral-900 bg-surface px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8",
        className,
      )}
    >
      {previous?.slug ? (
        <div className="flex items-center gap-5">
          <LessonFooterNavLink
            href={lessonHref(previous.slug)}
            fromLessonSlug={currentLessonSlug}
            toLessonSlug={previous.slug}
            direction="previous"
            className={buttonClasses({
              variant: "tertiary",
              className: "h-12 shrink-0 px-5 text-[15px]",
            })}
          >
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            Previous Lesson
          </LessonFooterNavLink>
          <span className="hidden min-w-0 lg:block">
            <span className="block truncate text-[14px] leading-5 text-neutral-900">
              {previous.title}
            </span>
            <span className="block text-[13px] leading-5 text-neutral-500">
              {formatDuration(previous.duration)}
            </span>
          </span>
        </div>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Completion Toggle */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={toggleComplete}
          aria-pressed={completed}
          className={cn(
            "flex h-12 items-center gap-2.5 rounded-none border px-5 text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
            completed
              ? "border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              : "border-neutral-900 bg-surface text-neutral-900 hover:bg-neutral-100",
          )}
        >
          {completed ? (
            <>
              <CheckCircle2 className="size-5 text-emerald-600" strokeWidth={2} aria-hidden />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Circle className="size-5 text-neutral-400" strokeWidth={2} aria-hidden />
              <span>Mark as Complete</span>
            </>
          )}
        </button>
      </div>

      {next?.slug ? (
        <div className="flex items-center gap-5 sm:justify-end">
          <span className="hidden min-w-0 text-right lg:block">
            <span className="block truncate text-[14px] leading-5 text-neutral-900">
              {next.title}
            </span>
            <span className="block text-[13px] leading-5 text-neutral-500">
              {formatDuration(next.duration)}
            </span>
          </span>
          <LessonFooterNavLink
            href={lessonHref(next.slug)}
            fromLessonSlug={currentLessonSlug}
            toLessonSlug={next.slug}
            direction="next"
            className={buttonClasses({
              className: cn(
                "h-12 shrink-0 px-5 text-[15px]",
                completed && "bg-primary-500 ring-2 ring-primary-500 ring-offset-2",
              ),
            })}
          >
            Next Lesson
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </LessonFooterNavLink>
        </div>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
