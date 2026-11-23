# UI Polish & Elevation: High-Craft Editorial & Tech (Linear / Stripe Style)

## Goal

Elevate the current "Poster Studio" base into a refined, high-craft editorial and tech product interface (inspired by Linear, Stripe, Raycast, and Vercel). 

While the current pass established clean geometry and structured typography, the extreme brutalism (solid black `border-neutral-900` on every card and zero elevation) feels stark and flat rather than premium. We will soften harsh ink rules into layered, subtle borders (`border-neutral-200/300`), reintroduce refined micro-radii (subtle 4px/6px or clean 8px modern curves), introduce modern surface elevations (`shadow-[0_1px_3px_rgba(0,0,0,0.04)]` with smooth hover lift), craft crisp micro-interactions, and give cards, search inputs, pills, and the course/lesson layouts an enterprise-grade finish.

## Key Design Decisions & Improvements

1. **Refined Borders & Layering**:
   - Replace heavy `border-neutral-900` on card surfaces, course content containers, and inputs with subtle, elegant rules (`border-neutral-200` default, `border-neutral-300` on hover, or subtle dual-tone borders).
   - Reserve deep ink rules (`border-neutral-900` or cobalt) strictly for active states, key section headers, and focus rings.

2. **Subtle Modern Elevation & Micro-Radii**:
   - Introduce crisp, modern micro-radii (`--radius-sm: 4px`, `--radius-md: 6px`, `--radius-lg: 8px`, `--radius-xl: 12px`) for cards, search bars, buttons, and video frames so components feel tactile rather than harsh.
   - Introduce modern, subtle ambient shadows on cards and interactive surfaces (`shadow-xs` / `shadow-sm`: `0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)`), elevating on hover (`hover:shadow-md hover:border-neutral-300`).

3. **Hero & Search Elevation**:
   - Elevate the hero search from a flat block into a high-craft search command container with shortcut badges (`⌘K` aesthetic), subtle inner shadows, refined input focus states, and smooth transition feedback.
   - Refine the cobalt banner into an elegant interactive panel with a subtle border sheen and depth rather than a plain flat wash.

4. **Micro-Interactions & Hover Polish**:
   - Add snappy, delightful transitions (`transition-all duration-150 ease-out`).
   - Cards subtly lift or highlight on hover (`hover:-translate-y-0.5 hover:shadow-md`).
   - Active and playing states in `lesson-sidebar.tsx` and `course-content.tsx` get clear, luminous treatment with subtle cobalt accents and smooth playhead cues.

5. **Course & Lesson Cards Polish**:
   - Refine thumbnail overlays, progress bars, and metadata chips.
   - Clean badges with modern tonal palettes (`bg-neutral-100 text-neutral-800` or `bg-primary-50 text-primary-700 border border-primary-200`).

## Files to Update

- `app/globals.css`: Reintroduce refined radius tokens and subtle enterprise shadows; adjust canvas lines.
- `components/ui/card.tsx`: Subtle border, refined background, ambient shadow, smooth hover transition.
- `components/ui/button.tsx`: Tactile depth, micro-radius, polished pressed states.
- `components/ui/badge.tsx`: Refined padding, border, and modern tonal palette.
- `components/ui/search-input.tsx`: Modern command-input styling with keyboard hint styling.
- `components/home/hero.tsx`: High-polish hero headline, refined search container, and modern CTA.
- `components/cards/course-card.tsx` & `components/cards/lesson-card.tsx`: Hover lift, refined borders, polished metadata.
- `components/lesson/lesson-sidebar.tsx`: Clean active row highlights, modern completion marks.
- `components/course/course-content.tsx`: Refined accordion borders and expanded state polish.

## Acceptance Criteria

1. Interfaces feel unmistakably premium, modern, and production-ready (like Stripe / Linear / Vercel).
2. No harsh black borders crowding content; subtle contrast and depth guide the eye.
3. Every interactive element has smooth hover, active, focus, and disabled states.
4. `npm run lint`, `npm run typecheck`, and `npm run build` pass without errors.
5. All functionality, data access, and routing remain untouched.
