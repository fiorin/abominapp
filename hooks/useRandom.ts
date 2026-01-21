import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Abomination } from "@/types";

const FILTERS = ["default", "expanded", "all", "custom"] as const;

type FilterType = (typeof FILTERS)[number];

/**
 * Custom hook for managing abomination randomizer state, filtering, and URL sync.
 * Optimized with Set-based lookups and proper memoization.
 */
export function useRandom(abominations: Abomination[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Memoized filter logic - only recalculates when filter type or abominations change
  const getSlugsByFilter = useCallback(
    (filter: FilterType, aboms: Abomination[]): string[] => {
      switch (filter) {
        case "all":
          return aboms.map((a) => a.slug);
        case "default":
          return aboms.filter((a) => a.group === "default").map((a) => a.slug);
        case "expanded":
          return aboms
            .filter((a) =>
              ["default", "expansion", "exclusive"].includes(a.group),
            )
            .map((a) => a.slug);
        case "custom":
        default:
          return [];
      }
    },
    [],
  );

  // Initialize filter from URL or default
  const initFilter = useCallback((): FilterType => {
    const f = searchParams.get("filter") as FilterType | null;
    return f && FILTERS.includes(f) ? f : "default";
  }, [searchParams]);

  // Initialize selected slugs from URL or filter default
  const initSelectedSlugs = useCallback((): string[] => {
    const param = searchParams.get("selectedSlugs");

    if (param) return param.split(",");

    return getSlugsByFilter(initFilter(), abominations);
  }, [searchParams, getSlugsByFilter, initFilter, abominations]);

  const [filter, setFilter] = useState<FilterType>(initFilter());
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initSelectedSlugs(),
  );

  // Sync to URL with debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("filter", filter);
      if (selectedSlugs.length) {
        params.set("selectedSlugs", selectedSlugs.join(","));
      } else {
        params.delete("selectedSlugs");
      }

      const url = `/random?${params.toString()}`;

      router.replace(url, { scroll: false });
    }, 200);

    return () => clearTimeout(handler);
  }, [filter, selectedSlugs, router, searchParams]);

  // Update selected slugs when filter changes
  useEffect(() => {
    setSelectedSlugs(getSlugsByFilter(filter, abominations));
  }, [filter, abominations, getSlugsByFilter]);

  // Memoized filtered abominations with Set-based O(1) lookup
  const selectedSlugsSet = useMemo(
    () => new Set(selectedSlugs),
    [selectedSlugs],
  );

  const filtered = useMemo(() => {
    return abominations.filter((a) => selectedSlugsSet.has(a.slug));
  }, [abominations, selectedSlugsSet]);

  const toggleAbomination = useCallback((slug: string) => {
    setSelectedSlugs((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  return {
    filter,
    selectedSlugs,
    selectedSlugsSet,
    filtered,
    toggleAbomination,
    handleFilterChange,
    FILTERS,
  };
}
