import type { Metadata } from "next";
import Link from "next/link";
import { FolderClosed } from "lucide-react";
import { ViewTracker } from "@/components/analytics/view-tracker";
import { CourseGrid } from "@/components/cards/course-grid";
import { CategoryFilter } from "@/components/course/category-filter";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { pluralize } from "@/lib/format";
import { coursesHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_LIST_QUERY, COURSES_LIST_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Every course on TraceLearn, from first principles to production.",
};

interface CoursesPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const rawCat = Array.isArray(params.category) ? params.category[0] : params.category;
  const activeCategory = rawCat?.trim() || null;

  const [courses, categories] = await Promise.all([
    sanityFetch({
      query: COURSES_LIST_QUERY,
      tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
    }),
    sanityFetch({
      query: CATEGORIES_LIST_QUERY,
      tags: [CACHE_TAGS.course],
    }),
  ]);

  const filteredCourses = activeCategory
    ? courses.filter((course) => course.category?.slug === activeCategory)
    : courses;

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <ViewTracker
        event={ANALYTICS_EVENTS.catalogViewed}
        properties={{ course_count: courses.length, filtered_count: filteredCourses.length }}
      />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs items={[{ label: "All Courses" }]} />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h1 className="text-heading-1 text-neutral-900 sm:text-display-2">All Courses</h1>
            <p className="mt-2 text-body text-neutral-600 max-w-xl">
              In-depth engineering courses taught from first principles. Complete with timestamped video lessons, practical notes, and resources.
            </p>
          </div>
          {courses.length > 0 && (
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-surface px-3 py-1 text-[13px] font-medium tabular-nums text-neutral-600 shadow-2xs">
              {pluralize(filteredCourses.length, "course")}
            </span>
          )}
        </div>

        {categories.length > 0 && (
          <div className="mt-7">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              totalCourses={courses.length}
            />
          </div>
        )}

        {filteredCourses.length > 0 ? (
          <div className="mt-8">
            <CourseGrid courses={filteredCourses} />
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-surface px-6 py-16 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
              <FolderClosed className="size-6" strokeWidth={1.75} />
            </div>
            <h3 className="text-heading-3 text-neutral-900">No courses in this category</h3>
            <p className="mt-1.5 max-w-sm text-body text-neutral-500">
              We haven&apos;t added any courses for this topic yet. Check back soon or explore our other curriculum.
            </p>
            <Link
              href={coursesHref}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-small font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              View all courses
            </Link>
          </div>
        )}
      </main>

      <ChartDecoration />
    </PageFrame>
  );
}
