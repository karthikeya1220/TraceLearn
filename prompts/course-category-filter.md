# Implementation prompt: Category Filter on Courses Catalog (`/courses`)

## Goal

Add category filtering to `/courses` so learners can filter the course library by domain (e.g. "All", "Frontend", "Backend", "Full Stack", etc.):
- Utilize the existing `CATEGORIES_LIST_QUERY` in Sanity.
- Pass category slugs via URL query parameter (`/courses?category=slug`) to preserve shareable URLs, bookmarking, and native browser back/forward history.
- Render clean, accessible category filter pills with active state indicators and course counts.

## Skills and docs read

- `AGENTS.md` — §3 (UI work: reuse existing Tailwind patterns), §5 (server components, server-side Sanity fetch), §7, §8 ("A category has a title and slug and a description"), §13, §14.
- `sanity/lib/queries.ts` — `CATEGORIES_LIST_QUERY` and `COURSES_LIST_QUERY`.

## Code inspected

- `sanity/lib/queries.ts`: `CATEGORIES_LIST_QUERY` is already defined and typed.
- `app/courses/page.tsx`: currently fetches all courses and renders `CourseGrid`.
- `components/cards/course-grid.tsx`: renders the list of courses.

## Decisions and assumptions

1. **State & Routing**:
   - `searchParams.category` is the single source of truth for the active filter.
   - Default is "All", showing all courses.
2. **Filtering Logic**:
   - Filter courses server-side in `CoursesPage` matching `course.category?.slug === activeCategory`.
3. **UI Presentation**:
   - Add a row of pill buttons directly under the "All Courses" heading: "All ([total])", followed by each category name and count.
   - Highlight active pill with dark neutral or primary background.

## Files to touch

- `components/course/category-filter.tsx` — new component rendering category pills.
- `app/courses/page.tsx` — fetch categories, read `searchParams`, filter course list, and render `CategoryFilter`.

## Requirements

- Accessible links with `aria-current="page"` or active state.
- Empty state if a selected category has 0 courses, offering a link back to all courses.
- Mobile friendly wrapping.

## Security considerations

- Read-only data queries with `sanityFetch`.

## Acceptance criteria

1. Category pills render on `/courses`.
2. Clicking a category filters the grid to courses belonging to that category and updates the URL to `/courses?category=...`.
3. "All" resets the filter.
4. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Go to `http://localhost:3000/courses`.
2. Click any category pill.
3. Observe the grid filter immediately and the URL reflect `?category=slug`.
4. Click "All" to restore the full catalog.
