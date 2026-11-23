import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { PageFrame } from "@/components/layout/page-frame";
import { SiteHeader } from "@/components/layout/site-header";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { ChartDecoration } from "@/components/home/chart-decoration";
import { MyLearningView } from "@/components/my-learning/my-learning-view";
import { myLearningHref } from "@/lib/routes";
import { CACHE_TAGS, sanityFetch } from "@/sanity/lib/fetch";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "My Learning",
  description: "Your enrolled courses, active lessons, and learning progress on TraceLearn.",
};

export default async function MyLearningPage() {
  const clerkUser = await currentUser();

  const user = clerkUser
    ? {
        firstName: clerkUser.firstName,
        fullName: clerkUser.fullName,
        imageUrl: clerkUser.imageUrl,
      }
    : null;

  const courses = await sanityFetch({
    query: COURSES_LIST_QUERY,
    tags: [CACHE_TAGS.course, CACHE_TAGS.lesson],
  });

  return (
    <PageFrame>
      <SiteHeader activeHref={myLearningHref} />

      <main className="flex flex-1 flex-col px-6 pt-11 pb-16 sm:px-12 xl:px-18 xl:pb-20">
        <Breadcrumbs items={[{ label: "My Learning" }]} />

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-heading-1 text-neutral-900 sm:text-display-2">
            {user?.firstName ? `Welcome back, ${user.firstName}` : "My Learning"}
          </h1>
          <p className="text-[13px] leading-5 text-neutral-500">
            {user ? "Your learning dashboard & progress" : "Sign in to resume courses"}
          </p>
        </div>

        <MyLearningView user={user} courses={courses} />
      </main>

      <ChartDecoration />
    </PageFrame>
  );
}
