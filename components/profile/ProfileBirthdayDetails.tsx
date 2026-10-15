import { Person } from "@/lib/data/people";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { monthNames } from "@/lib/utils/dateUtils";

export const ProfileBirthdayDetails = ({
  next,
  today,
  person,
}: {
  next: Date;
  today: Date;
  person: Person;
}) => {
  const daysAway = getDaysUntil(next, today);
  const { birthDay, birthMonth, birthYear } = person;
  const day = next.toLocaleDateString("en-GB", {
    weekday: "long",
  });
  return (
    <div className="flex items-end justify-between gap-4 rounded-2xl bg-confetti-ink px-4 py-4 text-confetti-surface shadow-raised">
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-[10px] font-semibold tracking-[0.12em] text-confetti-surface/60 uppercase">
          Next birthday
        </h3>
        <p className="font-serif text-xl leading-tight font-semibold">
          {day} {birthDay} {monthNames[birthMonth - 1]}
        </p>
        {birthYear !== null && (
          <p className="text-xs text-confetti-surface/70">
            Turns {next.getFullYear() - birthYear}
          </p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end">
        {daysAway === 0 ? (
          <span className="font-serif text-2xl leading-none font-semibold text-confetti-coral">
            Today
          </span>
        ) : (
          <>
            <span className="font-serif text-4xl leading-none font-semibold text-confetti-coral tabular-nums">
              {daysAway}
            </span>
            <span className="mt-1.5 text-[10px] font-semibold tracking-[0.12em] text-confetti-surface/60 uppercase">
              day{daysAway === 1 ? "" : "s"} to go
            </span>
          </>
        )}
      </div>
    </div>
  );
};
