# Implementation prompt: Interactive Lesson Chapters and Transcript Viewer

## Goal

Add an interactive "Chapters" and "Transcript" tab on the lesson page (`/lessons/[slug]`), fulfilling AGENTS.md §7, §8 & §11:
- Video intelligence documents store chapters (`{ startSeconds, label }`) and chunks (`{ startSeconds, text }`).
- Currently, search deep-links into lessons using `?t=<seconds>`, but inside the lesson page itself, learners cannot browse chapters or transcripts to jump directly to specific seconds in the video.
- Add an interactive Chapters / ToC tab under the lesson tabs where learners can click any chapter or timestamp to seek the video player immediately.

## Skills and docs read

- `AGENTS.md` — §7 ("Timestamps resolve in two stages. Match the chapters first, then transcript"), §8 ("A video document is built by the ingestion pipeline... chapters array of { startSeconds, label } for the table of contents, and chunks array"), §11.
- `sanity/lib/queries.ts` — `LESSON_BY_SLUG_QUERY`.
- `components/lesson/lesson-tabs.tsx`, `components/lesson/lesson-video.tsx`.

## Code inspected

- `sanity/lib/queries.ts`: `LESSON_BY_SLUG_QUERY` resolves the lesson's video URL and can join its linked video document:
  ```groq
  "videoDetail": *[_type == "video" && url == ^.videoUrl][0]{
    chapters[]{_key, startSeconds, label},
    chunks[]{_key, startSeconds, text}
  }
  ```
- `components/lesson/lesson-tabs.tsx`: currently renders tabs for "Notes", "Key points", "Resources".
- `components/lesson/lesson-video.tsx`: accepts `videoUrl` and `initialStartSeconds`.

## Decisions and assumptions

1. **Query Update**:
   - In `LESSON_BY_SLUG_QUERY`, join `videoDetail` for the lesson's `videoUrl`, extracting `chapters[]{_key, startSeconds, label}`.
2. **Interactive Chapters Tab**:
   - In `LessonTabs`, add a "Chapters" tab alongside "Notes", "Key points", and "Resources".
   - Clicking a chapter timestamp triggers immediate seek on the video (or navigates to `?t=seconds`).
3. **UX & Design Alignment**:
   - Each chapter displays timestamp badge `MM:SS` (formatted with `formatDuration`), chapter label, and play icon button.
   - Clean hover states conforming to the dark neutral / primary design tokens.

## Files to touch

- `sanity/lib/queries.ts` — add `videoDetail` projection to `LESSON_BY_SLUG_QUERY`.
- `components/lesson/lesson-chapters.tsx` — new chapter list component with clickable timestamps.
- `components/lesson/lesson-tabs.tsx` — wire the new "Chapters" tab.
- `app/lessons/[slug]/page.tsx` — pass chapters to `LessonTabs`.

## Requirements

- Chapters correctly display label and formatted timestamp (`MM:SS`).
- Clicking a chapter seeks the player to that timestamp without page reload disruption.
- Graceful empty state when a lesson has no chapters.

## Security considerations

- Read-only data access from Sanity. No external inputs.

## Acceptance criteria

1. Lessons with chapters display a "Chapters" tab in `LessonTabs`.
2. Each chapter item has a clickable timestamp that seeks/starts video playback from that exact second.
3. Clean empty handling if a lesson's video has no chapter markers.
4. Typecheck, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Navigate to a lesson page (e.g. `http://localhost:3000/lessons/data-fetching-and-caching`).
2. Click the "Chapters" tab in the lower content section.
3. Click any chapter (e.g. "02:15 - Server Actions").
4. Confirm video seeks and plays from 2:15.
