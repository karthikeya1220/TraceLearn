# Implementation prompt: Update search model to gemini-3.8-flash

## Goal

Resolve the search 502 error (`AI_APICallError: This model models/gemini-2.5-flash is no longer available to new users. Please update your code to use models/gemini-3.8-flash`) by updating the default model in `app/api/search/route.ts` to `gemini-3.8-flash`.

## Skills and docs read

- `AGENTS.md` — §6 (AI SDK with Gemini provider), §11 (search execution), §13 (checks).
- Gemini API documentation — Model availability & migration to `gemini-3.8-flash`.

## Code inspected

- `app/api/search/route.ts` — Line 43 specifies `const DEFAULT_MODEL = "gemini-2.5-flash";`.
- Error log: `This model models/gemini-2.5-flash is no longer available to new users. Please update your code to use models/gemini-3.8-flash for the latest features and improvements.`

## Decisions and assumptions

1. Update `DEFAULT_MODEL` in `app/api/search/route.ts` to `"gemini-3.8-flash"`.
2. Allow `SEARCH_MODEL` in environment variables to continue overriding if configured.
3. Test a live search call against `/api/search` to verify `gemini-3.8-flash` successfully queries the Sanity Context MCP and returns grounded results.

## Files expected to touch

- `app/api/search/route.ts`
- `prompts/update-search-model-to-gemini-3-8-flash.md` (this prompt)

## Requirements

- `/api/search` must call `gemini-3.8-flash` rather than the decommissioned `gemini-2.5-flash`.
- Search queries on `/search` must return HTTP 200 with grounded lesson and video results.

## Security considerations

- Gemini API key remains server-only.

## Acceptance criteria

- `DEFAULT_MODEL = "gemini-3.8-flash"`.
- A POST request to `/api/search` with `{ query: "HTTP" }` succeeds without 502 / model 404 errors.
- `npm run typecheck` and `npm run lint` pass cleanly.

## Checks to run

1. `npm run typecheck`
2. `curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"query":"HTTP"}'`

## Manual test steps

1. Navigate to `http://localhost:3000/search?q=Explain+HTTP` in browser.
2. Verify search cards display with ranked lessons and video moments without error banners.
