import { useCallback, useEffect, useState } from "react";

const FAVORITES_KEY = "abominapp_favorites";

/**
 * Hook for managing favorite abominations with localStorage persistence
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(new Set(parsed));
      } catch {
        setFavorites(new Set());
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }

      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.has(slug),
    [favorites]
  );

  const getFavoriteCount = useCallback(() => favorites.size, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    isLoaded,
  };
}
