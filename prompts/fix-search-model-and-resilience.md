# Implementation prompt: Fix search model deprecation, quota, and resilience

## Goal

Resolve the `POST /api/search` 502 error reported when searching (e.g. `Explain HTTP` or `Explain HHTp`):
1. Replace deprecated `gemini-2.5-flash` with `gemini-3.5-flash-lite`, which is active, supported, and within available API quota.
2. Add multi-model fallback resiliency (`gemini-3.5-flash-lite`, `gemini-3-flash-preview`, `gemini-3.5-flash`) so that temporary 503 high-demand spikes or 429 quota exhaustion on Google AI Studio Free Tier automatically fall back to an available model rather than failing with 502.
3. Streamline MCP tools in the search route to focus on `groq_query`, dropping redundant tool definitions (`schema_explorer`, `array_field_reader`, `initial_context`) to reduce request payload size by ~70% and prevent rate-limit / timeout triggers.
4. Restart the Next.js development server to clear module-scoped cache and pick up updated configuration.

## Skills and docs read

- `AGENTS.md` — §5 (app structure & search API route), §6 (tech stack), §7 (search decisions), §11 (search behavior), §12 (things that will trip you up), §13 (checks to run).

## Code inspected

- `app/api/search/route.ts` — Currently references `DEFAULT_MODEL = "gemini-3.5-flash"` which hit daily 20-request Free Tier quota exhaustion (HTTP 429). The running dev server was also caching stale server singletons from when `gemini-2.5-flash` was called.
- `lib/search/mcp.ts` — Exposes `groq_query`, `schema_explorer`, `array_field_reader`, and `initial_context`. `initial_context` is already injected into the system prompt. Passing `schema_explorer` and `array_field_reader` unnecessarily inflates the request token count on each tool loop turn.
- `.env.local` — Contains `GEMINI_API_KEY` and `SANITY_CONTEXT_MCP_URL`.
- Live API calls verified:
  - `gemini-2.5-flash`: deprecated for new users (404)
  - `gemini-3.5-flash`: daily quota exhausted (429: limit 20 req/day on Free Tier)
  - `gemini-3.5-flash-lite`: active and responding with HTTP 200 (~1.5s latency)

## Decisions and assumptions

1. Set `DEFAULT_MODEL = "gemini-3.5-flash-lite"` in `app/api/search/route.ts`.
2. Implement model fallback in `app/api/search/route.ts`: if a model encounters a 429 or 503 error, attempt the next candidate model in `[process.env.SEARCH_MODEL, "gemini-3.5-flash-lite", "gemini-3-flash-preview", "gemini-3.5-flash"].filter(Boolean)`.
3. Filter `tools` down to `groq_query` from the Sanity Context MCP. The model already has the full schema overview in the system prompt and only executes `groq_query` to find lessons and videos.
4. Set `SEARCH_MODEL="gemini-3.5-flash-lite"` in `.env.local`.
5. Restart the Next.js dev server on port 3000 to ensure fresh module instantiation.

## Files expected to touch

- `app/api/search/route.ts`
- `.env.local`
- `prompts/fix-search-model-and-resilience.md` (this prompt)

## Requirements

- `POST /api/search` must execute successfully without throwing 404 deprecated model, 429 quota exhausted, or 503 capacity errors.
- Search results page `/search?q=Explain+HTTP` must display ranked lesson cards and video moment cards grounded in Sanity.
- `npm run typecheck` and `npm run lint` must pass.

## Security considerations

- All Gemini API keys, Sanity read tokens, and MCP URLs remain strictly server-side.
- Grounding checks remain intact to ensure no hallucinated courses or lessons reach the client.

## Acceptance criteria

- `curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"query":"Explain HTTP"}'` returns HTTP 200 with grounded hits.
- Browser test at `http://localhost:3000/search?q=Explain+HTTP` loads results cleanly without 502 errors.
- `npm run typecheck` passes with zero errors.

## Checks to run

1. `npm run typecheck`
2. `npm run lint`
3. Test search query against `http://localhost:3000/api/search`.

## Manual test steps

1. Open `http://localhost:3000/search?q=Explain+HTTP`.
2. Verify results header displays result count (e.g. `Found X results across Y courses`).
3. Verify video moments and lesson cards render properly with play buttons and timestamps.
