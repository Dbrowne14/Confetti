'use client'

import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { AddBirthdayForDayButton } from "./AddBirthdayForDayButton";
import { BirthdayRow } from "@/components/birthday/BirthdayRow";
import { monthNames } from "@/lib/utils/dateUtils";
import { getCircleForPerson } from "@/lib/utils/circleUtils";
import { formatBirthdayCount, getBirthdaysForDate } from "./calendarUtils";
import { useAddProfile } from "../profile/AddProfileProvider";
import { CloseButton } from "@/components/ui/CloseButton";


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

type SelectedDayProps = {
  day: Date;
  people: Person[];
  circles: Circle[];
  // Lets a surface that presents this (the mobile sheet) name itself after
  // the heading and offer a close control beside it.
  titleId?: string;
  onClose?: () => void;
};

export const SelectedDay = ({
  day,
  people,
  circles,
  titleId,
  onClose,
}: SelectedDayProps) => {
  const birthdays = getBirthdaysForDate(people, day);
  const hasBirthdays = birthdays.length > 0;
  const weekday = day.toLocaleDateString("en-GB", { weekday: "long" });
  const {openProfile} = useAddProfile()
  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            id={titleId}
            className="font-serif text-2xl leading-tight font-medium text-confetti-ink sm:text-[28px]"
          >
            {`${weekday} ${day.getDate()} ${monthNames[day.getMonth()]}`}
          </h2>
          <p className="mt-1 text-[15px] text-confetti-muted">
            {hasBirthdays
              ? formatBirthdayCount(birthdays.length)
              : "No birthdays on this day"}
          </p>
        </div>
        {onClose && <CloseButton onClose={onClose} label="Close day" />}
      </div>

      {/* Scrolls on its own when a height-capped surface (the mobile sheet)
          is too short, keeping the heading and close control in view. The
          -mx-1/px-1 pair leaves room for the Add button's focus outline. */}
      <div className="-mx-1 -mb-1 min-h-0 overflow-y-auto overscroll-contain px-1 pb-1">
        {hasBirthdays && (
          <ul className="mt-5 flex flex-col gap-2.5">
            {birthdays.map((person) => (
              <li
                key={person.id}
                className=""
              >
                <button className="w-full cursor-pointer flex items-center gap-3 rounded-2xl border border-confetti-border bg-confetti-bg/60 px-4 py-3.5" onClick={() => {openProfile(person.id)}}>
                  <BirthdayRow
                    person={person}
                    circle={getCircleForPerson(person, circles)}
                    occurrenceYear={day.getFullYear()}
                  />
                  <ChevronIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className={hasBirthdays ? "mt-4" : "mt-6"}>
          <AddBirthdayForDayButton date={day} hasBirthdays={hasBirthdays} />
        </div>
      </div>
    </div>
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
