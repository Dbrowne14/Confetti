"use client";
import { useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { CalendarDay } from "./CalendarDay";
import { monthNames } from "@/lib/utils/dateUtils";
import { weekdayLabels } from "./calendarConstants";
import {
  getBirthdaysForDate,
  getCalendarWeeks,
  isSameDay,
} from "./calendarUtils";

// How far ahead of the current month the user can browse.
const MONTHS_AHEAD = 12;

type MonthCalendarProps = {
  people: Person[];
  circles: Circle[];
  selectedDay: Date | null;
  onSelectDay: (day: Date) => void;
};

export const MonthCalendar = ({
  people,
  circles,
  selectedDay,
  onSelectDay,
}: MonthCalendarProps) => {
  const today = new Date();
  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() + MONTHS_AHEAD,
    1,
  );

  // Always the 1st of the month being shown.
  const [visibleMonth, setVisibleMonth] = useState(firstMonth);
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const handlePreviousMonth = () =>
    setVisibleMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setVisibleMonth(new Date(year, month + 1, 1));

  const weeks = getCalendarWeeks(year, month);

  return (
    <div className="w-180 self-start rounded-3xl bg-confetti-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5">
        <h2 className="font-serif text-2xl leading-tight font-semibold tracking-tight text-confetti-ink sm:text-[2rem]">
          {`${monthNames[month]} ${year}`}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <ArrowButton
            direction="left"
            label="Previous month"
            onClick={handlePreviousMonth}
            disabled={visibleMonth <= firstMonth}
          />
          <ArrowButton
            direction="right"
            label="Next month"
            onClick={handleNextMonth}
            disabled={visibleMonth >= lastMonth}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 pb-2 sm:pb-3">
        {weekdayLabels.map((weekday) => (
          <div
            key={weekday}
            className="text-center text-[10px] font-medium tracking-widest text-confetti-muted uppercase sm:text-[11px]"
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Only render the weeks the month needs, so the card hugs its content. */}
      <div className="grid auto-rows-12 grid-cols-7 gap-1 sm:auto-rows-16 lg:auto-rows-19">
        {weeks.flat().map((date) => (
          <CalendarDay
            key={date.getTime()}
            date={date}
            isCurrentMonth={date.getMonth() === month}
            isToday={isSameDay(date, today)}
            isSelected={selectedDay !== null && isSameDay(date, selectedDay)}
            birthdays={getBirthdaysForDate(people, date)}
            circles={circles}
            onSelect={onSelectDay}
          />
        ))}
      </div>
    </div>
  );
};
