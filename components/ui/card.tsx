import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Shared card surface: refined border, ambient shadow, subtle micro-lift on hover. */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-neutral-200/90 bg-surface p-5 shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md",
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
