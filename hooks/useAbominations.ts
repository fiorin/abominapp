import { useEffect, useState } from "react";

import { Abomination } from "@/types";

const GROUP_ORDER = ["default", "expansion", "exclusive", "custom", "ported"];

function groupIndex(group: string) {
  const idx = GROUP_ORDER.indexOf(group);

  return idx !== -1 ? idx : GROUP_ORDER.length;
}

export function useAbominations(onlyEnabled: boolean = true) {
  const [abominations, setAbominations] = useState<Abomination[]>([]);

  useEffect(() => {
    fetch("/db/abominations.json")
      .then((res) => res.json())
      .then((data: Abomination[]) => {
        const filtered = onlyEnabled
          ? data.filter((abom) => abom.enabled)
          : data;

        filtered.sort((a, b) => {
          const groupA = groupIndex(a.group);
          const groupB = groupIndex(b.group);

          if (groupA !== groupB) {
            return groupA - groupB;
          }

          // Se ambos estão em grupos não listados, ordena por nome do grupo
          if (groupA === GROUP_ORDER.length) {
            const groupCompare = a.group.localeCompare(b.group);

            if (groupCompare !== 0) {
              return groupCompare;
            }
          }

          // Desempate final: ordem alfabética pelo nome
          return a.name.localeCompare(b.name);
        });

        setAbominations(filtered);
      });
  }, [onlyEnabled]);

  return { abominations };
}
