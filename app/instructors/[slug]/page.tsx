import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseGrid } from "@/components/cards/course-grid";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { InstructorHero } from "@/components/instructor/instructor-hero";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { coursesHref } from "@/lib/routes";
import { pluralize } from "@/lib/format";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { INSTRUCTOR_BY_SLUG_QUERY, INSTRUCTORS_LIST_QUERY } from "@/sanity/lib/queries";

async function getInstructor(slug: string) {
  return sanityFetch({
    query: INSTRUCTOR_BY_SLUG_QUERY,
    params: { slug },
    tags: [CACHE_TAGS.course],
  });
}

export async function generateStaticParams() {
  const instructors = await sanityFetch({
    query: INSTRUCTORS_LIST_QUERY,
    tags: [CACHE_TAGS.course],
  });

  return instructors
    .filter((inst) => inst.slug !== null)
    .map((inst) => ({ slug: inst.slug as string }));
}

interface InstructorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: InstructorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const instructor = await getInstructor(slug);

  if (!instructor) return {};

  return {
    title: instructor.name ?? "Instructor",
    description: `Courses and profile for ${instructor.name ?? "instructor"} on Vertex.`,
  };
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { slug } = await params;
  const instructor = await getInstructor(slug);

  if (!instructor) notFound();

  const courses = instructor.courses ?? [];

  return (
    <PageFrame>
      <SiteHeader activeHref={coursesHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs
          items={[
            { label: "All Courses", href: coursesHref },
            { label: instructor.name ?? "Instructor" },
          ]}
        />

        <div className="mt-10">
          <InstructorHero instructor={instructor} />
        </div>

        <div className="mt-14 border-t border-neutral-200 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="text-heading-2 text-neutral-900">
              Courses by {instructor.name}
            </h2>
            {courses.length > 0 && (
              <p className="text-[13px] leading-5 tabular-nums text-neutral-500">
                {pluralize(courses.length, "course")}
              </p>
            )}
          </div>

          <div className="mt-8">
            {courses.length > 0 ? (
              <CourseGrid courses={courses} />
            ) : (
              <p className="text-body-lg text-neutral-500">
                No courses published by this instructor yet.
              </p>
            )}
          </div>
        </div>
      </main>

      <ChartDecoration />
    </PageFrame>
  );
}
