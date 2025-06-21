"use client";

import { useMemo, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter, useSearchParams } from "next/navigation";

import { useQueryState } from "@/hooks/useQueryState";
import { useAbominations } from "@/hooks/useAbominations";
import { Randomizer } from "@/components/randomizer";
import AvatarSelector from "@/components/avatarSelector";

const FILTERS = ["default", "expanded", "all", "custom"] as const;

type FilterType = (typeof FILTERS)[number];

export default function RandomPage() {
  const { abominations } = useAbominations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useQueryState<FilterType>("filter", "default", {
    allowedValues: FILTERS,
  });

  const includesParam = searchParams.get("includes");
  const [includes, setIncludes] = useState<string[]>([]);

  const getSlugsByFilter = (
    filter: FilterType,
    abominations: { slug: string; group: string }[],
  ) => {
    switch (filter) {
      case "all":
        return abominations.map((a) => a.slug);
      case "default":
        return abominations
          .filter((a) => a.group === "default")
          .map((a) => a.slug);
      case "expanded":
        return abominations
          .filter((a) =>
            ["default", "expansion", "exclusive"].includes(a.group),
          )
          .map((a) => a.slug);
      case "custom":
      default:
        return [];
    }
  };

  useEffect(() => {
    if (includesParam) {
      setIncludes(includesParam.split(","));
    } else {
      setIncludes(getSlugsByFilter(filter, abominations));
    }
  }, [abominations]);

  useEffect(() => {
    const expectedIncludes = getSlugsByFilter(filter, abominations);
    setIncludes(expectedIncludes);
  }, [filter]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("filter", filter);

    if (includes.length) {
      params.set("includes", includes.join(","));
    } else {
      params.delete("includes");
    }

    router.replace(`/random?${params.toString()}`, { scroll: false });
  }, [includes]);

  const filtered = useMemo(() => {
    return abominations.filter((a) => includes.includes(a.slug));
  }, [abominations, includes]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const toggleInclude = (slug: string) => {
    const newIncludes = includes.includes(slug)
      ? includes.filter((s) => s !== slug)
      : [...includes, slug];

    setIncludes(newIncludes);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="flex gap-4">
        {FILTERS.map((f) => (
          <Button
            key={f}
            color={f === filter ? "danger" : "default"}
            variant={f === filter ? "solid" : "bordered"}
            onClick={() => handleFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <Randomizer items={filtered} />

      <AvatarSelector
        abominations={abominations}
        includes={includes}
        onChange={toggleInclude}
      />
    </section>
  );
}
