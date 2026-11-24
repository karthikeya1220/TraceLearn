import { CheckCircle2, FastForward, Layers, Users } from "lucide-react";

export function MetricsStrip() {
  const metrics = [
    {
      value: "100%",
      label: "Grounded Truth",
      description: "Zero AI hallucinations. Sourced strictly from verified lesson transcripts.",
      icon: CheckCircle2,
    },
    {
      value: "< 1s",
      label: "Instant Seek",
      description: "Two-stage chapter & transcript resolution directly to the second.",
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
    <section className="border-y border-neutral-200 bg-surface px-6 py-12 sm:px-12 xl:px-18">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-[12px] font-semibold tracking-wider text-neutral-500 uppercase">
            Platform Capabilities & Verified Quality
          </p>
          <span className="text-[12px] text-neutral-500">
            Trusted by self-directed software engineers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col justify-between rounded-lg border border-neutral-200/80 bg-canvas p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[32px] font-extrabold tracking-tight text-neutral-900 tabular-nums">
                    {metric.value}
                  </span>
                  <div className="flex size-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
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
