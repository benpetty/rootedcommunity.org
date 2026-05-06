import { createClient } from "@sanity/client";

const SANITY_PROJECT_ID = import.meta.env.SANITY_PROJECT_ID;
const SANITY_DATASET = import.meta.env.SANITY_DATASET;
const SANITY_API_TOKEN = import.meta.env.SANITY_API_TOKEN;

if( !SANITY_PROJECT_ID ) throw new Error( "Missing SANITY_PROJECT_ID env var" );
if( !SANITY_DATASET ) throw new Error( "Missing SANITY_DATASET env var" );
if( !SANITY_API_TOKEN ) throw new Error( "Missing SANITY_API_TOKEN env var" );

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2026-04-14",
  useCdn: false,
  token: SANITY_API_TOKEN,
});

// --- Shared types ---

export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  asset: {
    _id?: string;
    _ref?: string;
    url?: string;
    metadata?: unknown;
  };
  alt?: string;
  caption?: string;
  crop?: unknown;
  hotspot?: unknown;
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [ key: string ]: unknown;
}

export type PortableText = PortableTextBlock[];

export interface CtaLink {
  label?: string;
  href?: string;
}

const PORTABLE_TEXT_PROJECTION = `[] {
  ...,
  _type == "image" => { asset->, alt, caption }
}`;

const IMAGE_PROJECTION = "{ asset->, alt, crop, hotspot }";

// --- Site Settings ---

export interface FiscalSponsor {
  name?: string;
  url?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface SiteSettings {
  siteTitle?: string;
  tagline?: string;
  siteDescription?: string;
  logo?: SanityImage;
  defaultOgImage?: SanityImage;
  contactEmail?: string;
  partnershipsEmail?: string;
  mailingAddress?: string;
  ein?: string;
  nonprofitStatus?: string;
  form990Url?: string;
  fiscalSponsor?: FiscalSponsor;
  socialLinks?: SocialLinks;
}

export async function getSiteSettings() {
  return sanityClient.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] {
      siteTitle, tagline, siteDescription,
      logo ${IMAGE_PROJECTION},
      defaultOgImage ${IMAGE_PROJECTION},
      contactEmail, partnershipsEmail, mailingAddress,
      ein, nonprofitStatus, form990Url,
      fiscalSponsor, socialLinks
    }`,
  );
}

// --- Home Page (singleton) ---

export interface ImpactStat {
  value?: string;
  label?: string;
}

export interface HomePage {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubhead?: string;
  heroImage?: SanityImage;
  ctaPrimary?: CtaLink;
  ctaSecondary?: CtaLink;
  featuredImpactStat?: ImpactStat;
  partnersIntro?: string;
}

export async function getHomePage() {
  return sanityClient.fetch<HomePage | null>(
    `*[_type == "homePage"][0] {
      heroEyebrow, heroHeadline, heroSubhead,
      heroImage ${IMAGE_PROJECTION},
      ctaPrimary, ctaSecondary, featuredImpactStat, partnersIntro
    }`,
  );
}

// --- Mission Page (singleton) ---

export interface TheoryOfChange {
  problem?: PortableText;
  approach?: PortableText;
  outcome?: PortableText;
}

export interface PullQuote {
  quote?: string;
  attribution?: string;
}

export interface MissionPage {
  pageTitle?: string;
  pageDescription?: string;
  mission?: string;
  vision?: string;
  originStory?: PortableText;
  theoryOfChange?: TheoryOfChange;
  pullQuote?: PullQuote;
}

export async function getMissionPage() {
  return sanityClient.fetch<MissionPage | null>(
    `*[_type == "missionPage"][0] {
      pageTitle, pageDescription, mission, vision,
      "originStory": originStory ${PORTABLE_TEXT_PROJECTION},
      "theoryOfChange": {
        "problem": theoryOfChange.problem ${PORTABLE_TEXT_PROJECTION},
        "approach": theoryOfChange.approach ${PORTABLE_TEXT_PROJECTION},
        "outcome": theoryOfChange.outcome ${PORTABLE_TEXT_PROJECTION}
      },
      pullQuote
    }`,
  );
}

// --- Impact Page (singleton) ---

export interface ImpactPage {
  pageTitle?: string;
  pageDescription?: string;
  intro?: PortableText;
  featuredMetrics?: ImpactMetric[];
  yearInReview?: PortableText;
  yearInReviewYear?: number;
}

export async function getImpactPage() {
  return sanityClient.fetch<ImpactPage | null>(
    `*[_type == "impactPage"][0] {
      pageTitle, pageDescription,
      "intro": intro ${PORTABLE_TEXT_PROJECTION},
      "featuredMetrics": featuredMetrics[]->{
        _id, value, label,
        "context": context ${PORTABLE_TEXT_PROJECTION},
        source, year, sortOrder
      },
      "yearInReview": yearInReview ${PORTABLE_TEXT_PROJECTION},
      yearInReviewYear
    }`,
  );
}

// --- Get Involved Page (singleton) ---

export interface DonationTier {
  amount?: string;
  outcomeDescription?: string;
}

export interface GetInvolvedPage {
  pageTitle?: string;
  pageDescription?: string;
  donateIntro?: PortableText;
  donateUrl?: string;
  donationTiers?: DonationTier[];
  volunteerIntro?: PortableText;
  volunteerCta?: CtaLink;
  partnershipsIntro?: PortableText;
  referIntro?: PortableText;
  referUrl?: string;
}

export async function getGetInvolvedPage() {
  return sanityClient.fetch<GetInvolvedPage | null>(
    `*[_type == "getInvolvedPage"][0] {
      pageTitle, pageDescription,
      "donateIntro": donateIntro ${PORTABLE_TEXT_PROJECTION},
      donateUrl, donationTiers,
      "volunteerIntro": volunteerIntro ${PORTABLE_TEXT_PROJECTION},
      volunteerCta,
      "partnershipsIntro": partnershipsIntro ${PORTABLE_TEXT_PROJECTION},
      "referIntro": referIntro ${PORTABLE_TEXT_PROJECTION},
      referUrl
    }`,
  );
}

// --- Contact Page (singleton) ---

export interface ContactChannel {
  label?: string;
  address?: string;
  description?: string;
}

export interface ContactPage {
  pageTitle?: string;
  pageDescription?: string;
  intro?: string;
  channels?: ContactChannel[];
}

export async function getContactPage() {
  return sanityClient.fetch<ContactPage | null>(
    `*[_type == "contactPage"][0] {
      pageTitle, pageDescription, intro, channels
    }`,
  );
}

// --- Programs ---

export interface ProgramSummary {
  _id: string;
  name: string;
  slug: SanitySlug;
  summary?: string;
  heroImage?: SanityImage;
  featured?: boolean;
  sortOrder?: number;
}

export interface Program extends ProgramSummary {
  whoItServes?: string;
  howItWorks?: PortableText;
  eligibility?: string;
  outcome?: PortableText;
  referralUrl?: string;
}

export async function getPrograms() {
  return sanityClient.fetch<ProgramSummary[]>(
    `*[_type == "program"] | order(sortOrder asc, name asc) {
      _id, name, slug, summary,
      heroImage ${IMAGE_PROJECTION},
      featured, sortOrder
    }`,
  );
}

export async function getFeaturedPrograms() {
  return sanityClient.fetch<ProgramSummary[]>(
    `*[_type == "program" && featured == true] | order(sortOrder asc, name asc) {
      _id, name, slug, summary,
      heroImage ${IMAGE_PROJECTION},
      featured, sortOrder
    }`,
  );
}

export async function getProgram( slug: string ) {
  return sanityClient.fetch<Program | null>(
    `*[_type == "program" && slug.current == $slug][0] {
      _id, name, slug, summary, whoItServes,
      "howItWorks": howItWorks ${PORTABLE_TEXT_PROJECTION},
      eligibility,
      "outcome": outcome ${PORTABLE_TEXT_PROJECTION},
      heroImage ${IMAGE_PROJECTION},
      referralUrl, featured, sortOrder
    }`,
    { slug },
  );
}

// --- People ---

export type PersonType = "staff" | "board" | "advisor" | "volunteer";

export interface Person {
  _id: string;
  name: string;
  role: string;
  type: PersonType;
  pronouns?: string;
  bio?: PortableText;
  photo?: SanityImage;
  email?: string;
  sortOrder?: number;
}

export async function getPeople() {
  return sanityClient.fetch<Person[]>(
    `*[_type == "person"] | order(type asc, sortOrder asc, name asc) {
      _id, name, role, type, pronouns,
      "bio": bio ${PORTABLE_TEXT_PROJECTION},
      photo ${IMAGE_PROJECTION},
      email, sortOrder
    }`,
  );
}

// --- Partners ---

export type PartnerType = "coalition" | "funder" | "fiscal-sponsor" | "in-kind";

export interface Partner {
  _id: string;
  name: string;
  type: PartnerType;
  logo?: SanityImage;
  url?: string;
  description?: string;
  yearStarted?: number;
  featured?: boolean;
  sortOrder?: number;
}

export async function getPartners() {
  return sanityClient.fetch<Partner[]>(
    `*[_type == "partner"] | order(type asc, sortOrder asc, name asc) {
      _id, name, type,
      logo ${IMAGE_PROJECTION},
      url, description, yearStarted, featured, sortOrder
    }`,
  );
}

export async function getFeaturedPartners() {
  return sanityClient.fetch<Partner[]>(
    `*[_type == "partner" && featured == true] | order(sortOrder asc, name asc) {
      _id, name, type,
      logo ${IMAGE_PROJECTION},
      url, sortOrder
    }`,
  );
}

// --- Impact Metrics ---

export interface ImpactMetric {
  _id: string;
  value: string;
  label: string;
  context?: PortableText;
  source?: string;
  year?: number;
  sortOrder?: number;
}

export async function getImpactMetrics() {
  return sanityClient.fetch<ImpactMetric[]>(
    `*[_type == "impactMetric"] | order(sortOrder asc, year desc) {
      _id, value, label,
      "context": context ${PORTABLE_TEXT_PROJECTION},
      source, year, sortOrder
    }`,
  );
}
