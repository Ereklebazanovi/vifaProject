// Blog Firestore service — `posts` collection.
// Mirrors the pattern in src/leadService.ts (Firestore Web SDK, no auth).
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import type { BlogPost, BlogPostInput } from "../types/blog";

const COLLECTION = "posts";

/** Map a Firestore doc to a BlogPost (id + data). */
const toPost = (id: string, data: Record<string, unknown>): BlogPost => ({
  id,
  slug: (data.slug as string) || "",
  title: (data.title as string) || "",
  description: (data.description as string) || "",
  coverImage: (data.coverImage as string) || "",
  contentHtml: (data.contentHtml as string) || "",
  tags: (data.tags as string[]) || [],
  author: (data.author as string) || "VIFA Digital",
  status: (data.status as BlogPost["status"]) || "draft",
  publishedAt: (data.publishedAt as string) || "",
  updatedAt: data.updatedAt as string | undefined,
  createdAt: data.createdAt as BlogPost["createdAt"],
});

/** Published posts, newest first — for the public /blog index.
 *  Sorts client-side (single-field `where` only) to avoid a Firestore composite index. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, COLLECTION), where("status", "==", "published"));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => toPost(d.id, d.data()))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/** Single published-or-any post by slug — for /blog/:slug. Returns null if not found. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, COLLECTION), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return toPost(d.id, d.data());
}

/** All posts (incl. drafts), newest first — admin editor list. */
export async function getAllPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toPost(d.id, d.data()));
}

export async function createPost(input: BlogPostInput): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updatePost(id: string, input: Partial<BlogPostInput>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...input,
    updatedAt: new Date().toISOString(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

/** Fetch a single post by Firestore id (editor "edit" flow). */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const d = await getDoc(doc(db, COLLECTION, id));
  return d.exists() ? toPost(d.id, d.data()) : null;
}

/** Generate a URL-safe slug. Keeps Georgian letters (valid in modern URLs), lowercases Latin. */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['"“”]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
