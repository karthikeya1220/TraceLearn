import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/search/search-form";
import { SearchSuggestions } from "@/components/search/search-suggestions";
import { buttonClasses } from "@/components/ui/button";

/**
 * Poster hero: flush-left type on paper, then one full-bleed cobalt band carrying the
 * search field — the product's core action, and this page's single color moment.
 */
export function Hero() {
  return (
    <section className="px-6 pt-14 pb-0 sm:px-12 sm:pt-16 xl:px-18 xl:pt-20">
      <p className="w-fit rounded-full border border-neutral-200 bg-surface px-3 py-1 text-[11px] leading-4 font-semibold tracking-[0.06em] text-neutral-700 uppercase shadow-xs">
        Intelligent Learning Platform
      </p>

      <h1 className="mt-7 max-w-[18ch] text-display-2 text-neutral-900 sm:text-display-1 lg:text-display-0">
        Search your learning in plain English.
      </h1>

      <p className="mt-5 max-w-[50ch] text-body-lg text-neutral-600 sm:text-[18px] sm:leading-7">
        Find the exact lesson that answers your question — down to the exact second it is
        taught.
      </p>

      <Link
        href="/courses"
        className={buttonClasses({ size: "xl", className: "mt-8 w-full sm:w-auto" })}
      >
        Explore Courses
        <ArrowRight className="size-5" strokeWidth={2} aria-hidden />
      </Link>

      <div className="-mx-6 mt-12 rounded-xl bg-gradient-to-b from-primary-500 to-primary-600 p-6 shadow-md sm:-mx-12 sm:p-10 xl:-mx-18">
        <div className="flex items-center justify-between">
          <label
            htmlFor="home-search"
            className="block text-[12px] leading-4 font-semibold tracking-[0.08em] text-white/90 uppercase"
          >
            Ask anything across courses & lessons
          </label>
          <span className="hidden text-[12px] font-medium text-white/70 sm:inline-block">
            Jump directly to video timestamps
          </span>
        </div>
        <SearchForm
          id="home-search"
          size="lg"
          label="Ask anything about your learning"
          placeholder="e.g. how do I cache fetched data?"
          className="mt-3.5 w-full"
        />
        <SearchSuggestions variant="hero" className="mt-4" />
      </div>
    </section>
  );
}
