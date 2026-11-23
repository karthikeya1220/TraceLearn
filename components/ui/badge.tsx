import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "video" | "lesson" | "popular";

const variants: Record<BadgeVariant, string> = {
  video: "bg-neutral-900 text-white font-semibold",
  lesson: "bg-lesson-bg text-lesson-fg font-semibold",
  popular: "border border-neutral-900 bg-transparent text-primary-600 font-semibold",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "video", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-none px-2 py-1 text-[12px] leading-4 font-semibold uppercase tracking-[0.08em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
