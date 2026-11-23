# Implementation prompt: Fix Sanity client private dataset authentication

## Goal

Resolve the issue where courses are not visible on `http://localhost:3000/courses` (and the homepage) by updating `sanity/lib/client.ts` to be token-authenticated with `useCdn: false` and `import "server-only"`, allowing server-side data fetching against the private `production` Sanity dataset.

## Skills and docs read

- `AGENTS.md` — §5 (Data access is a server only Sanity client and fetch helper, reading a private dataset with a token), §12 (The dataset is private. Keep the read token on the server, never expose it to the client, and fetch all content server side), §13 (Checks: type check, lint, build/dev).
- `sanity-best-practices` — Next.js App Router server client with token authentication.

## Code inspected

- `sanity/lib/client.ts` — Currently has `useCdn: true` and no token passed to `createClient()`.
- `sanity/lib/token.ts` — Correctly asserts and exports `readToken` from `process.env.SANITY_API_READ_TOKEN`.
- `sanity/lib/fetch.ts` — Server-only helper documented to use the token-bearing client.
- `.env.local` — Contains `SANITY_API_READ_TOKEN` and public project coordinates.
- Live test confirmed:
  - Query without token: `0` courses returned (private dataset rejects unauthenticated reads).
  - Query with `readToken`: `10` courses returned.

## Decisions and assumptions

1. **Configure `sanity/lib/client.ts` with `readToken`**:
   - Add `import "server-only";`
   - Import `readToken` from `./token`
   - Set `token: readToken`
   - Set `useCdn: false` (required for token-authenticated private dataset queries)
2. **Cache Invalidation**:
   - If Next.js has cached the empty responses from before the fix, restart or revalidate so fresh data is fetched.
3. **Keep client-server boundary intact**:
   - `client.ts` and `token.ts` remain strictly server-only. No client component imports them.

## Files expected to touch

- `sanity/lib/client.ts`
- `prompts/fix-sanity-client-private-dataset-auth.md` (this prompt)

## Requirements

- `sanityFetch` must authenticate with `SANITY_API_READ_TOKEN`.
- `/courses` and `/` must render the 10 seeded courses and 6 categories.
- Ensure `server-only` safeguard prevents client bundle leaks.

## Security considerations

- `readToken` is kept on the server only and never exposed in public environment variables or client-side JavaScript bundles.

## Acceptance criteria

- `sanity/lib/client.ts` includes `import "server-only"`, `token: readToken`, and `useCdn: false`.
- `npm run typecheck` passes with no errors.
- `curl http://localhost:3000/courses` returns HTML containing courses (course count > 0).

## Checks to run

1. `npm run typecheck`
2. `curl -s http://localhost:3000/courses | grep -o 'course_count":[0-9]*'` to verify positive count.

## Manual test steps

1. Open `http://localhost:3000/courses` in browser.
2. Confirm the 10 courses, filter buttons for the 6 categories, covers, instructors, and lesson counts are displayed.
