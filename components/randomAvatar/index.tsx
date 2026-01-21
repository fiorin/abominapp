"use client";

import Image from "next/image";
import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@heroui/tooltip";

import Avatar from "@/components/avatar";
import { GROUP_CONFIG } from "@/config/constants";

interface Abomination {
  slug: string;
  name: string;
  group: string;
}

interface RandomAvatarsProps {
  abominations: Abomination[];
  count: number;
}

function getRandomElements<T>(arr: T[], count: number): T[] {
  const arrayCopy = [...arr];

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, count);
}

export default function RandomAvatars({
  abominations,
  count,
}: RandomAvatarsProps) {
  const [seed, setSeed] = useState(Date.now());
  const router = useRouter();

  const randomAbominations = useMemo(
    () => getRandomElements(abominations, count),
    [abominations, count, seed],
  );

  const handleClick = useCallback(
    (slug: string) => {
      router.push(`/abominations/${slug}`);
    },
    [router],
  );

  const handleRefresh = useCallback(() => {
    setSeed(Date.now());
  }, []);

  return (
    <div className="flex justify-center gap-4">
      {randomAbominations.map((abomination) => {
        const group = (abomination.group ?? "default") as keyof typeof GROUP_CONFIG;
        const borderColor = GROUP_CONFIG[group].border;

        return (
          <Avatar
            key={abomination.slug}
            active
            abomination={abomination}
            borderColor={borderColor}
            onClick={() => handleClick(abomination.slug)}
          />
        );
      })}

      <button
        aria-label="Refresh avatars"
        className="rounded-full border-2 p-1 transition border-warning hover:border-warning-dark focus:outline-none focus:ring-2 focus:ring-warning"
        type="button"
        onClick={handleRefresh}
      >
        <Tooltip color="default" content="Other Abominations">
          <Image
            alt="Refresh avatars"
            className="w-12 h-12 rounded-full object-cover"
            height={48}
            src="/images/icons/refresh.png"
            width={48}
          />
        </Tooltip>
      </button>
    </div>
  );
}
