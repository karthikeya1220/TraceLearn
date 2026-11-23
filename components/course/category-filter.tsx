import Link from "next/link";
import { coursesHref } from "@/lib/routes";
import { cn } from "@/lib/utils";

export interface CategoryItem {
  _id: string;
  title: string | null;
  slug: string | null;
  courseCount: number | null;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: string | null;
  totalCourses: number;
}

export function CategoryFilter({
  categories,
  activeCategory,
  totalCourses,
}: CategoryFilterProps) {
  const isAll = !activeCategory;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* "All" Option */}
      <Link
        href={coursesHref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
          isAll
            ? "bg-neutral-900 text-white"
            : "border border-neutral-300 bg-surface text-neutral-700 hover:border-neutral-900 hover:bg-neutral-50",
        )}
      >
        <span>All</span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.2 text-[11px] tabular-nums",
            isAll ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-600",
          )}
        >
          {totalCourses}
        </span>
      </Link>

      {/* Category Pills */}
      {categories
        .filter((cat) => cat.slug !== null)
        .map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <Link
              key={cat._id}
              href={`${coursesHref}?category=${cat.slug}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                isActive
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-300 bg-surface text-neutral-700 hover:border-neutral-900 hover:bg-neutral-50",
              )}
            >
              <span>{cat.title}</span>
              {cat.courseCount !== null && cat.courseCount > 0 && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[11px] tabular-nums",
                    isActive ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-600",
                  )}
                >
                  {cat.courseCount}
                </span>
              )}
            </Link>
          );
        })}
    </div>
  );
}
