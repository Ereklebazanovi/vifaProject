import { useEffect, useState } from "react";

const fallbackIds = [
  "gDKBtcuyUCY", "-6gz2mUbBfs", "zwRbx0ilnTs", "hWko2KRtHdM",
  "_HdtFWQZ_ac", "oDM6byVucLM", "1-fXww5ohHs", "51FJn5u8eCM",
  "PRkEkx5KHc0", "HVErKyR78uc", "0l538cGGcQk",
];

export function useShorts() {
  const [ids, setIds] = useState(fallbackIds);

  useEffect(() => {
    const request = new AbortController();
    fetch("/api/shorts", { signal: request.signal, headers: { Accept: "application/json" } })
      .then(response => response.ok ? response.json() : null)
      .then((result: { ids?: unknown } | null) => {
        if (!Array.isArray(result?.ids)) return;
        const validIds = result.ids.filter((id): id is string =>
          typeof id === "string" && /^[\w-]{11}$/.test(id));
        if (validIds.length && !request.signal.aborted) setIds([...new Set(validIds)]);
      })
      .catch(() => {
        // Static builds can show the channel's saved portfolio IDs.
      });
    return () => request.abort();
  }, []);

  return ids;
}
