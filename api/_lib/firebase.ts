// Firestore with admin rights, for Vercel functions only (never shipped to the browser).
// Needs FIREBASE_SERVICE_ACCOUNT: the whole service-account JSON from
// Firebase Console -> Project settings -> Service accounts -> Generate new private key.
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let cached: Firestore | null = null;

export function adminDb(): Firestore {
  if (cached) return cached;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
  if (!getApps().length) initializeApp({ credential: cert(JSON.parse(raw)) });
  cached = getFirestore();
  return cached;
}
