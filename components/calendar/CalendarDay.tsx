import { SetStateAction } from "react";
import { getBirthdaysForDate } from "./calendarUtils";

type CalendarDayProps = {
  date: Date;
  dayDate: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  setSelectedDay: React.Dispatch<SetStateAction<Date | null>>;
};

import { people } from "@/data/people";

const CalendarDay = ({
  date,
  dayDate,
  isToday,
  isCurrentMonth,
  setSelectedDay,
}: CalendarDayProps) => {
  const birthdays = getBirthdaysForDate(people, date);
  console.log(birthdays);
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl text-sm tabular-nums sm:text-base ${
        isToday ? "border-[1.5px] border-confetti-ink font-semibold" : ""
      } ${isCurrentMonth ? "text-confetti-ink" : "text-confetti-muted/60"}`}
      onClick={() => setSelectedDay(date)}
    >
      <span>{dayDate}</span>
      <div className="flex gap-1">
        {" "}
        {birthdays?.length > 0 &&
          birthdays?.map((birthday, index) => {
            return (
              <div
                className="size-2 rounded-full"
                style={{ backgroundColor: birthday.circle.colour }}
                key={index}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default CalendarDay;
