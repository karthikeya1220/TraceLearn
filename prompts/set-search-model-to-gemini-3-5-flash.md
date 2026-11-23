# Implementation prompt: Set search model to gemini-3.5-flash

## Goal

Configure the default search model in `app/api/search/route.ts` to `gemini-3.5-flash`, which is active, highly available, and verified to execute multi-step Sanity Context MCP `groq_query` tool calls and generate structured lesson search results without 503 capacity errors or timeouts.

## Skills and docs read

- `AGENTS.md` — §6 (AI SDK with Gemini provider), §11 (search execution), §13 (checks).

## Code inspected

- `app/api/search/route.ts` — Line 43 currently has `const DEFAULT_MODEL = "gemini-3.8-flash";`.
- Live testing verified that `gemini-3.5-flash` successfully queries the Sanity Context MCP (`groq_query`), returns 4 execution steps, and produces valid structured hits.

## Decisions and assumptions

1. Set `DEFAULT_MODEL = "gemini-3.5-flash"` in `app/api/search/route.ts`.
2. Allow `SEARCH_MODEL` in `.env.local` to override if desired.

## Files expected to touch

- `app/api/search/route.ts`
- `prompts/set-search-model-to-gemini-3-5-flash.md` (this prompt)

## Requirements

- Search route `/api/search` must execute using `gemini-3.5-flash` and return HTTP 200 with grounded lessons and video moments.

## Security considerations

- Gemini API key remains server-only.

## Acceptance criteria

- `curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"query":"Explain HTTP"}'` returns HTTP 200 with grounded results.
- `npm run typecheck` and `npm run lint` pass cleanly.

## Checks to run

1. `npm run typecheck`
2. `npm run lint`
3. Test search query against `/api/search`.

## Manual test steps

1. Navigate to `http://localhost:3000/search?q=Explain+HTTP` in browser.
2. Verify search cards display with ranked lessons and video moments.
