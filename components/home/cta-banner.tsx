import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { coursesHref, searchHref } from "@/lib/routes";

export function CtaBanner() {
  return (
    <section className="px-6 py-20 sm:px-12 xl:px-18">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 px-8 py-16 text-white shadow-2xl sm:px-16 sm:py-20">
          {/* Subtle decorative radial light */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-primary-600/15 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
                <Sparkles className="size-3.5 text-primary-300" />
                Direct Timestamp Learning
              </span>
              <h2 className="mt-4 text-display-2 text-white sm:text-display-1">
                Stop scrubbing. Start building.
              </h2>
              <p className="mt-3 text-[16px] leading-7 text-neutral-300">
                Join self-directed engineers mastering full-stack architecture with natural language
                video search. Browse full curricula or jump straight to working code.
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
                  Interactive companion notes
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <Link
                href={coursesHref}
                className={buttonClasses({
                  size: "xl",
                  variant: "primary",
                  className: "w-full justify-center shadow-lg sm:w-auto",
                })}
              >
                <span>Explore All Courses</span>
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href={searchHref("")}
                className={buttonClasses({
                  size: "xl",
                  variant: "tertiary",
                  className:
                    "w-full justify-center border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700 sm:w-auto",
                })}
              >
                <span>Try Instant Search</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
