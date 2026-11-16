// GET /api/shorts -> returns the latest YouTube Shorts video IDs from @vifadigital2
// Uses YouTube's official Shorts playlist RSS feed (UUSH...) + /@vifadigital2/shorts tab.
import type { IncomingMessage, ServerResponse } from "node:http";

const SHORTS_PLAYLIST_RSS =
  "https://www.youtube.com/feeds/videos.xml?playlist_id=UUSHh4MvPiQLRoZc3TO9Smkjuw";
const SHORTS_TAB_URL = "https://www.youtube.com/@vifadigital2/shorts";

const FALLBACK_SHORTS = [
  "gDKBtcuyUCY",
  "-6gz2mUbBfs",
  "zwRbx0ilnTs",
  "hWko2KRtHdM",
  "_HdtFWQZ_ac",
  "oDM6byVucLM",
  "1-fXww5ohHs",
  "51FJn5u8eCM",
  "PRkEkx5KHc0",
  "HVErKyR78uc",
  "0l538cGGcQk",
];

async function fetchFromRss(): Promise<string[]> {
  const res = await fetch(SHORTS_PLAYLIST_RSS, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) return [];
  const xml = await res.text();
  return [...xml.matchAll(/<yt:videoId>([a-zA-Z0-9_-]{11})<\/yt:videoId>/g)].map(
    (m) => m[1]
  );
}

async function fetchFromShortsTab(): Promise<string[]> {
  const res = await fetch(SHORTS_TAB_URL, {
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: "CONSENT=YES+cb",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) return [];
  const html = await res.text();
  return [...html.matchAll(/\/shorts\/([a-zA-Z0-9_-]{11})/g)].map((m) => m[1]);
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const [rssRes, tabRes] = await Promise.allSettled([
      fetchFromRss(),
      fetchFromShortsTab(),
    ]);

    const rssIds = rssRes.status === "fulfilled" ? rssRes.value : [];
    const tabIds = tabRes.status === "fulfilled" ? tabRes.value : [];

    const combined = [...new Set([...rssIds, ...tabIds])];
    const ids = combined.length > 0 ? combined : FALLBACK_SHORTS;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=900, stale-while-revalidate=3600"
    );
    res.end(JSON.stringify({ ids }));
  } catch {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300");
    res.end(JSON.stringify({ ids: FALLBACK_SHORTS }));
  }
}
