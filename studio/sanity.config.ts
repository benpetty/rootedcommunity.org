import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "missionPage",
  "impactPage",
  "getInvolvedPage",
  "contactPage",
]);

const SINGLETON_ACTIONS = new Set([ "publish", "discardChanges", "restore" ]);

const singleton = (S: StructureBuilder, schemaType: string, title: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType));

export default defineConfig({
  name: "default",
  title: "Rooted Community",

  projectId: "wnfi1j4a",
  dataset: "production",

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title("Content")
          .items([
            singleton(S, "siteSettings", "Site Settings"),
            S.divider(),
            S.listItem().title("Pages").child(
              S.list()
                .title("Pages")
                .items([
                  singleton(S, "homePage", "Home"),
                  singleton(S, "missionPage", "Mission"),
                  singleton(S, "impactPage", "Impact"),
                  singleton(S, "getInvolvedPage", "Get Involved"),
                  singleton(S, "contactPage", "Contact"),
                ]),
            ),
            S.divider(),
            S.documentTypeListItem("program").title("Programs"),
            S.documentTypeListItem("impactMetric").title("Impact Metrics"),
            S.divider(),
            S.documentTypeListItem("person").title("People"),
            S.documentTypeListItem("partner").title("Partners"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
});
