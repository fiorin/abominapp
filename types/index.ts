import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Group =
  | "default"
  | "exclusive"
  | "expansion"
  | "ported"
  | "custom"
  | "requested"
  | "pending";

export interface Abomination {
  name: string;
  slug: string;
  actions: number;
  damage: number;
  description: string;
  danger: number;
  ability: string;
  group: Group;
  enabled: boolean;
}
