import {
  BookOpen,
  CheckCircle,
  Code2,
  FileCode2,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { coursesHref } from "@/lib/routes";

export function FeatureBento() {
  return (
    <section className="px-6 py-20 sm:px-12 xl:px-18">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold tracking-wider text-primary-600 uppercase">
            Architected for Engineers
          </p>
          <h2 className="mt-2 text-heading-1 text-neutral-900">
            Everything you need to master code, minus the friction.
          </h2>
          <p className="mt-3 text-body-lg text-neutral-600">
            Most developer tutorials bury the crucial 30 seconds of code behind 45 minutes of
            filler. TraceLearn indexes curriculum video down to individual seconds.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Main Superpower (7 cols) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-surface p-8 shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md lg:col-span-7">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <PlayCircle className="size-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-heading-3 text-neutral-900">
                Direct-to-Second Video Intelligence
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-neutral-600">
                Never manually scrub video sliders again. Type your query in natural language and jump
                directly to the exact second where the code pattern is implemented.
              </p>
            </div>

            {/* Simulated audio waveform & seek timeline */}
            <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50/90 p-5">
              <div className="flex items-center justify-between text-[12px] font-medium text-neutral-600">
                <span className="flex items-center gap-1.5 font-semibold text-primary-600">
                  <span className="size-2 rounded-full bg-primary-500 animate-pulse" />
                  Query: &quot;How do I configure revalidateTag?&quot;
                </span>
                <span className="font-mono text-[11px] text-neutral-500">Hit found at 04:18</span>
              </div>

              {/* Waveform Visualization Bars */}
              <div className="mt-4 flex h-8 items-end gap-1 px-1">
                {[
                  25, 40, 65, 30, 80, 55, 90, 70, 45, 85, 95, 60, 40, 75, 90, 100, 80, 60, 40, 30,
                  50, 70, 85, 65, 45, 60, 80, 50, 35, 20, 40, 65, 55, 75, 90, 60, 45, 30, 50, 40,
                ].map((height, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${height}%` }}
                    className={`flex-1 rounded-full transition-colors ${
                      idx >= 14 && idx <= 18
                        ? "bg-primary-500"
                        : idx < 14
                          ? "bg-neutral-300"
                          : "bg-neutral-200"
                    }`}
                  />
                ))}
              </div>

              {/* Video Seek Scrubber */}
              <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div className="absolute top-0 bottom-0 left-0 w-[42%] bg-neutral-400" />
                <div className="absolute top-0 bottom-0 left-[42%] w-2 bg-primary-500 shadow-sm" />
              </div>

              {/* Chapters row */}
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-neutral-500">
                <span>00:00 Setup</span>
                <span className="rounded bg-primary-100 px-2 py-0.5 font-semibold text-primary-700">
                  04:18 Tag Revalidation
                </span>
                <span>12:40 Cache Purging</span>
              </div>
            </div>
          </div>

          {/* Card 2: 100% Grounded Search (5 cols) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-surface p-8 shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md lg:col-span-5">
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle className="size-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-heading-3 text-neutral-900">
                Grounded Truth, Not Hallucinations
              </h3>
              <p className="mt-2 text-[15px] leading-6 text-neutral-600">
                Search queries evaluate verified curriculum chapters and transcripts via GROQ. The
                AI only reports what is genuinely taught in the catalog.
              </p>
            </div>

            {/* GROQ Query Inspector Box */}
            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-[12px] text-neutral-300 shadow-inner">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[11px] text-neutral-500 uppercase">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Code2 className="size-3.5" />
                  Grounded GROQ Execution
                </span>
                <span className="text-neutral-400">Context MCP</span>
              </div>
              <pre className="mt-3 text-neutral-400">
                <span className="text-purple-400">*[_type</span> == <span className="text-emerald-300">&quot;video&quot;</span> &amp;&amp;
                {"\n"}  (chapters[].label <span className="text-blue-400">match</span> $term ||
                {"\n"}   chunks[].text <span className="text-blue-400">match</span> $term)]
                {"\n"}  [<span className="text-amber-400">0...5</span>]
              </pre>
              <div className="mt-3 flex items-center gap-2 border-t border-neutral-800/80 pt-2 text-[11px] text-emerald-400">
                <CheckCircle className="size-3" />
                <span>Verified against private Sanity dataset</span>
              </div>
            </div>
          </div>

          {/* Card 3: Synchronized Notes (4 cols) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-surface p-7 shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md lg:col-span-4">
            <div>
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FileCode2 className="size-4" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-[17px] font-bold text-neutral-900">
                Synchronized Code & Notes
              </h3>
              <p className="mt-1.5 text-[14px] leading-5 text-neutral-600">
                Portable Text notes alongside every video. Copy verified production-ready patterns
                directly while following the lesson.
              </p>
            </div>

            <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-3 font-mono text-[11px] text-neutral-700">
              <span className="text-primary-600 font-semibold">export async function</span>{" "}
              updatePost() &#123; ... &#125;
            </div>
          </div>

          {/* Card 4: Progress & Resume (4 cols) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-surface p-7 shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md lg:col-span-4">
            <div>
              <div className="flex size-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Sparkles className="size-4" strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-[17px] font-bold text-neutral-900">
                Automatic Progress & Resume
              </h3>
              <p className="mt-1.5 text-[14px] leading-5 text-neutral-600">
                Clerk authentication keeps your completed lessons and last playback seconds in sync
                across devices automatically.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-[12px]">
              <span className="font-medium text-neutral-700">Lesson 4.2 Completed</span>
              <span className="font-bold text-emerald-600">✓ Synced</span>
            </div>
          </div>

          {/* Card 5: Production Curricula (4 cols) */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-surface p-7 shadow-xs transition-all duration-200 hover:border-neutral-300 hover:shadow-md lg:col-span-4">
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
              className="mt-5 inline-flex items-center text-[12px] font-semibold text-primary-600 hover:underline"
            >
              Explore all courses →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
