"use client";
import React from "react";
import { useState } from "react";

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
  const [currentMonth, setCurrentMonth] = useState(month);

  const lastDateOfPreviousMonth = new Date(year, currentMonth, 0);
  const daysInPreviousMonth = lastDateOfPreviousMonth.getDate();

  const startDay =
    firstDayOfMonth > 0
      ? {
          startMonth: currentMonth - 1,
          startDay: daysInPreviousMonth - (firstDayOfMonth - 1),
        }
      : {
          startMonth: currentMonth,
          startDay: 1,
        };

  const weeksArray = new Array(numberOfWeeks).fill(null);
  const calendarWeek = new Array(7).fill(null);

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full justify-between items-center">
        <ButtonUI direction="left" setMonth={setCurrentMonth} />
        <div>{months[currentMonth] + " " + year}</div>
        <ButtonUI direction="right" setMonth={setCurrentMonth} />
      </div>

      <div className="flex flex-col gap-2">
        {weeksArray.map((_, weekIndex) => {
          const weekOffset = weekIndex * 7;

          return (
            <div
              key={weekIndex}
              className="flex items-center justify-center gap-4"
            >
              {calendarWeek.map((_, dayIndex) => {
                const date = new Date(
                  year,
                  startDay.startMonth,
                  startDay.startDay + weekOffset + dayIndex,
                );

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

type ButtonUIProps = {
  direction: "left" | "right";
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

export const ButtonUI = ({ direction, setMonth }: ButtonUIProps) => {
  const handleClick = () => {
    direction === "left"
      ? setMonth((prev) => (prev - 1 + 12) % 12)
      : setMonth((prev) => (prev + 1 + 12) % 12);
  };
  return (
    <button onClick={handleClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={direction === "left" ? "rotate-180" : ""}
      >
        <path d="M8 5l8 7-8 7V5z" />
      </svg>
    </button>
  );
};

export default CalendarMain;
