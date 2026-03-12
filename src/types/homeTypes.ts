export interface HeroProps {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

export interface SortDropdownProps {
  sortBy: string;
  onSortChange: (sort: "rating" | "name" | "popularity") => void;
}

export interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface FeatureProps {
  initialSearch?: string;
}

import type { Cafe } from "./cafeTypes";

export interface CafeCardProps {
  cafe: Cafe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}
