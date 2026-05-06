import { defineField, defineType } from "sanity";

export const getInvolvedPageType = defineType({
  name: "getInvolvedPage",
  title: "Get Involved Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Defaults to \"Get Involved\" if blank.",
    }),
    defineField({
      name: "pageDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "donateIntro",
      title: "Donate Section — Intro",
      type: "blockContent",
    }),
    defineField({
      name: "donateUrl",
      title: "Donation Link",
      type: "url",
      description: "External donation processor (e.g. Givebutter, Donorbox, Stripe).",
    }),
    defineField({
      name: "donationTiers",
      title: "Donation Tiers",
      type: "array",
      description: "Tiered amounts with dollar-to-outcome mapping (e.g. \"$50 funds one peer-support session\").",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "amount", title: "Amount", type: "string", description: "e.g. \"$50\" or \"$1,000\"." }),
            defineField({ name: "outcomeDescription", title: "What it funds", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "amount", subtitle: "outcomeDescription" },
          },
        },
      ],
    }),
    defineField({
      name: "volunteerIntro",
      title: "Volunteer Section — Intro",
      type: "blockContent",
    }),
    defineField({
      name: "volunteerCta",
      title: "Volunteer CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "partnershipsIntro",
      title: "Partnerships Section — Intro",
      type: "blockContent",
      description: "Pitch to foundations and major funders.",
    }),
    defineField({
      name: "referIntro",
      title: "Refer Section — Intro",
      type: "blockContent",
      description: "How community members refer themselves or others to Rooted's programs.",
    }),
    defineField({
      name: "referUrl",
      title: "Referral Link",
      type: "url",
      description: "Form or process URL for participant referrals.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Get Involved Page" }),
  },
});
