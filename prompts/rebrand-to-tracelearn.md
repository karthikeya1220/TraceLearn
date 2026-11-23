# Implementation prompt: Rebrand application naming from Vertex to TraceLearn

## Goal

Replace all product naming references from "Vertex" to "TraceLearn" across the entire user-facing web application, branding components, metadata, search prompts, and configuration, ensuring consistent product identity throughout the platform.

## Skills and docs read

- `AGENTS.md` — §2 (prompt, approval, report), §3 (visual & branding consistency), §13 (checks).

## Code inspected

- `components/brand/logo.tsx` — Renders the brand logo and text "Vertex".
- `components/layout/site-footer.tsx` — Copyright text references "Vertex".
- `components/layout/notifications-popover.tsx` — Welcome notification references "Vertex".
- `components/my-learning/my-learning-view.tsx` — Sign-in message references "Vertex account".
- `app/layout.tsx` — Page title and meta description reference "Vertex".
- `app/courses/page.tsx`, `app/search/page.tsx`, `app/my-learning/page.tsx`, `app/instructors/[slug]/page.tsx`, `app/design-system/page.tsx` — Metadata descriptions reference "Vertex".
- `lib/search/system-prompt.ts` — System instructions for the search agent reference "Vertex".
- `studio/sanity.config.ts` — Studio workspace name and title reference "Vertex".
- `package.json` & `studio/package.json` — Package name fields.

## Decisions and assumptions

1. **Replace All User-Facing Text**: Update all brand labels, page titles, footer copyrights, welcoming notifications, and meta descriptions from "Vertex" to "TraceLearn".
2. **Search Prompt Alignment**: Update the search backend system prompt so the AI agent identifies as the search engine for "TraceLearn".
3. **Preserve Content NDJSON Seed Files**: Per previous explicit instruction ("do not modify the files"), leave existing seed NDJSON and video JSON files untouched.
4. **Preserve Functional Identifiers**: Internal route paths and GROQ queries remain intact; only human-readable brand labels and package names are updated.

## Files expected to touch

- `components/brand/logo.tsx`
- `components/layout/site-footer.tsx`
- `components/layout/notifications-popover.tsx`
- `components/my-learning/my-learning-view.tsx`
- `app/layout.tsx`
- `app/courses/page.tsx`
- `app/search/page.tsx`
- `app/my-learning/page.tsx`
- `app/instructors/[slug]/page.tsx`
- `app/design-system/page.tsx`
- `components/brand/course-marks.tsx`
- `lib/search/system-prompt.ts`
- `package.json`
- `studio/package.json`
- `studio/sanity.config.ts`
- `prompts/rebrand-to-tracelearn.md` (this prompt)

## Requirements

- "TraceLearn" is displayed in the main navigation logo, footer copyright, notifications popover, page metadata, search placeholder/descriptions, and studio title.
- Zero leftover "Vertex" brand mentions in application source code.
- TypeScript compilation and ESLint checks pass with no errors.

## Security considerations

- Purely a brand naming migration; no authentication or security mechanisms are altered.

## Acceptance criteria

- Logo displays "TraceLearn".
- Footer displays "© 2026 TraceLearn. All rights reserved."
- Page `<title>` and `<meta name="description">` display "TraceLearn".
- `npm run typecheck` and `npm run lint` pass cleanly.

## Checks to run

1. `npm run typecheck`
2. `npm run lint`
3. Verify grep check: `git grep -in "vertex" app/ components/` shows 0 user-facing brand hits.

## Manual test steps

1. Open `http://localhost:3000/` and verify header logo says "TraceLearn".
2. Check browser tab title: "TraceLearn".
3. Scroll to footer: "© 2026 TraceLearn. All rights reserved."
4. Check `/courses`, `/search`, and `/my-learning` to verify all page titles and descriptions say "TraceLearn".
