# Plan: "Recent Work" gallery + Chris's photo-upload pipeline

Status: **Planned / not started.** Blocked on Google account cooldown (see
Blockers). Written 2026-07-11.

## Goal

Give Chris a dead-simple way to add build photos to the site, without him
managing any accounts, dashboards, or tooling — and without introducing a
database, custom auth, or anything that breaks the static / free-tier model.

## The core idea: two-tier content model

Chris's uploads must NOT touch the curated site design. Keep two separate tiers:

| | Curated site imagery (today) | Chris's photo feed (new) |
| --- | --- | --- |
| What | Hero (`p02`), services images, the 10 featured builds in `lib/data.ts` | Whatever Chris uploads |
| Controlled by | Us, in the repo | Chris, by dropping files in a folder |
| Shows on | Home, Services, curated `/work` gallery | New **"Recent Work"** page/section (its own route, e.g. `/gallery`) |
| Stakes | High — brand/design | Low — casual, ever-growing feed |

The curated images stay exactly as they are. The new gallery is a plain,
responsive grid that just grows. Reuse the existing `WorkGallery` lightbox
pattern so we don't rebuild that.

## Roles (important)

- **cgtech@gmail (us)** owns and manages EVERYTHING: the Google Business Profile,
  the Google Cloud project + API credentials, the Drive folder, the Cloudflare
  build, the site/repo. GBP is claimed under cgtech@gmail, NOT Chris's
  `chrisgrossconstruction@gmail`, by design.
- **Chris** manages nothing. His entire job: open one bookmarked folder and drag
  in photos. Contributing ≠ managing.

## Chosen approach: Google Drive → scheduled build → static gallery

Chris uploads to a shared Google Drive folder we own; a scheduled job pulls new
photos into the repo; the existing Cloudflare Pages build renders them. Site
stays 100% static and on free tiers.

### Data flow

1. Chris drops photos into a Drive folder ("CGC Website Photos") owned by
   cgtech@gmail, shared to him as Editor (or "anyone with link can edit").
2. A **scheduled GitHub Action** (cron, e.g. nightly) authenticates with a Google
   **service account** (read-only), lists the folder, downloads any new images to
   `public/gallery/`, and writes/updates gallery entries in `content/gallery/`.
3. The Action commits + pushes → triggers the existing Cloudflare Pages git build.
4. The new `/gallery` page reads `content/gallery/` at build time and renders the
   grid. Still static HTML.

Rationale for "sync commits into the repo" (vs. build-time fetch): images are
versioned, the existing Pages pipeline is reused, and photos are still present if
we ever move off Drive. At Chris's volume, repo growth is negligible.

Rationale for GitHub Action (vs. Cloudflare Cron Worker): no extra Worker/KV/R2;
reuses the git-connected build we already have; free Action minutes are ample for
a nightly job.

### Components to build

- `app/gallery/page.tsx` — the Recent Work page (metadata + canonical + intro).
- Build-time loader that reads `content/gallery/` (newest first).
- Reuse/generalize `components/WorkGallery.tsx` lightbox for this grid.
- `content/gallery/` — entry files (per-photo JSON or a manifest). Minimal schema:
  `image` (required), `caption` (optional), `addedAt` (date, for sorting).
- `public/gallery/` — the image files.
- `scripts/sync-drive.mjs` (or similar) — lists the Drive folder via the Drive
  API using the service-account key, downloads new files, updates entries.
- `.github/workflows/sync-drive.yml` — scheduled cron that runs the sync + commits.
- Add nav link to the new page (or surface it as a section on `/work`).

## Existing work: `scripts/google-drive-image-tracker/`

A first implementation piece already exists — a **Google Apps Script** (+ its
`SETUP.md`) that runs inside a Google Sheet and tracks photos across three Drive
folders (**Raw → Edited → Approved for Website**), matching raw/edited files by
base filename and exposing `published` / `context` columns a human controls. It
rescans every 15 minutes.

This is the human-curation front half of the pipeline: Chris/we manage which
photos are "Approved for Website" in the Sheet. The website-sync back half (this
plan) then only needs to consume the **Approved** folder (or the rows the Sheet
marks `published`). When we build the sync, point it at that approved set rather
than a raw dump — the tracker already decides what's website-ready.

## Setup checklist (do AFTER the Google cooldown lifts)

Google side (all under cgtech@gmail):
1. Create a Google Cloud project.
2. Enable the **Google Drive API**.
3. Create a **service account**; download its JSON key.
4. Create the Drive folder; share it with the service account's email (Viewer)
   and with Chris (Editor). Note the folder ID.

Cloudflare / GitHub side:
5. Store the service-account JSON key as a **GitHub Actions secret** (the sync
   runs in the Action, not in Cloudflare). Store the folder ID as a repo
   variable/secret.
6. Fill the stubbed values in the sync script + workflow.
7. Run the Action once manually to backfill; confirm photos land in `/gallery`.

Chris side (one-time):
8. Sign into `chrisgrossconstruction@gmail` on his phone, bookmark the folder.
   Thereafter: drag photos in, done.

## Open decisions (resolve before/at build)

- **Entry format:** per-photo JSON files vs. a single generated manifest.
- **Deletions:** additive-only (removing a photo is a manual repo edit) vs.
  mirror the folder (sync removes entries when files disappear from Drive).
  Lean additive-only for v1.
- **Captions:** let Chris caption (needs a Google Form instead of raw folder), or
  photos-only with auto date? Raw folder = simplest for Chris; Form = captions +
  more foolproof single-purpose UI, but same Google-signin requirement.
- **Image sizing:** static export serves images unoptimized. Consider a resize
  step in the sync (e.g. cap at ~1600px) so Chris's phone photos don't bloat load
  time / hurt Core Web Vitals.
- **Sync cadence:** nightly is fine; could also trigger on-demand.

## Alternatives considered

- **Google Business Profile as the "upload place":** Chris uploads to GBP — best
  local-SEO ROI and where customers actually look. But GBP is managed under
  cgtech@gmail and Chris won't touch it, so it's OUR job, not a Chris-upload
  path. Auto-mirroring GBP photos to the site needs the GBP API (access-approval
  friction). Keep GBP photos as a separate, us-managed task; not this pipeline.
- **Google Photos:** ❌ ruled out. Google restricted the Photos API in 2025 so
  third parties can't read a user's albums anymore.
- **Git-backed CMS (Pages CMS / Decap):** clean self-service admin, but requires
  Chris to have a GitHub login — a non-starter since Chris manages nothing.
- **Email/SMS-in:** Chris emails/texts photos to `photos@chrisgrossconstruction.com`;
  a Cloudflare Email Routing Worker drops attachments into R2 → gallery. Lowest
  friction for Chris (no account at all), but trades Drive for R2 + a Worker.
  Good fallback if the Google-signin requirement is a problem.
- **R2 + Cloudflare Access:** Chris uploads via an Access-gated page (email OTP,
  no GitHub). Avoids GitHub but adds R2 state. Heavier than the Drive route.

## Blockers

- **Google 7-day verification cooldown** on cgtech@gmail after the admin handoff
  from the previous admin. Google is verifying consistent login before granting
  access to Cloud Console / credential generation. Expected to clear ~**2026-07-18**.
  All Google-side setup steps wait on this. The website code (gallery page,
  loader, sync script with stubbed credentials) can be built anytime before then.

## Sequencing

- **Before cooldown lifts (no Google needed):** build the gallery page + loader
  (seed with the 1 existing photo as placeholder), write the sync script +
  workflow with credentials stubbed. Optionally do the Google-free SEO wins
  (FAQ page, per-project pages, click-to-text, verify lightbox bug).
- **After cooldown lifts:** run the Google + GitHub setup checklist, drop in the
  credential + folder ID, flip the sync on. The gallery page doesn't change — it
  just starts getting fed from Drive.

## Cost / free-tier notes

- Google Drive API + service account: free.
- GitHub Actions: free minutes cover a nightly sync easily.
- Cloudflare Pages build: existing, free.
- No database, no new paid services. Email-in fallback would add R2 (free tier)
  + a Worker (free tier).
