"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRight, BookOpen } from "lucide-react";
import type { COURSES_LIST_QUERY_RESULT } from "@/sanity.types";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLearnerProgress } from "@/components/progress/progress-provider";
import { coursesHref, courseHref } from "@/lib/routes";
import { formatDuration, formatLevel, pluralize } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";

type Course = COURSES_LIST_QUERY_RESULT[number];

interface MyLearningViewProps {
  user: {
    firstName?: string | null;
    fullName?: string | null;
    imageUrl?: string | null;
  } | null;
  courses: Course[];
}

export function MyLearningView({ user, courses }: MyLearningViewProps) {
  const { completedLessons } = useLearnerProgress();

  // If user is signed out, prompt them to sign in to access and track their learning
  if (!user) {
    return (
      <div className="mx-auto my-12 max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-neutral-900 bg-primary-100 text-primary-500 shadow-sm">
          <BookOpen className="size-8" strokeWidth={2} />
        </div>
        <h2 className="mt-6 text-heading-2 text-neutral-900">Track your progress</h2>
        <p className="mt-3 text-body-lg text-neutral-600">
          Sign in to your TraceLearn account to resume courses right where you left off, access bookmarked lessons, and view your completed topics.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <SignInButton mode="modal">
            <Button size="lg" className="min-w-32">
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="secondary" size="lg" className="min-w-32">
              Create account
            </Button>
          </SignUpButton>
        </div>
      </div>
    );
  }

  // Active courses enrolled / in progress
  const validCourses = courses.filter((c) => c.slug !== null);

  if (validCourses.length === 0) {
    return (
      <div className="my-12 text-center">
        <p className="text-body-lg text-neutral-500">You haven&apos;t enrolled in any courses yet.</p>
        <Link href={coursesHref} className="mt-4 inline-block">
          <Button size="md">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-10">
      {/* Quick stats banner */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200/90 bg-surface p-5 shadow-xs">
          <div className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider">
            Enrolled Courses
          </div>
          <div className="mt-2 text-heading-2 text-neutral-900">{validCourses.length}</div>
        </div>
        <div className="rounded-lg border border-neutral-200/90 bg-surface p-5 shadow-xs">
          <div className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider">
            Completed Lessons
          </div>
          <div className="mt-2 flex items-center gap-2 text-heading-2 text-neutral-900">
            <span>{completedLessons.size}</span>
            <span className="text-small font-normal text-neutral-500">lessons</span>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200/90 bg-surface p-5 shadow-xs">
          <div className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider">
            Learning Status
          </div>
          <div className="mt-2 flex items-center gap-2 text-heading-3 text-warning">
            <span className="size-2.5 rounded-full bg-warning" />
            <span>{completedLessons.size > 0 ? "Active Learner" : "Getting Started"}</span>
          </div>
        </div>
      </div>

      {/* Courses in progress list */}
      <div>
        <h2 className="text-heading-3 text-neutral-900">In Progress</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {validCourses.map((course) => {
            return (
              <Card key={course._id} className="flex flex-col justify-between gap-5 p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    {course.coverImage?.asset ? (
                      <Image
                        src={urlFor(course.coverImage).width(128).height(128).fit("crop").url()}
                        alt={course.coverImage.alt ?? ""}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-[24px] font-extrabold text-white">
                        {course.title?.charAt(0) ?? "C"}
                      </span>
                    )}
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                      {formatLevel(course.level)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-heading-3 text-neutral-900 line-clamp-1">{course.title}</h3>
                    <p className="mt-1 text-small text-neutral-500 line-clamp-2">{course.summary}</p>
                  </div>
                </div>

                <CardFooter className="flex-col items-stretch gap-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-center justify-between text-small text-neutral-500">
                    <span>{pluralize(course.lessonCount ?? 0, "lesson")}</span>
                    <span>{formatDuration(course.durationSeconds)}</span>
                  </div>
                  <Link
                    href={courseHref(course.slug as string)}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    <span>Continue Learning</span>
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
