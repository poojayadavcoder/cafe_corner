import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getFavorites, toggleFavoriteCafe, MAX_FAVORITES } from "../utils/cafeHelpers";
import LimitReachedModal from "../components/modals/LimitReachedModal";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  atLimit: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const atLimit = favorites.length >= MAX_FAVORITES;

  const toggleFavorite = useCallback((id: string) => {
    const isAdding = !favorites.includes(id);

    if (isAdding && atLimit) {
      setShowLimitModal(true);
      return;
    }

    const updated = toggleFavoriteCafe(id);
    setFavorites(updated);
  }, [favorites, atLimit]);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, atLimit }}>
      {children}
      {showLimitModal && (
        <LimitReachedModal 
          onClose={() => setShowLimitModal(false)} 
          maxFavorites={MAX_FAVORITES} 
        />
      )}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
