import { SetStateAction } from "react";
import { getBirthdaysForDate } from "./calendarUtils";
import { circles } from "@/data/circle";
import { People } from "@/data/people";
import { Circle } from "@/data/circle";

type CalendarDayProps = {
  date: Date;
  dayDate: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  setSelectedDay: React.Dispatch<SetStateAction<Date | null>>;
  selected: Date | null;
  circle: number | null;
};

import { people } from "@/data/people";

export const CalendarDay = ({
  date,
  dayDate,
  isToday,
  isCurrentMonth,
  setSelectedDay,
  selected,
  circle,
}: CalendarDayProps) => {
  const birthdays = getBirthdaysForDate(people, date);
  const isSelected = selected?.getTime() === date.getTime();
const filterBirthday = findCorrectCircle(birthdays, circle)
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
        {filterBirthday?.length > 0 &&
          filterBirthday?.map((birthday) => {
            const circle = circles.find(
              (circle) => circle.id === birthday.circleID,
            );
            return (
              <div
                className="size-2 rounded-full"
                style={{
                  backgroundColor: isSelected ? "white" : circle?.colour,
                }}
                key={birthday.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export const findCorrectCircle = (
  people:People[],
  circle:number|null
) => {
  if(circle === null) {return people}
  return people.filter((person) => person.circleID === circle);
};
