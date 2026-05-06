#!/usr/bin/env node
// Publishes framework-level draft content to all 7 programs and the
// missionPage Theory of Change. Each operation is a surgical PATCH —
// only the fields drafted here are written; all other fields on each
// document are left untouched. Safe to run after Studio edits to fields
// not in this script.
//
// Run with: make publish-drafts
//   (which creates a temporary editor token, runs this, and prints
//   instructions for cleaning up the token afterward)
//
// Or directly: SANITY_WRITE_TOKEN=... node scripts/publish-drafts.mjs
//
// The drafts here resolve the [CONFIRM] markers from docs/program-drafts.md
// to conservative, generic-but-credible phrases — anchored to the verbatim
// public mission/vision and the typical scope of each program type. They
// will be revised through Studio once the ED returns feedback.

import { createClient } from "@sanity/client";

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN } = process.env;

if( !SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_WRITE_TOKEN ) {
  console.error( "Missing one of SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN" );
  process.exit( 1 );
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2026-04-14",
  useCdn: false,
  token: SANITY_WRITE_TOKEN,
});

// --- Helpers ---

const block = text => ({
  _type: "block",
  _key: Math.random().toString( 36 ).slice( 2, 10 ),
  style: "normal",
  markDefs: [],
  children: [ {
    _type: "span",
    _key: Math.random().toString( 36 ).slice( 2, 10 ),
    text,
    marks: [],
  } ],
});

// --- Programs ---

const programs = {
  "program-housing-support": {
    summary: "Help with the most immediate need at reentry: a place to live. Rooted connects community members leaving incarceration with stable housing — through direct support and through partnerships with landlords willing to look beyond a record.",
    whoItServes: "BIPOC adults returning from incarceration in King, Snohomish, and Pierce counties who don't have a confirmed housing placement at release, or whose housing has fallen through in the months after.",
    howItWorks: [
      block( "At its core, Housing Support meets people at the gap between release and stable housing. The work begins, when possible, before release — coordinating with case managers and family to confirm a placement. At the moment of release, our team provides emergency placement when nothing else is in place." ),
      block( "From there, the support shifts to landlord navigation: building relationships with property owners willing to rent to people with records, and standing alongside community members through the application process. Where financial assistance opens a door — security deposits, application fees, bridging the first months of rent — we provide it directly." ),
      block( "Once someone is housed, we stay in relationship: helping with lease compliance, working with landlords through any conflict, and bridging to longer-term housing programs as community members qualify." ),
    ],
    eligibility: "BIPOC community members in our service area who are recently released or facing housing instability connected to a recent incarceration. Self-referrals are welcome alongside referrals from partner programs.",
    outcome: [
      block( "Stable housing in the first 90 days post-release dramatically improves every other reentry outcome — health, employment, family reunification, the ability to even meet probation conditions." ),
      block( "Our goal is that no one we work with sleeps in a car, on a cousin's floor as long-term housing, or returns to incarceration because they had nowhere to land." ),
    ],
  },

  "program-immediate-needs-support": {
    summary: "Concrete support for the day-after-release essentials: food, clothing, ID, transit, a phone. The things that should be guaranteed but rarely are.",
    whoItServes: "Community members at the moment of release or in the first weeks home, when accessing essentials means navigating systems that most reentry-impacted people aren't set up to use immediately — bank accounts, transit passes, smartphones, replacement IDs.",
    howItWorks: [
      block( "Immediate Needs Support is the wraparound complement to our other programs. The team distributes essential goods — clothing, hygiene supplies, food — and provides direct financial support for transit and other day-of needs." ),
      block( "Beyond goods, we help replace lost or expired ID documents — state ID, social security card, birth certificate — which are often the gating step for everything else: housing, employment, banking, opening a phone account." ),
      block( "The program is designed to be the lowest-friction touchpoint with Rooted: a community member can come for a phone or a winter coat and stay connected for housing, peer support, or circles as their needs evolve." ),
    ],
    eligibility: "Community members in our service area at any point of recent or upcoming reentry. No referral required.",
    outcome: [
      block( "Removes the friction that turns the first week home into a crisis. Connects community members into Rooted's broader programs without requiring them to navigate intake processes during the most destabilized stretch of their reentry." ),
    ],
  },

  "program-peer-mental-support": {
    summary: "Peer support and mental health navigation from people who have been where you are. Trauma-informed, lived-experience-based, BIPOC-led.",
    whoItServes: "Community members navigating the mental health impact of incarceration — trauma, isolation, the transitions back to family and society — who benefit from being walked alongside by a peer who has lived it.",
    howItWorks: [
      block( "Peer support is built on the principle that someone who has been through reentry holds knowledge that a clinical professional, however well-trained, cannot. Rooted pairs community members with peer mentors trained in trauma-informed practice, and the relationship is intentionally consistent — community members aren't passed from one new face to another." ),
      block( "The program does two things at once. First, peer relationship: a BIPOC-led, lived-experience-grounded space to be heard. Second, navigation: when someone needs clinical mental health care, our peers help them find culturally appropriate providers, navigate insurance or sliding-scale options, and stay alongside through intake." ),
      block( "The program is intentionally distinct from clinical therapy. Where clinical care is needed, Rooted refers; where peer support is what's needed, we provide directly." ),
    ],
    eligibility: "Open to community members in our service area at any point in their reentry journey.",
    outcome: [
      block( "Mental health support that is actually accessible to BIPOC reentry-impacted community members — not gated behind insurance, intake processes, or clinicians who don't share lived context." ),
    ],
  },

  "program-legal-court-advocacy": {
    summary: "Court accompaniment and advocacy for community members navigating ongoing legal obligations after incarceration — probation, parole, hearings, and new matters that arise during reentry.",
    whoItServes: "People with active court obligations after release, on probation or parole, with pending matters tied to their original case, or facing new charges arising during reentry.",
    howItWorks: [
      block( "Legal/Court Advocacy is presence — physical, informed, and consistent — alongside community members in court. The team accompanies people to hearings, helps them understand what's happening procedurally, and provides emotional grounding in environments that are designed to be intimidating." ),
      block( "Beyond accompaniment, the work includes coordination with public defenders or private counsel and probation/parole compliance navigation. We don't provide direct legal representation; where that's needed, we connect community members with reentry-focused legal aid partners." ),
    ],
    eligibility: "Community members in our service area with active or pending court matters connected to a recent or ongoing legal case.",
    outcome: [
      block( "Reduced rate of technical violations, better outcomes in court, and fewer people returning to incarceration for non-criminal violations of probation or parole." ),
      block( "The presence itself matters: courts treat people differently when they show up with someone informed standing alongside them." ),
    ],
  },

  "program-lfo-relief-program": {
    summary: "Help reducing or eliminating the fines, fees, and court debt that follow community members for years after their criminal case. Washington's recent LFO reforms create new pathways; we walk alongside people using them.",
    whoItServes: "Anyone in our service area carrying LFO debt from past or current cases — fines, fees, restitution, or court costs assessed at sentencing or accumulated since.",
    howItWorks: [
      block( "LFOs are the financial residue of a criminal case: a debt that compounds, blocks driver's license reinstatement, blocks credit, and quietly extends the punishment for years past any sentence. Washington has reformed the LFO landscape significantly in recent years, but using those reforms requires petitions, documentation, and court appearances most people don't navigate alone." ),
      block( "The program provides intake and review of a community member's outstanding LFO balance, helps prepare petitions for waiver, modification, or remission, and accompanies them to LFO hearings. We coordinate with reentry-focused legal aid partners on the cases that need direct legal representation." ),
    ],
    eligibility: "Washington residents in our service area with outstanding LFO debt from a prior criminal case.",
    outcome: [
      block( "Removed financial barriers to housing, employment, voting rights restoration, driver's license reinstatement, and credit access that LFO debt would otherwise create." ),
      block( "For most participants, this isn't a marginal benefit — it's the difference between having a future and remaining tethered to a closed case for the rest of their lives." ),
    ],
  },

  "program-adult-community-circles": {
    summary: "Indigenous-rooted circle practice for adults healing from the impact of incarceration. Held regularly, facilitated by community members trained in restorative practice.",
    whoItServes: "Adult community members who want a regular, structured space to share, heal, and build community alongside others impacted by the same systems.",
    howItWorks: [
      block( "Community circles are an indigenous-rooted practice central to restorative justice work. Rooted's Adult Community Circles are facilitated by Rooted-trained circle keepers and follow the practice's core form: people sit in a circle, a talking piece passes from person to person, and only the person holding it speaks." ),
      block( "The space is confidential — what's said in circle stays in circle — and grounded in agreements set by participants at the start of each cohort. The work isn't therapy or processing in a clinical sense. It's the practice of being heard, of hearing others, and of building the kind of relational web that can hold someone through a hard week." ),
    ],
    eligibility: "Open to adults in our service area whose lives have been touched by incarceration — directly or through a family member. No referral required.",
    outcome: [
      block( "Reduced isolation, strengthened community ties, and ongoing healing in a space designed by and for community — not delivered to it." ),
      block( "Many participants describe circle as the first space where they could speak honestly about reentry without managing someone else's reaction." ),
    ],
  },

  "program-youth-community-circles": {
    summary: "Circle practice for young people impacted by the criminal legal system — directly, or through a family member who's incarcerated.",
    whoItServes: "Youth in our service area whose lives are touched by incarceration — their own, a parent's, a sibling's, a friend's. Often these young people are carrying weight no adult around them has named.",
    howItWorks: [
      block( "Same practice as adult circles, scaled to where young people are developmentally and to the specific weight they carry. Youth Community Circles are led by Rooted-trained facilitators with experience holding space for adolescents." ),
      block( "The program is built on the recognition that the children of incarcerated parents — and youth who are themselves system-impacted — are doing reentry work even when no one calls it that. The circle is a space where that work can be acknowledged and supported, alongside peers who get it." ),
      block( "We work with families, schools, and youth-serving partners in our region to make circles accessible without requiring families to navigate referral processes during a hard time." ),
    ],
    eligibility: "Young people in BIPOC communities in our service area whose lives have been touched by incarceration.",
    outcome: [
      block( "Healing space for youth who carry the weight of family incarceration, plus a relational alternative for those at risk of entering the system themselves." ),
      block( "Long-term: a generation of young people whose first frame for incarceration is community rather than shame." ),
    ],
  },
};

// --- Theory of Change (missionPage) ---

const theoryOfChange = {
  problem: [
    block( "In our region, incarceration of BIPOC community members inflicts trauma far beyond any sentence. The harm reaches families, futures, and the community fabric we share — and tends to compound across generations and cycles of recidivism unless someone interrupts it." ),
  ],
  approach: [
    block( "Rooted meets community members at every stage of the reentry and healing journey. Seven programs — from immediate-needs support to community circles — work alongside people where they are. We prioritize relationships over transactions, and we lead with the lived experience of community members who have been through the system themselves." ),
  ],
  outcome: [
    block( "A community where system-impacted BIPOC people are home — housed, supported, in relationship, and treated as the full humans they are. Reduced recidivism is one measure. Restored humanity is the deeper one." ),
  ],
};

// --- Apply patches ---

let patched = 0;

for( const [ id, fields ] of Object.entries( programs ) ) {
  await client.patch( id ).set( fields ).commit();
  console.log( `  ✓ ${id}` );
  patched += 1;
}

await client.patch( "missionPage" ).set({ theoryOfChange }).commit();
console.log( "  ✓ missionPage (Theory of Change)" );
patched += 1;

console.log( `\nPatched ${patched} documents. Trigger a deploy to see changes live.` );
