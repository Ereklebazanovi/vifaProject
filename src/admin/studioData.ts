// Contact histories for the overview, the sales board and the sources page: one call to
// /api/studio, shared between pages, refreshed when someone new writes.
import { useEffect, useMemo, useState } from "react";
import { apiPost } from "./api";
import type { Contact, Stage } from "./contacts/contactsService";

/** One history entry, as /api/studio returns it. */
export interface Ev {
  c: string;
  type: string;
  at: number;
  source?: string;
  product?: string;
  template?: string;
  campaignId?: string;
  ok?: boolean;
  status?: string;
  stage?: Stage;
  utm?: Record<string, string>;
  origin?: string;
}

// Kept between page visits, so coming back shows numbers at once while they refresh.
let cached: Ev[] | null = null;

export function useStudioEvents(contacts: Contact[]) {
  const [events, setEvents] = useState<Ev[] | null>(cached);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);

  // The contacts list is live: a new inquiry moves `lastSeenAt`, which refetches.
  const latest = useMemo(() => contacts.reduce((m, c) => Math.max(m, c.lastSeenAt?.toMillis() ?? 0), 0), [contacts]);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    apiPost<{ events: Ev[] }>("/api/studio", { action: "overview" })
      .then((r) => {
        if (!alive) return;
        cached = r.events;
        setEvents(r.events);
        setError("");
      })
      .catch((e) => {
        console.error(e);
        if (alive) setError("მონაცემები ვერ ჩაიტვირთა. სცადე განახლება.");
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [latest, tick]);

  return { events, error, loading, refresh: () => setTick((t) => t + 1) };
}

/** Everyone's history, oldest first. */
export function historyOf(events: Ev[]) {
  const map = new Map<string, Ev[]>();
  for (const e of [...events].sort((a, b) => a.at - b.at)) {
    if (!map.has(e.c)) map.set(e.c, []);
    map.get(e.c)!.push(e);
  }
  return map;
}

/** The first inquiry or import: how the person reached us. */
export const firstTouch = (list?: Ev[]) => list?.find((e) => e.type === "inquiry" || e.type === "import");

/** The channel a contact first came through. */
export function channelOf(e: Ev | undefined, c: Contact) {
  if (e?.type === "import") {
    return { chat: "Messenger ჩატი", legacy: "საიტის ძველი ფორმა", form: "Facebook / Messenger ფორმა" }[e.origin || ""] || "სხვა სია";
  }
  if (e?.type === "inquiry") {
    if (e.source === "meta") return "Facebook ლიდ-ფორმა";
    const u = e.utm || {};
    const src = (u.utm_source || "").toLowerCase();
    if (u.ref) return "პარტნიორის ბმული";
    if (/facebook|instagram|^fb$|^ig$|meta/.test(src)) return "Facebook / Instagram";
    if (src.includes("google")) return /cpc|ppc|paid/.test((u.utm_medium || "").toLowerCase()) ? "Google რეკლამა" : "Google";
    if (src) return "სხვა ბმული";
    const r = (u.referrer || "").toLowerCase();
    if (r.includes("google.")) return "Google ძიება";
    if (/facebook|instagram/.test(r)) return "Facebook / Instagram";
    if (r) return "სხვა საიტი";
    return "საიტის ფორმა";
  }
  return c.sources?.includes("manual") ? "სტუდიოდან დამატებული" : "სხვა";
}

/** contact id → channel, for every contact. */
export function channelsByContact(events: Ev[] | null, contacts: Contact[]) {
  const history = events ? historyOf(events) : new Map<string, Ev[]>();
  return new Map(contacts.map((c) => [c.id, channelOf(firstTouch(history.get(c.id)), c)]));
}
