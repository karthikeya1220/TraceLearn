import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * The framed page column: a fixed-width sheet of paper centred in the viewport, with a
 * 1px ink rule on both edges. Flat — no stripes, no texture. Separation is rules only.
 */
export function PageFrame({ children, className }: PageFrameProps) {
  return (
    <div className={cn("flex flex-1 justify-center bg-canvas", className)}>
      <div className="flex w-full max-w-360 flex-col bg-canvas min-[1441px]:border-x min-[1441px]:border-neutral-900">
        {children}
      </div>
    </div>
  );
}
