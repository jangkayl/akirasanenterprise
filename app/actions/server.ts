"use server";

import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { todo } from "../db/schema";

// Cloudinary config
const CLOUDINARY_UPLOAD_PRESET = "your_upload_preset";
const CLOUDINARY_CLOUD_NAME = "your_cloud_name";

export const getData = async () => {
  return await db.select().from(todo);
};

export const addTodo = async (text: string, imageUrl?: string) => {
  await db.insert(todo).values({
    text,
    // If you add an image column to your schema, include imageUrl here
  });
};

export const updateTodo = async (id: number, text: string, done: boolean) => {
  await db.update(todo).set({ text, done }).where(eq(todo.id, id));
};
export const deleteTodo = async (id: number) => {
  await db.delete(todo).where(eq(todo.id, id));
};

// Cloudinary upload helper
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await res.json();
  return data.secure_url as string;
};
