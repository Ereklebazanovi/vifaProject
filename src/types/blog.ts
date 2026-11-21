// Blog post types — Firestore-backed (`posts` collection).
import type { Timestamp } from "firebase/firestore";

export type BlogStatus = "draft" | "published";

export interface BlogPost {
  /** Firestore document id. */
  id: string;
  /** URL slug (unique). e.g. "ra-girs-saitis-damzadeba" */
  slug: string;
  /** Keyword-rich <title> (brand suffix appended by SEO.tsx). */
  title: string;
  /** Meta description (150–160 chars). */
  description: string;
  /** Cover / OG image URL (1200×630 ideal). */
  coverImage: string;
  /** Rich HTML body produced by the editor (sanitized on render). */
  contentHtml: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  /** ISO string of publish date (kept as string for easy prerender/JSON-LD use). */
  publishedAt: string;
  updatedAt?: string;
  /** Firestore write timestamp — used only for admin ordering. */
  createdAt?: Timestamp;
}

/** Shape used when creating/updating from the editor (no id/createdAt). */
export type BlogPostInput = Omit<BlogPost, "id" | "createdAt">;
