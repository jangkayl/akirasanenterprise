import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  image: text("image"),
  done: boolean("done").default(false).notNull(),
});
