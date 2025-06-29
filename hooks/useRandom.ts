import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Abomination } from "@/types";

const FILTERS = ["default", "expanded", "all", "custom"] as const;

type FilterType = (typeof FILTERS)[number];

export function useRandom(abominations: Abomination[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getSlugsByFilter = useCallback(
    (filter: FilterType, aboms: Abomination[]) => {
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

  const initFilter = ((): FilterType => {
    const f = searchParams.get("filter") as FilterType | null;

    return f && FILTERS.includes(f) ? f : "default";
  })();

  const initIncludes = ((): string[] => {
    const param = searchParams.get("includes");

    if (param) return param.split(",");

    return getSlugsByFilter(initFilter, abominations);
  })();

  const [filter, setFilter] = useState<FilterType>(initFilter);
  const [includes, setIncludes] = useState<string[]>(initIncludes);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("filter", filter);
      if (includes.length) {
        params.set("includes", includes.join(","));
      } else {
        params.delete("includes");
      }

      const url = `/random?${params.toString()}`;

      router.replace(url, { scroll: false });
    }, 200);

    return () => clearTimeout(handler);
  }, [filter, includes, router, searchParams]);

  useEffect(() => {
    setIncludes(getSlugsByFilter(filter, abominations));
  }, [filter, abominations, getSlugsByFilter]);

  const filtered = useMemo(() => {
    return abominations.filter((a) => includes.includes(a.slug));
  }, [abominations, includes]);

  const toggleInclude = (slug: string) => {
    setIncludes((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  return {
    filter,
    includes,
    filtered,
    toggleInclude,
    handleFilterChange,
    FILTERS,
  };
}
