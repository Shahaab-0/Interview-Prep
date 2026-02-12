import { useState, useEffect, useCallback } from "react";

/**
 * Shared global stores
 */
const cache = new Map();
const inFlightRequests = new Map();

export default function useFetchData(url, options = {}) {
  const { auto = true } = options;

  const [data, setData] = useState(() => cache.get(url) || null);
  const [loading, setLoading] = useState(!cache.has(url) && auto);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      if (!url) return;

      try {
        // 1️⃣ Return cached data if available
        if (cache.has(url) && !forceRefresh) {
          setData(cache.get(url));
          return cache.get(url);
        }

        // 2️⃣ If request already in-flight, reuse it
        if (inFlightRequests.has(url)) {
          return await inFlightRequests.get(url);
        }

        setLoading(true);

        const fetchPromise = (async () => {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Network response failed");
          }

          const json = await response.json();

          cache.set(url, json);
          setData(json);
          setError(null);

          return json;
        })();

        inFlightRequests.set(url, fetchPromise);

        const result = await fetchPromise;

        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
        inFlightRequests.delete(url);
      }
    },
    [url]
  );

  const invalidate = useCallback(() => {
    cache.delete(url);
  }, [url]);

  useEffect(() => {
    if (auto) {
      fetchData();
    }
  }, [fetchData, auto]);

  return {
    data,
    loading,
    error,
    refresh: () => fetchData(true),
    invalidate,
  };
}