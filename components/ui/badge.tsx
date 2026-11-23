import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "video" | "lesson" | "popular";

const variants: Record<BadgeVariant, string> = {
  video: "bg-neutral-900 text-white border border-neutral-800 shadow-xs",
  lesson: "bg-primary-50 text-primary-700 border border-primary-200/80",
  popular: "border border-amber-200 bg-amber-50/70 text-amber-800",
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
        "inline-flex w-fit items-center rounded-sm px-2.5 py-0.5 text-[11px] leading-4 font-semibold uppercase tracking-[0.06em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
