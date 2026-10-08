"use client";
import { months } from "./calendarUtils";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";
import { PlusIcon } from "../layout/NavIcons";

export const AddBirthdayForDayButton = ({
  selectedDay,
  hasBirthday,
}: {
  selectedDay: Date;
  hasBirthday: boolean;
}) => {
  const { openAddBirthday } = useAddBirthday();

  return (
    <button
      type="button"
      onClick={() => openAddBirthday(selectedDay)}
      className={`inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-semibold text-confetti-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-coral sm:min-h-14 ${
        hasBirthday
          ? "border-[1.5px] border-dashed border-confetti-border hover:border-confetti-muted/50 hover:bg-confetti-bg/50"
          : "bg-confetti-coral hover:bg-confetti-coral/90"
      }`}
    >
      <PlusIcon />
      <span>
        Add {hasBirthday ? "another" : "birthday"} on {selectedDay.getDate()}{" "}
        {months[selectedDay.getMonth()]}
      </span>
    </button>
  );
};
