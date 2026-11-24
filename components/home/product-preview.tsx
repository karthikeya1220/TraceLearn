"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Play,
  Search,
  Sparkles,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { searchHref } from "@/lib/routes";

interface QueryPreset {
  id: string;
  tabLabel: string;
  query: string;
  courseTitle: string;
  lessonTitle: string;
  moduleLabel: string;
  timestamp: string;
  seconds: number;
  lessonSlug: string;
  transcriptQuote: string;
  highlightPhrase: string;
  codeSnippet: string;
  codeLanguage: string;
}

const PRESETS: QueryPreset[] = [
  {
    id: "nextjs-cache",
    tabLabel: "Next.js Caching",
    query: "How do I invalidate cached tags in Server Actions?",
    courseTitle: "Next.js 15 Fullstack Architecture",
    lessonTitle: "Route Segment Caching & Revalidation",
    moduleLabel: "Module 4 • Lesson 4.2",
    timestamp: "04:18",
    seconds: 258,
    lessonSlug: "data-fetching-and-caching",
    transcriptQuote:
      "When mutating data inside a Server Action, you must trigger revalidation of the specific tag so Next.js purges the Data Cache without dropping the entire page layout.",
    highlightPhrase: "revalidateTag('posts')",
    codeSnippet: `// Server Action: mutate & purge specific tag
'use server';
import { revalidateTag } from 'next/cache';

export async function updatePost(id: string, formData: FormData) {
  await db.posts.update({ where: { id }, data: { ... } });
  revalidateTag('posts'); // Instant purge of cached tag
}`,
    codeLanguage: "typescript",
  },
  {
    id: "sanity-types",
    tabLabel: "Sanity Schema Types",
    query: "How do I define typed Portable Text blocks in Sanity?",
    courseTitle: "Content Modeling & Sanity Studio",
    lessonTitle: "Strongly Typed Portable Text Objects",
    moduleLabel: "Module 2 • Lesson 2.3",
    timestamp: "08:42",
    seconds: 522,
    lessonSlug: "content-modeling",
    transcriptQuote:
      "By configuring defineType and defineField with strict TypeScript interfaces, Sanity TypeGen automatically exports full IntelliSense for all embedded rich text annotations.",
    highlightPhrase: "defineType({ name: 'blockContent' })",
    codeSnippet: `import { defineType, defineArrayMember } from 'sanity';

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({ type: 'block' }),
    defineArrayMember({ type: 'code' }),
  ],
});`,
    codeLanguage: "typescript",
  },
  {
    id: "clerk-auth",
    tabLabel: "Clerk Middleware",
    query: "How do I protect private routes with clerkMiddleware?",
    courseTitle: "Production Authentication with Clerk",
    lessonTitle: "Route Matchers & Session Validation",
    moduleLabel: "Module 3 • Lesson 3.1",
    timestamp: "02:15",
    seconds: 135,
    lessonSlug: "clerk-setup",
    transcriptQuote:
      "Using createRouteMatcher, you can isolate all dashboard and learning API endpoints, then call auth.protect() to redirect unauthenticated requests before execution.",
    highlightPhrase: "auth.protect()",
    codeSnippet: `import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/my-learning(.*)', '/api/progress(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});`,
    codeLanguage: "typescript",
  },
  {
    id: "optimistic-ui",
    tabLabel: "Optimistic UI",
    query: "How do I handle optimistic lesson completion updates?",
    courseTitle: "Interactive UI & Realtime State",
    lessonTitle: "Instant Checkmarks with useOptimistic",
    moduleLabel: "Module 5 • Lesson 5.4",
    timestamp: "06:30",
    seconds: 390,
    lessonSlug: "progress-tracking",
    transcriptQuote:
      "To avoid layout stutter while the server acknowledges progress writes, we apply useOptimistic so the checkmark flips green with zero perceptable network latency.",
    highlightPhrase: "useOptimistic(completed, ...)",
    codeSnippet: `const [optimisticState, setOptimistic] = useOptimistic(
  isCompleted,
  (current, update: boolean) => update
);

async function toggle() {
  setOptimistic(!isCompleted);
  await saveProgressAction(lessonId, !isCompleted);
}`,
    codeLanguage: "typescript",
  },
];

export function ProductPreview() {
  const [activePreset, setActivePreset] = useState<QueryPreset>(PRESETS[0]);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(activePreset.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full">
      {/* Query Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-6">
        <span className="hidden items-center gap-1.5 text-[12px] font-semibold text-neutral-500 sm:inline-flex">
          <Sparkles className="size-3.5 text-primary-500" />
          Test live query:
        </span>
        {PRESETS.map((preset) => {
          const isActive = preset.id === activePreset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setActivePreset(preset)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-150 active:scale-95 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "border border-neutral-200 bg-surface text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {preset.tabLabel}
            </button>
          );
        })}
      </div>

      {/* macOS / Linear-Style Window Frame */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-surface shadow-xl">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 bg-neutral-50/80 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
          </div>

          {/* Simulated URL / Search Query Display */}
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-neutral-200 bg-surface px-3 py-1.5 text-[12px] text-neutral-700 shadow-xs">
              <Search className="size-3.5 text-primary-500" />
              <span className="truncate font-medium">{activePreset.query}</span>
              <span className="ml-auto rounded bg-primary-50 px-1.5 py-0.2 text-[10px] font-bold text-primary-700">
                Grounded
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-[11px] font-medium text-neutral-400 md:flex">
            <span>TraceLearn Studio</span>
          </div>
        </div>

        {/* Window Body: Split Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Video Player Mockup (7 cols) */}
          <div className="flex flex-col justify-between border-b border-neutral-200/80 p-6 lg:col-span-7 lg:border-r lg:border-b-0 sm:p-8">
            <div>
              {/* Breadcrumb row */}
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-primary-600">
                  {activePreset.courseTitle}
                </span>
                <span className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600">
                  {activePreset.moduleLabel}
                </span>
              </div>

              <h3 className="mt-2 text-[18px] font-bold text-neutral-900 sm:text-[20px]">
                {activePreset.lessonTitle}
              </h3>

              {/* Video Player Frame */}
              <div className="group relative mt-5 aspect-video overflow-hidden rounded-xl bg-neutral-900 shadow-md">
                {/* Background visual texture */}
                <div className="absolute inset-0 bg-radial from-neutral-800 via-neutral-900 to-black opacity-90" />

                {/* Center play icon & matched second indicator */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary-500/90 text-white shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
                    <Play className="ml-1 size-6 fill-white" />
                  </div>
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[12px] font-mono font-bold text-white backdrop-blur-sm">
                    Direct Jump to {activePreset.timestamp}
                  </span>
                </div>

                {/* Bottom seek bar controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span>{activePreset.timestamp}</span>
                    <span className="text-white/60">14:20</span>
                  </div>
                  <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div className="absolute top-0 bottom-0 left-0 w-[35%] bg-primary-500" />
                    <div className="absolute top-0 bottom-0 left-[35%] size-3 -translate-y-0.75 rounded-full bg-white shadow-sm" />
                  </div>
                </div>

                {/* Top sound indicator */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 text-[11px] text-white/80 backdrop-blur-xs">
                  <Volume2 className="size-3.5" />
                  <span>Verified Audio</span>
                </div>
              </div>
            </div>

            {/* Jump CTA Link */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-[13px] text-neutral-500">
                Identified in course video transcript via GROQ
              </span>
              <Link
                href={searchHref(activePreset.query)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-[13px] font-semibold text-white shadow-xs transition-all hover:bg-primary-600 active:scale-95"
              >
                <span>Open Lesson at {activePreset.timestamp}</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right: Grounded Transcript & Code Snippet (5 cols) */}
          <div className="flex flex-col justify-between bg-neutral-900 p-6 text-white sm:p-8 lg:col-span-5">
            <div>
              {/* Transcript Match Box */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-emerald-400 uppercase">
                    <CheckCircle2 className="size-3.5" />
                    Exact Transcript Hit
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400">
                    t = {activePreset.seconds}s
                  </span>
                </div>

                <div className="mt-3 rounded-lg border border-neutral-700/80 bg-neutral-800/60 p-3.5 text-[13px] leading-relaxed text-neutral-200">
                  &ldquo;{activePreset.transcriptQuote}&rdquo;
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                    Implementation Code
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2.5 overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-950 p-4 font-mono text-[12px] leading-5 text-neutral-300">
                  <pre>{activePreset.codeSnippet}</pre>
                </div>
              </div>
            </div>

            {/* Grounding guarantee */}
            <div className="mt-6 border-t border-neutral-800 pt-4 text-[12px] text-neutral-400">
              <span className="text-white font-medium">100% Grounded:</span> Zero synthetic code. Sourced directly from lesson companion materials.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
