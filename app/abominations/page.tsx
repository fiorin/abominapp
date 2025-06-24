"use client";

import Link from "next/link";
import Image from "next/image";

import { useAbominations } from "@/hooks/useAbominations";

export default function AbominationPage() {
  const { abominations } = useAbominations();

  // Mapeamento de cores para os grupos
  const groupColors: Record<string, string> = {
    default: "text-yellow-500 border-yellow-500",
    expansion: "text-orange-500 border-orange-500",
    exclusive: "text-purple-500 border-purple-500",
    ported: "text-blue-500 border-blue-500",
    custom: "text-green-500 border-green-500",
    pending: "text-red-500 border-red-500",
  };

  // Agrupamento por `group`
  const grouped = abominations.reduce<Record<string, typeof abominations>>(
    (acc, abomination) => {
      const group = abomination.group || "default";

      acc[group] = acc[group] || [];
      acc[group].push(abomination);

      return acc;
    },
    {},
  );

  // Ordem dos grupos
  const groupOrder = [
    "default",
    "exclusive",
    "expansion",
    "ported",
    "custom",
    "pending",
  ];
  const sortedGroups = groupOrder.filter((group) => grouped[group]);

  return (
    <section className="py-2 space-y-10">
      {sortedGroups.map((group) => (
        <div key={group}>
          {/* Título do grupo com cor correspondente */}
          <h2
            className={`text-2xl font-bold ${groupColors[group].split(" ")[0]} mb-4 py-2 px-4 rounded`}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)} Abominations
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {grouped[group].map((abomination) => (
              <li key={abomination.slug} className="relative">
                <Link
                  className={`block py-3 px-4 border-2 rounded-lg shadow-lg transition duration-300 ease-in-out ${
                    groupColors[group].split(" ")[1]
                  }`}
                  href={`/abominations/${abomination.slug}`}
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      alt={abomination.name}
                      className={`w-12 h-12 rounded-full object-cover border-2 ${
                        groupColors[group].split(" ")[1]
                      }`}
                      height={48}
                      src={`/images/icons/${abomination.slug}.png`}
                      width={48}
                    />
                    <span
                      className="text-lg font-medium"
                      style={{
                        padding: "4px",
                      }}
                    >
                      {abomination.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
