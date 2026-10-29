"use client";
import { ConfettiBrand } from "./ConfettiBrand";
import { FloatingNav } from "./FloatingNav";
import { AddBirthdayButton } from "@/components/birthdayForm/AddBirthdayButton";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-confetti-border bg-confetti-bg/90 sm:border-b">
      <div className="mx-auto w-full max-w-280 px-5 sm:px-6">
        <div className="flex items-center py-3 lg:grid lg:h-18 lg:grid-cols-[1fr_auto_1fr] lg:py-0">
          <ConfettiBrand />
          <div className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 mx-auto flex w-fit items-center gap-2 lg:contents">
            <FloatingNav />
            <AddBirthdayButton />
          </div>
        </div>
      </div>
    </header>
  );
};
