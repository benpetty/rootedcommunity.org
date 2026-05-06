// Prompt config for AI-generated placeholder hero imagery.
// Consumed by:
//   - The interactive generation pass (Claude calls
//     mcp__Sanity__generate_image once per SLOT entry).
//   - scripts/image-review.mjs (reads SLOTS to know which docs
//     to query for draft asset URLs).
//
// Visual direction: printmaking / solidarity-poster illustration —
// bold woodcut and linocut feel, BIPOC figures depicted with dignity,
// urban Pacific Northwest community settings. See
// docs/superpowers/specs/2026-05-06-ai-placeholder-imagery-design.md
// for the full direction rationale.
//
// Editing a slot's `subject` and re-running the generator for that
// slot is the supported way to iterate. The shared brand-aesthetic
// suffix lives in BRAND_AESTHETIC_SUFFIX so it can drift in one place.

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
