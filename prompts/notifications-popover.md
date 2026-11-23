# Implementation prompt: Notifications Popover in Site Header

## Goal

Transform the inactive notification bell button in `components/layout/site-header.tsx` into an interactive notifications popover, eliminating dead-end UI and informing learners about platform updates, new courses, and milestone achievements.

## Skills and docs read

- `AGENTS.md` — §7 ("Some surfaces are presentational only, with no backend of their own: the My Learning page, the notifications bell..."), §13, §14.
- `components/layout/site-header.tsx`.

## Code inspected

- `components/layout/site-header.tsx`: Renders `<Bell className="size-6" />` as an isolated button with no handler or popover state.

## Decisions and assumptions

1. **Interactive Popover**:
   - Create a dedicated client component `components/layout/notifications-popover.tsx`.
   - Displays unread indicator dot on the bell icon.
   - When clicked, opens a floating popover anchored to the bell with:
     - Header: "Notifications" + "Mark all as read" affordance.
     - Notifications list: Real platform notifications (e.g., "Welcome to Vertex! Search lessons down to the second.", "New Course: Full-Stack Next.js with Sanity").
     - Clear empty / all-caught-up state.
   - Closes gracefully on outside click or pressing `Escape`.

## Files to touch

- `components/layout/notifications-popover.tsx` — new client popover component.
- `components/layout/site-header.tsx` — use `NotificationsPopover` in place of the static bell button.

## Requirements

- Accessible popover with `aria-expanded` and focus handling.
- Click outside / escape to dismiss.
- Mobile responsive placement.

## Security considerations

- Presentational client state; non-destructive.

## Acceptance criteria

1. Clicking the notification bell in the site header toggles the notifications menu.
2. Displays recent platform announcements and updates.
3. Clicking outside or pressing `Escape` dismisses the menu.
4. Type check, lint, and build pass cleanly.

## Checks to run

`npm run typecheck`, `npm run lint`, `npm run build`.

## Manual test steps

1. Sign in or load the header with signed-in state.
2. Click the bell icon in the top right.
3. Verify the notifications dropdown opens with recent updates.
4. Click outside or press `Escape` to close.
