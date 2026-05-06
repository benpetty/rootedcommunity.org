#!/usr/bin/env node
// Generates public/og-default.jpg, the fallback social-sharing image used by
// BaseHead.astro for any page without its own ogImage. 1200x630 is the standard
// Open Graph aspect; renders the brand mark + mission summary on cream, with a
// forest hairline rule echoing the editorial design system.
//
// Run with: node scripts/og-default.mjs
// Re-run any time the brand line changes; result is committed to public/.

import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FBF7F0"/>
  <line x1="100" y1="160" x2="180" y2="160" stroke="#2F4F3E" stroke-width="1.5"/>
  <text x="100" y="120" font-family="Georgia, 'Iowan Old Style', serif" font-size="22" font-weight="500" letter-spacing="6" fill="#2F4F3E" text-transform="uppercase">ROOTED COMMUNITY</text>
  <text x="100" y="280" font-family="Georgia, 'Iowan Old Style', serif" font-size="76" font-weight="400" fill="#1B2A22" letter-spacing="-1">A community</text>
  <text x="100" y="370" font-family="Georgia, 'Iowan Old Style', serif" font-size="76" font-weight="400" fill="#1B2A22" letter-spacing="-1">committed to healing</text>
  <text x="100" y="460" font-family="Georgia, 'Iowan Old Style', serif" font-size="76" font-style="italic" font-weight="400" fill="#2F4F3E" letter-spacing="-1">the trauma of incarceration.</text>
  <text x="100" y="555" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#5C6B62">Serving King, Snohomish &amp; Pierce counties · rootedcommunity.org</text>
</svg>`;

const buffer = await sharp( Buffer.from( svg ) )
  .jpeg({ quality: 88, progressive: true })
  .toBuffer();

await writeFile( "public/og-default.jpg", buffer );
console.log( `Wrote public/og-default.jpg (${buffer.length} bytes).` );
