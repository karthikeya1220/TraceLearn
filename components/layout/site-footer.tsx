import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { coursesHref, myLearningHref, searchHref } from "@/lib/routes";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-neutral-900 bg-canvas px-6 py-12 sm:px-12 xl:px-18">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
        {/* Brand & Mission */}
        <div className="flex max-w-sm flex-col gap-4">
          <Link
            href="/"
            className="w-fit rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <Logo size={24} />
          </Link>
          <p className="text-[14px] leading-6 text-neutral-600">
            Intelligent AI-powered learning platform with direct timestamp video search. Learn
            from first principles to production.
          </p>
          <p className="text-[12px] leading-5 text-neutral-400">
            © {currentYear} Vertex. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-12 sm:gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold tracking-wider text-neutral-900 uppercase">
              Platform
            </span>
            <ul className="flex flex-col gap-2.5 text-[14px] text-neutral-600">
              <li>
                <Link
                  href={coursesHref}
                  className="transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href={myLearningHref}
                  className="transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  My Learning
                </Link>
              </li>
              <li>
                <Link
                  href={searchHref("")}
                  className="transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  Search Lessons
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold tracking-wider text-neutral-900 uppercase">
              Authoring
            </span>
            <ul className="flex flex-col gap-2.5 text-[14px] text-neutral-600">
              <li>
                <Link
                  href="/studio"
                  className="transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  Sanity Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/design-system"
                  className="transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  Design System
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
