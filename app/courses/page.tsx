import type { Metadata } from "next";
import Link from "next/link";
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
  description: "Every course on Vertex, from first principles to production.",
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

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-heading-1 text-neutral-900 sm:text-display-2">All Courses</h1>
          {courses.length > 0 && (
            <p className="text-[13px] leading-5 tabular-nums text-neutral-500">
              {pluralize(filteredCourses.length, "course")}
            </p>
          )}
        </div>

        {categories.length > 0 && (
          <div className="mt-6">
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
          <p className="mt-8 text-[17px] leading-7 text-neutral-500">
            No courses found in this category.{" "}
            <Link
              href={coursesHref}
              className="rounded-xs text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              View all courses
            </Link>
            .
          </p>
        )}
      </main>

      <ChartDecoration />
    </PageFrame>
  );
}
