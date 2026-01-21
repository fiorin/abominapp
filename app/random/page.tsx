"use client";

import { Button } from "@heroui/button";

import { useAbominations } from "@/hooks/useAbominations";
import { Randomizer } from "@/components/randomizer";
import AvatarSelector from "@/components/avatarSelector";
import { useRandom } from "@/hooks/useRandom";

export default function RandomPage() {
  const { abominations } = useAbominations();

  const {
    filter,
    selectedSlugsSet,
    filtered,
    toggleAbomination,
    handleFilterChange,
    FILTERS,
  } = useRandom(abominations);

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="flex gap-4">
        {FILTERS.map((f) => (
          <Button
            key={f}
            color={f === filter ? "danger" : "default"}
            onClick={() => handleFilterChange(f)}
            variant={f === filter ? "solid" : "bordered"}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <Randomizer items={filtered} />

      <AvatarSelector
        abominations={abominations}
        onChange={toggleAbomination}
        selectedSlugsSet={selectedSlugsSet}
      />
    </section>
  );
}
