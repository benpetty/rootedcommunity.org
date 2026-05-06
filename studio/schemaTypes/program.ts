import { defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Program Name",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "1–2 sentence summary used on the programs index and homepage tile.",
      validation: rule => rule.max(280),
    }),
    defineField({
      name: "whoItServes",
      title: "Who it serves",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "blockContent",
    }),
    defineField({
      name: "eligibility",
      title: "Eligibility",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "blockContent",
      description: "What changes for the participant.",
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
      name: "referralUrl",
      title: "Referral / Intake URL",
      type: "url",
      description: "Optional external link to refer someone into the program.",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first on the programs index.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [ { field: "sortOrder", direction: "asc" } ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "summary", media: "heroImage" },
  },
});
