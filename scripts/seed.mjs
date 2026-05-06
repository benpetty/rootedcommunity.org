#!/usr/bin/env node
// Emits initial seed documents as NDJSON on stdout. Pipe into:
//   npx sanity datasets import - production --missing
// (handled by the `make seed` target).
//
// Uses verbatim content lifted from the existing rootedcommunity.org public site
// (mission, vision, origin) plus the 7 program names. Idempotent at the
// document-ID level — re-running with --missing is a no-op once docs exist.
// Use --replace if you want to overwrite hand-edits in Studio.

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

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Rooted Community",
    tagline: "Community-rooted healing in King, Snohomish & Pierce counties",
    siteDescription: "A community-centered organization prioritizing relationships, trauma-informed healing, and the humanity of our BIPOC community members harmed by racist systems of oppression.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Rooted Community",
    heroHeadline: "A community committed to healing the trauma of incarceration.",
    heroSubhead: "We prioritize relationships, trauma-informed healing, and the humanity of our BIPOC community members harmed by racist systems of oppression. Serving King, Snohomish, and Pierce counties since 2020.",
    ctaPrimary: { label: "Our mission", href: "/mission" },
    ctaSecondary: { label: "Our programs", href: "/programs" },
    partnersIntro: "In community with",
  },
  {
    _id: "missionPage",
    _type: "missionPage",
    pageTitle: "Our Mission",
    mission: "Rooted Community is a community-centered organization prioritizing relationships, trauma-informed healing, and the humanity of our Black, Indigenous, and People of Color (BIPOC) community members harmed by racist systems of oppression.",
    vision: "A world where our system-impacted community members' humanity and home are ROOTED in a community committed to healing the experiences and trauma caused by violence and incarceration.",
    originStory: [
      block( "Rooted Community, formerly known as Rooted Reentry, came together at the beginning of the COVID-19 pandemic in response to the health and safety of incarcerated community members." ),
      block( "What began as a mutual-aid response has grown into a coalition of programs serving people impacted by incarceration across the South Puget Sound region." ),
    ],
  },
  { _id: "impactPage", _type: "impactPage", pageTitle: "Our Impact" },
  { _id: "getInvolvedPage", _type: "getInvolvedPage", pageTitle: "Get Involved" },
  { _id: "contactPage", _type: "contactPage", pageTitle: "Contact" },
];

const programs = [
  { name: "Housing Support", short: "housing-support", order: 10 },
  { name: "Immediate Needs Support", short: "immediate-needs-support", order: 20 },
  { name: "Peer/Mental Support", short: "peer-mental-support", order: 30 },
  { name: "Legal/Court Advocacy", short: "legal-court-advocacy", order: 40 },
  { name: "Legal Financial Obligations (LFO) Relief Program", short: "lfo-relief-program", order: 50 },
  { name: "Adult Community Circles", short: "adult-community-circles", order: 60 },
  { name: "Youth Community Circles", short: "youth-community-circles", order: 70 },
];

for( const program of programs ) {
  docs.push({
    _id: `program-${program.short}`,
    _type: "program",
    name: program.name,
    slug: { _type: "slug", current: program.short },
    sortOrder: program.order,
    featured: false,
  });
}

for( const doc of docs ) process.stdout.write( JSON.stringify( doc ) + "\n" );
