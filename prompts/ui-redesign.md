# UI redesign: Poster Studio

## Goal

Replace the current UI — cream canvas + Playfair serif + orange accent — with a
"Poster Studio" direction: Swiss exhibition-poster typography, paper white, hard-edged
cobalt color blocks, zero radius, zero shadows. The current combination is flagged by
the `frontend-design` skill as AI-tell #1 (warm cream + high-contrast serif + terracotta
accent), so this is a deliberate move to a distinctive, authored identity. Full pass in
one prompt: tokens, fonts, brand mark, every component group, every page.

Approved by the user via question panel: direction = "Poster Studio — light, bold color
blocks", delivery = "Full pass, one prompt".

## Skills read

- `frontend-design` — design lead framing; AI-tell calibration; restraint; copy pass.
- `designing-frontend-interfaces` — the Iron Law (brief → token block → skeleton →
  components → one memorable moment → self-review); anti-slop table; five states per
  interactive element; hierarchy rules.
- `reviewing-interface-quality` — final audit method: screenshot at 1440 + 390, computed
  value counts, severity-graded findings.
- Aesthetic direction catalog (`references/aesthetic-directions.md`) — direction #2
  Swiss Rationalist blended with poster/Exhibition graphics, per the "blend exactly two,
  one dominant" rule.
- To be loaded at build time: `designing-user-experience` (states/flows),
  `building-accessible-interfaces` (required before shipping), `web-design-guidelines`
  (final pass).

## Design brief (locked)

```
Purpose:    Learning platform — browse courses, watch lessons, search by intent
Audience:   Self-directed learners, laptop + phone, scanning then settling in
Tone:       Poster Studio — Swiss exhibition poster, print-hard and confident
Reference:  1960s Müller-Brockmann concert posters; course-catalog print grids
Palette:    Paper #FAFAF8 / Ink #121212 / Cobalt #1B45F5 (accent, <10% surface)
            functional-only: green #16A34A (completed), amber #D97706 (in-progress)
Type:       Archivo variable (wdth 62..125, wght 100..900) — Expanded 800 display,
            regular text; tabular-nums for every duration/timestamp/count
Memorable:  Full-bleed hard-edged cobalt blocks; oversized numerals as module and
            lesson markers; flush-left poster typography
Restraint:  Zero radius, zero shadows, zero gradients, zero serif, zero cream,
            no centered airy hero, no decorative emoji
```

## Code inspected

- `app/globals.css` — `@theme` block (orange `primary-*`, slate `neutral-*`, cream
  `canvas`, 5 radii, 4 shadows), `@utility` type-scale classes (Playfair-pinned
  display classes), body defaults. Full rewrite of tokens.
- `app/layout.tsx` — `Inter` + `Playfair_Display` via `next/font/google`; both replaced
  by Archivo.
- `components/layout/page-frame.tsx` — framed column with diagonal-hatch gutters
  (`repeating-linear-gradient` inline). The hatch goes; the frame stays but goes flat
  paper with no stripes.
- `components/ui/button.tsx` — variant/size maps with `rounded-md`, `shadow-sm` on
  tertiary, primary = `bg-primary-500`. Pattern to preserve: `buttonClasses()` helper,
  `hovered` prop for the showcase, five states.
- `app/design-system/page.tsx` — 14-section showcase with raw hex swatch tables
  (orange/slate values). Rebuilt against new tokens; it is the visual diff target.
- `design/*.png` — the four current-design references. Kept as history; NOT the
  reproduction target for this task (AGENTS.md §3's "reproduce exactly" is overridden
  by the user's explicit redesign request).
- Usage scan (real numbers): 58 TSX files in `app/` + `components/`; 32 reference
  `primary-`, 15 use `font-display`, 39 use `rounded-`, 9 use `shadow-`, 17 use
  `canvas`. Raw hex outside `globals.css` exists only in `design-system/page.tsx`
  (swatch tables — expected) and `brand/course-marks.tsx` (SVG art).
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md` —
  `axes` option on `next/font/google` confirmed; Archivo's CSS from Google Fonts
  confirmed variable (`font-weight: 100 900`, `font-stretch: 62% 125%`).

## Decisions and assumptions

1. **Typeface: Archivo variable**, one family for everything, personality from width +
   weight axes: `wdth: 125, wght: 800` for display headlines (poster energy), regular
   (400/500/600) for text. Kills the serif/sans pair while keeping a real display
   voice. Loaded in `layout.tsx` with `axes: ["wdth"]` (weight is included by default),
   exposed as `--font-archivo`, mapped to `--font-sans`; `--font-display` now points at
   the same family so 15 existing `font-display` usages keep working but must be
   re-checked for the expanded treatment.
2. **Palette tokens renamed in meaning, not in class names.** The Tailwind-facing names
   (`primary-*`, `neutral-*`, `background`, `surface`, `canvas`) stay so the 32 files
   don't need identifier rewrites — only their hex values change:
   - `primary-*` → cobalt ramp: 600 `#1230C8` (hover), 500 `#1B45F5` (base),
     400 `#4A6FF8`, 300 `#8AA3FB`, 200 `#C7D2FD`, 100 `#E8EDFE`.
   - `neutral-*` → true neutral (not slate): 900 `#121212` (ink), 700 `#3D3D3D`,
     500 `#6E6E6E`, 300 `#B8B8B8`, 200 `#DEDEDE`, 100 `#EFEFEF`, 50 `#F5F5F5`.
   - `background` `#FAFAF8` (paper), `surface` `#FFFFFF`.
   - `canvas`/`canvas-line` → paper `#FAFAF8` / rule `#E4E4E1` (the framed column
     survives as a layout device, just flat and unstriped).
   - `lesson-bg`/`lesson-fg` (indigo badge) → ink-on-paper or cobalt-on-paper per the
     badge redesign; `success` `#16A34A` unchanged; add `warning` `#D97706` for
     in-progress status.
3. **Radius tokens collapse to zero.** `--radius-*` all become `0`. The 39 files using
   `rounded-*` classes then render square automatically; no per-file edit needed for
   radius itself, but every file gets touched anyway for the other changes. (Keeping
   the token names avoids a 39-file mechanical rewrite; values are what change.)
4. **Shadows deleted.** The four `--shadow-*` tokens become `none`; the 9 files with
   `shadow-*` classes lose them. Separation comes from 1px ink rules and color blocks.
   `tertiary` button drops its `shadow-sm`.
5. **The diagonal hatch** in `PageFrame` is removed (inline `backgroundImage` deleted);
   gutters become flat paper. The `max-w-360` framed column stays.
6. **Hero is not centered.** Current hero is center-aligned; Poster Studio is
   flush-left on the grid, oversized headline, cobalt block as the memorable moment
   (a full-bleed cobalt band carrying the search CTA, or the headline set in a hard
   cobalt field — decide at build, one only).
7. **Logo recolored** orange → cobalt in `components/brand/logo.tsx` (hand-authored
   SVG). `course-marks.tsx` keeps its black/white course tiles (they're content, not
   chrome) — only audit its `rx="16"` corner rounding: tiles become square.
8. **Badges** become solid rectangles: VIDEO = ink block/white text, LESSON = cobalt
   block/white text, POPULAR = cobalt text on paper with 1px ink border. Uppercase,
   tracked, zero radius.
9. **Numerals are a feature.** Module numbers, lesson numbers, durations, timestamps,
   result counts all get `font-variant-numeric: tabular-nums` and, where they're
   structural (module markers in course content, lesson numbers in sidebar), the
   oversized poster treatment.
10. **Status colors are functional only**: green = completed, amber = in-progress,
    ink = locked/neutral. Never decorative.
11. **Copy pass** in the same pass: headings and empty/error states in plain active
    voice, sentence case, no marketing fluff (per `frontend-design` writing rules).
12. **Responsive**: no mobile reference exists. Desktop (≥1024px) keeps the poster
    layouts exactly; below that, columns stack, the lesson sidebar collapses to a
    toggle/accordion, hero type steps down via the scale (not viewport units). No
    horizontal scroll at 390px.
13. **Nothing functional changes**: no data fetching, no API routes, no prop contracts,
    no server/client boundary moves, no Clerk/PostHog/Sanity wiring edits. Components
    keep their names, exports, and props — this is a visual replacement only.
14. **`/design-system` is rebuilt** section-for-section against the new tokens (it
    exists to be visually diffed); its raw hex tables now list cobalt/ink values.

## Files to touch

```
app/globals.css                        rewrite: @theme tokens, type utilities, base styles
app/layout.tsx                         Archivo (axes: wdth), metadata description
app/page.tsx                           hero flush-left + cobalt moment, section rules
app/courses/page.tsx                   heading + grid treatment
app/courses/[slug]/page.tsx            poster hero block, numeral treatment
app/lessons/[slug]/page.tsx            layout unchanged, tokens inherited
app/search/page.tsx                    results typography, count numerals
app/sign-in/.../page.tsx, app/sign-up/.../page.tsx   inherit tokens, minor tweaks
app/design-system/page.tsx             full rebuild against new tokens

components/brand/logo.tsx              orange → cobalt
components/brand/course-marks.tsx      square tiles (rx 16 → 0)
components/layout/page-frame.tsx       remove hatch, flat paper
components/layout/site-header.tsx      1px ink rule, square everything
components/nav/navbar.tsx              active state = cobalt, poster weight
components/nav/breadcrumbs.tsx         ink rules
components/nav/pagination.tsx          square current page, cobalt

components/ui/button.tsx               cobalt primary, zero radius, no shadows, 5 states
components/ui/badge.tsx                solid rectangles (see decision 8)
components/ui/card.tsx                 1px ink border, zero radius, no shadow
components/ui/status-indicator.tsx     functional green/amber/ink
components/ui/progress-bar.tsx         square track/fill, ink or cobalt fill
components/ui/search-input.tsx         square, 1px ink border, cobalt focus
components/ui/select.tsx               square, cobalt focus
components/ui/avatar.tsx               audit radius only

components/home/hero.tsx               flush-left poster hero + one cobalt block
components/home/chart-decoration.tsx   flatten to a hard-edged block or cut (decision at build)
components/cards/course-card.tsx        square tile, ink rules, no shadow
components/cards/course-grid.tsx        no shadow
components/cards/lesson-card.tsx       badge + numerals
components/cards/lesson-video-card.tsx timestamp numerals emphasized
components/cards/resource-card.tsx     square, ink rules

components/course/course-hero.tsx       cobalt/ink block hero, oversized title
components/course/course-content.tsx    oversized module numerals
components/course/learning-outcomes.tsx numeral/icon treatment
components/course/course-progress-bar.tsx  square, functional color
components/course/course-hero-actions.tsx  button variants
components/course/course-resume-link.tsx   inherit

components/lesson/lesson-header.tsx     poster title, lesson number numeral
components/lesson/lesson-sidebar.tsx    collapsible, numerals, status colors
components/lesson/lesson-tabs.tsx       square tabs, cobalt active rule
components/lesson/lesson-video.tsx      audit shadow only
components/lesson/lesson-notes.tsx      type treatment
components/lesson/lesson-key-points.tsx numerals
components/lesson/lesson-resources.tsx  square cards
components/lesson/lesson-footer-nav.tsx square buttons, numerals
components/lesson/lesson-bookmark-button.tsx  cobalt active
components/lesson/lesson-header.tsx     (listed above)
components/lesson/lesson-curriculum.ts  audit only if it carries visual classes

components/search/search-form.tsx       square input, cobalt focus
components/search/search-results.tsx    count numerals, no shadow
components/search/result-card.tsx       no shadow, ink rules
components/search/video-result-card.tsx "Watch from 12:45" as mono/tabular numerals
components/search/lesson-result-card.tsx  badge + numerals
components/search/search-empty-state.tsx  copy + poster treatment
components/search/course-icon.tsx       font-display audit

lib/utils.ts                            (only if cn() needs changes — expected: no)
```

Estimated ~45 files. No new dependencies (Archivo via `next/font/google`; `lucide-react`
already present). No file deletions.

## Requirements

1. **Tokens first** (Iron Law): rewrite `@theme` in `app/globals.css` per decisions 1–4
   before touching components. Type utilities (`text-display-1` … `text-small`) keep
   their names but retarget: display sizes gain `font-stretch: 125%` + `font-weight:
   800` + tight tracking; body stays 400. One type ratio (1.25 major third) across the
   scale — recompute the eight utility sizes to it.
2. **Fonts**: `layout.tsx` loads Archivo with `axes: ["wdth"]`, `variable: "--font-archivo"`;
   `--font-sans` and `--font-display` both resolve to it; remove Inter + Playfair.
   Update the metadata description (it currently describes the old design language).
3. **Every interactive element keeps all five states** (rest, hover, active,
   focus-visible, disabled) with cobalt focus rings; never `outline: none` without a
   replacement. Loading states reserve space.
4. **No raw hex in components** — everything through tokens (existing rule; the
   design-system swatch tables and SVG brand art are the only exceptions).
5. **One memorable moment only** — the cobalt block treatment on the home hero (and
   echoed once in the course hero). Not repeated as decoration on every section.
6. **Accessibility floor**: body text ≥ 4.5:1 on paper (ink `#121212` on `#FAFAF8` ≈
   17:1 ✓; white on cobalt `#1B45F5` must be checked — if < 4.5:1 at body size, badge
   and button text stay at semibold 14px+ which qualifies as large-ish, else darken to
   `#1230C8`); one `<h1>` per page; focus visible; `prefers-reduced-motion` respected
   (transitions ≤ 220ms, transform/opacity only); icon-only buttons keep aria-labels.
7. **Copy pass**: headings sentence case, active voice; empty states say what to do;
   errors state the fix. No "WORD — fragment" labels, no tracked-out all-caps eyebrows
   except badge/status chips where uppercase is the existing spec.
8. **`/design-system` showcase** rebuilt: all 14 sections, new hex tables (cobalt/ink
   ramp), Archivo type specimen incl. the width axis, radius section now documents
   "0 — deliberate", shadow section documents "none", buttons/inputs/badges/status
  /cards/nav match the live components exactly.
9. **Responsive**: verify 1440, 1024, 768, 390. Lesson sidebar collapses below `lg`.
   No horizontal scroll anywhere.

## Security considerations

Presentational only. No env vars, no tokens, no network calls, no `dangerouslySetInnerHTML`,
no new client components (existing client components stay client). Server/client
boundaries, data fetching, and the private-token rules in AGENTS.md §5/§12 are untouched.
No changes to API routes or middleware.

## Acceptance criteria

1. `npm run typecheck`, `npm run lint`, `npm run build` all pass.
2. No occurrence of Playfair/Inter references remain; `grep -r "Playfair\|font-playfair\|font-inter"`
   returns nothing outside `prompts/` history.
3. No orange remains: `grep -rn "primary-500" | xargs grep -l "#F97316"`-style checks
   show the token now maps to cobalt; visually, zero orange on any page.
4. `grep -rn "rounded-" app components` classes exist but resolve to 0 (tokens) — no
   visible curvature in screenshots.
5. Zero `box-shadow` visible in computed styles of rendered pages.
6. Screenshots at 1440×900 and 390×844 for `/`, `/courses`, a course detail, a lesson,
   `/search`, `/design-system`: read them and confirm the brief's Memorable line is
   present and the Restraint line is respected.
7. Axe scan: zero violations (or each justified in writing).
8. Keyboard walk: every interactive element shows a cobalt focus ring; tab order
   matches visual order.
9. Console: no new errors; PostHog/Clerk warnings unchanged from before.
10. The self-review rubric from `designing-frontend-interfaces` scored honestly; any
    "no" fixed before reporting.

## Checks to run

```bash
npm run typecheck
npm run lint
npm run build
npm run dev   # then Playwright screenshots at 1440 + 390 of the six routes
npx @axe-core/cli http://localhost:3000 --exit   # or per-page equivalent
grep -rn "Playfair\|Inter\b" app components --include="*.tsx"   # expect: none
grep -rn "shadow-" app components --include="*.tsx"            # expect: none (or audit leftovers)
```

Report real output for each.

## Manual test steps (user)

1. `npm run dev`, open `http://localhost:3000/` — flush-left poster hero, one cobalt
   block, Archivo Expanded headline, no cream, no serif, no orange.
2. Tab through the header and hero — cobalt focus rings on Sign in/Sign up, search
   input, Explore Courses.
3. Visit `/courses`, open a course — oversized module numerals, square tiles, ink
   rules, no shadows.
4. Open a lesson — sidebar collapsible below `lg`, status colors green/amber only.
5. Search a query — result count and "Watch from MM:SS" render as tabular numerals.
6. Resize 1440 → 390: no horizontal scroll, stacks sensibly.
7. `/design-system`: diff against the live components; hex tables list cobalt/ink.
8. `prefers-reduced-motion: reduce` in devtools — transitions suppressed.

## Out of scope

- Missing features (`/my-learning` route, instructor pages, progress API) — nav links
  remain, still 404; flagged separately.
- Dark mode (direction is light; tokens are structured so it could be added later).
- Any data, search, auth, analytics, or Studio change.
- The old `design/*.png` references stay as history.
