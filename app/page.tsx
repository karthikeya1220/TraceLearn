import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { CourseGrid } from "@/components/cards/course-grid";
import { CtaBanner } from "@/components/home/cta-banner";
import { FeatureBento } from "@/components/home/feature-bento";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { Testimonials } from "@/components/home/testimonials";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { coursesHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";

/** The section is a preview beside "View all courses", so it shows the first row only. */
const FEATURED_COURSE_COUNT = 3;

export default async function Home() {
  const courses = await sanityFetch({
    query: COURSES_LIST_QUERY,
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  return (
    <PageFrame>
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        {/* Editorial Hero with Interactive macOS-style Product Preview */}
        <Hero />

        {/* Hairline-Divided Enterprise Metrics Strip */}
        <MetricsStrip />

        {/* 12-Column Modern SaaS Feature Bento */}
        <FeatureBento />

        {/* 3-Step Interactive Learning Workflow */}
        <HowItWorks />

        {/* Engineer Testimonials & Social Proof */}
        <Testimonials />

        {/* Featured Production Curricula */}
        <section className="border-t border-neutral-200/80 px-6 pt-16 pb-16 sm:px-12 xl:px-18 xl:pt-20 xl:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold tracking-wider text-primary-600 uppercase">
                  Curated Learning Paths
                </p>
                <h2 className="mt-2 text-heading-1 text-neutral-900">
                  Featured Engineering Curricula
                </h2>
                <p className="mt-2 max-w-xl text-body text-neutral-600">
                  Complete production-grade courses with modular video lessons, downloadable code,
                  and direct-to-second searchable transcripts.
                </p>
              </div>

              <Link
                href={coursesHref}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-surface px-4 py-2.5 text-[14px] font-semibold text-neutral-900 shadow-xs transition-all hover:border-neutral-300 hover:bg-neutral-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <BookOpen className="size-4 text-primary-600" />
                <span>Browse All {courses.length} Courses</span>
                <ArrowRight className="size-4 text-neutral-500" strokeWidth={2} aria-hidden />
              </Link>
            </div>

            <div className="mt-10">
              <CourseGrid courses={courses} limit={FEATURED_COURSE_COUNT} />
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-surface p-6 shadow-xs sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="flex size-2 rounded-full bg-emerald-500" />
                <p className="text-[14px] text-neutral-700">
                  <span className="font-semibold text-neutral-900">Continuous Curriculum:</span> New
                  deep-dive modules and verified lessons indexed weekly.
                </p>
              </div>
              <Link
                href={coursesHref}
                className="text-[13px] font-semibold text-primary-600 hover:text-primary-700"
              >
                See all modules & curriculum breakdown →
              </Link>
            </div>
          </div>
        </section>

        {/* High-Conversion SaaS CTA Banner */}
        <CtaBanner />
      </main>
    </PageFrame>
  );
}
