# Implementation Prompt: Two-Stage Timestamp Resolution and On-Site Playback

## Goal

Upgrade search with two-stage timestamp resolution (match `chapters[].label` first, fall back to `chunks[].text` only when no chapter matches) and ensure on-site timestamped video playback where result cards deep link directly to the lesson page at the matched second (`?t=<seconds>`) and the embedded player (YouTube, Vimeo, Bunny) mounts and seeks immediately to that exact second.

---

## Skills and Docs Read

- `AGENTS.md`
  - §5: Application structure and boundaries (server-only Sanity client and MCP/LLM integration, client-side UI).
  - §6: Tech stack (Next.js App Router, Sanity Studio, `next-sanity`, Vercel AI SDK, `@ai-sdk/google`).
  - §7: Key decisions: Grounded search; video intelligence in dedicated `video` documents (internal lookup only); two-stage timestamp resolution (chapters first, transcript fallback); on-site playback through provider embeds (YouTube, Vimeo, Bunny) starting at `startSeconds` query param.
  - §8: Content models (`video` documents with `chapters[]{startSeconds, label}` and `chunks[]{startSeconds, text}`, linked to `lesson` via `videoUrl`).
  - §11: Search behaviour: Two result kinds (`video` and `lesson`), deep links with start seconds, token-based matching, never hallucinate timestamps.
  - §12: Critical rules: MCP context limits, private dataset tokens, cache TTL.
  - §13: Checks to run (type check, lint, build).

---

## Code Inspected

- `lib/search/system-prompt.ts`: Inspecting inline system prompt rules, GROQ templates, and two-stage search instructions.
- `lib/search/ground.ts`: Grounding hits against Sanity, dropping invalid IDs, constructing `SearchResult` objects and `href`s.
- `lib/search/types.ts`: `ModelHitSchema`, `VideoSearchResultSchema`, `LessonSearchResultSchema`.
- `sanity/lib/queries.ts`: `LESSONS_BY_IDS_QUERY` and `LESSON_BY_SLUG_QUERY`.
- `lib/routes.ts`: `lessonHref(slug, startSeconds)` logic (currently omitting `?t=0` because `!startSeconds` evaluates true for 0).
- `lib/video.ts`: `videoEmbedUrl` for YouTube, Vimeo, Bunny.
- `app/lessons/[slug]/page.tsx`: Server component reading `START_SECONDS_PARAM` (`?t=`), passing `startSeconds` to `LessonVideo`.
- `components/lesson/lesson-video.tsx`: Client component rendering poster or provider iframe embed.
- `components/search/video-result-card.tsx`: Rendering video result cards with `Watch from <timestamp>` button and deep links.
- `studio/scripts/context/vertex-search.ndjson`: Sanity Context agent instructions.

---

## Decisions and Assumptions

1. **Two-Stage Timestamp Resolution in Search**:
   - Provide the explicit GROQ query pattern in `lib/search/system-prompt.ts` and `studio/scripts/context/vertex-search.ndjson` for video moments alongside the lesson query pattern:
     ```groq
     *[_type == "video" && (
       count($terms[^.chapters[].label match @]) > 0 ||
       count($terms[^.chunks[].text match @]) > 0
     )]{
       url,
       "lesson": *[_type == "lesson" && videoUrl == ^.url][0]{ _id, title },
       "matchedChapters": chapters[count($terms[^.label match @]) > 0][0..2]{ startSeconds, label },
       "matchedChunks": chunks[count($terms[^.text match @]) > 0][0..2]{ startSeconds, text }
     }
     ```
   - **Stage 1 (Chapters first)**: If `matchedChapters` has any match, the model takes `startSeconds = matchedChapters[0].startSeconds` and `momentLabel = matchedChapters[0].label`.
   - **Stage 2 (Transcript fallback)**: Only when `matchedChapters` is empty does it fall back to `matchedChunks[0]`: `startSeconds = matchedChunks[0].startSeconds` and `momentLabel = null`.
   - In `sanity/lib/queries.ts` (`LESSONS_BY_IDS_QUERY`), fetch the linked video's chapters and chunks:
     ```groq
     "videoDetail": *[_type == "video" && url == ^.videoUrl][0]{
       chapters[]{startSeconds, label},
       chunks[]{startSeconds, text}
     }
     ```
   - In `lib/search/ground.ts`:
     - Rigorously validate `startSeconds`: ensure it corresponds to an actual timestamp in the lesson video's chapters or transcript chunks.
     - Validate `momentLabel`: if `momentLabel` is present, ground it against the actual matching chapter label; if it came from a transcript chunk, verify `momentLabel` is null.
     - Guarantee that if `startSeconds` is valid (even 0), it generates a deep link with `?t=<seconds>`.

2. **Result Cards Deep Linking**:
   - In `lib/routes.ts`:
     Fix `lessonHref(slug, startSeconds)`:
     Replace `if (!startSeconds || startSeconds <= 0)` with:
     ```ts
     if (startSeconds === null || startSeconds === undefined || startSeconds < 0) {
       return `/lessons/${slug}`;
     }
     return `/lessons/${slug}?t=${Math.floor(startSeconds)}`;
     ```
     This ensures that `lessonHref("building-ai-apps", 0)` produces `/lessons/building-ai-apps?t=0` rather than stripping the parameter.
   - In `components/search/video-result-card.tsx`:
     Ensure clicking the card or the action button ("Watch from M:SS") opens the deep link `/lessons/${slug}?t=${startSeconds}`.
     If `result.momentLabel` is present, display it in the card's metadata so learners see the matched chapter.

3. **On-Site Timestamped Playback & Player Seeking**:
   - In `app/lessons/[slug]/page.tsx`:
     Update `readStartSeconds` so that when `?t=` is provided in the URL (including `?t=0`), it recognizes that a deep link was requested:
     ```ts
     function parseStartParam(value: string | string[] | undefined, durationSeconds: number | null) {
       if (value === undefined || value === null) return { startSeconds: 0, hasStartParam: false };
       const raw = Array.isArray(value) ? value[0] : value;
       const parsed = Number.parseInt(raw ?? "", 10);
       if (!Number.isFinite(parsed) || parsed < 0) return { startSeconds: 0, hasStartParam: false };
       const start = durationSeconds ? Math.min(parsed, durationSeconds) : parsed;
       return { startSeconds: start, hasStartParam: true };
     }
     ```
     Pass `startSeconds` and `autoPlay={hasStartParam}` to `LessonVideo`.
   - In `components/lesson/lesson-video.tsx`:
     - Set initial `isPlaying` state based on `hasStartParam || startSeconds > 0`.
     - Add `useEffect` to synchronize `isPlaying` whenever `startSeconds` or `hasStartParam` updates (e.g. clicking a chapter or transcript line, or deep-linking).
     - Add `key={`${video.provider}-${video.id}-${startSeconds}`}` to the `<iframe>` element to ensure that whenever `startSeconds` changes, the player iframe cleanly remounts at the targeted second and begins playing.
   - In `lib/video.ts`:
     Ensure `videoEmbedUrl` correctly formats `startSeconds` across all 3 providers (YouTube with `start=<sec>&autoplay=1`, Vimeo with `#t=<sec>s` and `autoplay=1`, Bunny Stream with `t=<sec>&autoplay=true`).

---

## Files Expected to Touch

1. `lib/routes.ts`: Update `lessonHref` to preserve `startSeconds === 0` (`?t=0`).
2. `lib/search/system-prompt.ts`: Update inline system prompt with explicit two-stage GROQ pattern and resolution rules.
3. `studio/scripts/context/vertex-search.ndjson`: Update context instructions with explicit two-stage GROQ pattern.
4. `sanity/lib/queries.ts`: Update `LESSONS_BY_IDS_QUERY` to project video chapters and chunks for grounding validation.
5. `lib/search/ground.ts`: Strengthen timestamp grounding, chapter verification, and `href` generation.
6. `components/search/video-result-card.tsx`: Display `momentLabel` in metadata when available and link with `result.href`.
7. `app/lessons/[slug]/page.tsx`: Parse `?t=` with support for `0` seconds, pass `autoPlay` flag to `LessonVideo`.
8. `components/lesson/lesson-video.tsx`: Handle seeking via `key` and reactive `isPlaying` state synchronization.
9. `lib/video.ts`: Ensure exact seek URL generation for YouTube, Vimeo, and Bunny.

---

## Security Considerations

- Server-only MCP and Sanity token: No tokens or secrets reach client code.
- Validation: `startSeconds` is parsed and clamped to `lesson.duration` on the server before being passed to the embed URL.
- Provider sanitization: Embed URLs continue to be strictly constructed from validated provider IDs, preventing open redirects or iframe injection.

---

## Acceptance Criteria

1. **Two-Stage Timestamp Resolution**:
   - The search LLM executes video moments search alongside lesson search.
   - For video moments, it matches `chapters[].label` first; if matched, it sets `startSeconds` and `momentLabel` from the matching chapter.
   - If no chapter matches, it falls back to `chunks[].text` and sets `startSeconds` from the matching chunk, leaving `momentLabel` null.
   - `groundHits` validates the timestamps against Sanity data to eliminate hallucinations.
2. **Deep Linking**:
   - Video result cards display "Watch from M:SS" (and chapter label if matched).
   - Video result cards link to `/lessons/<slug>?t=<seconds>` (including `?t=0`).
3. **On-Site Timestamped Playback**:
   - Opening `/lessons/<slug>?t=<seconds>` starts the embedded player at `<seconds>` with autoplay.
   - The player stays embedded on site (no redirecting out to YouTube/Vimeo/Bunny).
   - Clicking chapter items or transcript items in the lesson tabs updates the timestamp and seeks the player immediately.

---

## Checks to Run

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Live API search test via `curl` verifying two-stage video moment results and deep links.

---

## Exact Manual Test Steps

1. Run `curl -s -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"query":"examples in prompt"}'`:
   - Verify that result cards of kind `"video"` appear with `startSeconds` and `momentLabel` (e.g. "The role of examples").
   - Verify `href` points to `/lessons/<slug>?t=<seconds>`.
2. Run `curl -s -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"query":"prompt caching cost"}'`:
   - Verify chapter match or transcript chunk fallback with valid timestamp.
3. Open a deep link in the browser, e.g. `http://localhost:3000/lessons/building-ai-apps-with-llms-caching-and-rate-limits?t=118`:
   - Verify the embedded player renders immediately with `start=118` and begins playing at that timestamp.
4. On the lesson page, click the "Chapters" tab:
   - Click another chapter (e.g. Chapter at 240s):
   - Verify the URL changes to `?t=240` and the embedded player seeks to 240 seconds.
