import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image"),
  isPinned: boolean("isPinned").default(false),
});

export const login = pgTable("login", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
