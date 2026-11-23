"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useLearnerProgress } from "@/components/progress/progress-provider";
import { cn } from "@/lib/utils";
import posthog from "posthog-js";

interface LessonCompletionToggleProps {
  lessonSlug: string;
  className?: string;
}

export function LessonCompletionToggle({
  lessonSlug,
  className,
}: LessonCompletionToggleProps) {
  const { isCompleted, toggleCompleted, isLoading } = useLearnerProgress();
  const completed = isCompleted(lessonSlug);

  const handleClick = async () => {
    await toggleCompleted(lessonSlug);
    posthog.capture(completed ? "lesson_marked_incomplete" : "lesson_completed", {
      lesson_slug: lessonSlug,
      surface: "lesson_header_toggle",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-pressed={completed}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        completed
          ? "border border-success/30 bg-success/10 text-success hover:bg-success/20"
          : "border border-neutral-300 bg-surface text-neutral-700 hover:border-neutral-900 hover:bg-neutral-50 shadow-2xs",
        className,
      )}
    >
      {completed ? (
        <>
          <CheckCircle2 className="size-4 shrink-0 text-success fill-success/20" />
          <span>Completed</span>
        </>
      ) : (
        <>
          <Circle className="size-4 shrink-0 text-neutral-400" />
          <span>Mark as complete</span>
        </>
      )}
    </button>
  );
}
