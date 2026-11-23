# Search agent: Google Gemini Provider Migration

## Goal
Switch the search agent provider from `@openrouter/ai-sdk-provider` to `@ai-sdk/google`, allowing the user to paste their Google Gemini API key directly as `GEMINI_API_KEY` (or `GOOGLE_GENERATIVE_AI_API_KEY`) into `.env.local`.

## Skills & Architecture Guidelines Read
- AGENTS.md §4: Follow package docs and existing patterns for the AI SDK.
- AGENTS.md §5: Search API is a server route connecting Sanity Context MCP + LLM. Token-bearing code stays on the server.
- AGENTS.md §12: Keep canonical environment variables documented in `.env.example`.

## Code Inspected
- `app/api/search/route.ts`: Currently imports `createOpenRouter` from `@openrouter/ai-sdk-provider`, reads `OPENROUTER_API_KEY`, and uses `google/gemini-3.5-flash`.
- `package.json`: Uses `ai: ^7.0.66`. Compatible with `@ai-sdk/google`.
- `.env.example`: Documents `OPENROUTER_API_KEY`. Needs to be updated to `GEMINI_API_KEY`.

## Decisions & Assumptions
1. **Package**: Install `@ai-sdk/google` and remove `@openrouter/ai-sdk-provider`.
2. **Key Name**: Support `GEMINI_API_KEY` (with fallback to `GOOGLE_GENERATIVE_AI_API_KEY`), checking via `assertEnv` to preserve the `unconfigured` error classification on missing key.
3. **Model Default**: Default model `gemini-2.5-flash` (or user override via `SEARCH_MODEL`).
4. **Environment Configuration**: Update `.env.example` to list `GEMINI_API_KEY`.

## Files to Touch
- `package.json` / `package-lock.json`
- `app/api/search/route.ts`
- `.env.example`

## Acceptance Criteria & Checks
- `npm install @ai-sdk/google` succeeds.
- `app/api/search/route.ts` correctly instantiates Google provider with `GEMINI_API_KEY`.
- Type check (`npm run type-check` or `npx tsc --noEmit`) passes cleanly.
- If `GEMINI_API_KEY` is missing, `POST /api/search` returns the expected 500 "Search is not configured.".
