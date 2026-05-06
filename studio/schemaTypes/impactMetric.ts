import { defineField, defineType } from "sanity";

export const impactMetricType = defineType({
  name: "impactMetric",
  title: "Impact Metric",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "Free-form to allow non-numeric values like \"2/3\" or \"311\". Display large.",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g. \"community members served\" or \"years saved from prison\".",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "blockContent",
      description: "Optional explanation of how the metric is calculated and why it matters.",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Citation or attribution (e.g. \"Internal program tracking, 2025\").",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Calendar year the data covers.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [ { field: "sortOrder", direction: "asc" } ],
    },
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [ { field: "year", direction: "desc" } ],
    },
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
    prepare: ({ title, subtitle }) => ({ title: `${title} — ${subtitle || "—"}` }),
  },
});
