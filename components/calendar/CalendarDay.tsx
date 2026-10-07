type CalendarDayProps = {
  dayDate: number;
  isToday: boolean;
  isCurrentMonth: boolean;
};

const CalendarDay = ({ dayDate, isToday, isCurrentMonth }: CalendarDayProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-xl text-sm tabular-nums sm:text-base ${
        isToday ? "border-[1.5px] border-confetti-ink font-semibold" : ""
      } ${isCurrentMonth ? "text-confetti-ink" : "text-confetti-muted/60"}`}
    >
      <span>{dayDate}</span>
    </div>
  );
};

export default CalendarDay;
