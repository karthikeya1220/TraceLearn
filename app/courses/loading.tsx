import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { coursesHref } from "@/lib/routes";

export default function CoursesLoading() {
  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div>
            <div className="h-10 w-48 animate-pulse rounded bg-neutral-200" />
            <div className="mt-2 h-4 w-96 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="h-6 w-20 animate-pulse rounded-full bg-neutral-200" />
        </div>

        <div className="mt-7 flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-neutral-200" />
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-surface shadow-xs"
            >
              <div className="aspect-16/9 w-full animate-pulse bg-neutral-200" />
              <div className="p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-neutral-200" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-neutral-200" />
                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
                  <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageFrame>
  );
}
