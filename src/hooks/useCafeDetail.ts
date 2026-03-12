import { useState, useEffect } from "react";
import { fetchCafeById, getMenuForCafe } from "../services/cafesApi";
import type { Cafe, MenuCategory } from "../types/cafeTypes";

export function useCafeDetail(id: string | undefined) {
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const retry = () => setRetryCount((prev) => prev + 1);

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await fetchCafeById(id);
        if (data) {
          setCafe(data);
          setMenu(getMenuForCafe(id));
        } else {
          setError("Cafe not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cafe details");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, retryCount]);

  return { cafe, menu, loading, error, retry };
}
