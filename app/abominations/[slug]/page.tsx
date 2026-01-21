"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Footprints, Flame } from "lucide-react";

import abominationsJson from "../../../public/db/abominations.json";
import { getAbominationsByGroup } from "../../../utils/utils";

import { GROUP_CONFIG } from "@/config/constants";
import { Abomination } from "@/types";
import RandomAvatars from "@/components/randomAvatar";

export default function AbominationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const abominations = abominationsJson as Abomination[];

  const abomination = abominations.find((a) => a.slug === slug);

  if (!abomination) return notFound();

  const {
    name,
    group,
    slug: abSlug,
    actions,
    damage,
    ability,
    description,
  } = abomination;

  const groupConfig = GROUP_CONFIG[group ?? "default"];
  const groupClass = `${groupConfig.text} ${groupConfig.border}`;
  const groupLabel = `${groupConfig.label} Group`;

  const related = getAbominationsByGroup(abominations, group, abSlug);
  const imgSrc = `/images/abominations/${abSlug}.png`;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <Image
        alt={name}
        className="rounded-xl mx-auto"
        height={400}
        src={imgSrc}
        width={300}
        priority={true}
        placeholder="blur"
        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect fill='%23333' width='300' height='400'/%3E%3C/svg%3E"
      />

      <h1 className="text-4xl font-bold text-center mt-6">{name}</h1>

      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-1 text-blue-500">
          actions <Footprints className="w-5 h-5" />
          <span className="text-lg font-semibold">{actions}</span>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          damage <Flame className="w-5 h-5" />
          <span className="text-lg font-semibold">{damage}</span>
        </div>
      </div>

      {group && (
        <p className={`text-xs font-semibold text-center mt-2 ${groupClass}`}>
          {groupLabel}
        </p>
      )}

      <p className="mt-4 text-md text-center text-default-800">{ability}</p>
      <p className="mt-4 text-sm text-center text-default-500">{description}</p>

      {related.length > 0 && (
        <>
          <hr className="my-8 border-t border-default-300" />
          <h4 className="text-sm text-center mt-6 mb-4">
            Other <span className={groupClass}>{groupLabel}</span> Abominations
          </h4>
          <RandomAvatars abominations={related} count={3} />
        </>
      )}
    </section>
  );
}
