# Implementation prompt: Learner Progress Tracking and Sync (`/api/progress`)

## Goal

Implement the learner progress sync server route and client integration according to AGENTS.md §5, §7, and §8.
- Track completed lessons and last resume positions keyed by the Clerk `userId`.
- Expose a secure server route (`POST /api/progress` and `GET /api/progress`) authenticated with Clerk.
- Keep writes isolated from client-side direct database access (server-route boundary).
- Update the lesson page, course page, and `MyLearningView` to reflect persisted progress and live completion percentages.

## Skills and docs read

- `AGENTS.md` — §5 ("Auth is Clerk... Any write, such as saving progress, goes through a server route with a write token, and this state is kept apart from the read only content"), §7 ("Progress is tracked per learner: which lessons they have completed and where they left off in a lesson (a resume position). Surface it as completion marks and a resume affordance on the catalog, course, and lesson pages"), §8 ("A progress record captures a learner's state, keyed by the Clerk user id").
- Clerk server auth helpers (`auth()`).
- Sanity schema and client token usage.

## Code inspected

- `components/lesson/use-watch-depth.ts` — already tracks watch milestones (50%, 90% completion) and calls PostHog events; ready to trigger progress sync.
- `components/course/course-progress-bar.tsx` & `components/course/course-resume-link.tsx` — accepts `percentComplete` and `continueHref`.
- `components/lesson/lesson-sidebar.tsx` — has completed lesson indicators commented as ready for progress data.
- `sanity/lib/token.ts` & `sanity/lib/client.ts` — server-side write token or in-app document storage.

## Decisions and assumptions

1. **Storage Mechanism**:
   - Following AGENTS.md §8, progress records are stored per learner (`progress` schema document in Sanity or a dedicated server store keyed by `userId`).
   - If Sanity write token is configured, writes to a `progress` document with `_id: "progress." + userId`. If the write token is absent in local dev, gracefully fallback to a fast, reliable in-memory / cookie session cache so it functions locally without crashing.
2. **API Contract**:
   - `GET /api/progress`: Returns `{ completedLessons: string[], lastPlayedLesson: { lessonSlug: string, timestamp: number } | null }`.
   - `POST /api/progress`: Accepts `{ lessonSlug: string, courseSlug?: string, completed?: boolean, timestamp?: number }` and updates the record.
3. **UI Integration**:
   - Wire `LessonSidebar` and `CourseProgressBar` to reflect real progress for authenticated learners.
   - Wire `LessonVideo` / `useWatchDepth` to automatically post progress when a user watches a lesson.

## Files to touch

- `app/api/progress/route.ts` — new server route for progress read/write.
- `lib/progress.ts` — progress data types and server helper functions.
- `components/lesson/use-watch-depth.ts` — hook into completion to post progress.
- `components/lesson/lesson-sidebar.tsx` & `components/course/course-content.tsx` — pass completed lesson statuses.

## Security considerations

- Route rejects unauthorized requests using Clerk's `auth()`.
- Sanity write token is strictly server-only in `SANITY_API_WRITE_TOKEN`.
- Client never directly writes to the datastore.

## Acceptance criteria

1. Calling `POST /api/progress` while signed in stores lesson completion and resume timestamp.
2. `GET /api/progress` returns the learner's completed lessons and last watched lesson.
3. Lessons marked completed reflect on the lesson sidebar and course progress bar.
4. Type check, lint, and build pass.

## Checks to run

`npm run typecheck`, `npm run lint`, and `npm run build`.

## Manual test steps

1. Play a lesson video to completion or call progress mark.
2. Refresh the course page and verify the progress bar updates from 0%.
3. Confirm the completed checkmark appears on the lesson sidebar row.
