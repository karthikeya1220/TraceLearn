import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ProductPreview } from "@/components/home/product-preview";
import { SearchForm } from "@/components/search/search-form";
import { buttonClasses } from "@/components/ui/button";
import { coursesHref, searchHref } from "@/lib/routes";

export function Hero() {
  return (
    <section className="relative px-6 pt-16 pb-12 sm:px-12 sm:pt-20 xl:px-18">
      {/* Background radial gradient accent (subtle ambient light) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex justify-center overflow-hidden"
      >
        <div className="h-[450px] w-[800px] rounded-full bg-gradient-to-b from-primary-500/10 via-primary-500/5 to-transparent blur-3xl" />
      </div>

      {/* Centered Editorial Hero Header */}
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Shimmer Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-surface/90 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-800 uppercase shadow-xs backdrop-blur-sm">
          <span className="flex size-2 rounded-full bg-primary-500 animate-pulse" />
          <span>TraceLearn 2.0</span>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-500">The Video Search Engine for Developers</span>
        </div>

        {/* Display Headline */}
        <h1 className="mt-7 text-display-2 text-neutral-900 sm:text-display-1 lg:text-display-0">
          Search video lessons down to the exact second.
        </h1>

        {/* Subhead */}
        <p className="mt-5 max-w-2xl text-body-lg text-neutral-600 sm:text-[19px] sm:leading-8">
          Query 50+ hours of software curriculum in plain English. TraceLearn&apos;s grounded AI
          scans transcripts down to the millisecond so you jump directly to working code.
        </p>

        {/* Action Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={coursesHref}
            className={buttonClasses({
              size: "xl",
              variant: "primary",
              className: "w-full gap-2 shadow-sm sm:w-auto",
            })}
          >
            <span>Explore Courses</span>
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
          </Link>
          <Link
            href={searchHref("")}
            className={buttonClasses({
              size: "xl",
              variant: "tertiary",
              className: "w-full gap-2 sm:w-auto",
            })}
          >
            <Sparkles className="size-4 text-primary-500" />
            <span>Search Curriculum</span>
            <kbd className="hidden rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-mono text-neutral-500 md:inline-block">
              ⌘K
            </kbd>
          </Link>
        </div>

        {/* Direct Search Bar */}
        <div className="mt-8 w-full max-w-xl">
          <SearchForm
            id="hero-quick-search"
            size="md"
            label="Search lessons by topic or question"
            placeholder="Ask anything: e.g. how do I revalidate cached tags?"
            className="w-full shadow-xs"
          />
        </div>
      </div>

      {/* Interactive Product Showcase Window */}
      <div className="mt-14 w-full">
        <ProductPreview />
      </div>
    </section>
  );
}
