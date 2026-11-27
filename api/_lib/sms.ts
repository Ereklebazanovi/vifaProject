// SMS through smsoffice.ge (API v2). Env: SMSOFFICE_API_KEY, SMS_SENDER (the approved
// title, max 11 Latin letters/digits/-/.). Georgian numbers only, as "995XXXXXXXXX".
// We never send with urgent=true: that would reach people who blocked messages.

const ENDPOINT = "https://smsoffice.ge/api/v2/send/";

const ERRORS: Record<string, string> = {
  "10": "არაქართული ნომერი",
  "20": "ბალანსი არასაკმარისია",
  "40": "ტექსტი ძალიან გრძელია",
  "75": "ნომერი სტოპ სიაშია",
  "76": "ნომერი არასწორი ფორმატითაა",
  "77": "ნომერი სტოპ სიაშია ან არასწორია",
  "80": "API გასაღები არასწორია",
  "110": "სათაური (sender) გაუგებარია",
  "120": "პროფილში API-ის უფლება არ არის ჩართული",
  "150": "სათაური (sender) არ მოიძებნა ან ჯერ არ დამტკიცებულა",
  "-100": "smsoffice-ის დროებითი შეფერხება",
};

export const isSmsConfigured = () => Boolean(process.env.SMSOFFICE_API_KEY && process.env.SMS_SENDER);

/** smsoffice accepts Georgian mobiles only. */
export const isGeorgianMobile = (digits: string) => /^9955\d{8}$/.test(digits);

/**
 * Sends one SMS. `reference` (max 20 chars) comes back in the delivery receipt,
 * which smsoffice posts to /api/sms-status. Throws with the reason in Georgian.
 */
export async function sendSms(to: string, content: string, reference: string) {
  const key = process.env.SMSOFFICE_API_KEY;
  const sender = process.env.SMS_SENDER;
  if (!key || !sender) throw new Error("SMSOFFICE_API_KEY / SMS_SENDER is not set");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ key, destination: to, sender, content, reference }),
    signal: AbortSignal.timeout(8000),
  });
  const data = (await res.json().catch(() => null)) as { Success?: boolean; Message?: string; ErrorCode?: number } | null;
  if (!data?.Success || data.ErrorCode !== 0) {
    const code = String(data?.ErrorCode ?? res.status);
    throw new Error(`smsoffice ${code}: ${ERRORS[code] || data?.Message || "უცნობი შეცდომა"}`);
  }
}
