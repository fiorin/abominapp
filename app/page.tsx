"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import clsx from "clsx";

import { useAbominations } from "@/hooks/useAbominations";

type Abomination = {
  slug: string;
  name: string;
};

export default function Home() {
  const { abominations } = useAbominations();
  const router = useRouter();

  const [selected, setSelected] = useState<Abomination>();

  const randomize = () => {
    if (!abominations.length) return;

    const random =
      abominations[Math.floor(Math.random() * abominations.length)];

    setSelected(random);
  };

  const handleClick = () => {
    if (selected && selected.slug !== "placeholder") {
      router.push(`/abominations/${selected.slug}`);
    }
  };

  const { name, slug } = selected ?? {
    name: "Random Abomination",
    slug: "placeholder",
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20">
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
      <h1 className="text-3xl font-bold">{name}</h1>
      <Button color="danger" size="lg" onClick={randomize}>
        Randomize
      </Button>
    </section>
  );
}
