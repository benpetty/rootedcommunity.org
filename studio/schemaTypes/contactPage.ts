import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Defaults to \"Contact\" if blank.",
    }),
    defineField({
      name: "pageDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "intro",
      title: "Page Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "channels",
      title: "Contact Channels",
      type: "array",
      description: "Distinct channels: general, partnerships, referrals, media.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", description: "e.g. \"Foundation Partnerships\" or \"General\"." }),
            defineField({ name: "address", title: "Address", type: "string", description: "Email, phone, or URL — whatever fits." }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "label", subtitle: "address" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
