import { defineField, defineType } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Coalition Partner", value: "coalition" },
          { title: "Funder", value: "funder" },
          { title: "Fiscal Sponsor", value: "fiscal-sponsor" },
          { title: "In-kind Supporter", value: "in-kind" },
        ],
        layout: "radio",
      },
      validation: rule => rule.required(),
      initialValue: "coalition",
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
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional context (e.g. nature of the partnership, what they fund).",
    }),
    defineField({
      name: "yearStarted",
      title: "Year Partnership Began",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage strip?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first within their type group.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Type, then Sort Order",
      name: "typeAndSort",
      by: [
        { field: "type", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "logo" },
  },
});
