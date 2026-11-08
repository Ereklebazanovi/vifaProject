// Contacts written by /api (site form, later Meta Lead Ads). The studio only reads them.
import {
  addDoc, arrayRemove, arrayUnion, collection, deleteDoc, deleteField, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const CONTACTS = "contacts";

export const PRODUCT_LABELS: Record<string, string> = {
  chatbot: "AI ჩატბოტი",
  web: "საიტი",
  wms: "Invento WMS",
  lineup: "LineUp",
  marketing: "მარკეტინგი",
  production: "გადაღება",
  other: "სხვა",
};

export const SOURCE_LABELS: Record<string, string> = {
  site: "საიტის ფორმა",
  meta: "Facebook რეკლამა",
  import: "იმპორტი",
  manual: "სტუდიოდან",
};

/** Sales stages, in order. "lost" can follow any of them. */
export const STAGES = {
  new: "ახალი",
  contacted: "დავურეკეთ",
  offer: "შეთავაზება",
  won: "დილი",
  lost: "წაგებული",
} as const;
export type Stage = keyof typeof STAGES;
export const STAGE_RANK: Record<Stage, number> = { new: 0, contacted: 1, offer: 2, won: 3, lost: -1 };
export const STAGE_TONE = { new: "indigo", contacted: "neutral", offer: "amber", won: "green", lost: "rose" } as const;

/**
 * A contact's stage. Someone who wrote to us (site form, Facebook form) starts as "new";
 * imported lists join the pipeline only once a stage is picked for them.
 */
export function stageOf(c: Contact): Stage | null {
  if (c.stage) return c.stage;
  if (c.test) return null; // our own form test: stays off the board until the morning cleanup
  return c.sources?.some((s) => s === "site" || s === "meta") ? "new" : null;
}

export interface Contact {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  products?: string[];
  sources?: string[];
  lastProduct?: string;
  consent?: boolean;
  unsubscribed?: boolean;
  firstSeenAt?: Timestamp;
  lastSeenAt?: Timestamp;
  stage?: Stage;
  /** Furthest stage ever reached (STAGE_RANK), so the funnel still counts people later lost. */
  stageReached?: number;
  stageAt?: Timestamp;
  /** Expected or closed amount, in GEL. */
  dealValue?: number;
  /** Free labels the team adds: "VIP", "ზარი ხვალ", "რესტორანი". */
  tags?: string[];
  /** The next thing to do with this person, and when ("ხვალ 11:00, დარეკვა"). */
  nextAt?: Timestamp;
  nextNote?: string;
  /** Our own try of a form (name "ტესტი" or a team number); deleted by the 9:00 run. */
  test?: boolean;
}

export interface ContactEvent {
  id: string;
  type: "inquiry" | "email" | "sms" | "import" | "unsubscribe" | "link_open" | "callback_request" | "edit" | "stage";
  stage?: Stage;
  source?: string;
  product?: string;
  message?: string;
  page?: string;
  utm?: Record<string, string>;
  template?: string;
  ok?: boolean;
  detail?: string;
  /** SMS delivery: sent → delivered | undelivered | expired | pending | unknown (from smsoffice receipts). */
  status?: string;
  reason?: string;
  at?: Timestamp;
}

export const SMS_STATUS: Record<string, string> = {
  sent: "გაიგზავნა",
  delivered: "მიიღო",
  undelivered: "ვერ მიიღო",
  expired: "ვადა გაუვიდა",
  pending: "მუშავდება",
  unknown: "სტატუსი უცნობია",
  failed: "ვერ გაიგზავნა",
};

export interface Campaign {
  id: string;
  channel: "sms" | "email" | "both";
  product: string;
  smsText?: string;
  emailSubject?: string;
  total: number;
  smsSent: number;
  smsFailed: number;
  emailSent: number;
  emailFailed: number;
  status: "sending" | "done";
  /** People who opened their SMS page / pressed "call me back" there. */
  opens?: number;
  callbacks?: number;
  createdBy?: string;
  createdAt?: Timestamp;
  /** Who got it: one entry per person, written by /api/send batch by batch. */
  recipients?: { id: string; name: string; phone: string; email: string; sms?: string; smsRef?: string; emailStatus?: string }[];
}

export function subscribeCampaigns(onData: (c: Campaign[]) => void, onError: (e: Error) => void) {
  const q = query(collection(db, "campaigns"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: "estimate" }) }) as Campaign)),
    onError
  );
}

/** Same audience rule as /api/send: agreed to offers, never unsubscribed, reachable. */
export const canSms = (c: Contact) => /^9955\d{8}$/.test(c.phone || "");
export const canEmail = (c: Contact) => Boolean(c.email?.includes("@"));
export function audienceOf(contacts: Contact[], product: string, channel: "sms" | "email" | "both") {
  return contacts.filter(
    (c) =>
      c.consent === true &&
      c.unsubscribed !== true &&
      (product === "all" || c.products?.includes(product)) &&
      (channel === "sms" ? canSms(c) : channel === "email" ? canEmail(c) : canSms(c) || canEmail(c))
  );
}

/** Studio edit of a contact: name, email, and consent the admin vouches for. */
/** Remove a contact and its whole history (events first: Firestore keeps subcollections otherwise). */
export async function deleteContact(id: string) {
  const events = await getDocs(collection(db, CONTACTS, id, "events"));
  await Promise.all(events.docs.map((d) => deleteDoc(d.ref)));
  await deleteDoc(doc(db, CONTACTS, id));
}

export async function updateContact(id: string, patch: { name: string; email: string; consent: boolean }, wasConsent: boolean, by: string) {
  const email = patch.email.trim().toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error("email");
  await updateDoc(doc(db, CONTACTS, id), {
    name: patch.name.trim(),
    email,
    consent: patch.consent,
    ...(patch.consent && !wasConsent ? { consentAt: serverTimestamp(), consentSource: `manual:${by}` } : {}),
  });
  await addDoc(collection(db, CONTACTS, id, "events"), { type: "edit", message: `რედაქტირება: ${by}`, at: serverTimestamp() });
}

/** Move a contact to a sales stage, and note it in the history. */
export async function setStage(c: Contact, stage: Stage, by: string) {
  const reached = Math.max(c.stageReached ?? 0, STAGE_RANK[stage]);
  await updateDoc(doc(db, CONTACTS, c.id), { stage, stageReached: reached, stageAt: serverTimestamp() });
  await addDoc(collection(db, CONTACTS, c.id, "events"), { type: "stage", stage, message: by, at: serverTimestamp() });
  return reached;
}

/** Add or remove one tag (trimmed, at most 30 characters). */
export async function changeTag(id: string, tag: string, add: boolean) {
  const t = tag.trim().slice(0, 30);
  if (!t) return;
  await updateDoc(doc(db, CONTACTS, id), { tags: add ? arrayUnion(t) : arrayRemove(t) });
}

/** Plan (or clear, with null) the next step: a date and a short note. */
export async function setNextStep(id: string, at: Date | null, note: string) {
  await updateDoc(doc(db, CONTACTS, id), at
    ? { nextAt: Timestamp.fromDate(at), nextNote: note.trim().slice(0, 120) }
    : { nextAt: deleteField(), nextNote: deleteField() });
}

/** "დღეს, 11:00" / "ხვალ, 11:00" / "14 ნოე, 11:00". */
export function formatDue(ms: number) {
  const d = new Date(ms);
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return `დღეს, ${time}`;
  if (d.toDateString() === tomorrow.toDateString()) return `ხვალ, ${time}`;
  return formatWhen(ms);
}

/** Due by the end of today (overdue ones included). */
export const dueToday = (c: Contact) => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return Boolean(c.nextAt && c.nextAt.toMillis() <= end.getTime());
};

/** The deal's amount in GEL; empty clears it. */
export async function setDealValue(id: string, value: number | null) {
  await updateDoc(doc(db, CONTACTS, id), { dealValue: value == null ? deleteField() : value });
}

export function subscribeContacts(onData: (c: Contact[]) => void, onError: (e: Error) => void) {
  const q = query(collection(db, CONTACTS), orderBy("lastSeenAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: "estimate" }) }) as Contact)),
    onError
  );
}

export async function getEvents(contactId: string): Promise<ContactEvent[]> {
  const snap = await getDocs(query(collection(db, CONTACTS, contactId, "events"), orderBy("at", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ContactEvent);
}

/** "995555123456" → "+995 555 12 34 56". */
export function formatPhone(d?: string) {
  if (!d) return "";
  if (d.length === 12 && d.startsWith("995"))
    return `+995 ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
  return `+${d}`;
}

/** Privacy mode (shown on a screen to others): "+995 599 *** *45". */
export function maskPhone(d?: string) {
  if (!d) return "";
  if (d.length === 12 && d.startsWith("995")) return `+995 ${d.slice(3, 6)} *** *${d.slice(10)}`;
  return `+${d.slice(0, 3)} *** *${d.slice(-2)}`;
}

/** Privacy mode: "i***@gmail.com". */
export function maskEmail(e?: string) {
  if (!e) return "";
  const at = e.indexOf("@");
  return at < 1 ? "***" : `${e[0]}***${e.slice(at)}`;
}

const MONTHS =["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

/** Timestamp → "3 ნოე, 14:05" (today: "დღეს, 14:05"). */
export function formatWhen(t?: Timestamp | number) {
  if (!t) return "";
  const d = new Date(typeof t === "number" ? t : t.toMillis());
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return `დღეს, ${time}`;
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${time}`;
}
