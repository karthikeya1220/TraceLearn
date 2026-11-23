import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { INSTRUCTOR_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

type Instructor = NonNullable<INSTRUCTOR_BY_SLUG_QUERY_RESULT>;

interface InstructorHeroProps {
  instructor: Instructor;
}

export function InstructorHero({ instructor }: InstructorHeroProps) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
      {instructor.photo?.asset ? (
        <Image
          src={urlFor(instructor.photo).width(360).height(360).fit("crop").url()}
          alt={instructor.photo.alt ?? instructor.name ?? "Instructor photo"}
          width={180}
          height={180}
          priority
          className="size-36 shrink-0 rounded-2xl border border-neutral-900 object-cover shadow-xs sm:size-44"
        />
      ) : (
        <div className="flex size-36 shrink-0 items-center justify-center rounded-2xl border border-neutral-900 bg-neutral-900 text-[48px] font-extrabold text-white sm:size-44">
          {instructor.name?.charAt(0) ?? "I"}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h1 className="text-heading-1 text-neutral-900 sm:text-display-2">
          {instructor.name}
        </h1>

        {instructor.expertise && instructor.expertise.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {instructor.expertise.map((skill) => (
              <span
                key={skill}
                className="inline-flex w-fit items-center rounded-sm border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 text-[11px] leading-4 font-semibold uppercase tracking-[0.06em] text-neutral-800"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {instructor.bio && (
          <div className="prose prose-neutral mt-6 max-w-[65ch] text-body-lg text-neutral-700">
            {/* PortableText expects any[] for blockContent */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PortableText value={instructor.bio as any} />
          </div>
        )}
      </div>
    </div>
  );
}
