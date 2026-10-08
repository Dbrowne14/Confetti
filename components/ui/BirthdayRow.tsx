import { People } from "@/data/people";
import { months } from "../calendar/calendarUtils";

export const BirthdayRow = ({
  birthday,
  occurenceYear,
}: {
  birthday: People;
  occurenceYear: number;
}) => {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-3.5">
      <div
        className="flex size-12 shrink-0 flex-col items-center justify-center rounded-full text-confetti-ink sm:size-13"
        style={{ backgroundColor: birthday.circle.colour }}
      >
        <span className="text-[9px] leading-none font-semibold tracking-[0.12em] uppercase sm:text-[10px]">
          {months[birthday.birthMonth - 1].slice(0, 3)}
        </span>
        <span className="mt-0.5 text-lg leading-none font-semibold tabular-nums sm:text-xl">
          {birthday.birthDay}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="truncate text-[15px] leading-snug font-semibold text-confetti-ink sm:text-base">
          {birthday.firstName} {birthday.surname}
        </div>
        <div className="truncate text-sm leading-snug text-confetti-muted">
          <span>{birthday.circle.name}</span>
          {birthday.birthYear && occurenceYear && (
            <span> · turns {occurenceYear - birthday.birthYear}</span>
          )}
        </div>
      </div>
    </div>
  );
};
