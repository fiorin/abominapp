"use client";

import Link from "next/link";

import {
  getSortedGroups,
  groupAbominations,
} from "../../utils/utils";

import { GROUP_CONFIG } from "@/config/constants";
import { useAbominations } from "@/hooks/useAbominations";
import Avatar from "@/components/avatar";

export default function AbominationPage() {
  const { abominations } = useAbominations();
  const grouped = groupAbominations(abominations);
  const sortedGroups = getSortedGroups(grouped);

  return (
    <section className="py-2 space-y-10">
      {sortedGroups.map((group) => {
        const config = GROUP_CONFIG[group];
        const textColorClass = config.text;
        const borderColorClass = config.border;

        return (
          <div key={group}>
            <h2
              className={`text-2xl font-bold ${textColorClass} mb-4 py-2 px-4 rounded`}
            >
              {config.label} Abominations
            </h2>

            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {grouped[group].map((abomination) => (
                <li key={abomination.slug}>
                  <Link
                    className={`block py-3 px-4 rounded-lg shadow-lg border-2 transition duration-300 ease-in-out ${borderColorClass}`}
                    href={`/abominations/${abomination.slug}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        active
                        asChild
                        abomination={abomination}
                        borderColor={borderColorClass}
                      />
                      <span className="text-lg font-medium">
                        {abomination.name}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
