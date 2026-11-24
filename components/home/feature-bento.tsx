import {
  BookOpen,
  CheckCircle,
  FileCode2,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { coursesHref } from "@/lib/routes";

export function FeatureBento() {
  return (
    <section className="px-6 py-16 sm:px-12 xl:px-18 xl:py-20">
      <div className="max-w-2xl">
        <p className="text-[12px] font-semibold tracking-wider text-primary-600 uppercase">
          Engineered for Deep Focus
        </p>
        <h2 className="mt-2 text-heading-1 text-neutral-900">
          Everything you need to master code, minus the friction.
        </h2>
        <p className="mt-3 text-body-lg text-neutral-600">
          Most developer tutorials hide the critical 30 seconds of implementation behind 45 minutes
          of fluff. TraceLearn indexes curriculum video down to individual seconds.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Card 1: Main Superpower (7 cols) */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-surface p-7 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md lg:col-span-7">
          <div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <PlayCircle className="size-5" strokeWidth={2} />
            </div>
            <h3 className="mt-5 text-heading-3 text-neutral-900">
              Direct-to-Second Video Intelligence
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-neutral-600">
              Never manually scrub video sliders again. Type your query and jump directly to the
              exact timestamp where the code pattern is implemented.
            </p>
          </div>

          {/* Simulated timeline UI */}
          <div className="mt-8 rounded-lg border border-neutral-200/90 bg-neutral-50/80 p-4">
            <div className="flex items-center justify-between text-[12px] font-medium text-neutral-500">
              <span className="flex items-center gap-1.5 font-semibold text-primary-600">
                <span className="size-2 rounded-full bg-primary-500 animate-pulse" />
                Query: &quot;How do I configure revalidateTag?&quot;
              </span>
              <span className="font-mono text-[11px] text-neutral-400">Match found: 04:18</span>
            </div>

            {/* Video seek timeline mock */}
            <div className="relative mt-3.5 h-3 w-full overflow-hidden rounded-full bg-neutral-200">
              <div className="absolute top-0 bottom-0 left-0 w-[42%] bg-neutral-300" />
              <div className="absolute top-0 bottom-0 left-[42%] w-1.5 bg-primary-500 shadow-sm" />
            </div>

            {/* Chapter markers */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
              <span>00:00 Intro</span>
              <span className="rounded bg-primary-100 px-1.5 py-0.5 font-semibold text-primary-700">
                04:18 On-Demand Revalidation
              </span>
              <span>12:40 Cache Tags</span>
            </div>
          </div>
        </div>

        {/* Card 2: 100% Grounded Search (5 cols) */}
        <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-surface p-7 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md lg:col-span-5">
          <div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle className="size-5" strokeWidth={2} />
            </div>
            <h3 className="mt-5 text-heading-3 text-neutral-900">
              Grounded in Truth, Not Hallucinations
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-neutral-600">
              Search results query verified course chapters and audio transcripts via GROQ. The AI
              only reports what is genuinely taught in the catalog.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2 rounded-lg border border-neutral-200/80 bg-neutral-50 p-4 text-[13px]">
            <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase">
              <span>Verification Pipeline</span>
              <span className="text-emerald-600">Sanity Context MCP</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <span className="font-mono text-[12px] text-primary-600 font-semibold">1.</span>
              <span>Evaluate curriculum chapters first</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <span className="font-mono text-[12px] text-primary-600 font-semibold">2.</span>
              <span>Fall back to timestamped transcript chunks</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <span className="font-mono text-[12px] text-primary-600 font-semibold">3.</span>
              <span>Generate verified lesson cards with exact seconds</span>
            </div>
          </div>
        </div>

        {/* Card 3: Synchronized Notes (4 cols) */}
        <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-surface p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md lg:col-span-4">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileCode2 className="size-4" strokeWidth={2} />
            </div>
            <h3 className="mt-4 text-[17px] font-bold text-neutral-900">
              Synchronized Code & Notes
            </h3>
            <p className="mt-1.5 text-[14px] leading-5 text-neutral-600">
              Portable Text notes alongside every lesson. Copy production-ready patterns directly
              while following the video.
            </p>
          </div>
          <div className="mt-4 text-[12px] font-medium text-primary-600">
            Rich markdown & code blocks →
          </div>
        </div>

        {/* Card 4: Progress & Resume (4 cols) */}
        <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-surface p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md lg:col-span-4">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Sparkles className="size-4" strokeWidth={2} />
            </div>
            <h3 className="mt-4 text-[17px] font-bold text-neutral-900">
              Seamless Progress & Resume
            </h3>
            <p className="mt-1.5 text-[14px] leading-5 text-neutral-600">
              Clerk authentication keeps your completed lessons and last playback seconds in sync
              across devices automatically.
            </p>
          </div>
          <div className="mt-4 text-[12px] font-medium text-primary-600">
            Multi-device state sync →
          </div>
        </div>

        {/* Card 5: Production Curricula (4 cols) */}
        <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-surface p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md lg:col-span-4">
          <div>
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <BookOpen className="size-4" strokeWidth={2} />
            </div>
            <h3 className="mt-4 text-[17px] font-bold text-neutral-900">
              Production Architecture
            </h3>
            <p className="mt-1.5 text-[14px] leading-5 text-neutral-600">
              Deep-dive modules covering Next.js, Sanity, AI integrations, caching, and database
              optimization from staff engineers.
            </p>
          </div>
          <Link
            href={coursesHref}
            className="mt-4 inline-flex items-center text-[12px] font-semibold text-primary-600 hover:underline"
          >
            Explore all courses →
          </Link>
        </div>
      </div>
    </section>
  );
}
