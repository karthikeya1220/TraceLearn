# Search agent: OpenAI → Google Gemini (direct)

> **Revision 1:** the LLM credential turned out to be a Google Gemini key
> (`GEMINI_API_KEY`, `AQ.Ab8…`), not an OpenRouter `sk-or-…` key. The user confirmed
> "It's a Google Gemini key", so the provider below is `@ai-sdk/google` called directly.
> Everything else in this prompt stands. OpenRouter was verified compatible first
> (`@openrouter/ai-sdk-provider@3.1.0` peers `ai@^7`) but is not needed.

## Goal

Power the search agent with Google Gemini instead of OpenAI, and land the
environment keys the app needs (Gemini, Sanity read token, PostHog). This is the
"group A" setup from the audit: without it `POST /api/search` returns
`{"error":"Search is not configured."}` and every analytics event is silently dropped.

## Skills read

- None loaded for this task. Package behavior verified from the published artifacts:
  `@ai-sdk/google@4.0.124` (its `dist/index.d.ts`), the OpenRouter alternative, and
  live calls to `generativelanguage.googleapis.com` with the user's key — `gemini-3.5-flash`,
  `gemini-3.5-flash-lite`, and `gemini-2.5-pro` all return OK on this key.
  AGENTS.md §4: follow package docs and existing patterns for the AI SDK.

## Code inspected

- `app/api/search/route.ts` — the only file importing `@ai-sdk/openai` (lines 1, 78);
  also holds `DEFAULT_MODEL = "gpt-5"`, the OpenAI-only `providerOptions`, and the
  "Missing environment variable" → `unconfigured` error classification.
- `lib/search/mcp.ts` — `assertEnv` pattern and HTTPS/token rules (unchanged).
- `lib/search/system-prompt.ts`, `lib/search/types.ts`, `lib/search/ground.ts` — no
  provider coupling; no changes needed.
- `instrumentation-client.ts` — reads `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` +
  `NEXT_PUBLIC_POSTHOG_HOST`; `api_host` is the local `/ingest` proxy, so `host` is the
  `ui_host` and must be the EU cloud URL the rewrites in `next.config.ts` target.
- `.env.example` — missing the PostHog pair entirely, and lists `OPENAI_*` nothing today;
  no LLM key is listed at all.

## Decisions and assumptions

1. **Provider**: `@ai-sdk/google@4.0.124`, called directly — the user holds a Gemini
   API key, so there is no middleman. Installed with npm (lockfile is `package-lock.json`).
   The provider's default env var is `GOOGLE_GENERATIVE_AI_API_KEY`, but the key is
   already in `.env.local` as `GEMINI_API_KEY`, so the route passes `apiKey` explicitly.
2. **Model default**: `gemini-3.5-flash` — fast, cheap, in the provider's catalog with
   `tools: true` and `objectGeneration: true` (both required here: MCP tool loop +
   `Output.object`). Search is latency-sensitive with shallow reasoning (the route's
   own comment). Overridable via a `SEARCH_MODEL` env var, replacing
   `OPENAI_SEARCH_MODEL`. Verified available on the user's key with a live API call.
3. **The key is asserted explicitly** so the route throws the project's
   `Missing environment variable: …` shape when it is absent, keeping the existing
   `unconfigured` classification in the catch block working (analytics reason + the
   500 "Search is not configured." body).
4. **`providerOptions: { openai: { reasoningEffort, textVerbosity } }` is dropped** —
   those are OpenAI-only knobs keyed to the `openai` provider id. Gemini's thinking
   budget defaults are fine for this workload; add `providerOptions.google.thinkingConfig`
   later only if searches prove slow (YAGNI for now).
5. **`@ai-sdk/openai` and `@openrouter/ai-sdk-provider` are both removed** — nothing
   else imports either (grep-verified).
6. **PostHog host = `https://eu.i.posthog.com`** — `next.config.ts` rewrites proxy to
   the EU cloud, and `instrumentation-client.ts` passes this value as `ui_host`.
7. **`.env.example` is the canonical key list** (AGENTS.md §12), so it gains:
   `GEMINI_API_KEY`, `SEARCH_MODEL` (commented default), `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`,
   `NEXT_PUBLIC_POSTHOG_HOST`.

## Files to touch

- `app/api/search/route.ts` — swap provider import/usage, new default model, env assert.
- `package.json` / `package-lock.json` — add `@ai-sdk/google`, remove `@ai-sdk/openai`
  and (if present from revision 0) `@openrouter/ai-sdk-provider`.
- `.env.example` — replace the OpenRouter entry with `GEMINI_API_KEY`, keep the
  PostHog pair and `SEARCH_MODEL`.

Keys themselves go into `.env.local` (never committed, never printed): the user pastes
them and they are appended, or the user edits the file directly.

## Requirements

1. `npm install @ai-sdk/google` and remove `@ai-sdk/openai` +
   `@openrouter/ai-sdk-provider` (revision 0 installed the latter).
2. In `app/api/search/route.ts`:
   - Remove `import { openai } from "@ai-sdk/openai"` (and the OpenRouter import if present).
   - Add `import { createGoogleGenerativeAI } from "@ai-sdk/google"` (exported alias of
     `createGoogle`).
   - `const DEFAULT_MODEL = "gemini-3.5-flash";`
   - Build the model as
     `createGoogleGenerativeAI({ apiKey: assertEnv("GEMINI_API_KEY") })(process.env.SEARCH_MODEL || DEFAULT_MODEL)`
     with a local `assertEnv` throwing `Missing environment variable: GEMINI_API_KEY`
     (same message shape `lib/search/mcp.ts` uses), created inside `POST` so the key is
     read per request, not frozen at module load.
   - Drop the `providerOptions` argument and its comment; keep everything else
     (`system`, `prompt`, `tools`, `stopWhen`, `Output.object`, `abortSignal`) identical.
   - Keep `runtime`/`dynamic`/`maxDuration` and all analytics/error handling untouched.
3. `.env.example`: `GEMINI_API_KEY` (server-only marker) in place of the OpenRouter
   entry; keep `SEARCH_MODEL` (commented) and the PostHog pair with their comments.
4. No other files change. No schema, prompt, or grounding logic changes.

## Security considerations

- `OPENROUTER_API_KEY` is server-only: no `NEXT_PUBLIC_` prefix, never referenced in
  client components, only read inside the route handler.
- The browser still sees only the JSON response; the MCP URL, read token, and LLM key
  stay server-side (AGENTS.md §5, §12).
- `.env.local` is git-ignored; `.env.example` carries names and comments only, no values.

## Acceptance criteria

- `npm run typecheck` passes; `npm run lint` passes.
- `npm run build` completes (server route changed).
- With no `OPENROUTER_API_KEY`: `POST /api/search` → 500
  `{"error":"Search is not configured."}` (unchanged contract).
- With keys present: a search returns grounded JSON (`count`, `courseCount`, `results`)
  rather than 502 — exact query depends on content being seeded (out of scope here).
- Browser console no longer shows the PostHog missing-variable error once the pair is set.
- `grep -r "@ai-sdk/openai"` in the repo (excluding `node_modules`) returns nothing.

## Checks to run

From the project root, report real output:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build`
4. `npm run dev`, then:
   - `curl -s -X POST localhost:3000/api/search -H 'Content-Type: application/json' -d '{"query":"test"}'`
     → expect `{"error":"Search is not configured."}` if the key is still absent, or a
     grounded response if all keys are in.
   - Load `http://localhost:3000/` in a browser, confirm Sign in/Sign up render and the
     PostHog console error is gone (once keys are set).
5. `grep -rn "@ai-sdk/openai" --include="*.ts" --include="*.tsx" --include="*.json" . | grep -v node_modules`
   → no matches outside lockfile history (expect: empty).

## Manual test steps (user)

1. Get keys:
   - **OpenRouter**: https://openrouter.ai/keys → create key (`sk-or-...`).
   - **Sanity read token**: https://www.sanity.io/manage → project `wbh0kqse` → API →
     Tokens → create **Viewer** token.
   - **PostHog**: https://eu.posthog.com → Project Settings → Project API Key
     (token-…); host is `https://eu.i.posthog.com`.
2. Paste them here (they get appended to `.env.local`) or add them yourself:
   `OPENROUTER_API_KEY`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`,
   `NEXT_PUBLIC_POSTHOG_HOST`.
3. Restart `npm run dev` (env is read at boot).
4. Open `http://localhost:3000/search?q=react` — the call should no longer fail with
   "not configured"; until content is seeded the result list will be empty, which is
   the expected state at this stage.
5. Check the browser console: the PostHog warning is gone.

## Out of scope (next prompts)

- Content pipeline: seed import, video ingestion, Context document import, Studio
  deploy, `SANITY_CONTEXT_MCP_URL`.
- Missing features: `/my-learning`, instructor pages, progress tracking, read-token
  wiring in `sanity/lib/client.ts`.
