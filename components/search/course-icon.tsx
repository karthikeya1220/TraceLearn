import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface CourseIconProps {
  /** Sanity asset ref for the course cover. Falls back to an initial tile when absent. */
  iconRef: string | null;
  courseTitle: string;
  className?: string;
}

/** The small square course tile shown beside the course name on every search result. */
export function CourseIcon({ iconRef, courseTitle, className }: CourseIconProps) {
  const classes = cn("size-6 shrink-0 overflow-hidden rounded-none", className);

  if (!iconRef) {
    return (
      <span
        aria-hidden
        className={cn(
          classes,
          "flex items-center justify-center bg-neutral-900 text-[13px] leading-none font-extrabold text-white [font-stretch:112%]",
        )}
      >
        {courseTitle.charAt(0)}
      </span>
    );
  }

  return (
    <Image
      src={urlFor(iconRef).width(96).height(96).fit("crop").url()}
      alt=""
      width={48}
      height={48}
      className={cn(classes, "object-cover")}
    />
  );
}
