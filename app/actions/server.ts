"use server";

import { Post } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { desc, eq } from "drizzle-orm";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { db } from "../db/drizzle";
import { login, post } from "../db/schema";

// Posts
export const getData = unstable_cache(async () => {
  return await db.select().from(post).orderBy(desc(post.id));
}, ["projects"]);

export const addPost = async (
  title: string,
  description: string,
  imageUrl?: string,
  isPinned?: boolean
) => {
  await db.insert(post).values({
    title,
    description,
    image: imageUrl,
    isPinned,
  });

  revalidateTag("projects");
  revalidatePath("/");
  revalidatePath("/akirasanadmin");
};

export const updatePost = async (data: Post) => {
  await db
    .update(post)
    .set({
      title: data.title,
      description: data.description,
      image: data.image,
      isPinned: data.isPinned,
    })
    .where(eq(post.id, data.id));

  revalidateTag("projects");
  revalidatePath("/");
  revalidatePath("/akirasanadmin");
};

export const deletePost = async (id: number) => {
  await db.delete(post).where(eq(post.id, id));

  revalidateTag("projects");
  revalidatePath("/");
  revalidatePath("/akirasanadmin");
};

// Login
export const addLogin = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(login).values({ email, password: hashedPassword });
};

export const getLoginByEmail = async (email: string) => {
  const result = await db.select().from(login).where(eq(login.email, email));
  return result[0] || null;
};

export const verifyLogin = async (email: string, password: string) => {
  const user = await getLoginByEmail(email);
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};
