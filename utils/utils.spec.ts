import {
  groupAbominations,
  getSortedGroups,
  getAbominationsByGroup,
  capitalize,
} from "./utils"; // ajuste o caminho conforme sua estrutura

import { Abomination } from "@/types";

const mockAbominations: Abomination[] = [
  {
    slug: "a",
    name: "Alpha",
    group: "default",
    actions: 1,
    damage: 1,
    description: "desc A",
    danger: 0,
    ability: "ability A",
    enabled: true,
  },
  {
    slug: "b",
    name: "Beta",
    group: "exclusive",
    actions: 2,
    damage: 2,
    description: "desc B",
    danger: 1,
    ability: "ability B",
    enabled: true,
  },
  {
    slug: "c",
    name: "Gamma",
    group: "custom",
    actions: 3,
    damage: 1,
    description: "desc C",
    danger: 2,
    ability: "ability C",
    enabled: false,
  },
  {
    slug: "d",
    name: "Delta",
    group: "default",
    actions: 2,
    damage: 2,
    description: "desc D",
    danger: 3,
    ability: "ability D",
    enabled: true,
  },
];

describe("Utils for abominations", () => {
  describe("groupAbominations", () => {
    it("correctly groups abominations by group key", () => {
      const grouped = groupAbominations(mockAbominations);

      expect(Object.keys(grouped).sort()).toEqual(
        ["custom", "default", "exclusive"].sort(),
      );
      expect(grouped.default).toHaveLength(2);
      expect(grouped.custom[0].slug).toBe("c");
    });

    it("assigns abominations with missing or falsy group to 'default'", () => {
      const input: Abomination[] = [
        ...mockAbominations,
        { ...mockAbominations[0], slug: "e", group: undefined as any },
        { ...mockAbominations[1], slug: "f", group: "" as any },
      ];

      const grouped = groupAbominations(input);

      expect(grouped.default.length).toBe(4); // 2 originais + 2 novos com falsy group
      expect(grouped[""]).toBeUndefined();
      expect(grouped.undefined).toBeUndefined();
    });

    it("returns empty object when no abominations passed", () => {
      expect(groupAbominations([])).toEqual({});
    });
  });

  describe("getSortedGroups", () => {
    it("returns only group keys present, in correct order", () => {
      const grouped = {
        exclusive: [mockAbominations[1]],
        custom: [mockAbominations[2]],
        default: [mockAbominations[0], mockAbominations[3]],
      };

      const sorted = getSortedGroups(grouped);

      expect(sorted).toEqual(["default", "exclusive", "custom"]);
    });

    it("returns empty array if no groups present", () => {
      expect(getSortedGroups({})).toEqual([]);
    });

    it("ignores groups not in predefined order", () => {
      const grouped = {
        unknown: [mockAbominations[0] as any],
        default: [mockAbominations[0]],
      };

      const sorted = getSortedGroups(grouped);

      expect(sorted).toEqual(["default"]);
    });
  });

  describe("getAbominationsByGroup", () => {
    it("returns all abominations matching the group", () => {
      const results = getAbominationsByGroup(mockAbominations, "default");

      expect(results.length).toBe(2);
      expect(results.every((a) => a.group === "default")).toBe(true);
    });

    it("excludes abomination with specified slug", () => {
      const results = getAbominationsByGroup(mockAbominations, "default", "a");

      expect(results.length).toBe(1);
      expect(results[0].slug).toBe("d");
    });

    it("returns empty array if group does not exist", () => {
      const results = getAbominationsByGroup(mockAbominations, "pending");

      expect(results).toHaveLength(0);
    });

    it("handles undefined group argument as 'default'", () => {
      const results = getAbominationsByGroup(
        mockAbominations,
        undefined as any,
      );

      expect(results.length).toBe(2);
      expect(results.every((a) => a.group === "default")).toBe(true);
    });
  });

  describe("capitalize", () => {
    it("capitalizes first letter of string", () => {
      expect(capitalize("zombie")).toBe("Zombie");
      expect(capitalize("ZOMBIE")).toBe("ZOMBIE");
      expect(capitalize("z")).toBe("Z");
    });

    it("returns empty string unchanged", () => {
      expect(capitalize("")).toBe("");
    });

    it("works with single character strings", () => {
      expect(capitalize("a")).toBe("A");
    });

    it("does not throw on non-alpha characters", () => {
      expect(capitalize("1abc")).toBe("1abc");
      expect(capitalize("!abc")).toBe("!abc");
    });
  });
});
