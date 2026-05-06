import type {
  PortableText,
  PortableTextBlock,
  SiteSettings,
} from "./sanity";

interface SchemaBase {
  "@context": "https://schema.org";
  "@type": string;
}

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface NGOSchema extends SchemaBase {
  "@type": "NGO";
  name: string;
  url: string;
  description?: string;
  logo?: string;
  email?: string;
  address?: PostalAddress | string;
  sameAs?: string[];
  nonprofitStatus?: string;
  taxID?: string;
  areaServed?: string[];
  parentOrganization?: { "@type": "Organization"; name: string; url?: string };
}

export interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbListSchema extends SchemaBase {
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItem[];
}

export type StructuredData = NGOSchema | BreadcrumbListSchema;

export function normalizeSiteUrl( siteUrl: string ): string {
  return siteUrl.endsWith( "/" ) ? siteUrl.slice( 0, -1 ) : siteUrl;
}

function isTextSpan( child: unknown ): child is { text: string } {
  if( typeof child !== "object" || child === null ) return false;
  if( !( "text" in child ) ) return false;
  return typeof child.text === "string";
}

function isParagraphBlock( block: PortableTextBlock ): boolean {
  return (
    block._type === "block"
    && block.style === "normal"
    && !block.listItem
  );
}

export function portableTextToPlainText( blocks?: PortableText, maxParagraphs = 2 ): string {
  if( !blocks ) return "";

  const paragraphs: string[] = [];

  for( const block of blocks ) {
    if( paragraphs.length >= maxParagraphs ) break;
    if( !isParagraphBlock( block ) ) continue;

    const children = block.children;
    if( !Array.isArray( children ) ) continue;

    const text = children
      .filter( isTextSpan )
      .map( child => child.text )
      .join( "" );

    if( text.length > 0 ) paragraphs.push( text );
  }

  return paragraphs.join( " " );
}

export const ROOTED_AREA_SERVED = [
  "King County, Washington",
  "Snohomish County, Washington",
  "Pierce County, Washington",
];

export function buildNonprofitOrganization(
  settings: SiteSettings | null,
  siteUrl: string,
): NGOSchema | null {
  if( !settings?.siteTitle ) return null;

  const url = normalizeSiteUrl( siteUrl );

  const ngo: NGOSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: settings.siteTitle,
    url,
    areaServed: ROOTED_AREA_SERVED,
  };

  if( settings.logo?.asset?.url ) ngo.logo = settings.logo.asset.url;
  if( settings.siteDescription ) ngo.description = settings.siteDescription;
  if( settings.contactEmail ) ngo.email = settings.contactEmail;
  if( settings.mailingAddress ) ngo.address = settings.mailingAddress;
  if( settings.ein ) ngo.taxID = settings.ein;
  if( settings.nonprofitStatus ) ngo.nonprofitStatus = settings.nonprofitStatus;

  if( settings.fiscalSponsor?.name ) {
    ngo.parentOrganization = {
      "@type": "Organization",
      name: settings.fiscalSponsor.name,
      ...( settings.fiscalSponsor.url ? { url: settings.fiscalSponsor.url } : {} ),
    };
  }

  const sameAs: string[] = [];
  if( settings.socialLinks?.instagram ) sameAs.push( settings.socialLinks.instagram );
  if( settings.socialLinks?.facebook ) sameAs.push( settings.socialLinks.facebook );
  if( settings.socialLinks?.linkedin ) sameAs.push( settings.socialLinks.linkedin );
  if( sameAs.length > 0 ) ngo.sameAs = sameAs;

  return ngo;
}

export interface BreadcrumbInput {
  name: string;
  url: string;
}

export function buildBreadcrumbList(
  items: BreadcrumbInput[],
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map( ( crumb, index ) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    }) ),
  };
}
