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

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarMain = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const todayDate = date.getDate();

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
    <section className="rounded-2xl bg-confetti-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5">
        <h2 className="font-serif text-2xl leading-tight font-semibold tracking-tight text-confetti-ink sm:text-[2rem]">
          {months[currentMonth] + " " + currentYear}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <ButtonUI
            direction="left"
            month={currentMonth}
            setMonth={setCurrentMonth}
            setYear={setCurrentYear}
            disabled={disabled}
          />
          <ButtonUI
            direction="right"
            month={currentMonth}
            setMonth={setCurrentMonth}
            setYear={setCurrentYear}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 pb-2 sm:pb-3">
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="text-center text-[10px] font-semibold tracking-widest text-confetti-muted uppercase sm:text-[11px]"
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Always six rows tall so 4/5/6-week months keep the same card height. */}
      <div className="grid grid-cols-7 grid-rows-[repeat(6,3rem)] gap-1 sm:grid-rows-[repeat(6,4rem)] lg:grid-rows-[repeat(6,4.5rem)]">
        {weeksArray.map((_, weekIndex) => {
          const weekOffset = weekIndex * 7;
          return (
            // `contents` lets each day sit directly in the 7-column grid.
            <div key={weekIndex} className="contents">
              {calendarWeek.map((_, dayIndex) => {
                const date = new Date(
                  currentYear,
                  startDay.startMonth,
                  startDay.startDay + weekOffset + dayIndex,
                );

                const dayDate = date.getDate();
                const isCurrentMonth =
                  date.getMonth() === currentMonth &&
                  date.getFullYear() === currentYear;
                const isToday =
                  dayDate === todayDate &&
                  date.getMonth() === month &&
                  date.getFullYear() === year;

                return (
                  <div
                    key={dayIndex}
                    className={`flex items-center justify-center rounded-xl text-sm sm:text-base ${
                      isToday
                        ? "border border-confetti-ink font-semibold"
                        : ""
                    } ${
                      isCurrentMonth
                        ? "text-confetti-ink"
                        : "text-confetti-muted/50"
                    }`}
                  >
                    <span>{dayDate}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
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
    <button
      type="button"
      onClick={changeMonth}
      disabled={disabled(direction)}
      aria-label={direction === "left" ? "Previous month" : "Next month"}
      className="flex size-8 items-center justify-center rounded-lg border border-confetti-border text-confetti-ink transition-colors hover:bg-confetti-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink disabled:cursor-not-allowed disabled:text-confetti-muted disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={direction === "left" ? "rotate-180" : ""}
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
};

export default CalendarMain;
