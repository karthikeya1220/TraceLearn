import { cn } from "@/lib/utils";

/** Relative bar heights, in the two clusters either side of a gap. */
const clusters = [
  [58, 76, 92, 70, 50],
  [62, 78, 96, 66, 84],
];

interface ChartDecorationProps {
  className?: string;
}

/**
 * Flat ink bars cropped by the bottom of the page — a data-poster footer motif.
 * Hard edges, no blur, no gradient. Exactly one bar is cobalt. Purely decorative.
 */
export function ChartDecoration({ className }: ChartDecorationProps) {
  return (
    <div
      aria-hidden
      className={cn("relative h-40 overflow-hidden sm:h-50", className)}
    >
      <div className="absolute inset-x-0 bottom-0 flex h-full items-end px-6 sm:px-10">
        {clusters.map((bars, cluster) => (
          <div
            key={cluster}
            className={cn("flex h-full flex-1 items-end gap-2", cluster === 1 && "ml-[18%]")}
          >
            {bars.map((height, index) => (
              <div
                key={index}
                style={{ height: `${height}%` }}
                className={cn(
                  "flex-1 bg-neutral-900",
                  cluster === 0 && index === 2 && "bg-primary-500",
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
