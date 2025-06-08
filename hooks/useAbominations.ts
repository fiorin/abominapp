"use client";

import { useEffect, useState } from "react";

export interface Abomination {
  name: string;
  slug: string;
  description: string;
  image: string;
  danger: number;
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
              (abom: Abomination & { enabled?: boolean }) => abom.enabled
            )
          );
        } else {
          setAbominations(data);
        }
      });
  }, []);

  return { abominations };
}
