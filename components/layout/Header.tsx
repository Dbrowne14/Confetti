"use client";
import { ConfettiBrand } from "./ConfettiBrand";
import { FloatingNav } from "./FloatingNav";
import { AddBirthdayButton } from "@/components/addBirthday/AddBirthdayButton";
import { useAddBirthday } from "@/components/addBirthday/AddBirthdayProvider";
export const Header = () => {
  const { isAddOpen, closeAddBirthday } = useAddBirthday();

  return (
    <div>
      <header className="sticky top-0 z-40 border-confetti-border bg-confetti-bg/90 sm:border-b">
        <div className="relative mx-auto w-full max-w-280 px-5 sm:px-6">
          <div className="flex items-center justify-between py-3 lg:h-18 lg:py-0">
            <ConfettiBrand />

            <div
              className="
    fixed bottom-4 left-1/2 z-50
    flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2

    lg:absolute lg:top-1/2 lg:bottom-auto lg:left-1/2
    lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2
  "
            >
              <FloatingNav />
              <AddBirthdayButton />
            </div>
          </div>
        </div>
      </header>

      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/10"
          onClick={closeAddBirthday}
        />
      )}
    </div>
  );
};
