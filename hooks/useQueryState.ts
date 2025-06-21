import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useQueryState<T extends string>(
  key: string,
  defaultValue: T,
  options?: { allowedValues?: readonly T[] },
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramValue = searchParams.get(key);
  const isAllowed =
    !options?.allowedValues || options.allowedValues.includes(paramValue as T);

  const initial = isAllowed && paramValue ? (paramValue as T) : defaultValue;
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    setState(initial);
  }, [initial]);

  const setQueryState = useCallback(
    (next: T) => {
      const params = new URLSearchParams(searchParams.toString());

      if (next === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, next);
      }
      router.push(`?${params.toString()}`, { scroll: false });
      setState(next);
    },
    [key, defaultValue, router, searchParams],
  );

  return [state, setQueryState] as const;
}
