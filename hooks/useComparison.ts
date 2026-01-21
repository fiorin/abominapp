import { useState, useCallback, useEffect } from 'react';

const COMPARISON_STORAGE_KEY = 'abominapp_comparison';

export function useComparison(maxItems: number = 3) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(COMPARISON_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSelectedSlugs(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        // Silently ignore storage errors
      }
    }
  }, []);

  // Save to localStorage whenever selectedSlugs changes
  useEffect(() => {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(selectedSlugs));
  }, [selectedSlugs]);

  const toggleAbomination = useCallback(
    (slug: string) => {
      setSelectedSlugs((prev) => {
        if (prev.includes(slug)) {
          return prev.filter((s) => s !== slug);
        }
        if (prev.length < maxItems) {
          return [...prev, slug];
        }
        return prev;
      });
    },
    [maxItems]
  );

  const removeAbomination = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearComparison = useCallback(() => {
    setSelectedSlugs([]);
  }, []);

  const isSelected = useCallback(
    (slug: string) => selectedSlugs.includes(slug),
    [selectedSlugs]
  );

  const canAdd = selectedSlugs.length < maxItems;

  return {
    selectedSlugs,
    toggleAbomination,
    removeAbomination,
    clearComparison,
    isSelected,
    canAdd,
    count: selectedSlugs.length,
  };
}
