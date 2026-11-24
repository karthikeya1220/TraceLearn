import { CheckCircle2, FastForward, Layers, Users } from "lucide-react";

export function MetricsStrip() {
  const metrics = [
    {
      value: "100%",
      label: "Grounded Accuracy",
      description: "Zero AI hallucinations. Sourced strictly from verified video transcripts.",
      icon: CheckCircle2,
    },
    {
      value: "< 1s",
      label: "Direct Seek Time",
      description: "Two-stage chapter & transcript resolution down to the exact second.",
      icon: FastForward,
    },
    {
      value: "50+ hrs",
      label: "Production Content",
      description: "Curated architectures built by staff software engineers.",
      icon: Layers,
    },
    {
      value: "12,000+",
      label: "Timestamps Indexed",
      description: "Granular video moments across modern full-stack systems.",
      icon: Users,
    },
  ];

  return (
    <section className="border-y border-neutral-200/80 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-12 xl:px-18">
        {/* Subtle credibility banner */}
        <div className="flex flex-col items-center justify-between gap-3 pb-8 text-center sm:flex-row sm:text-left">
          <p className="text-[12px] font-semibold tracking-wider text-neutral-500 uppercase">
            Platform Benchmarks & Verified Precision
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Verified Sanity Context MCP
            </span>
            <span>•</span>
            <span>Clerk Protected State</span>
            <span>•</span>
            <span>Zero Hallucination Guarantee</span>
          </div>
        </div>

        {/* Hairline-Divided Metric Row */}
        <div className="grid grid-cols-1 divide-y divide-neutral-200/80 border-t border-neutral-200/80 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="flex flex-col justify-between p-6 transition-colors hover:bg-neutral-50/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[36px] font-extrabold tracking-tight text-neutral-900 tabular-nums">
                    {metric.value}
                  </span>
                  <div className="flex size-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                    <Icon className="size-4" strokeWidth={2} aria-hidden />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-[15px] font-semibold text-neutral-900">
                    {metric.label}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-neutral-600">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
