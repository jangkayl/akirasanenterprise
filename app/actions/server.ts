"use server";

import { db } from "../db/drizzle";
import { todo } from "../db/schema";

export const getData = async () => {
  const data = await db.select().from(todo);
  return data;
};

export const addTodo = async (text: string) => {
  await db.insert(todo).values({
    // IDK HOW TO GENERATE ID
    id: Date.now(), // or use a proper unique id generator if needed
    text: text,
  });
};
