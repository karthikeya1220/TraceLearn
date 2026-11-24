# Implementation Prompt: High-Craft SaaS Landing Page Elevation

## Goal

Elevate TraceLearn's landing page (`app/page.tsx`) into a world-class, production-ready SaaS application interface inspired by Linear, Stripe, Vercel, and Raycast.

The current home page is minimal and flat: a basic hero with a search bar, a 3-course grid, and an arbitrary placeholder chart bar graphic (`ChartDecoration`). We will transform it into an enterprise-grade SaaS experience that clearly demonstrates TraceLearn's core superpower — **direct-to-second AI video timestamp search and grounded developer education** — through an elevated hero with an interactive product preview, an enterprise metrics & proof strip, a 12-column feature bento grid, an interactive 3-step workflow, and a high-converting closing CTA banner.

---

## Skills and Guidelines Read

- `AGENTS.md`:
  - §1 (Product vision: learning platform with direct timestamp video search)
  - §2 (Work loop: read skills, inspect code, write prompt in `prompts/`, get user approval via question panel, implement, run checks)
  - §3 & `user_global` (UI Design Rules: Senior Product Designer from Linear/Stripe/Vercel; minimal but not empty, dense but not cluttered, 12-column grid, subtle borders, modern elevation, no generic AI-slop)
  - §5 & §6 (Clean boundaries, App Router, Tailwind v4 tokens, no client-side tokens, read-only display)
  - §11 (Intelligent search principles and grounding)
  - §13 (Validation checks: typecheck, lint, build)
- `prompts/ui-polish-elevation.md` (Refined borders, micro-radii, ambient shadows, tactile feedback)
- `prompts/ui-redesign.md` (Poster Studio typography tokens, Archivo variable font, cobalt accent palette)

---

## Code Inspected

- `app/page.tsx`: Current home page layout and Sanity fetch logic (`COURSES_LIST_QUERY`, `CACHE_TAGS`).
- `components/home/hero.tsx`: Existing poster hero with basic search bar and suggestion pills.
- `components/home/chart-decoration.tsx`: Flat decorative bars at the bottom (placeholder to be replaced with a high-conversion SaaS CTA section).
- `components/layout/page-frame.tsx`: Fixed-width framed layout (`max-w-360`).
- `components/layout/site-header.tsx`: Navigation bar with logo, links, and auth controls.
- `components/layout/site-footer.tsx`: Global footer with platform links.
- `components/cards/course-grid.tsx` & `components/cards/course-card.tsx`: Course cards with metadata and hover states.
- `components/search/search-form.tsx` & `components/search/search-suggestions.tsx`: Command input with `⌘K` shortcut.
- `app/globals.css`: Tailwind v4 theme variables, typography utilities, surface tokens.

---

## Design Decisions & Architectural Plan

1. **Hero Elevation with Interactive Product Demo (`components/home/hero.tsx`)**:
   - **Feature Pill**: Modern badge with pulse indicator (`TraceLearn 2.0 • Direct Video Timestamp Search`).
   - **Headline**: High-contrast, confident display typography: *"Search video lessons down to the exact second."*
   - **Subheadline**: *"Stop scrubbing through hours of video. Ask technical questions in plain English and jump directly to the exact timestamp where the solution is taught."*
   - **Action Bar**: Primary CTA button (*"Explore Courses"*) + Secondary action (*"Try Video Search"* with `⌘K` hint).
   - **Search Console**: Refined command search box with `⌘K` shortcut badge and clickable suggestion pills.
   - **Interactive Product Showcase Card**: An embedded, live-feeling video player & transcript preview showing a real query:
     - Query: *"How do I cache fetched data in Next.js?"*
     - Timestamp Match: `04:18 — Route Segment & Fetch Caching`
     - Sourced Course: `Data Fetching and Caching`
     - Transcript quote highlight with instant *"Watch from 04:18"* jump button that directly links to `/lessons/data-fetching-and-caching?t=258`.
     - Visually proves the platform's core differentiator above the fold.

2. **Enterprise Proof & Metrics Strip (`components/home/metrics-strip.tsx`)**:
   - Modern 4-column metric bar with subtle borders (`border-neutral-200/80`) and surface elevation:
     - **100% Grounded**: Zero AI hallucinations. Answers strictly sourced from verified lesson transcripts.
     - **< 1s Seek Time**: Instant two-stage chapter & transcript timestamp pinpointing.
     - **50+ Hours**: Curated production curriculum built by experienced software architects.
     - **12,000+**: Timestamps indexed across full-stack engineering courses.
   - Micro social-proof tag: *"Trusted by self-directed engineers building production software."*

3. **Core Features Bento Grid (`components/home/feature-bento.tsx`)**:
   - Structured 12-column layout with subtle borders, micro-radii, and hover transitions:
     - **Card 1 (Col 7 - Primary Superpower)**: *Timestamp-Precision Video Intelligence*. Visual timeline player showing how queries map to exact chapter marks and audio chunks.
     - **Card 2 (Col 5)**: *100% Ground-Truth Verification*. Powered by the Sanity Context graph and GROQ; no fabricated code snippets, only real verified course content.
     - **Card 3 (Col 4)**: *Synchronized Code & Notes*. Portable Text notes alongside video lessons with copyable code snippets.
     - **Card 4 (Col 4)**: *Automatic Progress & Device Sync*. Clerk-authenticated learner state keeps completion marks and resume points synchronized.
     - **Card 5 (Col 4)**: *Production-Grade Curricula*. Comprehensive architectures covering Next.js, Sanity, AI integrations, and full-stack deployment.

4. **"How It Works" 3-Step Interactive Workflow (`components/home/how-it-works.tsx`)**:
   - Visual workflow detailing the learner journey:
     - **01. Ask in Natural Language**: Type any concept, bug query, or library question.
     - **02. Two-Stage Timestamp Resolution**: Chapters are evaluated first for clean topics, followed by audio transcript chunks for deep technical queries.
     - **03. Learn in Context**: Video starts at that exact second with synchronized curriculum notes and resources.

5. **Curated Courses Showcase Section (`app/page.tsx`)**:
   - Retains live Sanity data fetching via `COURSES_LIST_QUERY` and `CourseGrid`.
   - Polished header: *"Featured Engineering Curricula"*, category tabs preview, and clean link to `/courses`.
   - Subtle guarantee/value pill: *"Every course includes source code, interactive transcripts, and lifelong updates."*

6. **High-Conversion SaaS CTA Banner (`components/home/cta-banner.tsx`)**:
   - Replaces the placeholder `ChartDecoration` with a high-impact conversion card:
     - Deep ink surface (`bg-neutral-900`) with subtle cobalt glow and crisp typography.
     - Value proposition: *"Start learning with timestamp precision."*
     - Dual actions: *"Browse All Courses"* and *"Try Instant Search"*.
     - Reassurance badges: No credit card required to explore free previews.

---

## Files to Create / Modify

```
components/home/hero.tsx               Enhance with SaaS typography, dual CTAs, search console & interactive video preview
components/home/metrics-strip.tsx      New: 4-column enterprise trust and proof metrics
components/home/feature-bento.tsx      New: 12-column modern SaaS bento grid showcasing core capabilities
components/home/how-it-works.tsx       New: 3-step interactive learning workflow
components/home/cta-banner.tsx         New: High-conversion bottom SaaS CTA section
app/page.tsx                           Integrate new modular sections cleanly into the home route
```

---

## Requirements & Constraints

1. **Brand & Design Consistency**:
   - Adhere strictly to `RULE[user_global]` (Linear/Stripe/Vercel SaaS aesthetic: subtle borders, crisp typography, clean micro-radii, restrained cobalt accents, no loud gradients or AI slop).
   - Maintain the established tokens (`primary-500`, `neutral-*`, `surface`, `canvas`, `shadow-xs/sm`).
2. **Performance & Boundaries**:
   - Preserve zero client-side Sanity/Clerk tokens (AGENTS.md §5 & §12).
   - Server components by default; client components only for interactive elements (`SearchForm`, etc.).
   - Responsive across desktop (1440px), tablet (1024px, 768px), and mobile (390px) with no horizontal overflow.
3. **Zero Regression**:
   - Data fetching logic (`sanityFetch`, `COURSES_LIST_QUERY`, `CACHE_TAGS`) remains functional and untouched.
   - All links resolve to valid routes (`/courses`, `/lessons/...`, `/search`).

---

## Security Considerations

- Presentational and layout enhancements only.
- No sensitive keys or tokens exposed.
- User input via `SearchForm` sanitized by existing route handlers.

---

## Acceptance Criteria

1. Home page renders as a world-class SaaS application matching Stripe/Linear/Vercel quality standards.
2. The core value prop (direct video timestamp search) is immediately understandable above the fold.
3. Metric strip, feature bento, how-it-works workflow, courses showcase, and bottom CTA render with responsive precision.
4. `npm run typecheck`, `npm run lint`, and `npm run build` pass with 0 errors and 0 warnings.
5. All interactive buttons, search inputs, and links function smoothly with proper focus rings and hover states.

---

## Checks to Run

```bash
npm run typecheck
npm run lint
npm run build
```

---

## Manual Test Steps

1. Run `npm run dev` and navigate to `http://localhost:3000/`.
2. Inspect the Hero section:
   - Check the `TraceLearn 2.0` badge, punchy headline, and dual CTA buttons.
   - Verify the search input works and pressing `⌘K` focuses the input.
   - Inspect the interactive preview card demonstrating the Next.js query with `04:18` timestamp and link to the lesson.
3. Scroll through the page:
   - Verify the 4-column Metrics Strip displays cleanly.
   - Verify the Feature Bento Grid highlights timestamp search, ground-truth GROQ AI, and progress tracking.
   - Verify the 3-step "How It Works" workflow is clear and responsive.
   - Verify the Featured Courses grid loads live Sanity data and navigates to `/courses`.
   - Verify the bottom CTA Banner looks enterprise-grade and links to courses.
4. Resize viewport to 390px (mobile) to verify no horizontal scrolling and clean stacking.
