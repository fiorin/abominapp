"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import clsx from "clsx";

type Item = {
  slug: string;
  name: string;
};

type RandomizerProps = {
  items: Item[];
  onClick?: (item: Item) => void;
};

export function Randomizer({ items, onClick }: RandomizerProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Item>();

  const randomize = () => {
    if (!items.length) return;

    const random = items[Math.floor(Math.random() * items.length)];
    setSelected(random);
  };

  const handleClick = () => {
    if (!selected) return;

    if (onClick) {
      onClick(selected);
    } else if (selected.slug !== "placeholder") {
      router.push(`/abominations/${selected.slug}`);
    }
  };

  const { name, slug } = selected ?? {
    name: "Random Abomination",
    slug: "placeholder",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div style={{ height: "460px" }}>
        <Image
          key={slug}
          alt={name}
          className={clsx(
            "rounded-xl cursor-pointer transition duration-300",
            "animate-shake",
          )}
          height={400}
          src={`/images/abominations/${slug}.png`}
          width={300}
          onClick={handleClick}
        />
      </div>
      <Button color="danger" size="lg" onClick={randomize}>
        Randomize
      </Button>
    </div>
  );
}
