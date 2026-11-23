# Implementation prompt: Course Cover Images and Premium UI Presentation

## Goal

Elevate the course browsing experience across the catalog (`/courses`), homepage (`/`), and instructor pages by replacing the tiny square logo placeholder with rich 16:9 aspect-ratio cover image banners, prominent category and popular badges, instructor attribution (avatar + name), crisp metadata hierarchy (duration, lessons, level), and Linear/Vercel-inspired UI polish with subtle micro-interactions.

## Skills and docs read

- `AGENTS.md` — §2 (implementation workflow: prompt, approval, report), §3 (UI work: responsive, reuse Tailwind patterns, polish), §8 (course content model: coverImage, instructor, category, modules, lessons, duration, popular, level), §13 (checks: typecheck, lint, build).
- User UI Design Rules — Linear/Vercel/Notion aesthetic: minimal but not empty, dense but not cluttered, strong visual hierarchy, subtle borders and modern elevation, micro-interactions (hover zoom, smooth transitions), accessible contrast, complete states (default, hover, active, empty).

## Code inspected

- `components/cards/course-grid.tsx` — Currently sizes cover images down to a 72x72 square icon passed as `logo` inside a `stacked` card, ignoring the rich 16:9 1600x900 cover art available in Sanity.
- `components/cards/course-card.tsx` — Supports `row` and `stacked` layouts, but `stacked` puts the image inside the card body padding with a text initial fallback, lacking a full-bleed banner treatment, instructor attribution, or category badges.
- `sanity/lib/queries.ts` — `COURSES_LIST_QUERY` already projects:
  - `coverImage` (Sanity asset with alt)
  - `category` (`{ title, slug }`)
  - `instructor` (`{ name, slug, photo }`)
  - `popular` (boolean)
  - `level` (Beginner, Intermediate, Advanced)
  - `durationSeconds` (summed video duration)
  - `moduleCount` and `lessonCount`
  - `studentCount`
- `app/courses/page.tsx` — Catalog page layout, breadcrumbs, title, category filters, and grid.
- `app/page.tsx` — Homepage preview section using `CourseGrid`.
- `components/course/category-filter.tsx` — Category pills filter.
- `next.config.ts` — Already configures `cdn.sanity.io` for Next.js image optimization.

## Decisions and assumptions

1. **CourseCard Banner Cover Layout (`layout="stacked"`)**:
   - Introduce a full-width 16:9 banner container (`aspect-video` / `aspect-16/9`) at the top of each card with `overflow-hidden`.
   - Render the real Sanity `coverImage` using Next.js `<Image>` with `urlFor(coverImage).width(720).height(405).fit("crop").url()`.
   - Add hover image micro-interaction: smooth zoom `group-hover:scale-105 transition-transform duration-300 ease-out`.
   - Elegant fallback banner when no image asset is available (curated subtle dark gradient with category/title initial).
2. **Badges & Visual Hierarchy**:
   - Category pill: prominent text or subtle badge above the title with refined typography (`text-[12px] font-semibold tracking-wide text-primary-600 uppercase`).
   - "Popular" badge: sleek, translucent dark pill (`bg-neutral-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full`) positioned over the top-right of the cover image.
   - Title: bold, confident heading (`text-[17px] font-bold text-neutral-900 leading-snug line-clamp-1 group-hover:text-primary-600 transition-colors`).
   - Summary: clamp to 2 lines (`text-[14px] leading-relaxed text-neutral-600 line-clamp-2 mt-2`).
3. **Instructor & Metadata Footer**:
   - Include instructor photo (28x28 circular avatar with Sanity image url) and instructor name.
   - Divided metadata row with crisp icons: duration (`Clock`), module/lesson count (`FolderClosed`), and difficulty level (`BarChart3`).
4. **Card Container & Elevation**:
   - Replace the generic blue tint hover (`hover:bg-primary-100`) with modern, tactile card elevation: `border border-neutral-200/90 bg-surface rounded-xl shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300 transition-all duration-200`.
   - Group wrapper (`group`) for coordinated hover states across image, title, and borders.
5. **Enhanced Catalog Presentation (`app/courses/page.tsx`)**:
   - Add a refined subtitle under "All Courses" explaining the curriculum.
   - Polish spacing (`gap-6` or `gap-7` grid on desktop).
   - Enterprise-grade empty state when filtering yields no results (search icon, clear title, contextual explanation, and a "Clear category filter" button).
6. **Backwards Compatibility**:
   - Preserve existing `layout="row"` in `CourseCard` so `app/design-system/page.tsx` continues to render cleanly without breakage.

## Files expected to touch

- `components/cards/course-card.tsx`
- `components/cards/course-grid.tsx`
- `app/courses/page.tsx`
- `prompts/courses-ui-presentation-and-cover-images.md` (this prompt)

## Requirements

- Full 16:9 cover images must display for all courses on `/courses`, `/`, and instructor pages.
- Visuals must align with Senior Product Designer design rules (clean, minimal, confident typography, subtle elevation).
- Clean responsive behavior across mobile (1 column), tablet (2 columns), and desktop (3 columns).
- Zero TypeScript or lint errors.

## Security considerations

- Images use existing Next.js `<Image>` loader with whitelisted Sanity CDN origin (`cdn.sanity.io`).
- All data fetching remains server-side.

## Acceptance criteria

- Every course in the grid renders with its 16:9 cover image, category badge, title, summary, instructor avatar, and meta stats.
- Hovering over a course card smoothly elevates the card and subtly scales the cover image.
- Category filters work seamlessly with smooth visual transitions.
- `npm run typecheck` and `npm run lint` pass without errors.

## Checks to run

1. `npm run typecheck`
2. `npm run lint`
3. Inspect rendered HTML and UI via dev server.

## Manual test steps

1. Navigate to `http://localhost:3000/courses` in browser.
2. Confirm 16:9 cover images are visible on all 10 cards with instructor attribution and metadata.
3. Test hover effects on cards (micro-lift and image zoom).
4. Filter by categories (e.g., "Web Development", "AI Engineering", "Security") and verify filtered views.
5. Visit `http://localhost:3000/` and verify homepage preview cards match the new presentation.
