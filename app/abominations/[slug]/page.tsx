"use client";

import Image from "next/image";
import { Progress } from "@heroui/progress";
import { notFound, useParams } from "next/navigation";

import abominations from "../../../public/db/abominations.json";

export default function AbominationDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const abomination = abominations.find((a) => a.slug === slug);

  if (!abomination) return notFound();

  const groupColors: Record<string, string> = {
    default: "text-yellow-500",
    expansion: "text-orange-500",
    ported: "text-blue-500",
    custom: "text-green-500",
    pending: "text-red-500",
  };

  const dangerLevels = ["Low", "Medium", "High", "Critical"];
  const dangerColors: Array<"success" | "warning" | "danger" | "secondary"> = [
    "success",
    "warning",
    "danger",
    "secondary",
  ];
  const dangerLabel =
    dangerLevels[Math.floor((abomination.danger / 10) * dangerLevels.length)];
  const dangerColor =
    dangerColors[Math.floor((abomination.danger / 10) * dangerColors.length)];

  const groupColorClass = groupColors[abomination.group || "default"];
  const imageSrc = `/images/abominations/${abomination.slug}.png`;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <Image
        alt={abomination.name}
        className="rounded-xl mx-auto"
        height={400}
        src={imageSrc}
        width={300}
      />
      <h1 className="text-4xl font-bold text-center mt-6">
        {abomination.name}
      </h1>

      {abomination.group && (
        <p
          className={`text-lg font-semibold text-center mt-2 ${groupColorClass}`}
        >
          {abomination.group.charAt(0).toUpperCase() +
            abomination.group.slice(1)}{" "}
          Group
        </p>
      )}

      <p className="mt-4 text-lg text-center text-default-600">
        {abomination.description}
      </p>

      <div className="mt-6 text-center space-y-2">
        <span className="text-lg font-semibold">Danger Level</span>
        <Progress
          showValueLabel
          className="w-full max-w-md mx-auto"
          color={dangerColor}
          label={dangerLabel}
          value={(abomination.danger || 1) * 10}
        />
      </div>
    </section>
  );
}
