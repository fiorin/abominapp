import { Abomination, Group } from "@/types";

const DEFAULT_GROUP = "default";

export function groupAbominations(abominations: Abomination[]) {
  return abominations.reduce<Record<string, Abomination[]>>((acc, abom) => {
    const group = abom.group || DEFAULT_GROUP;

    if (!acc[group]) acc[group] = [];
    acc[group].push(abom);

    return acc;
  }, {});
}

export function getSortedGroups(grouped: Record<string, Abomination[]>) {
  const groupOrder: Group[] = [
    "default",
    "exclusive",
    "expansion",
    "ported",
    "custom",
    "requested",
  ];

  return groupOrder.filter((group) => group in grouped);
}

export function getAbominationsByGroup(
  all: Abomination[],
  group?: string,
  excludeSlug?: string,
): Abomination[] {
  const validGroup = group || DEFAULT_GROUP;

  return all.filter((a) => a.group === validGroup && a.slug !== excludeSlug);
}

export const capitalize = (text: string): string =>
  text ? text[0].toUpperCase() + text.slice(1) : "";
