import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Project = {
  title: string;
  description?: string | null | undefined;
  image?: string | null | undefined;
  isPinned?: boolean;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  isPinned: boolean;
};
