"use client";
import { navigation } from "@/data/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "./NavIcons";

export const FloatingNav = () => {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="order-3 w-full lg:absolute lg:top-1/2 lg:left-1/2 lg:order-0 lg:w-auto lg:-translate-x-1/2 lg:-translate-y-1/2"
    >
      <ul className="mx-auto flex w-fit items-center rounded-full border border-white/70 bg-confetti-surface p-1 shadow-pill">
        {navigation.map((item) => {
          const { href, name } = item;
          const isActive = pathname === href;
          return (
            <li key={name}>
              <Link
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-confetti-active font-semibold text-confetti-ink"
                    : "font-medium text-confetti-muted hover:text-confetti-ink"
                }`}
                href={`${href}`}
                key={name}
                aria-current={isActive ? "page" : undefined}
              >
                <NavIcon name={name} isActive={isActive} />
                <span className="sr-only sm:not-sr-only">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
