import React from "react";
import { useAddBirthday } from "./AddBirthdayProvider";
export const AddBirthday = () => {
    const {isAddOpen, closeAddBirthday} = useAddBirthday()
  return (
    <div
      className={`fixed top-1/2 left-1/2 z-50 h-120 w-90 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-confetti-border bg-confetti-surface p-5 shadow-raised ${isAddOpen ? "block" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className="text-sm font-medium text-confetti-muted"
        onClick={closeAddBirthday}
      >
        Cancel
      </span>
    </div>
  );
};
