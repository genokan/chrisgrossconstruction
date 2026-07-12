# chrisgrossconstruction

A statically-exported marketing site built with Next.js and deployed to Cloudflare Pages.

## Stack

- **Next.js 15** (App Router) with `output: "export"` — ships as static HTML/CSS/JS
- **Cloudflare Pages Functions** — quote-request API endpoint
- **React 19**
- **Tailwind CSS v4** — CSS-first config via `@theme` in `app/globals.css` (no `tailwind.config`)
- **TypeScript 5**
- **next/font** — self-hosted Barlow Semi Condensed (display) + Inter (body)
- **ESLint 9** (flat config) + **Vitest** for data-validation tests

## Requirements

- Node version pinned in `.nvmrc` (Node 20)
- npm

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server                         |
| `npm run build`   | Static export to `out/`                      |
| `npm run start`   | Serve a production build locally             |
| `npm run lint`    | ESLint                                       |
| `npm run typecheck` | `tsc --noEmit`                             |
| `npm test`        | Vitest (run mode) — data + helper unit tests |
| `npm run test:e2e` | Playwright end-to-end tests (builds, serves `out/`, drives Chromium) |

> First E2E run needs the browser: `npx playwright install chromium`.

## Project structure

```
app/            App Router pages, layout, metadata, sitemap, robots, favicon
components/     Header, Footer, CallButton, WorkGallery, quote form
lib/            site.ts (site constants), data.ts (projects/services content)
functions/      Cloudflare Pages Functions
public/         photos/, _headers (security headers), static assets
tests/          Vitest data-validation tests
```

Editable content lives in `lib/site.ts` (name, phone, address, service area, nav)
and `lib/data.ts` (projects, services, customization options). Images referenced
by that content live in `public/photos/`.

## Deployment

Deployed to **Cloudflare Pages** as a static site:

- **Framework preset:** None (or "Next.js (Static HTML Export)")
- **Build command:** `npm run build`
- **Build output directory:** `out`

> Do **not** use the plain "Next.js" preset or a `wrangler deploy` / Workers
> setup — those invoke the OpenNext SSR adapter, which is incompatible with the
> `output: "export"` static build. Pages serves the `out/` directory directly.

Security headers are applied via `public/_headers`.

## Quote request form

The contact page posts quote requests to a Cloudflare Pages Function at
`/api/quote`. The function verifies Cloudflare Turnstile when configured, then
sends the submission to Chris using Cloudflare Email Service.

Cloudflare setup:

- Create a Turnstile widget and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in the
  Pages build environment.
- Set `TURNSTILE_SECRET_KEY` as a Pages Function secret/environment variable.
- In Cloudflare Email Service, verify `chrisgrossconstruction@gmail.com` as a
  destination address.
- Configure Email Sending or a routing-domain sender, then set:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_EMAIL_API_TOKEN`
  - `QUOTE_FROM_EMAIL` such as `quotes@chrisgrossconstruction.com`
  - `QUOTE_TO_EMAIL` as `chrisgrossconstruction@gmail.com`

Cloudflare currently allows free sends to verified destination addresses on all
plans. Sending automated replies to arbitrary customer addresses requires the
Workers Paid plan, so the form only sends the lead notification to Chris.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs two jobs on pull requests to
`main`: `verify` (lint, typecheck, unit tests, build) and `e2e` (Playwright
end-to-end tests against the built static export). Dependabot keeps npm and
Actions dependencies current.

Unit tests (`tests/`) cover data and helpers; E2E tests (`e2e/`) cover rendered
pages — smoke checks that every route loads with working images and no JS
errors, the gallery lightbox, and the quote form (validation + a mocked success
response).
