"use client";
import { ConfettiBrand } from "./ConfettiBrand";
import { FloatingNav } from "./FloatingNav";
import { AddBirthdayButton } from "../addBirthday/AddBirthdayButton";
import { AddBirthday } from "../addBirthday/AddBirthday";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";

export const Header = () => {
  const { isAddOpen, closeAddBirthday } = useAddBirthday();
  return (
    <div>
      <header className="sticky top-0 z-40 border-b border-confetti-border bg-confetti-bg/90 backdrop-blur-sm">
        <div className="relative mx-auto w-full max-w-280 px-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 py-3 lg:h-18 lg:flex-nowrap lg:py-0">
            <ConfettiBrand />
            <AddBirthdayButton />
            <FloatingNav />
          </div>
        </div>
      </header>
      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/10"
          onClick={closeAddBirthday}
        >
          <AddBirthday />
        </div>
      )}
    </div>
  );
};
