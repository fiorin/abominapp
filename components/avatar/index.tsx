import Image from "next/image";
import clsx from "clsx";
import { Tooltip } from "@heroui/tooltip";

interface AvatarProps {
  abomination: {
    slug: string;
    name: string;
  };
  active?: boolean;
  onClick?: () => void;
  asChild?: boolean;
  borderColor?: string;
}

export default function Avatar({
  abomination,
  active = true,
  onClick,
  asChild = false,
  borderColor = "border-muted",
}: AvatarProps) {
  const classes = clsx(
    "rounded-full border-2 p-1 transition",
    active ? borderColor : "border-muted",
  );

  const image = (
    <Tooltip color="default" content={abomination.name}>
      <Image
        alt={abomination.name}
        className={clsx(
          "w-12 h-12 rounded-full object-cover",
          !active && "grayscale opacity-50",
        )}
        height={48}
        src={`/images/icons/${abomination.slug}.png`}
        width={48}
      />
    </Tooltip>
  );

  if (asChild) return <div className={classes}>{image}</div>;

  return (
    <button
      aria-label={`${abomination.name} ${active ? "selected" : "not selected"}`}
      aria-pressed={active}
      className={classes}
      onClick={onClick}
    >
      {image}
    </button>
  );
}
