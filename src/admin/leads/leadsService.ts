// CRM leads — `crmLeads` collection. Admin-only by firestore.rules.
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import type { Lead, LeadInput, Stage } from "./types";

export const LEADS_COLLECTION = "crmLeads";

/** Firestore rejects `undefined` fields; drop them before a write. */
const clean = <T extends object>(o: T) =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined));

/** Live list of all leads, newest first. Returns the unsubscribe function. */
export function subscribeLeads(onData: (leads: Lead[]) => void, onError: (e: Error) => void) {
  const q = query(collection(db, LEADS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) =>
      onData(
        snap.docs.map(
          (d) => ({ id: d.id, ...d.data({ serverTimestamps: "estimate" }) }) as Lead
        )
      ),
    onError
  );
}

export async function addLead(input: LeadInput): Promise<string> {
  const ref = await addDoc(collection(db, LEADS_COLLECTION), {
    ...clean(input),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    stageChangedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateLead(id: string, patch: Partial<LeadInput>, prevStage?: Stage) {
  const stageChanged = patch.stage !== undefined && patch.stage !== prevStage;
  await updateDoc(doc(db, LEADS_COLLECTION, id), {
    ...clean(patch),
    updatedAt: serverTimestamp(),
    ...(stageChanged ? { stageChangedAt: serverTimestamp() } : {}),
  });
}

export const deleteLead = (id: string) => deleteDoc(doc(db, LEADS_COLLECTION, id));

/** Today as a local "YYYY-MM-DD" (same format as `nextStepAt`). */
export const todayStr = () => new Date().toLocaleDateString("en-CA");

/** A local date `days` after today, as "YYYY-MM-DD". */
export const addDaysStr = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-CA");
};

// Georgian names written out: browsers without Georgian locale data fall back
// to English for toLocaleDateString("ka-GE").
const MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
const WEEKDAYS = ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"];

/** "YYYY-MM-DD" → "7 ნოე". */
export const shortDay = (date: string) =>
  `${Number(date.slice(8, 10))} ${MONTHS[Number(date.slice(5, 7)) - 1].slice(0, 3)}`;

/** A Date → "სამშაბათი, 3 ნოემბერი". */
export const longDay = (d: Date) => `${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;

/** wa.me link for a Georgian number written any way ("555 12 34 56", "+995..."). */
export function whatsappLink(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("5")) digits = `995${digits}`;
  return digits ? `https://wa.me/${digits}` : "";
}
