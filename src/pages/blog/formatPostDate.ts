import type { ItLanguage } from "../../data/itServices";

const georgianMonths = [
  "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
  "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი",
];

const englishDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tbilisi", year: "numeric", month: "long", day: "numeric",
});
const calendarDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tbilisi", year: "numeric", month: "numeric", day: "numeric",
});

export function formatPostDate(iso: string, language: ItLanguage) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  if (language === "en") return englishDate.format(date);

  // Georgian month names are kept locally for browsers with limited locale data.
  const [month, day, year] = calendarDate.formatToParts(date)
    .filter(part => part.type !== "literal")
    .map(part => part.value);
  return `${day} ${georgianMonths[Number(month) - 1]}, ${year}`;
}
