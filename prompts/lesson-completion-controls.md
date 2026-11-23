# Implementation prompt: Lesson "Mark as Complete" and Advance Controls

## Goal

Provide learners with clear completion controls on the lesson page:
- Add a "Mark as Complete" toggle button in the lesson footer navigation bar (`LessonFooterNav`).
- When marked complete, visually indicate completion with a green badge/check, save state locally (or trigger completion analytics), and empower learners to effortlessly auto-advance to the next lesson in the curriculum.

## Skills and docs read

- `AGENTS.md` — §7 ("Progress is tracked per learner: which lessons they have completed... Surface it as completion marks and a resume affordance on the catalog, course, and lesson pages"), §13, §14.
- `components/lesson/lesson-footer-nav.tsx` and `components/lesson/lesson-sidebar.tsx`.

## Code inspected

- `components/lesson/lesson-footer-nav.tsx`: Contains `Previous Lesson` and `Next Lesson` buttons with course navigation links.
- `lib/analytics/events.ts`: Contains `lessonCompleted` event.

## Decisions and assumptions

1. **Footer Nav Enhancement**:
   - In `LessonFooterNav`, center a prominent "Mark as Complete" / "Completed" button between the Previous and Next lesson actions.
   - When clicked, toggle completion state, fire `lesson_completed` analytics event, and update visual state to a green checkmark indicator.
2. **Auto-Advance Prompt**:
   - If a "Next Lesson" exists and the learner completes the current lesson, highlight the "Next Lesson" button with an active visual treatment or prompt to continue learning.

## Files to touch

- `components/lesson/lesson-footer-nav.tsx` — add completion toggle button and state.
- `components/lesson/lesson-footer-nav-link.tsx` — styling enhancement for auto-advance.

## Requirements

- Accessible button with clear `aria-pressed` / `aria-label`.
- Clean keyboard navigation.
- Fires `lesson_completed` via PostHog.

## Security considerations

- Client component event capture and state management; non-destructive.

## Acceptance criteria

1. "Mark as Complete" appears in the lesson footer between previous and next buttons.
2. Clicking it toggles between "Mark as Complete" and "Completed ✓".
3. Fires PostHog analytics.
4. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Open `http://localhost:3000/lessons/data-fetching-and-caching`.
2. Scroll to the bottom footer bar.
3. Click "Mark as Complete".
4. Verify the button reflects "Completed" and "Next Lesson" is ready.
