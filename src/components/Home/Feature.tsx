import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useFavorites } from "../../context/FavoritesContext";


import cup from "../../assets/images/cup.webp";

import type { Cafe } from "../../types/cafeTypes";
import type { FeatureProps } from "../../types/homeTypes";

import { fetchCafes } from "../../services/cafesApi";

import FilterBar from "./FilterBar";
import SortDropdown from "./SortDropdown";
import CafeCard from "./CafeCard";

import ErrorState from "../common/ErrorState";
import { CafeCardSkeleton } from "../common/LoadingSkeletons";

const initialLimit = 8;
const loadMoreCount = 4;

export default function Feature({ initialSearch = "" }: FeatureProps) {
  const { theme } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();

  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "popularity">("popularity");
  const [limit, setLimit] = useState(initialLimit);
  const [retryCount, setRetryCount] = useState(0);

  // -------- Fetch Cafes --------
  useEffect(() => {
    const loadCafes = async () => {
      setLoading(true);

      try {
        const params = { query: searchQuery, category, sortBy, limit };
        const { cafes: data } = await fetchCafes(params);
        setCafes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadCafes();
  }, [searchQuery, category, sortBy, limit, retryCount]);

  // Reset limit when filters change
  useEffect(() => {
    setLimit(initialLimit);
  }, [searchQuery, category, sortBy]);

  // Sync initial search
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const title = useMemo(() => {
    return searchQuery
      ? `Results for "${searchQuery}"`
      : "Trending Cafes This Week";
  }, [searchQuery]);

  const handleLoadMore = () => {
    setLimit(prev => prev + loadMoreCount);
  };

  const sectionBg =
    theme === "dark" ? "bg-gray-950" : "bg-[#FFF4E6]";

  const titleColor =
    theme === "dark" ? "text-white" : "text-[#4A2C2A]";

  // -------- Loading State --------
  if (loading && cafes.length === 0 && !error) {
    return (
      <section className={`py-20 px-4 md:px-8 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: initialLimit }).map((_, i) => (
            <CafeCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 px-4 md:px-8 transition-colors duration-300 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 monFont ${titleColor}`}>
              {title}
            </h2>

            <p className={`${titleColor} opacity-80`}>
              Explore the most popular and highly-rated cafes handpicked just for you.
            </p>
          </div>

          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <FilterBar activeCategory={category} onCategoryChange={setCategory} />

        {error && (
          <ErrorState
            title="Couldn't load cafes"
            message={error}
            onRetry={() => setRetryCount(prev => prev + 1)}
          />
        )}

        {!loading && cafes.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">No cafes found</h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategory("All");
              }}
              className="mt-4 text-[#E67E22] font-semibold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cafes.map(cafe => (
              <CafeCard
                key={cafe.id}
                cafe={cafe}
                isFavorite={favorites.includes(cafe.id.toString())}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        <div className="mt-20 text-center relative">
          <img
            src={cup}
            alt=""
            loading="lazy"
            className="absolute left-[-10px] -bottom-[100px] w-[140px] opacity-20 hidden lg:block"
          />

          {loading && cafes.length > 0 ? (
            <div className="w-8 h-8 border-4 border-[#E67E22] border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            cafes.length > 0 &&
            cafes.length % loadMoreCount === 0 && (
              <button
                onClick={handleLoadMore}
                className="mt-6 px-10 py-4 rounded-2xl font-bold bg-[#E67E22] text-white hover:bg-[#D35400]"
              >
                Load More Cafes
              </button>
            )
          )}

          <img
            src={cup}
            alt=""
            loading="lazy"
            className="absolute right-[-10px] -bottom-[100px] w-[140px] opacity-20 hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}