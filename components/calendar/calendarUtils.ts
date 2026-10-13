import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// ---- Dates ------------------------------------------------------------------

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Whole calendar days from `from` until `to`, ignoring time of day.
export const getDaysUntil = (to: Date, from: Date) =>
  Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY);

// Every date shown in the month view, grouped into Monday-first weeks,
// including the leading/trailing days from adjacent months.
export const getCalendarWeeks = (year: number, month: number): Date[][] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // getDay() is Sunday-first; shift it so Monday = 0.
  const leadingDays = (new Date(year, month, 1).getDay() - 1 + 7) % 7;
  const numberOfWeeks = Math.ceil((leadingDays + daysInMonth) / 7);

  // Day numbers below 1 (or past the month's end) roll into the adjacent month.
  return Array.from({ length: numberOfWeeks }, (_, weekIndex) =>
    Array.from(
      { length: 7 },
      (_, dayIndex) =>
        new Date(year, month, 1 - leadingDays + weekIndex * 7 + dayIndex),
    ),
  );
};

// ---- People & circles -------------------------------------------------------

// `null` means "All circles".
export const filterPeopleByCircle = (
  people: Person[],
  circleId: number | null,
) =>
  circleId === null
    ? people
    : people.filter((person) => person.circleId === circleId);

export const getCircleForPerson = (person: Person, circles: Circle[]) =>
  circles.find((circle) => circle.id === person.circleId);

// ---- Birthdays --------------------------------------------------------------
// Person.birthMonth is 1-based; Date months are 0-based. These helpers are the
// only place that conversion happens.

export const getBirthdaysForDate = (people: Person[], date: Date) =>
  people.filter(
    (person) =>
      person.birthDay === date.getDate() &&
      person.birthMonth === date.getMonth() + 1,
  );

const getBirthdayInYear = (person: Person, year: number) =>
  new Date(year, person.birthMonth - 1, person.birthDay);

// The person's next birthday, counting today as upcoming.
export const getNextBirthdayDate = (person: Person, today: Date) => {
  const birthdayThisYear = getBirthdayInYear(person, today.getFullYear());

  return birthdayThisYear < startOfDay(today)
    ? getBirthdayInYear(person, today.getFullYear() + 1)
    : birthdayThisYear;
};

export const formatBirthdayCount = (count: number) =>
  `${count} birthday${count === 1 ? "" : "s"}`;
