"use client";

import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { BirthdayRow } from "@/components/ui/BirthdayRow";
import { getCircleForPerson } from "@/lib/utils/circleUtils";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { getNextBirthday } from "@/lib/utils/birthdayUtils";
import { useAddProfile } from "../profile/AddProfileProvider";

type NextUpProps = {
  people: Person[];
  circles: Circle[];
};

export const NextUp = ({ people, circles }: NextUpProps) => {
  const today = new Date();
  // Undefined when the current circle filter leaves nobody to show.
  const next = getNextBirthday(people, today);
  const { openProfile } = useAddProfile();
  return (
    <section className="flex flex-col gap-3 rounded-3xl bg-confetti-surface p-5 sm:p-6">
      <h2 className="text-[11px] font-semibold tracking-[0.16em] text-confetti-muted uppercase">
        Next Up
      </h2>
      <button
        className=" w-full"
        onClick={() => {
          if (next) {
            openProfile(next.person.id);
          }
        }}
      >
        {next ? (
          <NextBirthday
            person={next.person}
            circle={getCircleForPerson(next.person, circles)}
            date={next.date}
            daysAway={getDaysUntil(next.date, today)}
          />
        ) : (
          <p className="text-[15px] text-confetti-muted">
            No upcoming birthdays
          </p>
        )}
      </button>
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
