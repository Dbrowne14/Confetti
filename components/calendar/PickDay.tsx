import type { Circle } from "@/data/circles";
import type { Person } from "@/data/people";
import { AddBirthdayForDayButton } from "./AddBirthdayForDayButton";
import { BirthdayRow } from "./BirthdayRow";
import { monthNames } from "./calendarConstants";
import {
  formatBirthdayCount,
  getBirthdaysForDate,
  getCircleForPerson,
} from "./calendarUtils";

type PickDayProps = {
  selectedDay: Date | null;
  people: Person[];
  circles: Circle[];
};

export const PickDay = ({ selectedDay, people, circles }: PickDayProps) => {
  return (
    <section className="flex flex-col rounded-3xl bg-confetti-surface p-5 sm:p-6">
      {selectedDay ? (
        <SelectedDay day={selectedDay} people={people} circles={circles} />
      ) : (
        <NotSelected />
      )}
    </section>
  );
};

const NotSelected = () => {
  return (
    <>
      <h2 className="font-serif text-2xl leading-tight font-medium text-confetti-ink sm:text-[28px]">
        Pick a day
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-confetti-muted">
        Select a date on the calendar to see who&apos;s celebrating, or to add a
        birthday on it.
      </p>
    </>
  );
};

const SelectedDay = ({
  day,
  people,
  circles,
}: {
  day: Date;
  people: Person[];
  circles: Circle[];
}) => {
  const birthdays = getBirthdaysForDate(people, day);
  const hasBirthdays = birthdays.length > 0;
  const weekday = day.toLocaleDateString("en-GB", { weekday: "long" });

  return (
    <>
      <h2 className="font-serif text-2xl leading-tight font-medium text-confetti-ink sm:text-[28px]">
        {`${weekday} ${day.getDate()} ${monthNames[day.getMonth()]}`}
      </h2>
      <p className="mt-1 text-[15px] text-confetti-muted">
        {hasBirthdays
          ? formatBirthdayCount(birthdays.length)
          : "No birthdays on this day"}
      </p>

      {hasBirthdays && (
        <ul className="mt-5 flex flex-col gap-2.5">
          {birthdays.map((person) => (
            <li
              key={person.id}
              className="flex items-center gap-3 rounded-2xl border border-confetti-border bg-confetti-bg/60 px-4 py-3.5"
            >
              <BirthdayRow
                person={person}
                circle={getCircleForPerson(person, circles)}
                occurrenceYear={day.getFullYear()}
              />
              <ChevronIcon />
            </li>
          ))}
        </ul>
      )}
      <div className={hasBirthdays ? "mt-4" : "mt-6"}>
        <AddBirthdayForDayButton date={day} hasBirthdays={hasBirthdays} />
      </div>
    </>
  );
};

const ChevronIcon = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-confetti-muted/70"
    aria-hidden
  >
    <path d="M1 1l5 5-5 5" />
  </svg>
);
