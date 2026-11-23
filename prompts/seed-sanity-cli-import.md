# Implementation prompt: Seed Sanity using provided seed.ndjson and videos.json

## Goal

Seed the Sanity `production` dataset using the provided `studio/scripts/seed/seed.ndjson` and `studio/scripts/seed/videos.json` files via the Sanity CLI (`sanity dataset import`) without modifying any of the provided files or generating new content, and verify the resulting document counts in Sanity.

## Skills and docs read

- `AGENTS.md` — §2 (how to work: prompt, approval, execution, report), §5 (Studio workspace owns content authoring and seed import), §8 (content modeling: categories, instructors, courses, lessons), §12 (private dataset, authenticated Sanity CLI import), §13 (checks to run: verify dataset and document counts).
- `sanity-best-practices` — Sanity dataset import patterns, deterministic `_id`s, idempotent `--replace` flag, asset uploading with `_sanityAsset`.

## Code inspected

- `studio/scripts/seed/seed.ndjson` — 141 total documents ready for ingestion:
  - 6 `category` documents
  - 5 `instructor` documents
  - 10 `course` documents
  - 120 `lesson` documents
  - Uses `_sanityAsset` URLs for cover images, instructor portraits, and lesson poster frames.
- `studio/scripts/seed/videos.json` — 120 resolved YouTube video metadata entries (id, title, channel, duration, query) backing the 120 lessons.
- `studio/package.json` — `seed:import` script: `sanity dataset import scripts/seed/seed.ndjson --dataset production --replace`.
- `studio/sanity.cli.ts` & `studio/env.ts` — Reads `SANITY_STUDIO_PROJECT_ID` (`wbh0kqse`) and `SANITY_STUDIO_DATASET` (`production`).
- `.env.local` (root) — Confirms project ID `wbh0kqse` and dataset `production`.

## Decisions and assumptions

1. **Zero modification of provided files**: Neither `studio/scripts/seed/seed.ndjson` nor `studio/scripts/seed/videos.json` will be edited, rewritten, or rebuilt.
2. **No new content generation**: The existing 141 documents in `seed.ndjson` already contain complete, validated data matching the schema.
3. **Studio environment setup**: Create `studio/.env.local` (gitignored) specifying `SANITY_STUDIO_PROJECT_ID=wbh0kqse` and `SANITY_STUDIO_DATASET=production` so that Sanity CLI commands can run seamlessly from the `studio/` workspace directory.
4. **Import method**: Run Sanity CLI import with `--replace` flag:
   `sanity dataset import scripts/seed/seed.ndjson production --replace`
   This will import all documents, upload associated image assets from `_sanityAsset`, and maintain deterministic IDs.
5. **Post-import verification**: Run GROQ query `*[]{ _type }` or `count(*[_type == "..."])` using Sanity CLI to verify exact counts for all seeded types:
   - Categories: 6
   - Instructors: 5
   - Courses: 10
   - Lessons: 120
   - Total seeded documents: 141

## Files expected to touch

- `prompts/seed-sanity-cli-import.md` (this prompt)
- `studio/.env.local` (local configuration for Sanity CLI, gitignored)
- Note: `studio/scripts/seed/seed.ndjson` and `studio/scripts/seed/videos.json` will **not** be modified.

## Requirements

1. Use Sanity CLI to import `studio/scripts/seed/seed.ndjson` into the `production` dataset.
2. Do not modify `seed.ndjson` or `videos.json`.
3. Do not re-resolve videos or re-generate content.
4. Verify document counts in Sanity after import completes.

## Security considerations

- Sanity CLI utilizes existing local authentication session; no secret write tokens are written to code or committed files.
- `studio/.env.local` contains only public project ID and dataset name and is gitignored.

## Acceptance criteria

- `sanity dataset import` completes successfully without errors.
- Document counts verified in Sanity:
  - `category`: 6
  - `instructor`: 5
  - `course`: 10
  - `lesson`: 120
- Git diff confirms zero changes to `studio/scripts/seed/seed.ndjson` and `studio/scripts/seed/videos.json`.

## Checks to run

1. `npx sanity dataset import scripts/seed/seed.ndjson production --replace` in `studio`
2. `npx sanity documents query '{"categories": count(*[_type == "category"]), "instructors": count(*[_type == "instructor"]), "courses": count(*[_type == "course"]), "lessons": count(*[_type == "lesson"]), "total": count(*[_type in ["category", "instructor", "course", "lesson"]])}'`
3. `git diff --stat studio/scripts/seed/` to verify no modifications.

## Manual test steps

1. In terminal or Sanity Vision / Studio (`npm run dev` in `studio`), inspect the imported courses, modules, lessons, instructors, and categories.
2. Run `npm run dev` in web workspace and navigate to `/courses` to see seeded courses render with covers, instructors, lessons, and categories.
