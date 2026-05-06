import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      description: "Small label displayed above the hero headline (e.g. \"Rooted Community\").",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "text",
      rows: 3,
      description: "The single mission-led statement that anchors the homepage.",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "heroSubhead",
      title: "Hero Subhead",
      type: "text",
      rows: 4,
      description: "1–2 supporting sentences below the headline.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative Text", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "featuredImpactStat",
      title: "Featured Impact Stat",
      type: "object",
      description: "Single headline stat shown on the homepage.",
      fields: [
        defineField({ name: "value", title: "Value", type: "string", description: "e.g. \"311\" or \"2/3\"." }),
        defineField({ name: "label", title: "Label", type: "string", description: "e.g. \"community members served in 2025\"." }),
      ],
    }),
    defineField({
      name: "partnersIntro",
      title: "Partners Strip Heading",
      type: "string",
      description: "Heading for the homepage partners/funders logo strip (e.g. \"With our partners\").",
    }),
  ],
  preview: {
    select: { title: "heroHeadline" },
    prepare: ({ title }) => ({ title: title || "Home Page" }),
  },
});
