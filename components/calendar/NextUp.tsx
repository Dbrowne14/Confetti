import React from "react";
import { People } from "@/data/people";
import { getBirthdaysForDate } from "./calendarUtils";
import BirthdayRow from "../ui/BirthdayRow";
import { getNextBirthday } from "./calendarUtils";

const NextUp = ({ people }: { people: People[] }) => {
  const upcomingBirthdays = people.map((person) => ({
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
    <div className="flex flex-col rounded-3xl bg-confetti-surface p-4 sm:p-5">
      <div>Next Up</div>
      <div className="flex">
        <BirthdayRow
          birthday={nextBirthday.person}
          occurenceYear={nextBirthday.nextBirthday.getFullYear()}
        />
        <div className="flex flex-col">
          <span>{daysAway}</span>
          <span>day{daysAway === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
};

export default NextUp;
