"use client";

import Link from "next/link";

import {
  capitalize,
  getSortedGroups,
  groupAbominations,
} from "../../utils/utils";

import { groupColors } from "@/config/constants";
import { useAbominations } from "@/hooks/useAbominations";
import Avatar from "@/components/avatar";

export default function AbominationPage() {
  const { abominations } = useAbominations();
  const grouped = groupAbominations(abominations);
  const sortedGroups = getSortedGroups(grouped);

  return (
    <section className="py-2 space-y-10">
      {sortedGroups.map((group) => {
        const [textColor, borderColor] = groupColors[group].split(" ");

        return (
          <div key={group}>
            <h2
              className={`text-2xl font-bold ${textColor} mb-4 py-2 px-4 rounded`}
            >
              {capitalize(group)} Abominations
            </h2>

            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {grouped[group].map((abomination) => (
                <li key={abomination.slug}>
                  <Link
                    className={`block py-3 px-4 rounded-lg shadow-lg border-2 transition duration-300 ease-in-out ${borderColor}`}
                    href={`/abominations/${abomination.slug}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar
                        active
                        asChild
                        abomination={abomination}
                        borderColor={borderColor}
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
