import { NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

const navItems = [
  { label: "Randomizer", href: "/random" },
  { label: "Abominations", href: "/abominations" },
];

export const NavLinks = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) => {
  if (variant === "desktop") {
    return (
      <>
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="mx-4 mt-6 flex flex-col gap-4">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <NextLink className="text-lg py-2 block" href={item.href}>
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </div>
    );
  }

  return null;
};
