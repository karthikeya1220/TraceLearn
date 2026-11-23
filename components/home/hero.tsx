import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/search/search-form";
import { buttonClasses } from "@/components/ui/button";

/**
 * Poster hero: flush-left type on paper, then one full-bleed cobalt band carrying the
 * search field — the product's core action, and this page's single color moment.
 */
export function Hero() {
  return (
    <section className="px-6 pt-14 pb-0 sm:px-12 sm:pt-16 xl:px-18 xl:pt-20">
      <p className="w-fit bg-neutral-900 px-3 py-1.5 text-[12px] leading-4 font-semibold tracking-[0.08em] text-white uppercase">
        Intelligent learning
      </p>

      <h1 className="mt-8 max-w-[18ch] text-display-2 text-neutral-900 sm:text-display-1 lg:text-display-0">
        Search your learning in plain English.
      </h1>

      <p className="mt-6 max-w-[52ch] text-body-lg text-neutral-700 sm:text-[19px] sm:leading-7">
        Find the exact lesson that answers your question — down to the second it is
        taught.
      </p>

      <Link
        href="/courses"
        className={buttonClasses({ size: "xl", className: "mt-9 w-full sm:w-auto" })}
      >
        Explore Courses
        <ArrowRight className="size-5" strokeWidth={2} aria-hidden />
      </Link>

      <div className="-mx-6 mt-12 bg-primary-500 px-6 pt-7 pb-8 sm:-mx-12 sm:px-12 sm:pt-9 sm:pb-10 xl:-mx-18 xl:px-18">
        <label
          htmlFor="home-search"
          className="block text-[12px] leading-4 font-semibold tracking-[0.08em] text-white/80 uppercase"
        >
          Ask anything about your learning
        </label>
        <SearchForm
          id="home-search"
          size="lg"
          label="Ask anything about your learning"
          placeholder="e.g. how do I cache fetched data?"
          className="mt-4 w-full"
        />
      </div>
    </section>
  );
}
