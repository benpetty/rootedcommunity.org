import { defineField, defineType } from "sanity";

export const personType = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. \"Executive Director\", \"Board Chair\", \"Peer Support Lead\".",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Staff", value: "staff" },
          { title: "Board", value: "board" },
          { title: "Advisor", value: "advisor" },
          { title: "Volunteer", value: "volunteer" },
        ],
        layout: "radio",
      },
      validation: rule => rule.required(),
      initialValue: "staff",
    }),
    defineField({
      name: "pronouns",
      title: "Pronouns",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative Text", type: "string" }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Optional. Only displayed if filled in.",
      validation: rule => rule.email(),
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
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
