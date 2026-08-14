import "dotenv/config";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // CLI commands (migrate/dev/db push) require a session-mode connection;
    // the app runtime itself uses DATABASE_URL (transaction pooler).
    url: process.env["DIRECT_URL"] || process.env["DATABASE_URL"],
  },
});