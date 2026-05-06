# AI-Generated Placeholder Imagery — Design

**Status:** Draft for review (revised mid-execution)
**Author:** Claude Code (brainstorming session 2026-05-06)
**Branch:** `feat/post-polish-content-rendering`

## Revision history

- **2026-05-06 (initial):** AI-generated *photography*, atmospheric / no-people / PNW-landscape framing. First generation pass produced imagery that read as a "hippie camping retreat" — completely off-brand for an urban BIPOC-serving org.
- **2026-05-06 (pivot):** Switched to AI-generated *illustration* in the printmaking / solidarity-poster tradition (Emory Douglas, Just Seeds, Favianna Rodriguez, Amplifier Art). BIPOC figures depicted with dignity in urban Pacific Northwest community settings. Tooling unchanged (`mcp__Sanity__generate_image`); only the prompts and the project image-direction memory shifted.

## Goal

Populate the eight currently-empty hero image slots on the Rooted Community marketing site with AI-generated placeholder imagery that:

1. Holds to the editorial restraint aesthetic established in `src/styles/global.css` and the project image-direction memory.
2. Is reproducible and tweakable (prompts live in version control, not in chat history).
3. Can be reviewed and replaced slot-by-slot without disturbing the live site.
4. Does not require schema changes, new dependencies, or new env vars.

These are *placeholders*, not final art. The goal is to retire the visual emptiness of the current build (collapsed hero figures and CSS-gradient program tiles) so funder visits don't read as a half-built site, while real photography is sourced over time.

## Scope

**In scope (8 images):**

| Slot | Document ID | Field path | Subject |
|------|-------------|------------|---------|
| Home hero | `homePage` | `heroImage` | Multi-generational BIPOC group standing close together on an urban sidewalk in front of an apartment building. Solidarity, rootedness in community. |
| Housing Support | `program-housing-support` | `heroImage` | A BIPOC person's hand turning a key in an apartment door; partial figure of another person carrying a moving box behind. Urban apartment exterior, late afternoon. |
| Immediate Needs Support | `program-immediate-needs-support` | `heroImage` | Two BIPOC figures in profile on an urban sidewalk outside a small community center — one handing the other a tote bag of supplies. The moment of concrete care. |
| Peer/Mental Support | `program-peer-mental-support` | `heroImage` | Two BIPOC figures on a community-center bench, one talking, one listening, cups of tea between them. Profile views, communal warmth. |
| Legal/Court Advocacy | `program-legal-court-advocacy` | `heroImage` | A BIPOC person walking up the front steps of a public building, an advocate beside them. Bold architectural lines. Sense of accompaniment. |
| LFO Relief | `program-lfo-relief-program` | `heroImage` | Two BIPOC hands at a kitchen table — one pointing at a stack of paperwork, the other holding a pen. Administrative weight, but with help present. |
| Adult Community Circles | `program-adult-community-circles` | `heroImage` | Overhead view of a circle of BIPOC adults in a community room, talking piece (stone or feather) at center. Indigenous-rooted circle practice. |
| Youth Community Circles | `program-youth-community-circles` | `heroImage` | A circle of BIPOC teenagers seated together on a community-center floor, talking piece at center, sketchbooks beside them. Young, alive, communal. |

Source aspect from `mcp__Sanity__generate_image` is determined by the model and is not a config we can pin per slot. Sanity's image-url builder crops to whatever aspect each component requests (16:9 hero, 4:3 program card), so source variance does not affect rendering.

**Out of scope:**

- `person.photo` (real portraits only, with explicit consent — never AI-generated; see image-direction memory).
- `partner.logo` (uploaded by partner orgs).
- `siteSettings.defaultOgImage` (already exists at `public/og-default.jpg`).
- Image upgrades after the org sources real photography. Final art replaces these placeholders document-by-document via Studio.

## Constraints

From `~/.claude/projects/-Users-benny-dev-rootedcommunity-org/memory/project_image_direction.md` (revised 2026-05-06):

- **Palette:** forest `#2F4F3E`, clay rust `#B8552E`, cream `#FBF7F0`, off-white `#F3EDE0`, ink `#1B2A22`, moss `#6B8A6B` optional. Bold flat color over cream — printed not painted.
- **Illustration not photography.** Bold woodcut / linocut feel — strong black linework, visible carving texture, hand-printed register.
- **BIPOC representation in illustration is encouraged**, with dignity and care, in the visual lineage of Emory Douglas, Just Seeds, Favianna Rodriguez, Amplifier Art. (Photography of real community members still requires explicit consent — that rule does not apply to illustrated figures.)
- **No incarceration tropes** (chains, bars, cells, gavels, scales of justice).
- **Urban PNW context** — Seattle and Tacoma neighborhoods, apartments, community centers, sidewalks, transit, public buildings, kitchens. Not pastoral / forest / camping.
- **No text or signage in illustrations** — letterforms slip and produce gibberish.

These constraints are encoded into a single `BRAND_AESTHETIC_SUFFIX` string appended to every per-slot prompt, so reproducibility and brand drift control are centralized.

## Architecture

### Tooling

`mcp__Sanity__generate_image` — the Sanity MCP server's image generation tool. Behavior:

- Targets a specific `documentId` and `imagePath`.
- Generates an image asynchronously and writes it to a *draft* of the targeted document. The published document is unchanged until explicitly published.
- Writing to an existing image field overwrites the draft asset; writing to an array field appends.

This shape drives the architecture below.

**Where generation runs.** The MCP tool is only callable from inside a Claude Code conversation (or another MCP-aware client) — there is no `@sanity/mcp` library that a standalone Node script can `import`. So Phase 1 (generation) and Phase 3 (publish) execute as MCP tool calls during a brainstorming/execution session with the Sanity MCP server connected. Phases 2 (review) and 4 (deploy) are normal CLI / GitHub Actions surfaces. The prompt config in `scripts/image-prompts.mjs` is the durable, version-controlled artifact that bridges the two — re-generating later is "open a session, import the prompts, re-call the tool," not a one-shot interactive ad-hoc.

### Data flow

```
                  ┌─────────────────────────┐
                  │  scripts/image-prompts  │
                  │  (8 slot specs +        │
                  │   shared brand suffix)  │
                  └────────────┬────────────┘
                               │
                               ▼
              ┌──────────────────────────────────┐
              │ Phase 1: generation (interactive)│
              │ For each of 8 slots:             │
              │   call mcp__Sanity__generate_    │
              │   image(documentId, heroImage,   │
              │   subject + suffix)              │
              └────────────┬─────────────────────┘
                           │
                           ▼
              ┌──────────────────────────────────┐
              │ Phase 2: review                  │
              │ make image-review                │
              │ (GROQ-fetches draft asset URLs   │
              │  and prints them grouped by slot)│
              └────────────┬─────────────────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
         (slot reads right)   (slot misses)
                  │                 │
                  │                 ▼
                  │   re-call generate_image
                  │   (overwrites draft asset)
                  │                 │
                  └────────┬────────┘
                           ▼
              ┌──────────────────────────────────┐
              │ Phase 3: publish                 │
              │ mcp__Sanity__publish_documents   │
              │ on each of 8 docs                │
              └────────────┬─────────────────────┘
                           ▼
              ┌──────────────────────────────────┐
              │ Phase 4: deploy                  │
              │ Sanity webhook fires             │
              │ repository_dispatch → Pages      │
              └──────────────────────────────────┘
```

### File layout

**New files:**

- `scripts/image-prompts.mjs` — pure data + the brand-aesthetic suffix constant. Exports an array of slot specs `{ documentId, imagePath, subject }` and the suffix. No side effects, no MCP coupling. Importable from any future helper that wants the same prompts.
- `scripts/image-review.mjs` — small Node script. Reads `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_API_TOKEN` from env, runs a GROQ query for the draft variants of all 8 documents, and prints each slot's name + draft asset URL. Fast humans-can-eyeball-this format. No HTML contact sheet — Studio's preview surface and the printed URLs are sufficient.

**Modified files:**

- `Makefile` — add `image-review` target that sources `.env` and invokes `node scripts/image-review.mjs`. Mirrors the existing `seed` / `publish-drafts` target shape.
- `docs/superpowers/specs/2026-05-06-ai-placeholder-imagery-design.md` — this document.

**Not modified:**

- No schema changes (`studio/schemaTypes/`).
- No new env vars or secrets.
- No new package dependencies.
- No changes to GROQ projections in `src/lib/sanity.ts`.
- No changes to component rendering — `Hero.astro` and `ProgramCard.astro` already render assets when present and degrade gracefully when not.

### The brand-aesthetic suffix

Defined once in `scripts/image-prompts.mjs`:

```
Bold woodcut and linocut illustration style, high contrast with strong
black linework and visible carving texture. Limited warm color palette:
cream background, deep forest green, clay rust accents — flat printed
colors over cream. BIPOC figures (Black, Indigenous, and Brown people
of color) rendered with solidarity and dignity in the visual tradition
of Emory Douglas (Black Panther graphic design), Just Seeds collective,
Favianna Rodriguez, and Amplifier Art posters. Strong graphic shapes,
hand-printed feel. Urban Pacific Northwest neighborhoods (Seattle and
Tacoma). No text, no lettering, no signage. No photorealism — this is
hand-printed illustration.
```

The reference-illustrator names in the suffix are load-bearing: they anchor the model toward a specific, well-trained visual lineage rather than the generic "illustration" register that produces marketing-clip-art results.

Negative clauses (`No text, no lettering, no signage`) are deliberately repeated. Letterforms in AI illustration consistently come out as gibberish — explicit suppression is more reliable than hoping the model omits them.

The full instruction sent to `generate_image` per slot is `${slot.subject} ${BRAND_AESTHETIC_SUFFIX}`.

## Iteration workflow

1. **First pass:** all 8 slots generated in a single conversation session.
2. **Review:** `make image-review` prints a list of preview URLs grouped by slot. Open each, eyeball.
3. **Per-slot regen:** for any slot that misses, refine the `subject` field in `scripts/image-prompts.mjs` and re-call `generate_image` for that single slot. The draft asset is overwritten (no orphan accumulation).
4. **Acceptance criteria** (per slot, all must hold):
   - Sits in the cream/forest/clay palette without color-cast surprises.
   - No identifiable faces, no incarceration tropes.
   - Composition reads as one slot of a coherent series, not a one-off.
   - Reads at both the size used on its page (hero ~1280px wide, card ~800px wide) and at thumbnail scale.
5. **Publish:** once all 8 are accepted, batch-publish via `mcp__Sanity__publish_documents`. The Sanity webhook fires `repository_dispatch sanity-content-update`, the deploy workflow rebuilds, and the new imagery goes live.

## Fallback plan

If after one full iteration round the Sanity-MCP-backed generator produces structurally insufficient quality (e.g. consistently photo-unrealistic, won't honor the negative people clauses, or palette-non-compliant), fall back to **Replicate Flux 1.1 Pro** in a follow-up session:

- Add a `scripts/generate-images-replicate.mjs` that uses the same `image-prompts.mjs` as input.
- Save outputs to `tmp/generated-images/` locally.
- Upload chosen winners to Sanity assets via the Sanity client and patch document refs.
- Estimated cost: ≈ $0.50 for the full 8 images at one shot per slot.

This is documented as a contingency, not a planned step.

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Illustration drifts toward generic "marketing illustration" register | Suffix names specific illustrators (Emory Douglas, Just Seeds, Favianna Rodriguez, Amplifier Art) to anchor the lineage; per-slot reroll if the carved/woodcut feel is missing. |
| Generated palette drifts from cream/forest/clay | Suffix names palette terms explicitly; per-slot reroll; ultimate fallback is Replicate Flux. |
| Text or signage shows up in illustrations as gibberish letterforms | Suffix explicitly forbids text/lettering/signage; per-slot reroll on appearance. |
| BIPOC figures rendered with stereotypes or generic features | Per-slot review and reroll; if the model can't be coaxed past stereotype on a slot, fall back to Replicate Flux or commission a real illustrator for that slot. |
| First pass writes to drafts but I forget to publish | `make image-review` prints which docs have draft assets; publish step is its own explicit batch call, not implicit. |
| Generation is async — assets may not be attached yet when I query | Brief wait between generation and review; if a slot's draft asset is still null, re-query. |
| Drafts pile up if a slot is regenerated many times | Generation overwrites the draft image field, doesn't append. No accumulation. |
| Imagery later rejected by ED / community feedback | Replacement is just a Studio upload to the same `heroImage` field. No code change required. |

## Success criteria

- All 8 hero image slots have published assets in Sanity.
- The home page renders a hero figure (currently collapsed to text-only).
- The programs index renders 7 program tiles with images (currently CSS-gradient placeholders).
- A funder browsing the site does not encounter any visually-empty page region.
- Prompts are checked into version control so any future regeneration is reproducible.
