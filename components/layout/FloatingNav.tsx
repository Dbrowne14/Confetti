"use client";
import { navigation } from "@/data/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FloatingNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center gap-4 p-3">
      {navigation.map((item) => {
        const { href, name } = item;
        const isActive = pathname === href;
        return (
          <Link
            className={`flex gap-2 ${isActive ? "font-bold" : ""}`}
            href={`${href}`}
            key={name}
          >
            <span className="h-4 w-4 bg-white"></span>
            <div>{name}</div>
          </Link>
        );
      })}
    </nav>
  );
};

export default FloatingNav;
