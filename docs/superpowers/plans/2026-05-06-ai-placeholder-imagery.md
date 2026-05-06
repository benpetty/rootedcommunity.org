# AI-Generated Placeholder Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **2026-05-06 mid-execution revision:** original photo-realism direction was rejected after the first generation pass produced "hippie camping retreat" imagery. Pivoted to printmaking / solidarity-poster illustration (Emory Douglas / Just Seeds lineage) with BIPOC figures in urban PNW community settings. Tasks 1 and 2 (code) were already done before the pivot — only the prompts inside `scripts/image-prompts.mjs` changed. The flow below reflects the revised prompts.

**Goal:** Populate the 8 currently-empty hero image slots (1 home + 7 programs) with AI-generated placeholder *illustration* imagery, using the Sanity MCP `generate_image` tool, without schema changes or new dependencies.

**Architecture:** Two new Node scripts (`image-prompts.mjs` for the prompt config, `image-review.mjs` for surfacing draft preview URLs) + one Makefile target. Generation, review, iteration, and publishing are driven via Sanity MCP tool calls from inside a Claude Code session. Generated assets land in document drafts (invisible to the public site) until explicitly published.

**Tech Stack:** Node ≥ 22.13, `@sanity/client` (already installed), Sanity MCP server (already configured), GROQ.

**Reference spec:** `docs/superpowers/specs/2026-05-06-ai-placeholder-imagery-design.md`

**Branch:** `feat/post-polish-content-rendering` (continue on existing branch)

**Project constants (used throughout):**
- `SANITY_PROJECT_ID` = `wnfi1j4a`
- `SANITY_DATASET` = `production`
- `workspaceName` for MCP calls = `default` (verify with `mcp__Sanity__list_workspace_schemas` if uncertain)

---

## File Structure

| Path | Purpose | Lines (approx) |
|------|---------|----------------|
| `scripts/image-prompts.mjs` *(new)* | Pure data export: `SLOTS` array (8 entries) + `BRAND_AESTHETIC_SUFFIX` constant. No side effects. | ~75 |
| `scripts/image-review.mjs` *(new)* | Reads env, runs GROQ for draft variants of all 8 docs, prints slot name + draft asset URL. | ~50 |
| `Makefile` *(modify)* | Add `image-review` target mirroring `seed`/`publish-drafts` shape. | +4 lines |
| `.PHONY` line in Makefile *(modify)* | Add `image-review` to phony list. | edit |

No other files are touched. No schema changes. No new dependencies.

---

## Task 1: Create the prompt config

**Files:**
- Create: `scripts/image-prompts.mjs`

- [ ] **Step 1: Write the prompt config file**

Write `scripts/image-prompts.mjs` with the exact contents below. (The contents shown reflect the post-pivot Style C illustration direction.)

```javascript
// Prompt config for AI-generated placeholder hero imagery.
// Consumed by:
//   - The interactive generation pass (Claude calls
//     mcp__Sanity__generate_image once per SLOT entry).
//   - scripts/image-review.mjs (reads SLOTS to know which docs
//     to query for draft asset URLs).
//
// Visual direction: printmaking / solidarity-poster illustration —
// bold woodcut and linocut feel, BIPOC figures depicted with dignity,
// urban Pacific Northwest community settings.

export const BRAND_AESTHETIC_SUFFIX = "Bold woodcut and linocut illustration style, high contrast with strong black linework and visible carving texture. Limited warm color palette: cream background, deep forest green, clay rust accents — flat printed colors over cream. BIPOC figures (Black, Indigenous, and Brown people of color) rendered with solidarity and dignity in the visual tradition of Emory Douglas (Black Panther graphic design), Just Seeds collective, Favianna Rodriguez, and Amplifier Art posters. Strong graphic shapes, hand-printed feel. Urban Pacific Northwest neighborhoods (Seattle and Tacoma). No text, no lettering, no signage. No photorealism — this is hand-printed illustration.";

export const SLOTS = [
  {
    documentId: "homePage",
    imagePath: "heroImage",
    label: "Home hero",
    subject: "A small multi-generational group of BIPOC people — Black, Indigenous, and Brown youth and adults — standing close together on an urban sidewalk in front of an apartment building. A sense of solidarity and rootedness in community.",
  },
  {
    documentId: "program-housing-support",
    imagePath: "heroImage",
    label: "Housing Support",
    subject: "A BIPOC person's hand turning a key in an apartment door, with the partial figure of another person carrying a moving box behind them. Urban apartment building exterior, late afternoon light.",
  },
  {
    documentId: "program-immediate-needs-support",
    imagePath: "heroImage",
    label: "Immediate Needs Support",
    subject: "Two BIPOC figures in profile on an urban sidewalk outside a small community center — one handing the other a tote bag of supplies. The moment of concrete care.",
  },
  {
    documentId: "program-peer-mental-support",
    imagePath: "heroImage",
    label: "Peer/Mental Support",
    subject: "Two BIPOC figures sitting side by side on a community-center bench, one talking and one listening, with cups of tea between them. Profile views, communal warmth.",
  },
  {
    documentId: "program-legal-court-advocacy",
    imagePath: "heroImage",
    label: "Legal/Court Advocacy",
    subject: "A BIPOC person walking up the front steps of a public building with an advocate beside them, slightly behind. Bold architectural lines of the building. Sense of accompaniment, not isolation.",
  },
  {
    documentId: "program-lfo-relief-program",
    imagePath: "heroImage",
    label: "LFO Relief",
    subject: "Two BIPOC hands at a kitchen table — one pointing at a stack of paperwork, the other holding a pen. The texture of administrative weight, but with help present.",
  },
  {
    documentId: "program-adult-community-circles",
    imagePath: "heroImage",
    label: "Adult Community Circles",
    subject: "An overhead or three-quarter view of a circle of BIPOC adults seated together in a community room, a talking piece (a stone or feather) at the center. Hands and shoulders visible. Indigenous-rooted circle practice.",
  },
  {
    documentId: "program-youth-community-circles",
    imagePath: "heroImage",
    label: "Youth Community Circles",
    subject: "A circle of BIPOC teenagers seated together on the floor of a community-center room, a talking piece at the center, sketchbooks open beside them. Young, alive, communal.",
  },
];
```

- [ ] **Step 2: Verify the file imports cleanly and exports the expected shape**

Run:
```bash
node --input-type=module -e "import('./scripts/image-prompts.mjs').then(prompts => { if (prompts.SLOTS.length !== 8) { console.error('FAIL: expected 8 slots, got', prompts.SLOTS.length); process.exit(1); } if (!prompts.BRAND_AESTHETIC_SUFFIX) { console.error('FAIL: missing BRAND_AESTHETIC_SUFFIX'); process.exit(1); } for (const slot of prompts.SLOTS) { if (!slot.documentId || !slot.imagePath || !slot.label || !slot.subject) { console.error('FAIL: incomplete slot', slot); process.exit(1); } } console.log('OK: 8 slots and brand suffix present, all slots well-formed.'); });"
```

Expected output:
```
OK: 8 slots and brand suffix present, all slots well-formed.
```

If it errors, fix the file and rerun.

- [ ] **Step 3: Commit**

```bash
git add scripts/image-prompts.mjs
git commit -m "$(cat <<'EOF'
Add prompt config for AI placeholder hero imagery

Single source of truth for the 8 hero-image generation prompts (1 home
+ 7 programs) plus the shared brand-aesthetic suffix that locks the
editorial-restraint palette and the no-people / no-incarceration
negative clauses across every prompt. Pure data export — no MCP or
Sanity client coupling.
EOF
)"
```

---

## Task 2: Create the review script

**Files:**
- Create: `scripts/image-review.mjs`

- [ ] **Step 1: Write the review script**

Write `scripts/image-review.mjs` with the exact contents below.

```javascript
#!/usr/bin/env node
// Prints, for each of the 8 hero-image slots, the URL of the current
// draft asset (or "(no draft asset)") so a human can eyeball the
// generation pass without opening Studio for every doc.
//
// Reads project config from environment (sourced by the Makefile from
// .env). No write operations.
//
// Run with: make image-review

import { createClient } from "@sanity/client";
import { SLOTS } from "./image-prompts.mjs";

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN } = process.env;

if( !SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_TOKEN ) {
  console.error( "Missing one of SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN" );
  process.exit( 1 );
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2026-04-14",
  useCdn: false,
  token: SANITY_API_TOKEN,
  perspective: "raw",
});

const draftIds = SLOTS.map( slot => `drafts.${slot.documentId}` );

const results = await client.fetch(
  `*[_id in $ids]{ _id, "url": heroImage.asset->url }`,
  { ids: draftIds },
);

const urlByDraftId = new Map( results.map( document => [ document._id, document.url ] ) );

console.log( "Draft hero-image assets (review these in a browser):\n" );
for( const slot of SLOTS ) {
  const url = urlByDraftId.get( `drafts.${slot.documentId}` );
  const status = url ?? "(no draft asset)";
  console.log( `  ${slot.label.padEnd( 26 )} ${status}` );
}
console.log( "\nIf any look wrong, edit the slot's `subject` in scripts/image-prompts.mjs and re-run the generator for that slot." );
```

- [ ] **Step 2: Add the Makefile target**

Edit `Makefile`. In the `.PHONY` line, add `image-review` to the list. Then add a new target after `publish-drafts:`.

Find:
```makefile
.PHONY: help install dev build preview studio deploy-studio seed seed-replace patch-mission-toc publish-drafts og-image lint format upgrade upgrade-latest
```

Replace with:
```makefile
.PHONY: help install dev build preview studio deploy-studio seed seed-replace patch-mission-toc publish-drafts image-review og-image lint format upgrade upgrade-latest
```

Then find the end of the `publish-drafts:` block (the line ending with `manually if needed"`) and after it, add a blank line and:

```makefile
image-review: ## Print draft asset URLs for the 8 hero-image slots (no writes)
	node scripts/image-review.mjs
```

- [ ] **Step 3: Verify the review script runs without error**

Run:
```bash
make image-review
```

Expected output (before any generation has run, all 8 slots will show "(no draft asset)"):
```
Draft hero-image assets (review these in a browser):

  Home hero                  (no draft asset)
  Housing Support            (no draft asset)
  Immediate Needs Support    (no draft asset)
  Peer/Mental Support        (no draft asset)
  Legal/Court Advocacy       (no draft asset)
  LFO Relief                 (no draft asset)
  Adult Community Circles    (no draft asset)
  Youth Community Circles    (no draft asset)

If any look wrong, edit the slot's `subject` in scripts/image-prompts.mjs and re-run the generator for that slot.
```

If the script errors with "Missing one of SANITY_…", confirm `.env` has all three vars set and the Makefile is sourcing it (the `-include .env` + `export` lines at the top of the Makefile do this).

- [ ] **Step 4: Commit**

```bash
git add scripts/image-review.mjs Makefile
git commit -m "$(cat <<'EOF'
Add image-review script + Makefile target for hero-image drafts

Prints, for each of the 8 hero-image slots, the URL of the current
draft asset (or '(no draft asset)') so a human can eyeball the
generation pass without opening Studio per-document. No writes —
read-only against the drafts perspective.
EOF
)"
```

---

## Task 3: First-pass image generation (interactive, MCP)

**Files:** None edited. All side effects land in Sanity drafts.

This task is executed by Claude during a session with the Sanity MCP server connected. It cannot be run by a standalone Node script — `mcp__Sanity__generate_image` only exists inside an MCP-aware client.

- [ ] **Step 1: Load the MCP tool schema**

If running this from a fresh session, load the tool first:
```
ToolSearch query: "select:mcp__Sanity__generate_image"
```

- [ ] **Step 2: Confirm the workspace name**

If the project has only one workspace (likely), `workspaceName: "default"` works. To verify:
```
ToolSearch query: "select:mcp__Sanity__list_workspace_schemas"
```
Then call `mcp__Sanity__list_workspace_schemas` with `resource: { projectId: "wnfi1j4a", dataset: "production" }`. Use whichever workspace name comes back (use `default` if listed; otherwise the first/only entry).

- [ ] **Step 3: Read the prompt config**

Read `scripts/image-prompts.mjs` to load the 8 `SLOTS` and the `BRAND_AESTHETIC_SUFFIX` into context. The full instruction per slot is `${slot.subject} ${BRAND_AESTHETIC_SUFFIX}`.

- [ ] **Step 4: Generate one image per slot**

For each of the 8 slots in `SLOTS`, call `mcp__Sanity__generate_image` with:

```
{
  "resource": { "projectId": "wnfi1j4a", "dataset": "production" },
  "workspaceName": "default",
  "documentId": <slot.documentId>,
  "imagePath": <slot.imagePath>,
  "instruction": <slot.subject + " " + BRAND_AESTHETIC_SUFFIX>,
  "intent": "Generate placeholder hero imagery for the Rooted Community marketing site"
}
```

These calls can be made in a single batched message (8 parallel tool calls) since they target different documents — no shared state, no ordering dependency.

Expected per-call response: an acknowledgement that generation started. Generation is async.

- [ ] **Step 5: Wait for async generation to settle**

Generation is asynchronous. Wait ~60 seconds before reviewing, to give all 8 generations time to complete and the asset references to attach to the drafts.

```bash
sleep 60
```

(In a Claude Code session, prefer `ScheduleWakeup` with `delaySeconds: 90` instead of `sleep` if you don't have other work to do — sleeps over a minute waste cache. For a single 60-second wait inline, `sleep 60` is fine.)

---

## Task 4: Review pass

**Files:** None edited.

- [ ] **Step 1: Print the draft asset URLs**

Run:
```bash
make image-review
```

Expected: 8 lines, each with a slot label and a `cdn.sanity.io` URL. If any line still shows `(no draft asset)`, generation for that slot didn't complete; re-run that single slot's `generate_image` call (Task 3 step 4 for just that slot) and re-check.

- [ ] **Step 2: Open each URL in a browser and review against acceptance criteria**

For each slot, confirm the image:

1. Sits in the cream / forest / clay palette without color-cast surprises.
2. Contains no identifiable faces and no incarceration tropes (chains, bars, gavels, scales of justice).
3. Reads as one slot of a coherent series alongside the other 7 — same visual register, not a one-off.
4. Reads at both hero size (~1280px wide) and thumbnail / card size (~800px wide).

- [ ] **Step 3: Decide per slot — accept or regenerate**

For each slot, either:
- **Accept** → no action needed; move on.
- **Regenerate** → note which slot and what about it missed. Continue to Task 5.

If all 8 are accepted on the first pass, skip to Task 6.

---

## Task 5: Per-slot iteration loop

**Files:**
- Modify: `scripts/image-prompts.mjs` (per slot, refine the `subject` field)

Repeat until all 8 slots are accepted.

- [ ] **Step 1: Edit the slot's `subject` in the prompt config**

Open `scripts/image-prompts.mjs` and update the `subject` string for the slot being regenerated. Keep edits surgical — change only the slot needing the reroll.

Example: if Housing Support came back too staged, change:
```
"A weathered wooden front door, slightly ajar, warm interior light spilling onto a porch step. Keys hanging in the lock, a hand just out of frame."
```
to (more lived-in, less staged):
```
"A weathered wooden front door, slightly ajar. A pair of worn boots on the porch step, a folded jacket on a chair beside the door, late afternoon light. No people."
```

- [ ] **Step 2: Re-call `generate_image` for that slot only**

Call `mcp__Sanity__generate_image` with the same arguments as Task 3 Step 4, but only for the slot being regenerated. The new asset overwrites the existing draft asset at the same field path.

- [ ] **Step 3: Wait for generation, then re-review**

```bash
sleep 30
make image-review
```

Open the new URL for that slot. Repeat Task 5 until accepted.

- [ ] **Step 4: When all 8 accepted, commit any prompt edits**

If `scripts/image-prompts.mjs` was modified during iteration, commit the final prompt state:
```bash
git diff scripts/image-prompts.mjs   # confirm edits are intentional
git add scripts/image-prompts.mjs
git commit -m "$(cat <<'EOF'
Refine hero-image prompts based on first-pass review

Captures the prompt edits that produced the accepted generations, so
future re-runs (or regeneration after the org sources real photography)
reproduce the same direction.
EOF
)"
```

If no prompts were edited, skip the commit.

---

## Task 6: Publish all 8 documents

**Files:** None edited. All side effects are publishing drafts to live in Sanity.

- [ ] **Step 1: Load the MCP tool schema**

```
ToolSearch query: "select:mcp__Sanity__publish_documents"
```

- [ ] **Step 2: Publish all 8 drafts**

Call `mcp__Sanity__publish_documents` with the 8 document IDs from `SLOTS`:
```
{
  "resource": { "projectId": "wnfi1j4a", "dataset": "production" },
  "documentIds": [
    "homePage",
    "program-housing-support",
    "program-immediate-needs-support",
    "program-peer-mental-support",
    "program-legal-court-advocacy",
    "program-lfo-relief-program",
    "program-adult-community-circles",
    "program-youth-community-circles"
  ],
  "intent": "Publish hero imagery for marketing site"
}
```

If `publish_documents` accepts only one ID at a time, call it 8 times (one per document) — these can be batched as parallel tool calls in a single message.

- [ ] **Step 3: Confirm each publish succeeded**

Each call returns a confirmation. Verify all 8 came back successful before proceeding to deploy.

If any publish fails (e.g., schema validation error on a draft that has fields below required minLength), report the failure rather than silently continuing.

---

## Task 7: Verify on the live site

**Files:** None edited.

- [ ] **Step 1: Trigger or wait for deploy**

Publishing fires the Sanity webhook (`repository_dispatch sanity-content-update`) which triggers `.github/workflows/deploy.yml`. This deploys to GitHub Pages automatically.

To watch:
```bash
gh run list --workflow=deploy.yml --limit 3
```

If no run starts within 60 seconds of publishing, the webhook may not be firing — check `docs/webhook-setup.md` for the configured webhook and confirm it points at the right repository_dispatch event. As a fallback, push any small change to `main` (or merge the PR for this branch) to trigger a deploy directly.

- [ ] **Step 2: Open each affected page in a browser**

After deploy completes, open:
- `https://rootedcommunity.org/` — confirm hero figure renders (currently collapsed text-only).
- `https://rootedcommunity.org/programs/` — confirm all 7 program tiles show images (currently CSS-gradient placeholders).
- 7 program detail pages: `/programs/housing-support/`, `/programs/immediate-needs-support/`, `/programs/peer-mental-support/`, `/programs/legal-court-advocacy/`, `/programs/lfo-relief-program/`, `/programs/adult-community-circles/`, `/programs/youth-community-circles/` — each should show a hero image.

- [ ] **Step 3: Confirm no console errors and no broken images**

Open browser devtools on the home page and `/programs/`. Confirm:
- No 404s on any `cdn.sanity.io` URL.
- No console errors related to image loading.
- Images sized correctly at both desktop (≥880px viewport) and mobile (~390px viewport).

---

## Task 8: Push and open / update the PR

**Files:** None edited.

- [ ] **Step 1: Push the branch**

```bash
git push -u origin feat/post-polish-content-rendering
```

- [ ] **Step 2: Check whether a PR already exists for this branch**

```bash
gh pr list --head feat/post-polish-content-rendering --json number,title,state
```

- [ ] **Step 3: If no PR exists, open one**

```bash
gh pr create --title "Add AI-generated placeholder hero imagery (8 slots)" --body "$(cat <<'EOF'
## Summary
- Adds `scripts/image-prompts.mjs` (prompt config for 8 hero-image slots + shared brand-aesthetic suffix)
- Adds `scripts/image-review.mjs` + `make image-review` target for surfacing draft preview URLs
- Generates and publishes hero imagery for the home page and all 7 programs via Sanity MCP `generate_image`
- No schema changes, no new dependencies, no new env vars

Spec: `docs/superpowers/specs/2026-05-06-ai-placeholder-imagery-design.md`
Plan: `docs/superpowers/plans/2026-05-06-ai-placeholder-imagery.md`

## Test plan
- [ ] `make image-review` runs without error and prints all 8 slot URLs
- [ ] Home page (`/`) renders a hero image (was previously text-only)
- [ ] Programs index (`/programs/`) shows imagery on all 7 tiles (was CSS-gradient placeholders)
- [ ] All 7 program detail pages render their hero image
- [ ] No identifiable faces, no incarceration tropes in any generated image
- [ ] No 404s on `cdn.sanity.io` URLs in browser devtools
EOF
)"
```

- [ ] **Step 4: If a PR already exists, post a comment summarizing the additions**

```bash
PR_NUMBER=$(gh pr list --head feat/post-polish-content-rendering --json number --jq '.[0].number')
gh pr comment "$PR_NUMBER" --body "Added AI-generated placeholder hero imagery for 8 slots (1 home + 7 programs). Spec at \`docs/superpowers/specs/2026-05-06-ai-placeholder-imagery-design.md\`, plan at \`docs/superpowers/plans/2026-05-06-ai-placeholder-imagery.md\`. New script: \`make image-review\` to print draft preview URLs."
```

- [ ] **Step 5: Print the PR URL for the user**

```bash
gh pr view --json url --jq '.url'
```

---

## Rollback plan

If generated imagery turns out wrong after publishing (e.g., inappropriate content the model slipped past prompts):

1. **Quick rollback per slot** — open the document in Sanity Studio, remove the `heroImage` field's asset reference, publish. The site falls back to its existing graceful-empty rendering.
2. **Bulk rollback** — patch all 8 documents to set `heroImage` to null via `mcp__Sanity__patch_document_from_json`, then publish.
3. **Replace** — re-run Task 5 for the affected slots with adjusted prompts, then re-publish.

Generated assets remain in the Sanity asset library after being unreferenced, but they're invisible to the public site once unreferenced from the documents.

---

## Fallback to Replicate Flux

If after one full Task 5 iteration round the Sanity-MCP-backed generator produces structurally insufficient quality (won't honor negative people clauses, palette consistently off, won't produce photo-realistic atmospherics), open a follow-up plan that:

1. Adds `scripts/generate-images-replicate.mjs` consuming the same `image-prompts.mjs`.
2. Adds `REPLICATE_API_TOKEN` to `.env` (and to GitHub Actions if needed).
3. Generates locally to `tmp/generated-images/`, uploads winners to Sanity assets via `client.assets.upload()`, patches `heroImage` refs.

That plan is out of scope for this one. Do not preemptively scaffold it.
