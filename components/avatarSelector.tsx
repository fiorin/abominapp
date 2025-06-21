import Image from "next/image";
import clsx from "clsx";

interface Abomination {
  slug: string;
  name: string;
}

interface AvatarSelectorProps {
  abominations: Abomination[];
  includes: string[];
  onChange: (slug: string) => void;
}

export default function avatarSelector({
  abominations,
  includes,
  onChange,
}: AvatarSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
      {abominations.map((abomination) => {
        const isActive = includes.includes(abomination.slug);

        return (
          <button
            key={abomination.slug}
            aria-label={`${abomination.name} ${isActive ? "selected" : "not selected"}`}
            aria-pressed={isActive}
            className={clsx(
              "rounded-full border-2 p-1 transition",
              isActive ? "border-danger" : "border-muted",
            )}
            onClick={() => onChange(abomination.slug)}
          >
            <Image
              alt={abomination.name}
              className={clsx(
                "w-12 h-12 rounded-full object-cover",
                !isActive && "grayscale opacity-50",
              )}
              height={48}
              src={`/images/icons/${abomination.slug}.png`}
              width={48}
            />
          </button>
        );
      })}
    </div>
  );
}
