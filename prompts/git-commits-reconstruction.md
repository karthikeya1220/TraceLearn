# Implementation Plan: 10 Feature Commits Across 48 Hours

## Goal
Re-initialize git for TraceLearn (`git init`) and create 10 distinct, feature-logical commits with timestamps evenly distributed from day before yesterday (2026-11-21 00:57:50 +0530) to now (2026-11-23 00:57:50 +0530).

---

## Commit Schedule & Breakdown

1. **Commit 1: Project foundation & configuration**
   * **Date:** `2026-11-21 00:57:50 +0530`
   * **Scope:** Base config, package manifests, tsconfig, next config, eslint, tailwind/postcss, root docs, public assets.
   * **Files:** `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `.env.example`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `proxy.ts`, `skills-lock.json`, `public/`, `design/`, `prompts/`.

2. **Commit 2: Sanity schema & Studio workspace**
   * **Date:** `2026-11-21 06:17:50 +0530`
   * **Scope:** Sanity schemas for courses, modules, lessons, instructors, categories, videos, agent context; Studio workspace config and scripts.
   * **Files:** `sanity.cli.ts`, `sanity.config.ts`, `sanity.types.ts`, `sanity/`, `studio/`.

3. **Commit 3: Design system, UI primitives & typography**
   * **Date:** `2026-11-21 11:37:50 +0530`
   * **Scope:** Core design system components, typography styles, utility helpers, and global styles.
   * **Files:** `app/globals.css`, `app/design-system/`, `components/ui/`, `components/brand/`, `lib/utils.ts`, `lib/format.ts`.

4. **Commit 4: Layout & navigation shell**
   * **Date:** `2026-11-21 16:57:50 +0530`
   * **Scope:** Root layout, header, footer, desktop/mobile navigation bars, navigation links.
   * **Files:** `app/layout.tsx`, `app/favicon.ico`, `components/layout/`, `components/nav/`, `lib/routes.ts`.

5. **Commit 5: Authentication with Clerk**
   * **Date:** `2026-11-21 22:17:50 +0530`
   * **Scope:** Sign-in and sign-up pages, Clerk auth route protection.
   * **Files:** `app/sign-in/`, `app/sign-up/`.

6. **Commit 6: Home landing page & course catalog**
   * **Date:** `2026-11-22 03:37:50 +0530`
   * **Scope:** Marketing landing page, featured courses grid, course card components, catalog browsing.
   * **Files:** `app/page.tsx`, `app/courses/`, `components/home/`, `components/cards/`.

7. **Commit 7: Course details & curriculum viewer**
   * **Date:** `2026-11-22 08:57:50 +0530`
   * **Scope:** Course overview page, learning outcomes, module & lesson lists, instructor bio.
   * **Files:** `components/course/`.

8. **Commit 8: Lesson player & video notes**
   * **Date:** `2026-11-22 14:17:50 +0530`
   * **Scope:** Interactive lesson viewer, video provider embeds, timestamp navigation, portable text notes rendering.
   * **Files:** `app/lessons/`, `components/lesson/`, `lib/video.ts`, `lib/portable-text.ts`.

9. **Commit 9: Product analytics with PostHog**
   * **Date:** `2026-11-22 19:37:50 +0530`
   * **Scope:** Client and server PostHog instrumentation, event tracking for video watch time, searches, and course progress.
   * **Files:** `instrumentation-client.ts`, `posthog-self-driving-report.md`, `lib/analytics/`, `lib/posthog-server.ts`, `components/posthog/`, `components/analytics/`.

10. **Commit 10: Intelligent AI search with Sanity Context MCP**
    * **Date:** `2026-11-23 00:57:50 +0530`
    * **Scope:** Intelligent search API route, MCP context integration, AI query grounding, search results page with video moments and lessons, agent configuration.
    * **Files:** `app/search/`, `app/api/`, `app/studio/`, `components/search/`, `lib/search/`, `agent/`, `.agents/`, `.claude/`.

---

## Execution Steps
1. Run `git init -b main`.
2. Configure git commit author (if not already set in user gitconfig).
3. Stage and commit in 10 sequential steps, specifying `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE` for each commit.
4. Verify `git log --oneline --format="%h %ad %s" --date=iso` to confirm exact dates and messages.
