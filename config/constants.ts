import { Group } from "@/types";

export interface GroupColorConfig {
  text: string;
  border: string;
  bg: string;
  label: string;
  order: number;
}

export const GROUP_CONFIG: Record<Group, GroupColorConfig> = {
  default: {
    text: "text-yellow-500",
    border: "border-yellow-500",
    bg: "bg-yellow-500/20",
    label: "Default",
    order: 0,
  },
  expansion: {
    text: "text-orange-500",
    border: "border-orange-500",
    bg: "bg-orange-500/20",
    label: "Expansion",
    order: 1,
  },
  exclusive: {
    text: "text-purple-500",
    border: "border-purple-500",
    bg: "bg-purple-500/20",
    label: "Exclusive",
    order: 2,
  },
  ported: {
    text: "text-blue-500",
    border: "border-blue-500",
    bg: "bg-blue-500/20",
    label: "Ported",
    order: 3,
  },
  custom: {
    text: "text-green-500",
    border: "border-green-500",
    bg: "bg-green-500/20",
    label: "Custom",
    order: 4,
  },
  requested: {
    text: "text-red-500",
    border: "border-red-500",
    bg: "bg-red-500/20",
    label: "Requested",
    order: 5,
  },
  pending: {
    text: "text-gray-500",
    border: "border-gray-500",
    bg: "bg-gray-500/20",
    label: "Pending",
    order: 6,
  },
};

/** @deprecated Use GROUP_CONFIG instead - provides both text and border colors */
export const groupColors: Record<string, string> = Object.fromEntries(
  Object.entries(GROUP_CONFIG).map(([key, config]) => [
    key,
    `${config.text} ${config.border}`,
  ]),
);