# Implementation prompt: Interactive Transcript Tab on Lessons

## Goal

Surface the video transcript chunks (`chunks[]{_key, startSeconds, text}`) as a searchable, clickable "Transcript" tab on the lesson page (`/lessons/[slug]`):
- Transcripts are ingested into Sanity video documents in short timestamped pieces per AGENTS.md §8.
- Display each transcript chunk with its timestamp badge (`MM:SS`) and text.
- Allow learners to click any timestamp to immediately jump the video to that moment.
- Include a fast in-transcript filter input so learners can quickly search for specific keywords spoken in the lesson video.

## Skills and docs read

- `AGENTS.md` — §8 ("A video document is built by the ingestion pipeline... a chunks array of { startSeconds, text } for the transcript in short timestamped pieces"), §11.
- `sanity/lib/queries.ts` — `LESSON_BY_SLUG_QUERY`.

## Code inspected

- `sanity/lib/queries.ts`: `LESSON_BY_SLUG_QUERY` already projects `videoDetail` for chapters; we will project `chunks[]{_key, startSeconds, text}` as well.
- `components/lesson/lesson-tabs.tsx`: hosts "Lesson Content", "Chapters", "Notes".

## Decisions and assumptions

1. **Query Update**:
   - In `LESSON_BY_SLUG_QUERY`, project:
     ```groq
     "videoDetail": *[_type == "video" && url == ^.videoUrl][0]{
       chapters[]{_key, startSeconds, label},
       chunks[]{_key, startSeconds, text}
     }
     ```
2. **Interactive Transcript View (`components/lesson/lesson-transcript.tsx`)**:
   - Quick search input to filter transcript lines by keyword in real time.
   - Clickable timestamps linking to `lessonHref(slug, chunk.startSeconds)`.
   - Scrollable container with high readability and active moment highlighting.
3. **Tab Integration**:
   - Add "Transcript" to `LessonTabs` with chunk count.

## Files to touch

- `sanity/lib/queries.ts` — include `chunks` in `videoDetail`.
- `components/lesson/lesson-transcript.tsx` — new transcript list component with filter search.
- `components/lesson/lesson-tabs.tsx` — wire the new "Transcript" tab.
- `app/lessons/[slug]/page.tsx` — pass chunks to `LessonTabs`.

## Requirements

- Instant text filtering across transcript chunks.
- Clickable timestamp seeks video playback.
- Graceful empty state when no transcript chunks exist.

## Security considerations

- Read-only data from Sanity.

## Acceptance criteria

1. Lessons with transcript data show a "Transcript" tab with item count.
2. Learners can filter transcript dialogue via a search field.
3. Clicking any transcript line jumps the video to that second.
4. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Go to `http://localhost:3000/lessons/data-fetching-and-caching`.
2. Click the "Transcript" tab.
3. Type a word (e.g. "cache") into the transcript filter and observe filtered results.
4. Click a timestamp and verify video seeks to that moment.
