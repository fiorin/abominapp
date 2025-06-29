"use client";

import Link from "next/link";

import { useAbominations } from "@/hooks/useAbominations";
import { Randomizer } from "@/components/randomizer";
import RandomAvatars from "@/components/randomAvatar";

export default function Home() {
  const { abominations } = useAbominations();

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-10">
      <Randomizer items={abominations} />

      <p className="text-muted-foreground text-md">
        or use our{" "}
        <Link className="text-warning underline" href="/random">
          custom randomizer
        </Link>
      </p>
      <RandomAvatars abominations={abominations} count={3} />
    </section>
  );
}
