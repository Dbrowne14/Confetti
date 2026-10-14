import type { Person } from "@/lib/data/people";

// ---- Dates ------------------------------------------------------------------

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

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

// ---- Birthdays --------------------------------------------------------------
// Person.birthMonth is 1-based; Date months are 0-based, so convert with ±1
// (lib/utils/birthdayUtils does the same when building birthday dates).

export const getBirthdaysForDate = (people: Person[], date: Date) =>
  people.filter(
    (person) =>
      person.birthDay === date.getDate() &&
      person.birthMonth === date.getMonth() + 1,
  );

export const formatBirthdayCount = (count: number) =>
  `${count} birthday${count === 1 ? "" : "s"}`;
