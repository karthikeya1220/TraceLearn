# Implementation prompt: Instructor Profile Pages (`/instructors/[slug]`) & Course/Lesson Instructor Links

## Goal

Implement the dedicated instructor profile page at `/instructors/[slug]` and surface clickable instructor profiles on the Course Detail and Lesson pages, fulfilling AGENTS.md §8:
> *"An instructor has a name and slug, a photo, expertise, and a bio. Surface the instructor on the course and lesson, and give each instructor their own page."*

## Skills and docs read

- `AGENTS.md` — §1 (What you are building: "instructor pages"), §5 (Pages are read-only and display stored data), §8 ("Surface the instructor on the course and lesson, and give each instructor their own page"), §13, §14.
- Sanity queries: `INSTRUCTOR_BY_SLUG_QUERY`, `INSTRUCTORS_LIST_QUERY`, `sanityFetch`.
- Portable Text rendering for instructor bios using `@portabletext/react`.

## Code inspected

- `sanity/lib/queries.ts` — `INSTRUCTOR_BY_SLUG_QUERY` and `INSTRUCTORS_LIST_QUERY` already exist and are typed via TypeGen.
- `app/courses/[slug]/page.tsx` — fetches course with `instructorDetail` already populated.
- `components/course/course-hero.tsx` — where instructor metadata and link belong.
- `components/cards/course-grid.tsx` — reusable card grid for the instructor's taught courses.
- `lib/routes.ts` — needs `instructorHref(slug: string)`.

## Decisions and assumptions

1. **Routing**:
   - `/instructors/[slug]` dynamic server route.
   - `generateStaticParams()` using `INSTRUCTORS_LIST_QUERY`.
   - `notFound()` when instructor doesn't exist.
2. **Page Structure & Visual Hierarchy**:
   - Top breadcrumb: `All Courses` -> `Instructor: [Name]`.
   - Instructor Profile Hero: High-res circular/square avatar, instructor name (Playfair Display `text-display-2`), expertise tags (badges), and rich bio (Portable Text).
   - "Courses taught by [Name]": Uses the shared `CourseGrid` displaying all courses where `instructor._ref == instructor._id`.
   - Includes `ChartDecoration` and responsive layout identical to the rest of the application.
3. **Surfacing Instructor on Course Detail**:
   - Add instructor card / byline in `CourseHero` linking directly to `/instructors/[slug]`, showing avatar, name, and expertise.

## Files to touch

- `lib/routes.ts` — export `instructorHref(slug: string)`.
- `app/instructors/[slug]/page.tsx` — new server component page.
- `components/instructor/instructor-hero.tsx` — instructor profile header component (avatar, name, expertise badges, bio).
- `components/course/course-hero.tsx` — add instructor profile link and badge.

## Requirements

- Instructor bio rendered accurately via Portable Text.
- Courses taught by instructor displayed in responsive grid.
- Type-safe GROQ query result handling.
- Valid metadata generation (`generateMetadata`).

## Security considerations

- Server-side read-only queries with `sanityFetch`. No client-side tokens.

## Acceptance criteria

1. Navigating to `/instructors/[slug]` (e.g. for seeded instructors) renders their name, photo, bio, expertise tags, and taught courses.
2. Clicking the instructor on a course page navigates directly to their instructor page.
3. If an instructor has no courses, renders an appropriate message.
4. `npm run typecheck`, `npm run lint`, and `npm run build` pass with zero errors.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Visit a course page (e.g. `http://localhost:3000/courses/next-js-full-stack`).
2. Click the instructor link.
3. Verify `/instructors/[slug]` loads with avatar, bio, expertise tags, and courses taught.
4. Verify clicking any taught course navigates back to the course.
