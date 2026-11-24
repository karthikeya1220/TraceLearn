import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "TraceLearn completely replaced scrubbing through 40-minute tutorials. I asked how to configure route segment cache tags and jumped straight to the exact 45 seconds of implementation.",
      author: "Marcus Chen",
      role: "Staff Frontend Architect",
      company: "Next.js Ecosystem",
      avatar: "MC",
    },
    {
      quote:
        "The grounded search is unmatched. It doesn't synthesize hallucinated code; it actually pulls up the exact course video and verified companion code notes.",
      author: "Elena Rostova",
      role: "Lead Fullstack Engineer",
      company: "Enterprise Cloud",
      avatar: "ER",
    },
    {
      quote:
        "Being able to resume on mobile at the exact second I left off on my laptop makes continuing deep architecture lessons effortless.",
      author: "Devon Reed",
      role: "Principal Systems Designer",
      company: "Modern SaaS Platform",
      avatar: "DR",
    },
  ];

  return (
    <section className="border-t border-neutral-200/80 bg-neutral-50/50 px-6 py-20 sm:px-12 xl:px-18">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <p className="text-[12px] font-semibold tracking-wider text-primary-600 uppercase">
            Built for Engineers
          </p>
          <h2 className="mt-2 text-heading-2 text-neutral-900 sm:text-heading-1">
            Loved by developers who value their time.
          </h2>
          <p className="mt-3 max-w-xl text-body text-neutral-600">
            See how senior engineers use TraceLearn to bypass tutorial fluff and build production
            systems faster.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-surface p-7 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
            >
              <div>
                {/* 5 stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4 text-[14px] leading-6 text-neutral-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary-100 font-mono text-[12px] font-bold text-primary-700">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-neutral-900">{t.author}</h4>
                  <p className="text-[11px] text-neutral-500">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
