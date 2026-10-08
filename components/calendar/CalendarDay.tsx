import { SetStateAction } from "react";
import { getBirthdaysForDate } from "./calendarUtils";

type CalendarDayProps = {
  date: Date;
  dayDate: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  setSelectedDay: React.Dispatch<SetStateAction<Date | null>>;
  selected: Date | null;
};

import { people } from "@/data/people";

const CalendarDay = ({
  date,
  dayDate,
  isToday,
  isCurrentMonth,
  setSelectedDay,
  selected,
}: CalendarDayProps) => {
  const birthdays = getBirthdaysForDate(people, date);
  const isSelected = selected?.getTime() === date.getTime();
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl text-sm tabular-nums sm:text-base ${
        isToday ? "border-[1.5px] border-confetti-ink font-semibold" : ""
      } ${isSelected ? "bg-gray-700 text-white" : ""} ${isCurrentMonth ? "text-confetti-ink" : "text-confetti-muted/60"}`}
      onClick={() => setSelectedDay(date)}
    >
      <span>{dayDate}</span>
      <div className="flex gap-1">
        {" "}
        {birthdays?.length > 0 &&
          birthdays?.map((birthday) => {
            return (
              <div
                className="size-2 rounded-full"
                style={{
                  backgroundColor: isSelected
                    ? "white"
                    : birthday.circle.colour,
                }}
                key={birthday.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CalendarDay;
