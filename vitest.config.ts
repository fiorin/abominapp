// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
