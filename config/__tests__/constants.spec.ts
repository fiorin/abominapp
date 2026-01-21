import { describe, expect, it } from "vitest";

import { GROUP_CONFIG } from "@/config/constants";

describe("GROUP_CONFIG", () => {
  it("should have all required groups", () => {
    const requiredGroups = [
      "default",
      "expansion",
      "exclusive",
      "ported",
      "custom",
      "requested",
      "pending",
    ];

    requiredGroups.forEach((group) => {
      expect(GROUP_CONFIG[group as any]).toBeDefined();
    });
  });

  it("should have correct structure for each group", () => {
    Object.entries(GROUP_CONFIG).forEach(([, config]) => {
      expect(config).toHaveProperty("text");
      expect(config).toHaveProperty("border");
      expect(config).toHaveProperty("bg");
      expect(config).toHaveProperty("label");
      expect(config).toHaveProperty("order");

      expect(typeof config.text).toBe("string");
      expect(typeof config.border).toBe("string");
      expect(typeof config.bg).toBe("string");
      expect(typeof config.label).toBe("string");
      expect(typeof config.order).toBe("number");
    });
  });

  it("should have unique color classes", () => {
    const colors = new Set<string>();

    Object.values(GROUP_CONFIG).forEach((config) => {
      const combined = `${config.text} ${config.border}`;

      expect(colors.has(combined)).toBe(false);
      colors.add(combined);
    });
  });

  it("should have sequential order values", () => {
    const orders = Object.values(GROUP_CONFIG)
      .map((c) => c.order)
      .sort((a, b) => a - b);

    for (let i = 0; i < orders.length - 1; i++) {
      expect(orders[i] < orders[i + 1]).toBe(true);
    }
  });
});
