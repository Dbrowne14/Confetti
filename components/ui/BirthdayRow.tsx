import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { monthNames } from "../calendar/calendarConstants";

type BirthdayRowProps = {
  person: Person;
  circle: Circle | undefined;
  // The year of the birthday being shown, so the age matches that occurrence.
  occurrenceYear: number;
};

export const BirthdayRow = ({
  person,
  circle,
  occurrenceYear,
}: BirthdayRowProps) => {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-3.5">
      <div
        className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full text-confetti-ink sm:size-13"
        style={circle ? { backgroundColor: circle?.colour }: {backgroundColor:"lightgray"}}
      >
        <span className="text-[9px] leading-none font-semibold tracking-[0.12em] uppercase sm:text-[10px]">
          {/* birthMonth is 1-based */}
          {monthNames[person.birthMonth - 1].slice(0, 3)}
        </span>
        <span className="mt-0.5 text-lg leading-none font-semibold tabular-nums sm:text-xl">
          {person.birthDay}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="truncate text-[15px] leading-snug font-semibold text-confetti-ink sm:text-base">
          {person.firstName} {person.surname}
        </div>
        <div className="truncate text-sm leading-snug text-confetti-muted">
          <span>{circle?.name}</span>
          {person.birthYear !== null && (
            <span> · turns {occurrenceYear - person.birthYear}</span>
          )}
        </div>
      </div>
    </div>
  );
};
