import Image from "next/image";
import Link from "next/link";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";
import { CourseCard } from "@/components/cards/course-card";
import { formatDuration, formatLevel, pluralize } from "@/lib/format";
import { courseHref } from "@/lib/routes";
import { urlFor } from "@/sanity/lib/image";

type Course = COURSES_LIST_QUERY_RESULT[number];

interface CourseGridProps {
  courses: Course[];
  /** Show only the first n courses — the home page previews a single row. */
  limit?: number;
}

/** The catalog card grid, shared by the home page preview and the full catalog. */
export function CourseGrid({ courses, limit }: CourseGridProps) {
  const visible = courses.filter((course) => course.slug !== null).slice(0, limit);

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((course) => {
        const coverImageUrl = course.coverImage?.asset
          ? urlFor(course.coverImage).width(720).height(405).fit("crop").auto("format").url()
          : null;

        const instructorPhoto = course.instructor?.photo
          ? urlFor(course.instructor.photo).width(64).height(64).fit("crop").auto("format").url()
          : null;

        return (
          <li key={course._id} className="flex min-w-0">
            <Link
              href={courseHref(course.slug as string)}
              className="flex min-w-0 flex-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              <CourseCard
                layout="stacked"
                title={course.title ?? ""}
                description={course.summary ?? ""}
                level={formatLevel(course.level) ?? ""}
                duration={formatDuration(course.durationSeconds) ?? ""}
                modules={course.moduleCount ? pluralize(course.moduleCount, "module") : ""}
                category={course.category?.title}
                popular={course.popular}
                instructor={
                  course.instructor?.name
                    ? {
                        name: course.instructor.name,
                        photo: instructorPhoto,
                      }
                    : undefined
                }
                coverImage={
                  coverImageUrl ? (
                    <Image
                      src={coverImageUrl}
                      alt={course.coverImage?.alt ?? course.title ?? "Course cover image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  ) : undefined
                }
                className="min-w-0 flex-1"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
