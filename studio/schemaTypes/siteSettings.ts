import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short phrase shown alongside the site title in nav and footer.",
    }),
    defineField({
      name: "siteDescription",
      title: "Default Site Description",
      type: "text",
      rows: 3,
      description: "Used as the default meta description for pages that don't set their own.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative Text", type: "string" }),
      ],
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default Social Sharing Image",
      type: "image",
      options: { hotspot: true },
      description: "Fallback OG image for pages without their own.",
    }),
    defineField({
      name: "contactEmail",
      title: "General Contact Email",
      type: "string",
      validation: rule => rule.email(),
    }),
    defineField({
      name: "partnershipsEmail",
      title: "Partnerships / Funders Email",
      type: "string",
      description: "Dedicated channel for foundation officers and major donors.",
      validation: rule => rule.email(),
    }),
    defineField({
      name: "mailingAddress",
      title: "Mailing Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ein",
      title: "EIN (Employer Identification Number)",
      type: "string",
      description: "Surfaced in the footer for funder due-diligence.",
    }),
    defineField({
      name: "nonprofitStatus",
      title: "Nonprofit Status",
      type: "string",
      description: "e.g. \"501(c)(3)\" or \"Fiscally sponsored by …\".",
    }),
    defineField({
      name: "form990Url",
      title: "Form 990 URL",
      type: "url",
      description: "Link to most recent IRS Form 990 filing.",
      validation: rule => rule.uri({ scheme: [ "http", "https" ] }),
    }),
    defineField({
      name: "fiscalSponsor",
      title: "Fiscal Sponsor",
      type: "object",
      description: "Disclose if applicable. Funders look for this.",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "url", title: "Website", type: "url" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url", validation: rule => rule.uri({ scheme: [ "http", "https" ] }) }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url", validation: rule => rule.uri({ scheme: [ "http", "https" ] }) }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", validation: rule => rule.uri({ scheme: [ "http", "https" ] }) }),
      ],
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
