import type { Timestamp } from "firebase/firestore";

export type Product = "chatbot" | "web" | "wms" | "lineup" | "marketing" | "other";
export type Source =
  | "meta"
  | "google"
  | "site"
  | "partner"
  | "referral"
  | "tender"
  | "direct"
  | "other";
export type Stage = "new" | "contacted" | "offer" | "won" | "lost";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  company?: string;
  product: Product;
  source: Source;
  /** Free text: which ad, which partner, which UTM. */
  sourceDetail?: string;
  stage: Stage;
  /** Local date "YYYY-MM-DD" of the next action; empty = no step planned. */
  nextStepAt?: string;
  /** What the next action is ("დავურეკო", "შეთავაზება გავუგზავნო"). */
  nextStep?: string;
  /** Expected deal value in GEL. */
  value?: number;
  notes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  /** Set whenever the stage changes, so "offer with no answer for 3 days" can be found. */
  stageChangedAt?: Timestamp;
  createdBy?: string;
}

export type LeadInput = Omit<Lead, "id" | "createdAt" | "updatedAt" | "stageChangedAt">;

export const PRODUCT_LABELS: Record<Product, string> = {
  chatbot: "AI ჩატბოტი",
  web: "საიტი / PWA",
  wms: "Invento WMS",
  lineup: "LineUp",
  marketing: "მარკეტინგი",
  other: "სხვა",
};

export const SOURCE_LABELS: Record<Source, string> = {
  meta: "Meta რეკლამა",
  google: "Google",
  site: "საიტი",
  partner: "პარტნიორი",
  referral: "რეკომენდაცია",
  tender: "ტენდერი",
  direct: "პირადი კონტაქტი",
  other: "სხვა",
};

export const STAGE_LABELS: Record<Stage, string> = {
  new: "ახალი",
  contacted: "საუბარი",
  offer: "შეთავაზება",
  won: "მოგებული",
  lost: "წაგებული",
};

export const ACTIVE_STAGES: Stage[] = ["new", "contacted", "offer"];
export const isActive = (l: Lead) => ACTIVE_STAGES.includes(l.stage);
