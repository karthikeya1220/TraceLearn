# Implementation prompt: Search Prompt Suggestions & Topic Chips

## Goal

Add clickable suggested query chips on the Home Hero and the `/search` page empty/initial state, letting learners immediately discover and experience timestamped video search without staring at an empty input field.

## Skills and docs read

- `AGENTS.md` — §7 ("Search is the Sanity Context MCP plus an LLM... a learner types a plain language query and gets back ranked, clickable cards. Each card links straight to the exact second in a lesson's video"), §11 ("Search is a full results page... when nothing fits, show an empty state that points to the full catalog").

## Code inspected

- `components/home/hero.tsx` — Hero search band.
- `app/search/page.tsx` & `components/search/search-empty-state.tsx` — search page empty and initial states.
- `lib/routes.ts` — `searchHref(query)`.

## Decisions and assumptions

1. **Preset Topics**:
   - Curated high-relevance queries directly grounded in the seeded curriculum:
     - *"Data Fetching and Caching"*
     - *"Server Actions"*
     - *"Zustand State Management"*
     - *"Next.js App Router"*
     - *"Database Indexing"*
2. **Placement**:
   - On the Home Hero: Placed directly below the search bar in the cobalt banner as clickable pill buttons (`searchHref(topic)`).
   - On `/search` (when `!query`): Displayed as recommended queries below the input.

## Files to touch

- `components/search/search-suggestions.tsx` — new component rendering query chips.
- `components/home/hero.tsx` — surface `SearchSuggestions` inside the search hero band.
- `app/search/page.tsx` — surface `SearchSuggestions` when no query has been entered.

## Requirements

- Accessible clickable chips linking to `/search?q=...`.
- Mobile responsive wrapping without overflow.
- Consistent styling with dark/light themes.

## Security considerations

- Static search queries; encoded safely via `searchHref`.

## Acceptance criteria

1. Home hero shows 4–5 clickable suggestion chips under the search input.
2. Clicking any chip navigates to `/search?q=...` and performs the search.
3. `/search` page displays the chips when opened without a `?q=` parameter.
4. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Go to `http://localhost:3000/`.
2. Click the chip "Server Actions".
3. Verify `/search?q=Server+Actions` loads with ranked video moments and lesson cards.
