"use client";

import { CourseResumeLink } from "@/components/course/course-resume-link";
import { useLearnerProgress } from "@/components/progress/progress-provider";
import { cn } from "@/lib/utils";

interface CourseProgressBarProps {
  /** 0–100 initial/fallback value. */
  percentComplete?: number;
  /** Where "Continue Learning" goes — the resume position once progress exists. */
  continueHref: string | null;
  /** Carried onto the resume event. */
  courseSlug: string;
  /** Array of all lesson slugs belonging to this course to calculate live percentage. */
  lessonSlugs?: string[];
  className?: string;
}

/**
 * The bar pinned to the bottom of the course page. Dynamically computes completion
 * from the learner's progress.
 */
export function CourseProgressBar({
  percentComplete = 0,
  continueHref,
  courseSlug,
  lessonSlugs = [],
  className,
}: CourseProgressBarProps) {
  const { isCompleted } = useLearnerProgress();

  let livePercent = percentComplete;
  if (lessonSlugs.length > 0) {
    const completedCount = lessonSlugs.filter((s) => isCompleted(s)).length;
    livePercent = Math.round((completedCount / lessonSlugs.length) * 100);
  }

  const value = Math.min(100, Math.max(0, livePercent));

  return (
    <div
      className={cn(
        "sticky bottom-5 z-10 flex flex-col gap-5 rounded-none border border-neutral-900 bg-surface p-5 sm:flex-row sm:items-center sm:gap-8 sm:px-6 shadow-md",
        className,
      )}
    >
      <div className="shrink-0">
        <p className="text-[13px] leading-5 text-neutral-500">Your Progress</p>
        <p className="mt-1 text-[15px] leading-6 tabular-nums text-neutral-500">
          <span className="font-semibold text-neutral-900">{value}%</span>{" "}
          {value === 0 ? "— not started" : value === 100 ? "— completed" : "complete"}
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
        className="h-2 w-full max-w-80 overflow-hidden rounded-none bg-neutral-100 sm:mr-auto"
      >
        <div className="h-full rounded-none bg-primary-500 transition-all duration-300" style={{ width: `${value}%` }} />
      </div>

      {continueHref && (
        <CourseResumeLink
          href={continueHref}
          courseSlug={courseSlug}
          location="progress_bar"
          percentComplete={value}
          className="h-14 shrink-0 px-6 text-[16px]"
        />
      )}
    </div>
  );
}
