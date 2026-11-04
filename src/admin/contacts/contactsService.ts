// Contacts written by /api (site form, later Meta Lead Ads). The studio only reads them.
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, type Timestamp } from "firebase/firestore";
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
};

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
}

export interface ContactEvent {
  id: string;
  type: "inquiry" | "email" | "sms" | "import" | "unsubscribe" | "link_open" | "callback_request" | "edit";
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

const MONTHS = ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];

/** Timestamp → "3 ნოე, 14:05" (today: "დღეს, 14:05"). */
export function formatWhen(t?: Timestamp) {
  if (!t) return "";
  const d = new Date(t.toMillis());
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return `დღეს, ${time}`;
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${time}`;
}
