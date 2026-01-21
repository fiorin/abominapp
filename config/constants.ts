import { Group } from '@/types';

export interface GroupColorConfig {
  text: string;
  border: string;
  label: string;
  order: number;
}

export const GROUP_CONFIG: Record<Group, GroupColorConfig> = {
  default: {
    text: 'text-yellow-500',
    border: 'border-yellow-500',
    label: 'Default',
    order: 0,
  },
  expansion: {
    text: 'text-orange-500',
    border: 'border-orange-500',
    label: 'Expansion',
    order: 1,
  },
  exclusive: {
    text: 'text-purple-500',
    border: 'border-purple-500',
    label: 'Exclusive',
    order: 2,
  },
  ported: {
    text: 'text-blue-500',
    border: 'border-blue-500',
    label: 'Ported',
    order: 3,
  },
  custom: {
    text: 'text-green-500',
    border: 'border-green-500',
    label: 'Custom',
    order: 4,
  },
  requested: {
    text: 'text-red-500',
    border: 'border-red-500',
    label: 'Requested',
    order: 5,
  },
  pending: {
    text: 'text-gray-500',
    border: 'border-gray-500',
    label: 'Pending',
    order: 6,
  },
};

/** @deprecated Use GROUP_CONFIG instead - provides both text and border colors */
export const groupColors: Record<string, string> = Object.fromEntries(
  Object.entries(GROUP_CONFIG).map(([key, config]) => [
    key,
    `${config.text} ${config.border}`,
  ])
);

