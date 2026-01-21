import { useMemo, useState } from "react";

import { Abomination, Group } from "@/types";

export interface SearchFilters {
  query: string;
  groups: Group[];
  dangerMin: number;
  dangerMax: number;
  favorites?: boolean;
}

/**
 * Hook for searching and filtering abominations
 */
export function useSearch(
  abominations: Abomination[],
  favoritesSlugs?: Set<string>
) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    groups: [],
    dangerMin: 0,
    dangerMax: 6,
    favorites: false,
  });

  const filtered = useMemo(() => {
    let results = [...abominations];

    // Search by name or ability
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.ability.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query),
      );
    }

    // Filter by groups
    if (filters.groups.length > 0) {
      results = results.filter((a) => filters.groups.includes(a.group));
    }

    // Filter by danger level
    results = results.filter(
      (a) => a.danger >= filters.dangerMin && a.danger <= filters.dangerMax,
    );

    // Filter by favorites
    if (filters.favorites && favoritesSlugs) {
      results = results.filter((a) => favoritesSlugs.has(a.slug));
    }

    return results;
  }, [abominations, filters, favoritesSlugs]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      groups: [],
      dangerMin: 0,
      dangerMax: 6,
      favorites: false,
    });
  };

  return {
    filters,
    filtered,
    updateFilters,
    clearFilters,
  };
}
