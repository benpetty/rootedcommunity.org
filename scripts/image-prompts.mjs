// Prompt config for AI-generated placeholder hero imagery.
// Consumed by:
//   - The interactive generation pass (Claude calls
//     mcp__Sanity__generate_image once per SLOT entry).
//   - scripts/image-review.mjs (reads SLOTS to know which docs
//     to query for draft asset URLs).
//
// Visual direction: printmaking / solidarity-poster illustration —
// bold woodcut and linocut feel, palette-locked, abstract and
// symbolic (NO FACES, NO PORTRAITS). Hands and objects stand in for
// human presence. See
// docs/superpowers/specs/2026-05-06-ai-placeholder-imagery-design.md
// for the full direction rationale.
//
// Editing a slot's `subject` and re-running the generator for that
// slot is the supported way to iterate. The shared brand-aesthetic
// suffix lives in BRAND_AESTHETIC_SUFFIX so it can drift in one place.

export const BRAND_AESTHETIC_SUFFIX = "Bold woodcut and linocut illustration style, high contrast with strong black linework and visible carving texture. Limited warm color palette: cream background, deep forest green, clay rust accents — flat printed colors over cream. Abstract and symbolic composition — hands (rendered with brown and dark skin tones where visible, with cuffs of clothing showing), objects, natural elements, and architectural fragments stand in for human presence. ABSOLUTELY NO FACES, no portraits, no figures with visible features, no full bodies. Visual lineage of Emory Douglas (Black Panther graphic design), Just Seeds collective, Favianna Rodriguez, and Amplifier Art posters. Strong graphic shapes, hand-printed feel. Reads as one piece in a series of woodblock prints by a single artist. No text, no lettering, no signage. No photorealism — this is hand-printed illustration.";

export const SLOTS = [
  {
    documentId: "homePage",
    imagePath: "heroImage",
    label: "Home hero",
    subject: "A stylized tree rendered in woodcut linocut style — strong central trunk, branching crown reaching upward into the cream sky, intricate root system spreading deep underground in finely-carved black lines. The roots and branches mirror each other. Forest-green foliage in the canopy with small clay-rust accents. A symbol of rooted community. Brand emblem composition.",
  },
  {
    documentId: "program-housing-support",
    imagePath: "heroImage",
    label: "Housing Support",
    subject: "A wooden apartment door, slightly ajar. A hand with brown skin reaches toward a key in the lock. Beyond the threshold, warm carved light. Strong vertical lines of the doorframe.",
  },
  {
    documentId: "program-immediate-needs-support",
    imagePath: "heroImage",
    label: "Immediate Needs Support",
    subject: "Two pairs of hands meeting over an open canvas tote bag — one passing supplies (a folded blanket, a thermos, a notebook visible inside), the other receiving. Carved table edge below. The moment of concrete care, no faces.",
  },
  {
    documentId: "program-peer-mental-support",
    imagePath: "heroImage",
    label: "Peer/Mental Support",
    subject: "Two pairs of hands cupping ceramic mugs across a low table, steam rising in carved curling lines. Hands shown with brown and dark skin tones, cuffs of sweaters visible. No faces. Communal stillness.",
  },
  {
    documentId: "program-legal-court-advocacy",
    imagePath: "heroImage",
    label: "Legal/Court Advocacy",
    subject: "Strong vertical columns and wide stone steps of a public building. A hand with brown skin resting on another person's shoulder seen from behind, both partial figures climbing the steps. Sense of accompaniment, no faces visible.",
  },
  {
    documentId: "program-lfo-relief-program",
    imagePath: "heroImage",
    label: "LFO Relief",
    subject: "An overhead view of a kitchen table with a stack of legal papers, a pen, an open envelope. Two pairs of hands at the edges — one pointing at a paper, the other holding the pen. Hands shown with brown and dark skin tones, cuffs of clothing visible. Administrative weight, but with help present. No faces.",
  },
  {
    documentId: "program-adult-community-circles",
    imagePath: "heroImage",
    label: "Adult Community Circles",
    subject: "An overhead view of a circle of pairs of hands resting palms-up on knees, with a talking piece (a smooth river stone with a feather laid across it) at the very center. Hands rendered with varied brown and dark skin tones. Carved wood-floor texture beneath. No faces, no full bodies.",
  },
  {
    documentId: "program-youth-community-circles",
    imagePath: "heroImage",
    label: "Youth Community Circles",
    subject: "An overhead view of an open sketchbook with simple drawings on its pages at the center, surrounded by smaller hands holding pencils and oil pastels, a talking piece (a small stone) beside the sketchbook. Hands rendered with varied brown and dark skin tones. No faces, no full bodies.",
  },
];
