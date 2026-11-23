import Link from "next/link";
import { Sparkles } from "lucide-react";
import { searchHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

export const SUGGESTED_SEARCHES = [
  "Server Actions",
  "Data Fetching and Caching",
  "Zustand State Management",
  "App Router Routing",
  "Tailwind Architecture",
];

interface SearchSuggestionsProps {
  variant?: "hero" | "page";
  className?: string;
}

export function SearchSuggestions({ variant = "hero", className }: SearchSuggestionsProps) {
  const isHero = variant === "hero";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span
        className={cn(
          "flex items-center gap-1.5 text-[12px] font-semibold tracking-wider uppercase",
          isHero ? "text-white/80" : "text-neutral-500",
        )}
      >
        <Sparkles className="size-3.5" aria-hidden />
        Try searching:
      </span>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_SEARCHES.map((query) => (
          <Link
            key={query}
            href={searchHref(query)}
            className={cn(
              "rounded-full px-3 py-1 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isHero
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white"
                : "border border-neutral-300 bg-surface text-neutral-800 shadow-2xs hover:border-neutral-900 hover:bg-neutral-50 focus-visible:ring-primary-500",
            )}
          >
            {query}
          </Link>
        ))}
      </div>
    </div>
  );
}
