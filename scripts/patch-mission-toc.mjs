// Surgical patch: adds Theory of Change content to missionPage without
// touching any other fields on the document. Safe to run even after the
// page has been edited in Studio — only theoryOfChange.problem/approach/
// outcome are affected.
//
// Run with: cd studio && npx sanity exec ../scripts/patch-mission-toc.mjs --with-user-token
//          (or `make patch-mission-toc` from the repo root)
//
// The drafts here are framework-level, anchored to the verbatim public
// mission/vision language. They're a starting point for the ED's review;
// see docs/theory-of-change-drafts.md for the rationale.

import { getCliClient } from "sanity/cli";

const client = getCliClient();

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

const result = await client
  .patch( "missionPage" )
  .set({ theoryOfChange })
  .commit();

console.log( `Patched missionPage (rev ${result._rev}). Theory of Change is now live after the next deploy.` );
