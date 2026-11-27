// Admin sign-in (Google). Lives outside src/firebase.ts so firebase/auth only
// ships in the lazy /studio chunks, never in the public site bundle.
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { collection, getDocs, limit, query } from "firebase/firestore";
import app, { db } from "../firebase";
import { CONTACTS } from "./contacts/contactsService";

export const auth = getAuth(app);

export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOutAdmin = () => signOut(auth);
export const watchAuth = (cb: (user: User | null) => void) => onAuthStateChanged(auth, cb);

/**
 * Whether the signed-in account is an admin.
 *
 * The allowlist lives only in firestore.rules (isAdmin), so the admin emails
 * never ship in public JS. We ask Firestore instead: a one-document read of the
 * contacts collection succeeds for an admin and is permission-denied for anyone else.
 */
export async function checkAdminAccess(): Promise<boolean> {
  try {
    await getDocs(query(collection(db, CONTACTS), limit(1)));
    return true;
  } catch (e) {
    if ((e as { code?: string }).code === "permission-denied") return false;
    throw e;
  }
}
