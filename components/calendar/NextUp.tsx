import type { Circle } from "@/data/circles";
import type { Person } from "@/data/people";
import { BirthdayRow } from "./BirthdayRow";
import {
  getCircleForPerson,
  getDaysUntil,
  getNextBirthdayDate,
} from "./calendarUtils";

type NextUpProps = {
  people: Person[];
  circles: Circle[];
};

export const NextUp = ({ people, circles }: NextUpProps) => {
  const today = new Date();
  // Undefined when the current circle filter leaves nobody to show.
  const next = people
    .map((person) => ({ person, date: getNextBirthdayDate(person, today) }))
    .toSorted((a, b) => a.date.getTime() - b.date.getTime())
    .at(0);

  return (
    <section className="flex flex-col gap-3 rounded-3xl bg-confetti-surface p-5 sm:p-6">
      <h2 className="text-[11px] font-semibold tracking-[0.16em] text-confetti-muted uppercase">
        Next Up
      </h2>
      {next ? (
        <NextBirthday
          person={next.person}
          circle={getCircleForPerson(next.person, circles)}
          date={next.date}
          daysAway={getDaysUntil(next.date, today)}
        />
      ) : (
        <p className="text-[15px] text-confetti-muted">No upcoming birthdays</p>
      )}
    </section>
  );
};

const NextBirthday = ({
  person,
  circle,
  date,
  daysAway,
}: {
  person: Person;
  circle: Circle | undefined;
  date: Date;
  daysAway: number;
}) => (
  <div className="flex items-center gap-4">
    <BirthdayRow
      person={person}
      circle={circle}
      occurrenceYear={date.getFullYear()}
    />
    <div className="flex shrink-0 flex-col items-end">
      <span className="text-3xl leading-none font-bold text-confetti-ink tabular-nums sm:text-[34px]">
        {daysAway}
      </span>
      <span className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-confetti-muted uppercase">
        day{daysAway === 1 ? "" : "s"}
      </span>
    </div>
  </div>
);
