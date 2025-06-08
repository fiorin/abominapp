"use client";

import Link from "next/link";
import { useAbominations } from "@/hooks/useAbominations";

export default function AbominationPage() {
  const { abominations } = useAbominations();

  const grouped = abominations.reduce<Record<number, typeof abominations>>(
    (acc, abom) => {
      const level = abom.danger || 1;
      acc[level] = acc[level] || [];
      acc[level].push(abom);
      return acc;
    },
    {}
  );

  const sortedLevels = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <section className="py-2 space-y-10">
      {sortedLevels.map((level) => (
        <div key={level}>
          <h2
            className={`text-2xl font-bold text-white mb-4 py-2 px-4 rounded`}
          >
            Danger Level {level}
          </h2>

          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {grouped[level].map((abomination) => (
              <li key={abomination.slug} className="relative">
                <Link
                  href={`/abominations/${abomination.slug}`}
                  className={`block p-4 border-2 rounded-lg shadow-lg transition duration-300 ease-in-out`}
                >
                  {/* Avatar antes do nome */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={`/images/icons/${abomination.slug}.png`}
                      alt={abomination.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                    />
                    <span
                      className="text-lg font-medium"
                      style={{
                        padding: "4px",
                        borderColor: "gray",
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
