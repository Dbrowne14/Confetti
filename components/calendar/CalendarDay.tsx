import type { Circle } from "@/data/circles";
import type { Person } from "@/data/people";
import { formatBirthdayCount, getCircleForPerson } from "./calendarUtils";

type CalendarDayProps = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  birthdays: Person[];
  circles: Circle[];
  onSelect: (date: Date) => void;
};

export const CalendarDay = ({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  birthdays,
  circles,
  onSelect,
}: CalendarDayProps) => {
  const label = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={
        birthdays.length > 0
          ? `${label}, ${formatBirthdayCount(birthdays.length)}`
          : label
      }
      onClick={() => onSelect(date)}
      className={`flex flex-col items-center justify-center rounded-xl text-sm tabular-nums sm:text-base ${
        isToday ? "border-[1.5px] border-confetti-ink font-semibold" : ""
      } ${isSelected ? "bg-gray-700 text-white" : ""} ${isCurrentMonth ? "text-confetti-ink" : "text-confetti-muted/60"}`}
    >
      <span>{date.getDate()}</span>
      <span className="flex gap-1">
        {birthdays.map((person) => (
          <span
            key={person.id}
            className="size-2 rounded-full"
            style={{
              backgroundColor: isSelected
                ? "white"
                : getCircleForPerson(person, circles)?.colour,
            }}
          />
        ))}
      </span>
    </button>
  );
};
