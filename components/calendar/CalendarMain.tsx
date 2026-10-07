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

  const year = date.getFullYear();
  const month = date.getMonth();

  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const monthLength = new Date(currentYear, currentMonth + 1, 0).getDate();
  const { numberOfWeeks, firstDayOfMonth } = weeksCalcs(
    monthLength,
    currentYear,
    currentMonth,
  );

  const maxDate = new Date(date.getFullYear(), date.getMonth() + 12, 1);

  const canGoBack =
    currentYear > year || (currentYear === year && currentMonth > month);

  const canGoForward =
    currentYear < maxDate.getFullYear() ||
    (currentYear === maxDate.getFullYear() &&
      currentMonth < maxDate.getMonth());

  const disabled = (direction: "left" | "right") =>
    direction === "left" ? !canGoBack : !canGoForward;

  const lastDateOfPreviousMonth = new Date(currentYear, currentMonth, 0);
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
        <ButtonUI
          direction="left"
          month={currentMonth}
          setMonth={setCurrentMonth}
          setYear={setCurrentYear}
          disabled={disabled}
        />
        <div>{months[currentMonth] + " " + currentYear}</div>
        <ButtonUI
          direction="right"
          month={currentMonth}
          setMonth={setCurrentMonth}
          setYear={setCurrentYear}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-2">
        {weeksArray.map((_, weekIndex) => {
          const weekOffset = weekIndex * 7;
          console.log({
            startMonth: startDay.startMonth,
            startDay: startDay.startDay,
            lastDate: lastDateOfPreviousMonth,
            firstDay: firstDayOfMonth,
          });
          return (
            <div
              key={weekIndex}
              className="flex items-center justify-center gap-4"
            >
              {calendarWeek.map((_, dayIndex) => {
                const date = new Date(
                  currentYear,
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
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  disabled: (direction: "left" | "right") => boolean;
};

export const ButtonUI = ({
  direction,
  month,
  setMonth,
  setYear,
  disabled,
}: ButtonUIProps) => {
  const changeMonth = () => {
    if (direction === "right") {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    } else {
      if (month === 0) {
        setMonth(11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
    }
  };
  return (
    <button onClick={changeMonth} disabled={disabled(direction)}>
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
