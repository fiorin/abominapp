import { useMemo } from "react";

import { Abomination, Group } from "@/types";

export interface Statistics {
  total: number;
  avgDanger: number;
  avgActions: number;
  avgDamage: number;
  maxDanger: number;
  minDanger: number;
  groupDistribution: Record<Group, number>;
  byGroup: Record<
    Group,
    {
      count: number;
      avgDanger: number;
      avgActions: number;
      avgDamage: number;
    }
  >;
  dangerDistribution: {
    level: number;
    count: number;
    percentage: number;
  }[];
}

/**
 * Hook for calculating statistics from abominations
 */
export function useStatistics(abominations: Abomination[]): Statistics {
  return useMemo(() => {
    if (abominations.length === 0) {
      return {
        total: 0,
        avgDanger: 0,
        avgActions: 0,
        avgDamage: 0,
        maxDanger: 0,
        minDanger: 0,
        groupDistribution: {} as Record<Group, number>,
        byGroup: {} as Record<Group, any>,
        dangerDistribution: [],
      };
    }

    const total = abominations.length;
    const avgDanger = abominations.reduce((sum, a) => sum + a.danger, 0) / total;
    const avgActions =
      abominations.reduce((sum, a) => sum + a.actions, 0) / total;
    const avgDamage = abominations.reduce((sum, a) => sum + a.damage, 0) / total;
    const maxDanger = Math.max(...abominations.map((a) => a.danger));
    const minDanger = Math.min(...abominations.map((a) => a.danger));

    // Group distribution
    const groupDistribution: Record<string, number> = {};
    const byGroup: Record<string, any> = {};

    abominations.forEach((a) => {
      const group = a.group || "default";
      groupDistribution[group] = (groupDistribution[group] || 0) + 1;

      if (!byGroup[group]) {
        byGroup[group] = {
          count: 0,
          totalDanger: 0,
          totalActions: 0,
          totalDamage: 0,
        };
      }

      byGroup[group].count += 1;
      byGroup[group].totalDanger += a.danger;
      byGroup[group].totalActions += a.actions;
      byGroup[group].totalDamage += a.damage;
    });

    // Calculate averages per group
    Object.keys(byGroup).forEach((group) => {
      const g = byGroup[group];
      byGroup[group] = {
        count: g.count,
        avgDanger: g.totalDanger / g.count,
        avgActions: g.totalActions / g.count,
        avgDamage: g.totalDamage / g.count,
      };
    });

    // Danger distribution
    const dangerDistribution = [];
    for (let level = 0; level <= maxDanger; level++) {
      const count = abominations.filter((a) => a.danger === level).length;
      dangerDistribution.push({
        level,
        count,
        percentage: (count / total) * 100,
      });
    }


    return {
      total,
      avgDanger: Math.round(avgDanger * 100) / 100,
      avgActions: Math.round(avgActions * 100) / 100,
      avgDamage: Math.round(avgDamage * 100) / 100,
      maxDanger,
      minDanger,
      groupDistribution: groupDistribution as Record<Group, number>,
      byGroup: byGroup as Record<Group, any>,
      dangerDistribution,
    };
  }, [abominations]);
}
