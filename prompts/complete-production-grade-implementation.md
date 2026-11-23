# Implementation prompt: Complete Production-Grade Implementation for TraceLearn

## Goal

Transform TraceLearn into a complete, robust, production-grade AI learning platform according to the specifications in `AGENTS.md` by delivering:
1. **Intelligent Search Grounding & Video Ingestion**:
   - Import the Sanity Context document (`vertex-search.ndjson`) to configure the Context MCP scope and instructions.
   - Ingest YouTube video transcripts and chapter markers into Sanity `video` documents so grounded timestamp seeking works.
   - Set `SANITY_CONTEXT_MCP_URL` in `.env.local` to enable the AI search API.
2. **Learner Progress Tracking System**:
   - Implement server route `POST /api/progress` and `GET /api/progress` authenticated via Clerk (`auth()`).
   - Persist completed lessons and last watched resume positions keyed by the Clerk `userId`.
   - Wire `LessonSidebar`, `CourseProgressBar`, `CourseResumeLink`, and `MyLearningView` to display live completion marks, real progress percentages, and seamless resume links.
3. **SEO, Resilience & Skeletons**:
   - Dynamic `app/sitemap.ts` and `app/robots.ts` indexing all courses, lessons, and instructors.
   - Loading skeleton screens (`loading.tsx`) and error boundaries (`error.tsx`, `not-found.tsx`) for instant visual feedback.

## Skills and docs read

- `AGENTS.md` — §1 (scope: content, auth, catalog, detail, lesson, instructor, My Learning, progress tracking, analytics, ingestion, search config, search experience), §5 (server/client boundaries), §7 (progress tracking & grounded search), §8 (content modeling & progress records), §9 (video ingestion pipeline), §10 (search config document), §11 (search behavior), §12 (security & tokens), §13 (checks).
- User UI Design Rules — Vercel/Linear polish, WCAG contrast, complete component states (default, hover, active, loading, empty, error), strong visual hierarchy.

## Code inspected

- `studio/scripts/context/vertex-search.ndjson` — Ready for Sanity CLI import to create `agentContext.vertex-search`.
- `studio/scripts/ingest/` — Ingestion runner (`ingest-videos.mjs`), chunking logic (`chunk.mjs`), and builder (`build-ndjson.mjs`).
- `studio/node_modules` — Needs installation via `npm install` so Sanity CLI binary exists for the ingestion script.
- `app/api/search/route.ts` — Requires `SANITY_CONTEXT_MCP_URL` and `GEMINI_API_KEY`.
- `components/lesson/lesson-sidebar.tsx` — Contains commented placeholders ready to receive `completedLessonSlugs`.
- `components/course/course-progress-bar.tsx` — Accepts `percentComplete` and `continueHref`.
- `components/my-learning/my-learning-view.tsx` — Contains enrollment and progress stats calculation ready for live data.
- `lib/analytics/events.ts` — Existing events for video progress milestones.

## Decisions and assumptions

1. **Search Context & Ingestion**:
   - Run `npm run context:import` in `studio` to seed `agentContext.vertex-search`.
   - Install dependencies in `studio` (`npm install --prefer-offline --no-audit`) so the ingest script can query lesson URLs via Sanity CLI.
   - Run `node scripts/ingest/ingest-videos.mjs` and `npm run ingest:build` + `npm run ingest:import` to populate real `video` documents.
   - Set `SANITY_CONTEXT_MCP_URL=https://api.sanity.io/v2026-03-03/context/mcp/wbh0kqse/production/vertex-search` in `.env.local`.
2. **Progress Storage Architecture**:
   - Keyed strictly by Clerk `userId`.
   - Server route `POST /api/progress` verifies user authentication with Clerk `auth()`.
   - Store progress records reliably in an HTTP-only persistent cookie or session/file fallback on the server, with optional Sanity persistence if write permissions exist, ensuring seamless local development and zero client-side direct writes.
   - Expose `GET /api/progress` returning `{ completedLessons: string[], lastPlayedLesson: { lessonSlug: string, courseSlug: string, timestamp: number } | null }`.
3. **Progress UI Wiring**:
   - Create a React client hook / context `useLearnerProgress` to synchronise progress optimistically and provide `isLessonCompleted(slug)` and `toggleLessonCompleted(slug)`.
   - Add an interactive "Mark as Completed" button on the lesson page.
   - Connect `useWatchDepth` to automatically record progress when a user watches 90% of a lesson.
4. **Resilience & SEO**:
   - Add `app/sitemap.ts` querying courses, lessons, and instructors from Sanity with `sanityFetch`.
   - Add `app/robots.ts` defining search bot directives.
   - Add `app/courses/loading.tsx`, `app/courses/[slug]/loading.tsx`, and `app/lessons/[slug]/loading.tsx` displaying tailored skeletons matching the real card grids and video players.

## Files expected to touch

- `studio/scripts/context/vertex-search.ndjson` (imported via CLI)
- `.env.local`
- `app/api/progress/route.ts` (new)
- `lib/progress.ts` (new)
- `components/progress/progress-provider.tsx` (new)
- `components/lesson/lesson-sidebar.tsx`
- `components/lesson/lesson-completion-toggle.tsx` (new)
- `components/course/course-hero.tsx` & `components/course/course-progress-bar.tsx`
- `components/my-learning/my-learning-view.tsx`
- `app/sitemap.ts` (new)
- `app/robots.ts` (new)
- `app/courses/loading.tsx` (new)
- `app/courses/[slug]/loading.tsx` (new)
- `app/lessons/[slug]/loading.tsx` (new)
- `prompts/complete-production-grade-implementation.md` (this prompt)

## Requirements

1. Search Context document imported and `SANITY_CONTEXT_MCP_URL` set.
2. Real `video` documents ingested into Sanity.
3. Learner progress tracked per Clerk user, with interactive completion toggling and live progress bars.
4. Dynamic sitemap and robots.txt generated.
5. Loading skeletons provided for course catalog, course detail, and lesson views.
6. TypeScript and ESLint checks pass with zero errors.

## Security considerations

- Progress writes strictly gated by Clerk `auth()`.
- Browser never writes directly to Sanity.
- MCP and Gemini keys remain server-only.

## Acceptance criteria

- `sanity documents query '{"context": count(*[_type == "sanity.agentContext"]), "videos": count(*[_type == "video"])}'` reports positive counts.
- `GET` and `POST` `/api/progress` allow logged-in learners to toggle lesson completion.
- Course progress bars and sidebar checkmarks update dynamically.
- `http://localhost:3000/sitemap.xml` and `http://localhost:3000/robots.txt` return valid XML/text.
- `npm run typecheck` and `npm run lint` pass cleanly.

## Checks to run

1. `cd studio && npm run context:import`
2. `cd studio && node scripts/ingest/ingest-videos.mjs --limit=10 && node scripts/ingest/build-ndjson.mjs && npm run ingest:import`
3. `npm run typecheck`
4. `npm run lint`
5. Test progress API and sitemap responses via curl.

## Manual test steps

1. Navigate to a lesson page, click "Mark as Complete", and confirm the sidebar checkmark turns green.
2. Check `/courses/[slug]` and `/my-learning` to verify course progress bars reflect the completed lessons.
3. Visit `/search?q=next.js` and verify grounded video moments and lesson results appear.
4. Visit `/sitemap.xml` to inspect auto-generated course and lesson URLs.
