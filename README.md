# Rooted Community

The marketing site for [Rooted Community](https://rootedcommunity.org), a community-centered nonprofit serving system-impacted BIPOC community members in King, Snohomish, and Pierce counties (WA).

Static site built with [Astro](https://astro.build) and [Sanity CMS](https://www.sanity.io), deployed to GitHub Pages.

## Quick start

```bash
make install     # install dependencies
make dev         # start dev server at localhost:4321
make build       # build production site to dist/
make preview     # preview the production build
```

Run `make` (no args) for the full target list.

## Stack

- [Astro 6](https://astro.build) — static site generator (SSG, no SSR adapter)
- [Sanity v5](https://www.sanity.io) — headless CMS, hosted Studio, build-time GROQ queries only
- TypeScript (strict)
- Yarn package manager (Node ≥ 22.13)
- GitHub Pages hosting + GitHub Actions CI/CD

## Repository layout

```
src/
  pages/         # Astro routes
  components/    # .astro components
  layouts/       # page layouts
  lib/           # Sanity client, image URL builder, structured data
  styles/        # global CSS + design tokens
studio/          # Sanity Studio (separate workspace)
public/          # static assets, fonts, robots, CNAME
brand/           # logo & brand asset kit (transparent SVG + PNG) — see brand/README.md
.github/workflows/
  deploy.yml     # build + deploy to Pages on main push
  ci.yml         # type-check + audit on PR
  audit.yml      # reusable: build, sitemap, lychee, lighthouse
  nightly.yml    # daily audit run against main
```

## Environment

Copy `.env.example` to `.env` and fill in values:

- `SANITY_PROJECT_ID` — Sanity project identifier
- `SANITY_DATASET` — usually `production`
- `SANITY_API_TOKEN` — read-only token used at build time only
- `PUBLIC_GOOGLE_ANALYTICS_ID` — GA4 measurement ID (optional)

In production these are configured as GitHub repository secrets and injected by the workflows.

## Deployment

`main` is the deployment branch. Every push triggers a build via `withastro/action@v6` and a deploy to GitHub Pages. Sanity content updates can also trigger a rebuild via webhook (`repository_dispatch` event of type `sanity-content-update`).

The repo includes a `public/CNAME` file so Pages serves the site at the custom domain once DNS is pointed at GitHub.
