# Implementation prompt: Remove hardcoded Studio appId for deployment

## Goal

Resolve the `sanity deploy` error (`Cannot find app with app ID mrjcnjp9ok9z3nrm4s2letk0`) by removing the hardcoded external `deployment.appId` from `studio/sanity.cli.ts`, enabling the developer to deploy the Studio application under their own Sanity project (`wbh0kqse`).

## Skills and docs read

- `AGENTS.md` — §12 ("The Context MCP only serves a dataset that has a deployed Studio application. A schema-only deploy is not enough"), §13 (Studio deploy checks).
- Sanity CLI Documentation — `sanity deploy` and `defineCliConfig`.

## Code inspected

- `studio/sanity.cli.ts` — Line 9 specifies `deployment: { appId: 'mrjcnjp9ok9z3nrm4s2letk0' }`.
- Sanity CLI reports: `Error: Error finding user application: Cannot find app with app ID mrjcnjp9ok9z3nrm4s2letk0`.

## Decisions and assumptions

1. Remove the hardcoded `deployment: { appId: ... }` from `studio/sanity.cli.ts`.
2. This allows `sanity deploy` to prompt for a project-specific studio subdomain (or generate one) and deploy the Studio application cleanly to the user's project `wbh0kqse`.
3. Keep project, dataset, and typegen configuration intact.

## Files expected to touch

- `studio/sanity.cli.ts`
- `prompts/fix-sanity-studio-deployment-appid.md` (this prompt)

## Requirements

- `studio/sanity.cli.ts` must not reference the invalid external `appId`.

## Security considerations

- No credentials or sensitive data are affected.

## Acceptance criteria

- `sanity.cli.ts` cleanly exports CLI config without the hardcoded `appId`.
- `sanity deploy` proceeds without the `Cannot find app with app ID` fatal error.

## Checks to run

- Verify `studio/sanity.cli.ts` syntax.
- Run `npx sanity build` in `studio` to verify studio builds without errors.

## Manual test steps

- Run `cd studio && npm run deploy` in terminal and choose your studio subdomain when prompted.
