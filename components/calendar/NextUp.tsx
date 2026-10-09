import React from "react";
import { People } from "@/data/people";
import { BirthdayRow } from "../ui/BirthdayRow";
import { getNextBirthday } from "./calendarUtils";
import { findCorrectCircle } from "./CalendarDay";

export const NextUp = ({ people, circle }: { people: People[], circle:number | null }) => {
  const birthdaysFiltered = findCorrectCircle(people, circle)
  const upcomingBirthdays = birthdaysFiltered.map((person) => ({
    person,
    nextBirthday: getNextBirthday(person),
  }));
  const sortedBirthdays = upcomingBirthdays.toSorted(
    (a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime(),
  );
  const nextBirthday = sortedBirthdays[0];
  const today = new Date();
  const daysAway = Math.ceil(
    (nextBirthday.nextBirthday.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return (
    <section className="flex flex-col gap-3 rounded-3xl bg-confetti-surface p-5 sm:p-6">
      <h2 className="text-[11px] font-semibold tracking-[0.16em] text-confetti-muted uppercase">
        Next Up
      </h2>
      <div className="flex items-center gap-4">
        <BirthdayRow
          birthday={nextBirthday.person}
          occurenceYear={nextBirthday.nextBirthday.getFullYear()}
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
    </section>
  );
};
