"use client";
import { useAddBirthday } from "@/components/addBirthday/AddBirthdayProvider";
import { useAddProfile } from "./AddProfileProvider";
import { Person } from "@/lib/data/people";

export const ProfileHeader = ({person}:{person:Person}) => {
  const { closeProfile } = useAddProfile();
  const { openEditBirthday } = useAddBirthday();
  return (
    <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-3">
      <button
        type="button"
        aria-label="Close profile"
        onClick={() => closeProfile()}
        className="flex size-8 items-center justify-center rounded-lg border border-confetti-border bg-confetti-surface text-confetti-ink transition-colors hover:bg-confetti-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink"
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(person.id)
          openEditBirthday(person.id);
          closeProfile();
        }}
        className="h-8 rounded-lg border border-confetti-border bg-confetti-surface px-3 text-xs font-semibold text-confetti-ink transition-colors hover:bg-confetti-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink"
      >
        Edit
      </button>
    </div>
  );
};
