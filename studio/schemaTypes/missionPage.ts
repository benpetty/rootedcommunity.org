import { defineField, defineType } from "sanity";

export const missionPageType = defineType({
  name: "missionPage",
  title: "Mission Page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Defaults to \"Our Mission\" if blank.",
    }),
    defineField({
      name: "pageDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      description: "Used for SEO. Falls back to site default.",
    }),
    defineField({
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 4,
      description: "Verbatim mission. Displayed prominently.",
    }),
    defineField({
      name: "vision",
      title: "Vision Statement",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "originStory",
      title: "Origin Story",
      type: "blockContent",
      description: "How and why Rooted came together. Narrative-length.",
    }),
    defineField({
      name: "theoryOfChange",
      title: "Theory of Change",
      type: "object",
      description: "Three-part structure: the problem, our approach, the outcome we work toward.",
      fields: [
        defineField({ name: "problem", title: "Problem", type: "blockContent" }),
        defineField({ name: "approach", title: "Approach", type: "blockContent" }),
        defineField({ name: "outcome", title: "Outcome", type: "blockContent" }),
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "object",
      description: "Optional anchor quote from a community member, board member, or partner.",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
        defineField({ name: "attribution", title: "Attribution", type: "string" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Mission Page" }),
  },
});
