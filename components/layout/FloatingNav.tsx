"use client";
import { navigation } from "@/lib/data/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "./NavIcons";

export const FloatingNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="min-w-0">
      <ul className="flex w-fit items-center rounded-full border border-white/70 bg-confetti-surface p-1 shadow-pill">
        {navigation.map((item) => {
          const { href, name } = item;
          const isActive = pathname === href;

          return (
            <li key={name}>
              <Link
                className={`flex min-h-11 min-w-11 flex-col items-center justify-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] leading-none whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink sm:h-10 sm:min-h-0 sm:flex-row sm:gap-2 sm:px-4 sm:py-0 sm:text-sm sm:leading-normal ${
                  isActive
                    ? "bg-confetti-active font-semibold text-confetti-ink"
                    : "font-medium text-confetti-muted hover:text-confetti-ink"
                }`}
                href={href}
                aria-current={isActive ? "page" : undefined}
              >
                <NavIcon name={name} isActive={isActive} />
                <span className="sr-only min-[360px]:not-sr-only">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
