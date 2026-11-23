# Implementation prompt: Enable dangerouslyAllowLocalIP for image optimization

## Goal

Resolve the Next.js image optimization SSRF error (`upstream image ... hostname resolved to private IP ["64:ff9b::23be:5a5e"]`) by setting `dangerouslyAllowLocalIP: true` in `next.config.ts`, permitting Next.js to optimize images from `cdn.sanity.io` when resolving over IPv6 / NAT64 environments.

## Skills and docs read

- `AGENTS.md` — §2 (loop), §12 (configuration & keys), §13 (checks).
- Next.js Documentation — Image Optimization & `dangerouslyAllowLocalIP`.

## Code inspected

- `next.config.ts` — Currently has `remotePatterns` for `cdn.sanity.io`, but lacks `dangerouslyAllowLocalIP`.
- Error log: `hostname resolved to private IP ["64:ff9b::23be:5a5e"] If this is expected and you understand SSRF risk, use images.dangerouslyAllowLocalIP = true to continue.`

## Decisions and assumptions

1. Set `images.dangerouslyAllowLocalIP = true` in `next.config.ts`.
2. Keep `remotePatterns` restricted to `cdn.sanity.io/images/**`.
3. Restart Next.js dev server if required for `next.config.ts` changes to take effect.

## Files expected to touch

- `next.config.ts`
- `prompts/allow-local-ip-image-optimization.md` (this prompt)

## Requirements

- Next.js image optimization must successfully load and serve Sanity cover images without SSRF blocking on IPv6/NAT64 networks.

## Security considerations

- Remote pattern remains restricted to `cdn.sanity.io/images/**`, preventing arbitrary domain fetches.

## Acceptance criteria

- `next.config.ts` has `dangerouslyAllowLocalIP: true`.
- `npm run typecheck` passes with no errors.
- Image requests through `/_next/image` return HTTP 200 rather than SSRF 500 error.

## Checks to run

1. `npm run typecheck`
2. Test fetching a course image via Next.js image optimizer.

## Manual test steps

1. Reload `http://localhost:3000/courses` in browser.
2. Verify all course cover images load visually without terminal SSRF error logs.
