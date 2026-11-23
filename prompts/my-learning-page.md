# Implementation prompt: My Learning page (`/my-learning`)

## Goal

Build `/my-learning`, the primary authenticated destination learners reach from the site header's global navigation. When signed in, learners can view their enrolled/in-progress courses with completion percentages, active lessons, and a direct "Resume" affordance. For signed-out visitors, it provides an inviting prompt to sign in and save their progress.

Per AGENTS.md §1, §7, and §8:
- The My Learning page is presentational / display-focused for learner progress.
- It keys off the Clerk authentication state.
- It reuses existing CourseCard / card patterns, progress bars, and design tokens.

## Skills and docs read

- `AGENTS.md` — §1 (What you are building: "a My Learning page, learner progress tracking"), §3 (UI work: adapt desktop cleanly down to mobile, reuse existing Tailwind patterns), §5 (server/client boundaries: pages are read-only and display stored data), §7 ("Some surfaces are presentational only, with no backend of their own: the My Learning page... My Learning may read existing progress for display").
- Clerk Next.js documentation and `@clerk/nextjs` server components (`currentUser`, `auth`).
- `sanity/lib/queries.ts` and `sanityFetch`.

## Code inspected

- `components/layout/site-header.tsx` & `components/nav/navbar.tsx` — `activeHref="/my-learning"`, already pointing to `/my-learning`.
- `app/courses/page.tsx` & `components/cards/course-grid.tsx` — layout, grid structure, page frame, headers.
- `components/cards/course-card.tsx` — supports `layout="stacked"` and metadata formatting.
- `components/course/course-progress-bar.tsx` & `components/ui/progress-bar.tsx` — progress indicator components.
- `lib/routes.ts` — routing helpers (`myLearningHref`, `courseHref`, `lessonHref`).

## Decisions and assumptions

1. **Authentication Gate & Experience**:
   - In Next.js App Router, `/my-learning` checks Clerk auth using `@clerk/nextjs/server`.
   - If signed in: renders the learner's greeting, overview stats (courses in progress, lessons completed), and course cards with progress indicators and "Resume" buttons.
   - If signed out: renders a clean, focused prompt to sign in or create an account with Clerk `SignInButton` / `SignUpButton`, explaining that progress sync requires an account.
2. **Data & Progress**:
   - Fetches available courses from Sanity via `sanityFetch(COURSES_LIST_QUERY)`.
   - Until full database-backed progress records are written in the next gap implementation (`/api/progress`), it derives initial learner state safely (with mockable/in-memory or first-lesson fallback so it never crashes and shows a realistic UI with 0% or started state).
3. **Layout & Styling**:
   - Reuses `PageFrame`, `SiteHeader` (with `activeHref="/my-learning"`), Playfair Display headings, 12-column responsive layout, and dark neutral palette.
   - Empty state when no courses have been started, linking back to `/courses`.

## Files to touch

- `lib/routes.ts` — add `myLearningHref = "/my-learning"`.
- `app/my-learning/page.tsx` — new server component page for My Learning.
- `components/my-learning/my-learning-view.tsx` — UI component rendering enrolled courses, progress cards, resume buttons, or signed-out / empty states.

## Requirements

- Display page title "My Learning" with learner greeting if signed in.
- Render course cards with visual progress bars (`ProgressBar`) and "Resume" CTA linking to the appropriate lesson.
- Handle signed-out state gracefully without crashing or throwing middleware errors.
- Fully responsive across desktop (12-column grid), tablet, and mobile (stacked).

## Security considerations

- Clerk authentication handled server-side via `@clerk/nextjs/server`.
- No sensitive keys exposed to the client.

## Acceptance criteria

1. Navigating to `/my-learning` or clicking "My Learning" in the navbar opens the page (no 404).
2. "My Learning" navbar link is visually active (`activeHref="/my-learning"`).
3. Signed-out users see a clear sign-in call to action.
4. Signed-in users see their learning dashboard, courses with progress bars, and resume buttons.
5. All buttons and links lead to valid course and lesson routes.
6. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, and `npm run build`.

## Manual test steps

1. Navigate to `http://localhost:3000/my-learning`.
2. Confirm header marks "My Learning" as active.
3. Verify signed-out prompt renders.
4. Sign in (or simulate signed-in state) and verify course progress cards render with progress bars and "Resume" actions.
