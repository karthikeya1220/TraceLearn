import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { coursesHref, searchHref } from "@/lib/routes";

export function CtaBanner() {
  return (
    <section className="px-6 py-16 sm:px-12 xl:px-18 xl:py-20">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900 px-8 py-14 text-white shadow-xl sm:px-14 sm:py-18">
        {/* Subtle decorative glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-primary-600/15 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
              <Sparkles className="size-3.5 text-primary-300" />
              Direct Timestamp Learning
            </span>
            <h2 className="mt-4 text-display-2 text-white sm:text-display-1">
              Stop scrubbing. Start mastering.
            </h2>
            <p className="mt-3 text-[16px] leading-7 text-neutral-300">
              Join engineers learning from first principles to production with natural language
              video search. Browse full curricula or dive straight into specific code snippets.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-[13px] text-neutral-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary-400" />
                Free preview lessons included
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary-400" />
                Interactive code notes
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={coursesHref}
              className={buttonClasses({
                size: "xl",
                variant: "primary",
                className: "w-full justify-center shadow-lg sm:w-auto",
              })}
            >
              Explore All Courses
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href={searchHref("")}
              className={buttonClasses({
                size: "xl",
                variant: "tertiary",
                className: "w-full justify-center border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 sm:w-auto",
              })}
            >
              Try Instant Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
