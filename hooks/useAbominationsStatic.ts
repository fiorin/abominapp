import { useMemo } from 'react';
import { Abomination, Group } from '@/types';
import abominationsData from '@/public/db/abominations.json';

const GROUP_ORDER: Group[] = [
  'default',
  'expansion',
  'exclusive',
  'custom',
  'ported',
  'requested',
];

function groupIndex(group: string): number {
  const idx = GROUP_ORDER.indexOf(group as Group);
  return idx !== -1 ? idx : GROUP_ORDER.length;
}

function sortAbominations(data: Abomination[]) {
  return data.slice().sort((a, b) => {
    const groupA = groupIndex(a.group);
    const groupB = groupIndex(b.group);

    if (groupA !== groupB) return groupA - groupB;

    if (groupA === GROUP_ORDER.length) {
      const cmp = a.group.localeCompare(b.group);
      if (cmp !== 0) return cmp;
    }

    return a.name.localeCompare(b.name);
  });
}

/**
 * Hook to get abominations with sorting and filtering.
 * Uses static import for better performance - no network requests.
 * @param onlyEnabled - Filter to only enabled abominations (default: true)
 * @returns Object with sorted abominations array
 */
export function useAbominationsStatic(onlyEnabled: boolean = true) {
  const abominations = useMemo(() => {
    const data = abominationsData as Abomination[];
    const filtered = onlyEnabled ? data.filter((a) => a.enabled) : data;
    return sortAbominations(filtered);
  }, [onlyEnabled]);

  return { abominations };
}
