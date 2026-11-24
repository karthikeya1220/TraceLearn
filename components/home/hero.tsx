import { ArrowRight, Play, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/search/search-form";
import { SearchSuggestions } from "@/components/search/search-suggestions";
import { buttonClasses } from "@/components/ui/button";
import { coursesHref, searchHref } from "@/lib/routes";

export function Hero() {
  return (
    <section className="px-6 pt-12 pb-6 sm:px-12 sm:pt-16 xl:px-18 xl:pt-20">
      {/* SaaS Badge */}
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-surface px-3.5 py-1 text-[11px] font-semibold tracking-wider text-neutral-800 uppercase shadow-xs">
          <span className="flex size-2 rounded-full bg-primary-500 animate-pulse" />
          <span>TraceLearn 2.0</span>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-500">AI Video Timestamp Search</span>
        </div>
      </div>

      {/* Main SaaS Headline */}
      <h1 className="mt-6 max-w-[20ch] text-display-2 text-neutral-900 sm:text-display-1 lg:text-display-0">
        Search video lessons down to the exact second.
      </h1>

      <p className="mt-5 max-w-[56ch] text-body-lg text-neutral-600 sm:text-[19px] sm:leading-8">
        Stop scrubbing through hours of video tutorials. Ask technical questions in plain English
        and jump directly to the exact second where the implementation is taught.
      </p>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={coursesHref}
          className={buttonClasses({ size: "xl", className: "w-full sm:w-auto" })}
        >
          Explore Courses
          <ArrowRight className="size-5" strokeWidth={2} aria-hidden />
        </Link>
        <Link
          href={searchHref("How do I cache fetched data?")}
          className={buttonClasses({
            size: "xl",
            variant: "tertiary",
            className: "w-full gap-2 text-neutral-700 sm:w-auto",
          })}
        >
          <Sparkles className="size-4 text-primary-500" />
          <span>See Interactive Demo</span>
          <kbd className="hidden rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-mono text-neutral-500 md:inline-block">
            ⌘K
          </kbd>
        </Link>
      </div>

      {/* Elevated Search Command Console */}
      <div className="-mx-6 mt-12 rounded-2xl bg-gradient-to-b from-primary-500 to-primary-600 p-6 shadow-xl sm:-mx-12 sm:p-10 xl:-mx-18">
        <div className="flex items-center justify-between">
          <label
            htmlFor="home-search"
            className="flex items-center gap-2 text-[12px] font-semibold tracking-wider text-white uppercase"
          >
            <Terminal className="size-3.5 text-primary-200" />
            Natural Language Video Query
          </label>
          <span className="hidden text-[12px] font-medium text-white/80 sm:inline-block">
            Ground-truth search over chapters & transcripts
          </span>
        </div>

        <SearchForm
          id="home-search"
          size="lg"
          label="Ask anything about your learning"
          placeholder="e.g. how do I cache fetched data in Next.js?"
          className="mt-3.5 w-full"
        />

        <SearchSuggestions variant="hero" className="mt-4" />

        {/* Live-feel Product Preview Card */}
        <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/15">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary-600 shadow-xs">
                <Play className="size-4 fill-primary-600" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-white/20 px-2 py-0.5 text-[11px] font-bold tracking-wide text-white">
                    04:18
                  </span>
                  <span className="text-[13px] font-semibold text-white">
                    Route Segment & Fetch Caching
                  </span>
                  <span className="hidden text-[12px] text-white/70 sm:inline">
                    • Lesson 5.1 in Data Fetching
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-[12px] text-white/80">
                  &ldquo;...Next.js caches fetch requests automatically by default, but you can configure revalidation using revalidateTag...&rdquo;
                </p>
              </div>
            </div>

            <Link
              href={searchHref("how do I cache fetched data?")}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[12px] font-bold text-primary-600 shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
            >
              <span>Watch from 04:18</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
