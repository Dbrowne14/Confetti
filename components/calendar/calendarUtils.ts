
import { People } from "@/data/people";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const getBirthdaysForDate = (
  people: People[],
  date: Date,
) => {
  return people.filter(
    (person) =>
      person.birthDay === date.getDate() &&
      person.birthMonth === date.getMonth() + 1,
  );
};

export const weeksCalcs = (
  monthLength: number,
  year: number,
  month: number,
) => {
  const firstDateOfMonth = new Date(year, month, 1);
  const firstDayOfMonth = (firstDateOfMonth.getDay() - 1 + 7) % 7;

  const totalDaysInCalendar = firstDayOfMonth + monthLength;
  const numberOfWeeks = Math.ceil(totalDaysInCalendar / 7);

  return {
    numberOfWeeks,
    firstDayOfMonth,
  };
};

// Every date shown in the month view, grouped into Monday-first weeks,
// including the leading/trailing days from adjacent months.
export const getCalendarWeeks = (year: number, month: number): Date[][] => {
  const monthLength = new Date(year, month + 1, 0).getDate();
  const { numberOfWeeks, firstDayOfMonth } = weeksCalcs(
    monthLength,
    year,
    month,
  );

  const lastDateOfPreviousMonth = new Date(year, month, 0);
  const daysInPreviousMonth = lastDateOfPreviousMonth.getDate();

  const startDay =
    firstDayOfMonth > 0
      ? {
          startMonth: month - 1,
          startDay: daysInPreviousMonth - (firstDayOfMonth - 1),
        }
      : {
          startMonth: month,
          startDay: 1,
        };

  return Array.from({ length: numberOfWeeks }, (_, weekIndex) => {
    const weekOffset = weekIndex * 7;
    return Array.from(
      { length: 7 },
      (_, dayIndex) =>
        new Date(
          year,
          startDay.startMonth,
          startDay.startDay + weekOffset + dayIndex,
        ),
    );
  });
};

export const getNextBirthday = (person: People) => {
  const today = new Date();

  let nextBirthday = new Date(
    today.getFullYear(),
    person.birthMonth - 1,
    person.birthDay,
  );

  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      person.birthMonth - 1,
      person.birthDay,
    );
  }

  return nextBirthday;
};