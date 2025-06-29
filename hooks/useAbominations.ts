import { useEffect, useState, useCallback, useRef } from "react";

import { Abomination, Group } from "@/types";

const GROUP_ORDER: Group[] = [
  "default",
  "expansion",
  "exclusive",
  "custom",
  "ported",
  "requested",
];

function groupIndex(group: string): number {
  const idx = GROUP_ORDER.indexOf(group as Group);

  return idx !== -1 ? idx : GROUP_ORDER.length;
}

export function useAbominations(onlyEnabled: boolean = true) {
  const [abominations, setAbominations] = useState<Abomination[]>([]);
  const isMounted = useRef(true);

  const sortAbominations = useCallback((data: Abomination[]) => {
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
  }, []);

  useEffect(() => {
    isMounted.current = true;

    async function fetchAbominations() {
      try {
        const res = await fetch("/db/abominations.json");

        if (!res.ok) throw new Error("Failed to fetch abominations");

        const data: Abomination[] = await res.json();
        const filtered = onlyEnabled ? data.filter((a) => a.enabled) : data;
        const sorted = sortAbominations(filtered);

        if (isMounted.current) setAbominations(sorted);
      } catch (error) {
        console.error("Error loading abominations:", error);
        if (isMounted.current) setAbominations([]);
      }
    }

    fetchAbominations();

    return () => {
      isMounted.current = false;
    };
  }, [onlyEnabled, sortAbominations]);

  return { abominations };
}
