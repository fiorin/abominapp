"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/icons";
import { useAbominations } from "@/hooks/useAbominations";

export const Navbar = () => {
  const { abominations } = useAbominations();
  const router = useRouter();

  const searchInput = (
    <Autocomplete
      aria-label="Search abominations"
      className="w-full max-w-xs"
      placeholder="Search..."
      onSelectionChange={(key) => {
        if (key) {
          router.push(`/abominations/${key}`);
        }
      }}
    >
      {abominations.map((abomination) => (
        <AutocompleteItem key={abomination.slug}>
          {abomination.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Zombicide</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              href="/abominations"
            >
              Abominations
            </NextLink>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="px-4">{searchInput}</div>
        <div className="mx-4 mt-4 flex flex-col gap-2">
          <NavbarMenuItem>
            <NextLink href="/abominations">Abominations</NextLink>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
