"use client";
import { SetStateAction, useState } from "react";
import ArrowButton from "@/components/ui/ArrowButton";
import CalendarDay from "./CalendarDay";
import { getCalendarWeeks, months, weekdays } from "./calendarUtils";

const CalendarMain = ({selected, setSelected}:{selected:Date|null; setSelected:React.Dispatch<SetStateAction<Date|null>>}) => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const todayDate = date.getDate();

  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);


  const maxDate = new Date(date.getFullYear(), date.getMonth() + 12, 1);

  const canGoBack =
    currentYear > year || (currentYear === year && currentMonth > month);

  const canGoForward =
    currentYear < maxDate.getFullYear() ||
    (currentYear === maxDate.getFullYear() &&
      currentMonth < maxDate.getMonth());

  const changeMonth = (direction: "left" | "right") => {
    if (direction === "right") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    }
  };

  const weeks = getCalendarWeeks(currentYear, currentMonth);

  return (
    <section className="self-start rounded-3xl bg-confetti-surface p-4 sm:p-5 w-180">
      <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5">
        <h2 className="font-serif text-2xl leading-tight font-semibold tracking-tight text-confetti-ink sm:text-[2rem]">
          {months[currentMonth] + " " + currentYear}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <ArrowButton
            direction="left"
            label="Previous month"
            onClick={() => changeMonth("left")}
            disabled={!canGoBack}
          />
          <ArrowButton
            direction="right"
            label="Next month"
            onClick={() => changeMonth("right")}
            disabled={!canGoForward}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 pb-2 sm:pb-3">
        {weekdays.map((weekday) => (
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
        {weeks.map((week, weekIndex) => (
          // `contents` lets each day sit directly in the 7-column grid.
          <div key={weekIndex} className="contents">
            {week.map((date, dayIndex) => {
              const dayDate = date.getDate();
              const dateMonth = date.getMonth()
              const isCurrentMonth =
                dateMonth === currentMonth &&
                date.getFullYear() === currentYear;
              const isToday =
                dayDate === todayDate &&
                dateMonth === month &&
                date.getFullYear() === year;

              return (
                <CalendarDay
                  key={dayIndex}
                  date={date}
                  dayDate={dayDate}
                  isToday={isToday}
                  isCurrentMonth={isCurrentMonth}
                  selected={selected}
                  setSelectedDay={setSelected}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CalendarMain;
