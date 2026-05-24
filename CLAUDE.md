# CLAUDE.md

Guidance for Claude Code working in this repo. Loaded into every conversation; keep concise.

## What this is

Marketing site for **Rooted Community**, a small WA-based nonprofit serving system-impacted BIPOC community members in King, Snohomish, and Pierce counties. Primary audience for the site is **funders** (foundation program officers, individual major donors); secondary is community members seeking services. Visual direction is **editorial restraint** — Newsreader serif + Inter sans, cream / forest / clay palette, generous whitespace.

## Stack

- **Astro 6** (static / SSG, no SSR adapter) → `dist/` deploys to GitHub Pages
- **Sanity v6 CMS**, project ID `wnfi1j4a`, dataset `production`, hosted Studio at https://rooted-community.sanity.studio/
- **TypeScript strict**, **Yarn**, Node ≥ 22.13
- Self-hosted variable fonts via `@fontsource-variable/{newsreader,inter}` (latin-only ~180 KB on first visit; other unicode subsets are unicode-range-gated)

## Invariants

- **Build-time GROQ only.** All Sanity fetches happen at build time inside `.astro` files. **Never introduce runtime client-side Sanity calls** — that would defeat the static-site model and SEO. Use `getSiteSettings()`, `getProgram(slug)`, etc. from `src/lib/sanity.ts`.
- **Pages render gracefully with empty fields.** Every Sanity field outside `name` / `slug` / `siteTitle` / `heroHeadline` is optional. Pages must conditionally render sections (e.g. `{page?.intro && ...}`) so the org can publish with sparse data and fill in over time.
- **Env asserts live in `src/lib/sanity.ts`.** Module-load `assert` on required Sanity vars (per global "strict env vars" rule). `PUBLIC_GOOGLE_ANALYTICS_ID` is a true optional — `BaseHead.astro` only renders GA if set, no default ID.
- **Always commit on a feature branch + open a PR.** Never push directly to `main`. The deploy workflow runs on `main` push.
- **Use `make seed` (idempotent `--missing`) for content seeding.** `make seed-replace` overwrites Studio edits — only use intentionally.

## Lifting from `nw-local.com`

`/Users/benny/dev/nw-local.com/` is the user's reference Astro+Sanity project. When implementing a new pattern, check if nw-local has it before rolling new code. Verbatim lifts: `src/lib/image.ts`, `src/components/PortableText.astro`, `src/components/JsonLd.astro`, `studio/schemaTypes/blockContent.ts`, GitHub Actions workflows. Adapted with substantial edits: `src/lib/sanity.ts` (different content model), `src/lib/jsonld.ts` (NGO type instead of Organization/Product), `src/components/Layout.astro` (no AgeGate), `studio/sanity.config.ts`. Do not lift cannabis-specific elements (`AgeGate`, strain/product/terpene schemas).

## Information architecture

8 routes (plus 7 dynamic program-detail routes via `[...slug].astro`):
- `/` — hero + programs grid + partners strip
- `/mission/` — mission, vision, origin, theory of change, pull quote
- `/programs/` + `/programs/[slug]/` — index and 7 detail pages
- `/impact/` — featured metrics + year-in-review
- `/team/` — staff / board / advisor / volunteer (grouped)
- `/partners/` — coalition / funder / fiscal-sponsor / in-kind (grouped)
- `/get-involved/` — donate / partnerships / volunteer / refer (separate sections)
- `/contact/` — channels with email vs text rendering
- `/accessibility/`, `/privacy/`, `/404`

## Design tokens (in `src/styles/global.css`)

```
--color-bg:        #FBF7F0   /* cream */
--color-surface:   #F3EDE0
--color-ink:       #1B2A22
--color-forest:    #2F4F3E   /* primary brand */
--color-clay:      #B8552E   /* accent */
--color-moss:      #6B8A6B
--color-rule:      #D4CCBC
--color-muted:     #5C6B62
```

Type: Newsreader Variable (display, opsz axis) + Inter Variable (body, wght axis). Use `var(--font-display)` and `var(--font-body)` rather than hardcoding family names.

## CI

- `pipeline.yml` — single ordered chain: type-check + audit run first, deploy waits on both. Triggers: `pull_request` (PR runs typecheck + audit only), `push` to `main` (full chain incl. deploy), `repository_dispatch sanity-content-update` (Sanity webhook → deploy), `workflow_dispatch` (manual)
- `audit.yml` — reusable: build (uploads `dist` artifact), sitemap validate, lychee link check (excludes self-domain to avoid chicken-and-egg on PRs that add new pages), Lighthouse audit (continue-on-error)
- `nightly.yml` — daily audit run at 08:27 UTC

## Hosting

- Custom domain `rootedcommunity.org` configured in GitHub Pages Settings; HTTPS enforced via Let's Encrypt
- DNS at Squarespace; A records point at GitHub anycast IPs (185.199.108–111.153) plus IPv6
- Email is on Google Workspace (5 MX records to `aspmx.l.google.com`); MX, TXT verification, and CAA `0 issue "letsencrypt.org"` records must be preserved

## Common tasks

```bash
make install        # install root + studio deps
make build          # production build
make studio         # local Sanity Studio at :3333
make deploy-studio  # publish Studio to rooted-community.sanity.studio
make seed           # additive content seed (no overwrites)
make seed-replace   # destructive content reset
yarn astro check    # type check
```

When adding a new content type: schema in `studio/schemaTypes/`, register in `studio/schemaTypes/index.ts`, add to `studio/sanity.config.ts` structure, add typed GROQ helper in `src/lib/sanity.ts`, then a page or component that consumes it.
