import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "../src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Aastha Silver",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "48x9almg",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool()],
  schema,
});
