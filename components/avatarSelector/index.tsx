import Avatar from "@/components/avatar";
import { Abomination } from "@/types";
import { GROUP_CONFIG } from "@/config/constants";

interface AvatarSelectorProps {
  abominations: Abomination[];
  selectedSlugsSet: Set<string>;
  onChange: (slug: string) => void;
}

export default function AvatarSelector({
  abominations,
  selectedSlugsSet,
  onChange,
}: AvatarSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
      {abominations.map((abomination) => {
        const isActive = selectedSlugsSet.has(abomination.slug);
        const group = (abomination.group ?? "default") as keyof typeof GROUP_CONFIG;
        const borderColor = GROUP_CONFIG[group].border;

        return (
          <Avatar
            key={abomination.slug}
            abomination={abomination}
            active={isActive}
            borderColor={borderColor}
            onClick={() => onChange(abomination.slug)}
          />
        );
      })}
    </div>
  );
}
