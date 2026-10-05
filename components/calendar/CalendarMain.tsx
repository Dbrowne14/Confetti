import React from "react";

const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const months = [
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

const CalendarMain = () => {
  const date = new Date();

  const { monthLength, year, month } = currentDate(date);
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

  const weeksArray = new Array(numberOfWeeks).fill(null);
  const calendarWeek = new Array(7).fill(null);

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <div>{months[month] + " " + year}</div>

      <div className="flex flex-col gap-2">
        {weeksArray.map((_, weekIndex) => {
          const weekOffset = weekIndex * 7;

          return (
            <div key={weekIndex} className="flex items-center justify-center gap-4">
              {calendarWeek.map((_, dayIndex) => {
                const date = new Date(
                  year,
                  startDay.startMonth,
                  startDay.startDay + weekOffset + dayIndex,
                );

                const day = date.getDay();
                const dayDate = date.getDate();

                return (
                  <div
                    key={dayIndex}
                    className="flex flex-col items-center justify-center gap-2 w-12 h-12 border rounded-xl text-black"
                  >
                    <span>{dayDate}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export const currentDate = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthEnd = new Date(year, month + 1, 0);
  const monthLength = monthEnd.getDate();

  return { monthLength, year, month };
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

export default CalendarMain;
