# Implementation Prompt: Landing Page UI Refinement to Linear & Vercel Grade

## Goal

Refine and elevate the TraceLearn landing page (`app/page.tsx`) from a basic block layout into an ultra-high-craft, production-ready SaaS interface matching the design caliber of Linear, Vercel, Stripe, Raycast, and Perplexity.

We will replace the harsh full-width blue gradient block with an **architectural macOS/Linear-style interactive product preview window**, soften stark borders across the page, add interactive query switcher tabs, upgrade the feature bento with rich realistic UI components (waveform scrubber, GROQ query inspector, dark code editor), introduce authentic engineer testimonials, and polish the metrics and CTA sections into a cohesive enterprise-grade developer experience.

---

## Skills and Rules Read

- `RULE[user_global]`:
  - Senior Product Designer persona (Linear, Stripe, Notion, Vercel).
  - Minimal but not empty, dense but not cluttered, strong visual hierarchy, enterprise polish, delightful micro-interactions.
  - Avoid generic AI-generated dashboards, excessive gradients, oversized buttons, and random cards.
  - 12-column grid, responsive design, WCAG contrast compliance.
- `AGENTS.md`:
  - §2 (Implementation prompt in `prompts/`, user approval via question panel, verify with checks, short report).
  - §3 (Design execution and responsiveness down to 390px mobile).
  - §5 & §6 (Server and client boundaries, Next.js App Router, Tailwind v4 tokens, no client-side tokens).
  - §13 (Typecheck, lint, build verification).
- `prompts/ui-polish-elevation.md` & `prompts/saas-landing-page-elevation.md`.

---

## Code Inspected

- `app/page.tsx`: Current page composition and Sanity query fetch.
- `components/home/hero.tsx`: Current hero with the harsh cobalt block.
- `components/home/metrics-strip.tsx`: 4 metric cards.
- `components/home/feature-bento.tsx`: 5 feature cards.
- `components/home/how-it-works.tsx`: 3 workflow cards.
- `components/home/cta-banner.tsx`: Bottom conversion banner.
- `components/layout/site-header.tsx`: Header with `border-neutral-900` and `rounded-none` avatar.
- `components/search/search-form.tsx`: Search input with `⌘K` listener.

---

## Specific Refinements & Architectural Plan

1. **Header Polish (`components/layout/site-header.tsx`)**:
   - Soften the stark `border-b border-neutral-900` to an elegant hairline `border-b border-neutral-200/80`.
   - Update avatar styling from `rounded-none` to a refined modern `rounded-full` / `rounded-md`.

2. **Centered Editorial Hero with Interactive Product Window (`components/home/hero.tsx` & `components/home/product-preview.tsx`)**:
   - **Removal**: Drop the harsh full-bleed cobalt background block (`bg-gradient-to-b from-primary-500 to-primary-600`).
   - **Refined Typography & Framing**:
     - Shimmer pill badge: `TraceLearn 2.0 • The Video Search Engine for Developers`.
     - Confident, centered display heading: *"Search video lessons down to the exact second."*
     - Clear, high-readability subheadline: *"Query 50+ hours of full-stack engineering video in plain English. TraceLearn's grounded AI indexes transcripts down to the millisecond so you jump directly to working code."*
     - Dual CTA buttons: Primary `Explore Courses →` + Secondary `Quick Search ⌘K`.
     - Search command bar embedded directly within the product frame header.
     - **Interactive Product Showcase Window (`components/home/product-preview.tsx`)**:
       - macOS-style browser chrome with 3 muted traffic dots, address bar, and search input with `⌘K`.
       - Clickable live query pills:
         - *"Next.js Caching"*
         - *"Sanity Schema Types"*
         - *"Clerk Auth Middleware"*
         - *"Optimistic UI Updates"*
       - **Interactive Split View**:
         - **Left: Video Player Stage**: 16:9 mock player with active playback time `04:18`, current chapter marker badge, animated audio waveform, and play/seek controls.
         - **Right: Grounded Transcript & Code Panel**: Synchronized transcript text with highlighted search match, course source badge, and a syntax-highlighted TypeScript code block. Clicking any query pill updates the preview dynamically!

3. **Hairline Divided Metrics Strip (`components/home/metrics-strip.tsx`)**:
   - Convert from separate boxes to a continuous, modern hairline-divided bar (`divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80`).
   - Large crisp tabular numerals (`100%`, `< 1s`, `50+ hrs`, `12,000+`) with refined micro-labels and company credibility banner.

4. **High-Fidelity Feature Bento Grid (`components/home/feature-bento.tsx`)**:
   - Card 1: Interactive Seeker with real audio waveform bars, scrub head, and timestamp badges.
   - Card 2: Ground-truth verification with GROQ query syntax highlighter (`*[_type == "video" ...]`) and verified checkmarks.
   - Card 3: Code editor preview with dark VS Code theme, copy button, and code snippet.
   - Card 4: Progress tracker with circular completion gauge and resume card.
   - Card 5: Production curricula with module count, instructor badge, and student stats.

5. **Engineering Testimonials Section (`components/home/testimonials.tsx`)**:
   - Modern 3-column card row featuring engineering feedback on timestamp search speed, grounded accuracy, and curriculum depth.

6. **How It Works 2.0 (`components/home/how-it-works.tsx`)**:
   - Refined numbered cards with connecting dotted timeline indicator and clear technical steps.

7. **Enterprise SaaS CTA Banner (`components/home/cta-banner.tsx`)**:
   - Linear/Vercel style dark container with subtle ambient gradient, dual action buttons, and trust guarantees.

---

## Files to Touch

```
components/layout/site-header.tsx      Soften border and refine avatar radius
components/home/hero.tsx               Re-architect into centered editorial hero
components/home/product-preview.tsx    New: macOS-style interactive product preview with query switching
components/home/metrics-strip.tsx      Modern hairline-divided metrics bar
components/home/feature-bento.tsx      High-fidelity bento cards (waveform, GROQ, code editor)
components/home/how-it-works.tsx       Refined numbered workflow cards
components/home/testimonials.tsx       New: 3-column engineer testimonials
components/home/cta-banner.tsx         High-craft enterprise CTA banner
app/page.tsx                           Integrate all refined sections
```

---

## Acceptance Criteria

1. The landing page exudes the craft, restraint, and precision of Linear, Stripe, and Vercel.
2. The harsh blue block is eliminated in favor of an authentic interactive product window.
3. Users can click query tabs to see the product preview update in real-time.
4. All text, inputs, cards, and buttons have complete hover, focus, and active states.
5. `npm run typecheck`, `npm run lint`, and `npm run build` pass with 0 errors and 0 warnings.
6. Responsive across 1440px, 1024px, 768px, and 390px (mobile) with zero horizontal overflow.

---

## Checks to Run

```bash
npm run typecheck
npm run lint
npm run build
```

---

## Manual Test Steps

1. Run `npm run dev` and open `http://localhost:3000/`.
2. Verify the site header has a soft hairline border and clean avatar.
3. Review the Hero:
   - Check the centered typography and dual CTA buttons.
   - Inspect the macOS-style product preview window.
   - Click each query pill (*"Next.js Caching"*, *"Sanity Schema Types"*, *"Clerk Auth Middleware"*, *"Optimistic UI Updates"*) and confirm the video timestamp, transcript quote, and code snippet update interactively.
4. Review the hairline Metrics bar and credibility banner.
5. Review the upgraded Feature Bento with the audio waveform scrubber, GROQ query inspector, and code editor.
6. Review the Testimonials section and the 3-step workflow.
7. Verify the bottom dark CTA banner and course catalog grid.
8. Check responsive behavior on mobile (390px viewport width).
