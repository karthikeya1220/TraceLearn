import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { COURSE_SLUGS_QUERY, LESSON_SLUGS_QUERY } from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://tracelearn.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, lessons] = await Promise.all([
    sanityFetch({ query: COURSE_SLUGS_QUERY }).catch(() => []),
    sanityFetch({ query: LESSON_SLUGS_QUERY }).catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses
    .filter((course) => Boolean(course.slug))
    .map((course) => ({
      url: `${BASE_URL}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const lessonRoutes: MetadataRoute.Sitemap = lessons
    .filter((lesson) => Boolean(lesson.slug))
    .map((lesson) => ({
      url: `${BASE_URL}/lessons/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...courseRoutes, ...lessonRoutes];
}
