import Avatar from "@/components/avatar";
import { Abomination } from "@/types";
import { groupColors } from "@/config/constants";

interface AvatarSelectorProps {
  abominations: Abomination[];
  includes: string[];

  onChange: (slug: string) => void;
}

export default function AvatarSelector({
  abominations,
  includes,
  onChange,
}: AvatarSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
      {abominations.map((abomination) => {
        const isActive = includes.includes(abomination.slug);
        // extrai a cor da borda do grupo, fallback para default
        const borderColorClass =
          groupColors[abomination.group] || groupColors["default"];
        // borda está na segunda parte da string do grupo, ex: "text-yellow-500 border-yellow-500"
        const borderColor = borderColorClass.split(" ")[1];

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
