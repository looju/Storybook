import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_mISRhEJO8Y1r@ep-tiny-pond-aexg9txn-pooler.c-2.us-east-2.aws.neon.tech/storybook?sslmode=require&channel_binding=require",
  },
});
