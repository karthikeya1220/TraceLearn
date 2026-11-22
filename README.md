# TraceLearn

An AI-powered video learning platform featuring natural language search and second-accurate video playback, built with Next.js App Router, Sanity CMS, Clerk Authentication, and PostHog Analytics.

---

## Overview

TraceLearn rethinks educational content discovery. Rather than manually skipping through video courses, learners can execute natural language queries to discover specific concepts and jump directly to the exact second in the lesson video where that topic is taught.

Course instructors and authors can manage course modules, lessons, video ingestion pipelines, and instructor bios through an isolated Sanity Studio workspace.

---

## Key Features

- **Intelligent Video Search:** Natural language search powered by Sanity Context MCP and LLM integration, returning grounded results with clickable timestamps that seek directly to relevant video segments.
- **Structured Course & Curriculum Hierarchy:** High-level courses, ordered modules, and granular lesson documents with rich Portable Text notes, key takeaways, and resources.
- **Provider-Agnostic Video Playback:** Seamless embeds supporting YouTube, Vimeo, and Bunny players with direct second-seeking query parameters.
- **Authentication & User Management:** User sign-in, registration, session handling, and protected routes using Clerk.
- **Learner Progress Tracking:** Per-learner completion state and resume position tracking keyed off Clerk user identities.
- **Product Telemetry & Analytics:** Client and server event tracking via PostHog for catalog browsing, searches, video watch time, and course completion.
- **Headless Content Management:** Content authoring in Sanity Studio with live previews, GROQ queries, and end-to-end TypeScript type generation.

---

## Tech Stack

- **Framework:** Next.js (App Router, React 19, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Headless CMS:** Sanity Studio, `next-sanity`, `@portabletext/react`, `@sanity/image-url`
- **Authentication:** Clerk (`@clerk/nextjs`)
- **Product Analytics:** PostHog (`posthog-js`, `posthog-node`)
- **AI & Context:** Sanity Context MCP, Vercel AI SDK, OpenAI

---

## Project Structure

```text
TraceLearn/
├── app/                  # Next.js App Router (pages, layouts, routes, API)
│   ├── api/              # Server API routes (search, progress, analytics)
│   ├── courses/          # Course catalog and course detail views
│   ├── lessons/          # Interactive lesson viewer with video embeds
│   ├── search/           # Search results page (moments and lessons)
│   ├── sign-in/          # Authentication pages
│   └── studio/           # Embedded Studio route
├── components/           # Reusable UI components
│   ├── cards/            # Course and lesson cards
│   ├── course/           # Course page sections and curriculum tree
│   ├── layout/           # Header, navigation, footer
│   ├── lesson/           # Lesson player, notes tabs, timestamp navigation
│   ├── search/           # Search input and result cards
│   └── ui/               # Core design system primitives
├── lib/                  # Utilities, formatters, and server helpers
│   ├── analytics/        # PostHog client/server helpers
│   ├── search/           # Search MCP and system prompts
│   └── video.ts          # Video provider parsing and seek helpers
├── sanity/               # Sanity client, queries, and type definitions
├── studio/               # Standalone Sanity Studio workspace
└── public/               # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js (v18.18+ or v20+)
- npm, yarn, or pnpm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd TraceLearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your configuration keys:
   - **Sanity:** Project ID, Dataset name, Viewer API Read Token
   - **Clerk:** Publishable Key, Secret Key
   - **PostHog:** Host and Project API Key
   - **Sanity Context MCP & OpenAI:** MCP URL and API Key

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `npm run dev` - Starts the Next.js development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint checks
- `npm run typegen` - Generates TypeScript definitions from Sanity schemas

---

## License

This project is licensed under the MIT License.
