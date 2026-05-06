import { defineField, defineType } from "sanity";

export const impactPageType = defineType({
  name: "impactPage",
  title: "Impact Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Defaults to \"Our Impact\" if blank.",
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
      type: "blockContent",
      description: "Frame the metrics. What does \"impact\" mean for Rooted?",
    }),
    defineField({
      name: "featuredMetrics",
      title: "Featured Metrics",
      type: "array",
      of: [ { type: "reference", to: [ { type: "impactMetric" } ] } ],
      description: "Order matters. These are the metrics surfaced on the page (and optionally homepage).",
    }),
    defineField({
      name: "yearInReview",
      title: "Year in Review",
      type: "blockContent",
      description: "Long-form annual snapshot. Beats a PDF dump for funders.",
    }),
    defineField({
      name: "yearInReviewYear",
      title: "Year in Review — Year",
      type: "number",
      description: "Calendar year covered by the narrative above (e.g. 2025).",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impact Page" }),
  },
});
