'use client';

import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Slider } from '@heroui/slider';
import { X } from 'lucide-react';

import { Group } from '@/types';
import { GROUP_CONFIG } from '@/config/constants';
import { SearchFilters } from '@/hooks/useSearch';

interface SearchFilterProps {
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onClear: () => void;
  resultsCount: number;
}

const GROUPS: Group[] = [
  'default',
  'expansion',
  'exclusive',
  'ported',
  'custom',
  'requested',
];

export default function SearchFilter({
  filters,
  onFiltersChange,
  onClear,
  resultsCount,
}: SearchFilterProps) {
  return (
    <div className="w-full bg-default-100 rounded-lg p-6 space-y-6">
      {/* Search Input */}
      <div>
        <label className="text-sm font-semibold text-default-700 mb-2 block">
          Search by name or ability
        </label>
        <Input
          isClearable
          placeholder="Find abominations..."
          value={filters.query}
          onValueChange={(value) => onFiltersChange({ query: value })}
          startContent={
            <span className="text-default-400">🔍</span>
          }
        />
      </div>

      {/* Danger Level Slider */}
      <div>
        <label className="text-sm font-semibold text-default-700 mb-2 block">
          Danger Level: {filters.dangerMin} - {filters.dangerMax}
        </label>
        <div className="flex gap-4">
          <Slider
            value={[filters.dangerMin, filters.dangerMax]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                onFiltersChange({
                  dangerMin: value[0],
                  dangerMax: value[1],
                });
              }
            }}
            className="flex-1"
            maxValue={6}
            minValue={0}
            step={1}
          />
        </div>
      </div>

      {/* Group Filter */}
      <div>
        <label className="text-sm font-semibold text-default-700 mb-2 block">
          Filter by Group
        </label>
        <div className="flex flex-wrap gap-2">
          {GROUPS.map((group) => (
            <Button
              key={group}
              isIconOnly={false}
              size="sm"
              variant={filters.groups.includes(group) ? 'solid' : 'bordered'}
              color={
                filters.groups.includes(group)
                  ? 'primary'
                  : 'default'
              }
              onClick={() => {
                const newGroups = filters.groups.includes(group)
                  ? filters.groups.filter((g) => g !== group)
                  : [...filters.groups, group];
                onFiltersChange({ groups: newGroups });
              }}
            >
              {GROUP_CONFIG[group].label}
            </Button>
          ))}
        </div>
      </div>

      {/* Favorites Filter */}
      <div className="flex items-center gap-2">
        <Button
          isIconOnly={false}
          size="sm"
          variant={filters.favorites ? 'solid' : 'bordered'}
          color={filters.favorites ? 'warning' : 'default'}
          onClick={() => onFiltersChange({ favorites: !filters.favorites })}
        >
          ❤️ Favorites Only
        </Button>
      </div>

      {/* Results and Clear */}
      <div className="flex items-center justify-between pt-4 border-t border-default-200">
        <span className="text-sm text-default-600">
          {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </span>
        <Button
          isIconOnly={false}
          size="sm"
          variant="light"
          color="danger"
          onClick={onClear}
          startContent={<X size={16} />}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
