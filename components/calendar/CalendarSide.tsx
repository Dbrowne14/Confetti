import { PickDay } from "./PickDay";
import { NextUp } from "./NextUp";
import { people } from "@/data/people";

export const CalendarSide = ({ selected }: { selected: Date | null }) => {
  return (
    <div className="flex flex-col gap-4">
      <NextUp people={people}/>
      <PickDay people={people} selectedDay={selected} />
    </div>
  );
};
