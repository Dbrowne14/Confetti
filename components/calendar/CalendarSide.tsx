import PickDay from "./PickDay";
import { people } from "@/data/people";

export const CalendarSide = () => {
const date = new Date()
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-3xl bg-confetti-surface p-4 sm:p-5">Next Up</div>
      <PickDay cellDate={date} people={people}/>
    </div>
  );
};

export default CalendarSide;
