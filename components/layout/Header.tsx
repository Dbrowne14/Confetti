"use client";
import { useState } from "react";
import ConfettiBrand from "./ConfettiBrand";
import FloatingNav from "./FloatingNav";
import AddBirthdayButton from "./AddBirthdayButton";

const Header = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const openAdd = () => setIsAddOpen(true);
  const closeAdd = () => setIsAddOpen(false);
  return (
    <div>
      <header className="sticky top-0 z-40 border-b border-confetti-border bg-confetti-bg/90 backdrop-blur-sm">
        <div className="relative mx-auto w-full max-w-280 px-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 py-3 lg:h-18 lg:flex-nowrap lg:py-0">
            <ConfettiBrand />
            <AddBirthdayButton openAdd={openAdd} />
            <FloatingNav />
          </div>
        </div>
      </header>
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/10" onClick={closeAdd}>
          <AddBirthdayMenu isAddOpen={isAddOpen} closeAdd={closeAdd} />
        </div>
      )}
    </div>
  );
};

const AddBirthdayMenu = ({
  isAddOpen,
  closeAdd,
}: {
  isAddOpen: boolean;
  closeAdd: () => void;
}) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 z-50 h-120 w-90 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-confetti-border bg-confetti-surface p-5 shadow-raised ${isAddOpen ? "block" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-sm font-medium text-confetti-muted" onClick={closeAdd}>
        Cancel
      </span>
    </div>
  );
};

export default Header;
