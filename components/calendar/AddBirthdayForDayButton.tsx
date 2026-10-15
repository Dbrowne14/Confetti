"use client";
import { useAddBirthday } from "@/components/addBirthday/AddBirthdayProvider";
import { PlusIcon } from "@/components/layout/NavIcons";
import { monthNames } from "@/lib/utils/dateUtils";

type AddBirthdayForDayButtonProps = {
  date: Date;
  hasBirthdays: boolean;
};

export const AddBirthdayForDayButton = ({
  date,
  hasBirthdays,
}: AddBirthdayForDayButtonProps) => {
  const { openAddBirthday } = useAddBirthday();

  return (
    <button
      type="button"
      onClick={() => openAddBirthday({date:date})}
      className={`inline-flex min-h-13 w-full items-center cursor-pointer justify-center gap-2 rounded-2xl px-4 py-3 text-[15px] font-semibold text-confetti-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-coral sm:min-h-14 ${
        hasBirthdays
          ? "border-[1.5px] border-dashed border-confetti-border hover:border-confetti-muted/50 hover:bg-confetti-bg/50"
          : "bg-confetti-coral hover:bg-confetti-coral/90"
      }`}
    >
      <PlusIcon />
      <span>
        Add {hasBirthdays ? "another" : "birthday"} on {date.getDate()}{" "}
        {monthNames[date.getMonth()]}
      </span>
    </button>
  );
};
