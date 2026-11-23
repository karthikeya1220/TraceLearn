import type { ReactNode } from "react";
import Image from "next/image";
import { BarChart3, Clock, FolderClosed } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CourseCardLayout = "row" | "stacked";

export interface CourseCardInstructor {
  name?: string | null;
  photo?: string | null;
}

export interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  category?: string | null;
  popular?: boolean | null;
  instructor?: CourseCardInstructor | null;
  /** Full 16:9 banner cover image rendered at top of card */
  coverImage?: ReactNode;
  /** Square brand tile shown with the title (legacy / row layout). */
  logo?: ReactNode;
  /** `row` puts the logo beside the title; `stacked` is modern 16:9 banner card. */
  layout?: CourseCardLayout;
  className?: string;
}

type MetaProps = Pick<CourseCardProps, "level" | "duration" | "modules"> & {
  /** The stacked card spreads the row across a narrow column, so it runs tighter. */
  tight?: boolean;
};

function Meta({ level, duration, modules, tight = false }: MetaProps) {
  const item = `inline-flex items-center whitespace-nowrap font-sans tabular-nums text-neutral-500 ${
    tight ? "gap-1.5 text-[12px] leading-4" : "text-small gap-2"
  }`;
  const icon = `text-neutral-500 ${tight ? "size-3.5 shrink-0" : "size-4 shrink-0"}`;

  return (
    <>
      {level && (
        <span className={item}>
          <BarChart3 className={icon} strokeWidth={2} aria-hidden />
          {level}
        </span>
      )}
      {duration && (
        <span className={item}>
          <Clock className={icon} strokeWidth={2} aria-hidden />
          {duration}
        </span>
      )}
      {modules && (
        <span className={item}>
          <FolderClosed className={icon} strokeWidth={2} aria-hidden />
          {modules}
        </span>
      )}
    </>
  );
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  modules,
  category,
  popular,
  instructor,
  coverImage,
  logo,
  layout = "row",
  className,
}: CourseCardProps) {
  const fallbackLogo = (size: string) => (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-none bg-neutral-900 leading-none font-extrabold text-white [font-stretch:125%]",
        size,
      )}
    >
      {title.charAt(0)}
    </span>
  );

  const fallbackBanner = (
    <div className="flex size-full items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-950 p-6">
      <div className="flex size-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-2xl font-black text-white backdrop-blur-xs">
        {title.charAt(0)}
      </div>
    </div>
  );

  if (layout === "stacked") {
    return (
      <div
        className={cn(
          "group flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-surface shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg",
          className,
        )}
      >
        {/* 16:9 Cover Image Banner */}
        <div className="relative aspect-16/9 w-full overflow-hidden border-b border-neutral-100 bg-neutral-100">
          {coverImage ?? fallbackBanner}

          {/* Popular Tag */}
          {popular && (
            <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-neutral-900/85 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-xs backdrop-blur-xs">
              Popular
            </span>
          )}

          {/* Category Tag */}
          {category && (
            <span className="absolute bottom-3 left-3 z-10 inline-flex items-center rounded-md border border-white/40 bg-white/95 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-neutral-800 uppercase shadow-xs backdrop-blur-xs">
              {category}
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="min-w-0 flex-1">
            <h3 className="text-[17px] leading-snug font-bold text-neutral-900 transition-colors group-hover:text-primary-600 line-clamp-1">
              {title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-600 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Instructor & Meta Footer */}
          <div className="mt-5 border-t border-neutral-100 pt-4">
            {instructor?.name && (
              <div className="flex items-center gap-2.5 pb-3">
                {instructor.photo ? (
                  <Image
                    src={instructor.photo}
                    alt={instructor.name}
                    width={24}
                    height={24}
                    className="size-6 shrink-0 rounded-full border border-neutral-200 object-cover"
                  />
                ) : (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-[11px] font-semibold text-neutral-600">
                    {instructor.name.charAt(0)}
                  </span>
                )}
                <span className="text-[13px] font-medium text-neutral-700 line-clamp-1">
                  {instructor.name}
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-neutral-100/70 pt-3">
              <Meta level={level} duration={duration} modules={modules} tight />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("gap-5", className)}>
      <div className="flex items-start gap-4">
        {logo ?? fallbackLogo("size-12 rounded-md text-[22px]")}
        <div className="min-w-0">
          <h3 className="text-heading-3 text-neutral-900">{title}</h3>
          <p className="mt-1 text-body text-neutral-500">{description}</p>
        </div>
      </div>
      <CardFooter className="justify-start gap-5 pt-0">
        <Meta level={level} duration={duration} modules={modules} />
      </CardFooter>
    </Card>
  );
}
