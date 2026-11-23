import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { CourseGrid } from "@/components/cards/course-grid";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { Hero } from "@/components/home/hero";
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
        <Hero />

        <section className="px-6 pt-14 pb-16 sm:px-12 xl:px-18 xl:pt-16 xl:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-heading-1 text-neutral-900">All Courses</h2>
            <Link
              href={coursesHref}
              className="inline-flex items-center gap-2 rounded-none text-body font-semibold text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              View all courses
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>

          <div className="mt-8">
            <CourseGrid courses={courses} limit={FEATURED_COURSE_COUNT} />
          </div>

          <p className="mt-16 flex items-center gap-5 text-body-lg text-neutral-700">
            <span className="hidden h-px flex-1 bg-neutral-900 sm:block" />
            <Star className="size-5 shrink-0 text-primary-500" strokeWidth={2} aria-hidden />
            <span className="text-center">New courses and lessons added every week.</span>
            <span className="hidden h-px flex-1 bg-neutral-900 sm:block" />
          </p>
        </section>

        <ChartDecoration className="mt-auto" />
      </main>
    </PageFrame>
  );
}
