// Prompt config for AI-generated placeholder hero imagery.
// Consumed by:
//   - The interactive generation pass (Claude calls
//     mcp__Sanity__generate_image once per SLOT entry).
//   - scripts/image-review.mjs (reads SLOTS to know which docs
//     to query for draft asset URLs).
//
// Editing a slot's `subject` and re-running the generator for that
// slot is the supported way to iterate. The shared brand-aesthetic
// suffix lives in BRAND_AESTHETIC_SUFFIX so it can drift in one place.

export const BRAND_AESTHETIC_SUFFIX = "Editorial photography, low saturation, warm cream and forest tones, soft natural light, shallow depth of field, 35mm film aesthetic. Pacific Northwest atmosphere. No people, no faces, no human figures. No text. No incarceration imagery (no chains, bars, gavels, scales of justice). Calm, dignified, atmospheric.";

export const SLOTS = [
  {
    documentId: "homePage",
    imagePath: "heroImage",
    label: "Home hero",
    subject: "Soft morning light through cedar branches over a quiet Pacific Northwest forest path. No people.",
  },
  {
    documentId: "program-housing-support",
    imagePath: "heroImage",
    label: "Housing Support",
    subject: "A weathered wooden front door, slightly ajar, warm interior light spilling onto a porch step. Keys hanging in the lock, a hand just out of frame.",
  },
  {
    documentId: "program-immediate-needs-support",
    imagePath: "heroImage",
    label: "Immediate Needs Support",
    subject: "Top-down still life on a wooden table: a folded canvas tote, a wool beanie, a small notebook, and a thermos. The basics.",
  },
  {
    documentId: "program-peer-mental-support",
    imagePath: "heroImage",
    label: "Peer/Mental Support",
    subject: "Two ceramic mugs on a low table, steam rising, soft window light. Two pairs of hands resting nearby, no faces. Conversational stillness.",
  },
  {
    documentId: "program-legal-court-advocacy",
    imagePath: "heroImage",
    label: "Legal/Court Advocacy",
    subject: "A wide hallway with tall arched windows, late afternoon light, an empty wooden bench in the foreground. Public-building dignity. No gavel, no scales.",
  },
  {
    documentId: "program-lfo-relief-program",
    imagePath: "heroImage",
    label: "LFO Relief",
    subject: "Close-up on hands at a small kitchen table, a stack of opened mail, a pen, soft lamp light. The texture of administrative weight without despair.",
  },
  {
    documentId: "program-adult-community-circles",
    imagePath: "heroImage",
    label: "Adult Community Circles",
    subject: "Top-down on a circle of folded blankets and cushions on a wood floor. A single woven basket holding a stone and a feather as a talking piece at center. No people.",
  },
  {
    documentId: "program-youth-community-circles",
    imagePath: "heroImage",
    label: "Youth Community Circles",
    subject: "Top-down on a circle of folded blankets and cushions on a wood floor. A sketchbook open to a page of drawings, colored pencils scattered. Younger register, no people.",
  },
];
