"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { useAbominations } from "@/hooks/useAbominations";
import clsx from "clsx";

type Abomination = {
  slug: string;
  name: string;
};

const FALLBACK_IMAGE = "/images/abominations/placeholder.png";

export default function Home() {
  const { abominations } = useAbominations();
  const router = useRouter();

  const [selected, setSelected] = useState<Abomination>({
    name: "Random Abomination",
    slug: "randomize",
  });

  const [imageSrc, setImageSrc] = useState(
    `/images/abominations/${selected.slug}.png`
  );
  const [isLoading, setIsLoading] = useState(true);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const newSrc = `/images/abominations/${selected.slug}.png`;
    setImageSrc(newSrc);
    setIsLoading(true);
    setShake(true);

    const timeout = setTimeout(() => setShake(false), 500);
    return () => clearTimeout(timeout);
  }, [selected]);

  const randomize = () => {
    if (!abominations.length) return;
    const random =
      abominations[Math.floor(Math.random() * abominations.length)];
    setSelected(random);
  };

  const handleClick = () => {
    if (selected.slug !== "randomize") {
      router.push(`/abominations/${selected.slug}`);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20">
      <Image
        src={imageSrc}
        alt={selected.name}
        width={300}
        height={400}
        onClick={handleClick}
        onError={() => setImageSrc(FALLBACK_IMAGE)}
        onLoad={() => setIsLoading(false)}
        className={clsx(
          "rounded-xl cursor-pointer transition duration-300",
          isLoading
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100 hover:scale-105",
          shake && "animate-shake"
        )}
      />
      <h1 className="text-3xl font-bold">{selected.name}</h1>
      <Button color="danger" size="lg" onClick={randomize}>
        Randomize
      </Button>
    </section>
  );
}
