"use client";

import Link from "next/link";
import { useAbominations } from "@/hooks/useAbominations";
import { Randomizer } from "@/components/randomizer";

export default function Home() {
  const { abominations } = useAbominations();

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20">
      <Randomizer items={abominations} />

      <p className="text-muted-foreground text-md">
        or use our{" "}
        <Link href="/random" className="text-warning underline">
          custom randomizer
        </Link>
      </p>
    </section>
  );
}
