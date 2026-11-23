# Implementation prompt: Global Site Footer

## Goal

Add a clean, enterprise-grade global site footer (`SiteFooter`) to ground every page on Vertex / TraceLearn, fulfilling core UX expectations:
- Provides brand identity, copyright, navigation links (All Courses, My Learning, Search), and platform links.
- Consistent with the design system: 1px ink rule border, dark neutral text, Playfair brand touch, and responsive layout across desktop and mobile.

## Skills and docs read

- `AGENTS.md` — §3 (UI work: adapt desktop cleanly down to mobile, reuse existing Tailwind patterns), §5 (server and client boundaries), §13, §14 ("keep it small").

## Code inspected

- `components/layout/page-frame.tsx`: Wraps all pages.
- `components/layout/site-header.tsx`: Header pattern with Logo and nav links.
- `components/brand/logo.tsx`: Brand logo SVG component.

## Decisions and assumptions

1. **Footer Layout**:
   - Placed at the bottom of the page frame.
   - Left side: Logo, brand tagline ("Intelligent Learning Platform"), and copyright.
   - Right side: Clean columns for "Platform" (Courses, Search, My Learning) and "Connect" (GitHub, Docs/Studio).
2. **Integration**:
   - Added to `PageFrame` or directly imported into pages so it consistently renders at the bottom of the canvas. Adding it to `components/layout/site-footer.tsx` and rendering it inside `PageFrame` (or within main page layouts) keeps it clean and uniform.

## Files to touch

- `components/layout/site-footer.tsx` — new component.
- `components/layout/page-frame.tsx` — integrate `SiteFooter` at the bottom of the sheet.

## Requirements

- Responsive: stacks on mobile, clean horizontal flex/grid on desktop.
- WCAG compliant contrast with subtle border separator.
- Valid links to existing routes (`/courses`, `/my-learning`, `/search`, `/studio`).

## Security considerations

- Static links; no external scripts or unsafe hrefs.

## Acceptance criteria

1. Global footer renders at the bottom of `/`, `/courses`, `/search`, `/my-learning`, and `/instructors/[slug]`.
2. All footer links navigate correctly.
3. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Navigate to `http://localhost:3000/`.
2. Scroll to the bottom and verify footer displays brand, links, and copyright.
3. Test responsiveness at 375px mobile viewport.
