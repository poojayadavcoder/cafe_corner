import { useState, useEffect, useCallback } from "react";
import { fetchCafeById } from "../services/cafesApi";
import { useFavorites } from "../context/FavoritesContext";
import type { Cafe } from "../types/cafeTypes";
import { useTheme } from "../hooks/useTheme";

import FavoritesHero from "../components/favorites/FavoritesHero";
import FavoritesStats from "../components/favorites/FavoritesStats";
import FavCard from "../components/favorites/FavCard";
import SkeletonCard from "../components/favorites/SkeletonCard";
import EmptyState from "../components/favorites/EmptyState";
import ErrorState from "../components/common/ErrorState";

export default function FavoritesPage() {
  const { theme } = useTheme();
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const { favorites, toggleFavorite, atLimit } = useFavorites();

  useEffect(() => {
    if (!favorites.length) {
      setCafes([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const loadCafes = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          favorites.map((id) => fetchCafeById(id))
        );

        if (!cancelled) {
          setCafes(results.filter(Boolean) as Cafe[]);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error) setError(err.message);
          else setError("Failed to load your favorite cafes");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCafes();

    return () => {
      cancelled = true;
    };
  }, [favorites, retryCount]);

  const handleRemove = useCallback(
    (id: string) => toggleFavorite(id),
    [toggleFavorite]
  );

  return (
    <div className={`min-h-screen pb-32 transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-950" : "bg-[#FFF4E6]"
    }`}>

      <FavoritesHero />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <FavoritesStats
          cafes={cafes}
          loading={loading}
          atLimit={atLimit}
        />

        {error ? (
          <div className="py-10 max-w-2xl mx-auto">
            <ErrorState 
              title="Failed to fetch favorites" 
              message={error} 
              onRetry={() => setRetryCount(prev => prev + 1)} 
            />
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : cafes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cafes.map((cafe) => (
              <FavCard
                key={cafe.id}
                cafe={cafe}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}