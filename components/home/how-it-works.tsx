import { ArrowRight, Compass, Search, Video } from "lucide-react";
import Link from "next/link";
import { searchHref } from "@/lib/routes";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Ask in Natural Language",
      description:
        "Type your technical question or bug description just like you would to a senior engineer. No rigid keyword matching required.",
      icon: Search,
      tag: "Plain English Query",
    },
    {
      number: "02",
      title: "Two-Stage Timestamp Resolution",
      description:
        "The engine checks video chapter markers first for clean topic boundaries, then scans audio transcript chunks as the deep backstop.",
      icon: Compass,
      tag: "GROQ + Sanity Context",
    },
    {
      number: "03",
      title: "Stream at the Exact Second",
      description:
        "Click the result to load the lesson video precisely at that timestamp, alongside synchronized implementation notes and code.",
      icon: Video,
      tag: "Direct Seek Playback",
    },
  ];

  return (
    <section className="border-t border-neutral-200 bg-surface px-6 py-16 sm:px-12 xl:px-18 xl:py-20">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-wider text-primary-600 uppercase">
            Simple 3-Step Workflow
          </p>
          <h2 className="mt-2 text-heading-1 text-neutral-900">
            How TraceLearn Works
          </h2>
        </div>
        <Link
          href={searchHref("")}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-600 hover:text-primary-700"
        >
          Try a sample search
          <ArrowRight className="size-4" strokeWidth={2} />
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-canvas p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[28px] font-extrabold text-neutral-300">
                    {step.number}
                  </span>
                  <span className="rounded-full border border-neutral-200 bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-neutral-600">
                    {step.tag}
                  </span>
                </div>

                <div className="mt-6 flex size-10 items-center justify-center rounded-lg border border-neutral-200 bg-surface text-neutral-900">
                  <Icon className="size-5 text-primary-600" strokeWidth={2} />
                </div>

                <h3 className="mt-4 text-[18px] font-bold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-neutral-600">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
