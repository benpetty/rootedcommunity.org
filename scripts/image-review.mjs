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
