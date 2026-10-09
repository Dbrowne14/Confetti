import type { People } from "@/data/people";
import { getBirthdaysForDate, months } from "./calendarUtils";
import { BirthdayRow } from "../ui/BirthdayRow";
import { AddBirthdayForDayButton } from "./AddBirthdayForDayButton";
import { findCorrectCircle } from "./CalendarDay";

export const PickDay = ({
  selectedDay,
  people,
  circle,
}: {
  people: People[];
  selectedDay: Date | null;
  circle: number | null;
}) => {
  return (
    <section className="flex flex-col rounded-3xl bg-confetti-surface p-5 sm:p-6">
      {selectedDay ? (
        <AddBirthdayUI selectedDay={selectedDay} people={people} circle={circle} />
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

const AddBirthdayUI = ({
  selectedDay,
  people,
  circle
}: {
  selectedDay: Date;
  people: People[];
  circle:number|null
}) => {
  const birthdays = getBirthdaysForDate(people, selectedDay);
  const birthdaysFiltered = findCorrectCircle(birthdays, circle)
  const birthdayDate = birthdaysFiltered.length;
  const weekday = selectedDay.toLocaleDateString("en-GB", { weekday: "long" });

  //need to add in logic to decide which UI to show depending on what is selected

  return (
    <>
      <h2 className="font-serif text-2xl leading-tight font-medium text-confetti-ink sm:text-[28px]">
        {`${weekday} ${selectedDay.getDate()} ${months[selectedDay.getMonth()]}`}
      </h2>
      <p className="mt-1 text-[15px] text-confetti-muted">
        {birthdayDate
          ? `${birthdayDate} birthday${birthdayDate !== 1 ? "s" : ""}`
          : "No birthdays on this day"}
      </p>

      {birthdayDate > 0 && (
        <ul className="mt-5 flex flex-col gap-2.5">
          {birthdaysFiltered.map((birthday) => {
            return (
              <li
                key={birthday.id}
                className="flex items-center gap-3 rounded-2xl border border-confetti-border bg-confetti-bg/60 px-4 py-3.5"
              >
                <BirthdayRow
                  birthday={birthday}
                  occurenceYear={selectedDay.getFullYear()}
                />
                <ChevronIcon />
              </li>
            );
          })}
        </ul>
      )}
      <div className={birthdayDate > 0 ? "mt-4" : "mt-6"}>
        <AddBirthdayForDayButton
          hasBirthday={!!birthdayDate}
          selectedDay={selectedDay}
        />
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
