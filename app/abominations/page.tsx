"use client";

import { useMemo, useState } from 'react';
import Link from "next/link";
import { Button } from '@heroui/button';

import {
  getSortedGroups,
  groupAbominations,
} from "../../utils/utils";

import { GROUP_CONFIG } from "@/config/constants";
import { useAbominationsStatic } from "@/hooks/useAbominationsStatic";
import { useFavorites } from "@/hooks/useFavorites";
import { useSearch } from "@/hooks/useSearch";
import Avatar from "@/components/avatar";
import SearchFilter from "@/components/searchFilter";

export default function AbominationPage() {
  const { abominations } = useAbominationsStatic();
  const { favorites } = useFavorites();
  const { filtered, filters, updateFilters, clearFilters } = useSearch(
    abominations,
    favorites
  );
  const [showFilters, setShowFilters] = useState(false);

  const grouped = useMemo(() => groupAbominations(filtered), [filtered]);
  const sortedGroups = getSortedGroups(grouped);

  return (
    <section className="py-2 space-y-6">
      {/* Header with Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">Abominations</h1>
        <div className="flex gap-2">
          {Object.keys(filters).some(
            (k) =>
              filters[k as keyof typeof filters] &&
              (typeof filters[k as keyof typeof filters] !== 'object' ||
                (filters[k as keyof typeof filters] as any).length > 0)
          ) && (
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={clearFilters}
            >
              Clear Filters
            </Button>
          )}
          <Button
            size="sm"
            variant={showFilters ? 'solid' : 'flat'}
            onPress={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>

      {/* Search Filter Component */}
      {showFilters && (
        <SearchFilter
          filters={filters}
          onFiltersChange={updateFilters}
          onClear={clearFilters}
          resultsCount={filtered.length}
        />
      )}

      {/* Results Info */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} of {abominations.length} abominations
      </div>

      {/* Abominations Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-400 mb-4">No abominations found</p>
          <Button
            as="button"
            color="primary"
            variant="flat"
            onPress={clearFilters}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          {sortedGroups.map((group) => {
            const config = GROUP_CONFIG[group];
            const textColorClass = config.text;
            const borderColorClass = config.border;

            return (
              <div key={group}>
                <h2
                  className={`text-2xl font-bold ${textColorClass} mb-4 py-2 px-4 rounded`}
                >
                  {config.label} Abominations ({grouped[group].length})
                </h2>

                <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {grouped[group].map((abomination) => {
                    const isFavorite = favorites.has(abomination.slug);

                    return (
                      <li key={abomination.slug}>
                        <Link
                          className={`block py-3 px-4 rounded-lg shadow-lg border-2 transition duration-300 ease-in-out hover:shadow-xl ${borderColorClass}`}
                          href={`/abominations/${abomination.slug}`}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar
                              active
                              asChild
                              abomination={abomination}
                              borderColor={borderColorClass}
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-lg font-medium block truncate">
                                {abomination.name}
                              </span>
                              {isFavorite && (
                                <span className="text-lg text-red-500 font-semibold">
                                  ♥
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
