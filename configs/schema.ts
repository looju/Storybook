import {
  integer,
  pgTable,
  timestamp,
  varchar,
  serial,
  boolean,
  json,
} from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl"),
  subscription: boolean().default(false),
  ...timestamps,
});

export const videoData = pgTable("videoData", {
  id: serial("id").primaryKey(),
  script: json("script").notNull(),
  audioFileUrl: varchar("audioFileUrl").notNull(),
  captions: json("captions").notNull(),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull(),
});
