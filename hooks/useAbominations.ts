/**
 * @deprecated Use useAbominationsStatic instead for better performance.
 * This hook is maintained for backward compatibility but uses static import internally.
 */

import { useAbominationsStatic } from "./useAbominationsStatic";

export function useAbominations(onlyEnabled: boolean = true) {
  return useAbominationsStatic(onlyEnabled);
}
