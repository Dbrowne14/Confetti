"use client";
import { navigation } from "@/data/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const FloatingNav = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const openAdd = () => setIsAddOpen(true);
  const closeAdd = () => setIsAddOpen(false);
  const pathname = usePathname();
  return (
    <div>
      <nav className="flex justify-center items-center gap-4 p-3">
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
        <AddButton openAdd={openAdd} />
      </nav>
      <AddBirthdayMenu isAddOpen={isAddOpen} closeAdd={closeAdd}/>
    </div>
  );
};

const AddButton = ({ openAdd }: { openAdd: () => void }) => {
  return (
    <button
      onClick={openAdd}
      className="flex nowrap items-center justify-center gap-3 py-2 rounded-[22px] px-2 bg-[rgb(245,134,107)] text-black"
    >
      <span>+</span>
      <span>Add Birthday</span>
    </button>
  );
};

const AddBirthdayMenu = ({ isAddOpen, closeAdd }: { isAddOpen: boolean; closeAdd: ()=> void }) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-100 z-50 h-120 w-90 rounded-2xl ${isAddOpen ? "block" : "hidden"}`}
    ><span className="text-black" onClick={closeAdd}>Cancel</span></div>
  );
};

export default FloatingNav;
