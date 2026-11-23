import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Shared card surface: paper-white, 1px ink rule, zero radius, no shadow. */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-none border border-neutral-900 bg-surface p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Meta row pinned to the bottom of a card, separated from the body. */
export function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn("mt-auto flex items-center justify-between gap-4 pt-5", className)}>
      {children}
    </div>
  );
}
