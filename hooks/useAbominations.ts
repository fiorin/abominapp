"use client";

import { useEffect, useState } from "react";

export type Group =
  | "default"
  | "exclusive"
  | "expansion"
  | "ported"
  | "custom"
  | "pending";

export interface Abomination {
  name: string;
  slug: string;
  description: string;
  image: string;
  danger: number;
  group: Group;
}

export function useAbominations(onlyEnabled: boolean = true) {
  const [abominations, setAbominations] = useState<Abomination[]>([]);

  useEffect(() => {
    fetch("/db/abominations.json")
      .then((res) => res.json())
      .then((data) => {
        if (onlyEnabled) {
          setAbominations(
            data.filter(
              (abom: Abomination & { enabled?: boolean }) => abom.enabled,
            ),
          );
        } else {
          setAbominations(data);
        }
      });
  }, []);

  return { abominations };
}
