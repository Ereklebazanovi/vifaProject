/**
 * Late evening or night in Tbilisi (UTC+4, 20:00 to 9:00): we promise a call in the morning,
 * not "today". Same rule as the server's auto replies (api/_lib/contacts.ts callWhen).
 */
export const isAfterHours = (now = Date.now()) => {
  const h = new Date(now + 4 * 3600e3).getUTCHours();
  return h < 9 || h >= 20;
};
