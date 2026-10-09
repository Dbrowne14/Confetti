import { PickDay } from "./PickDay";
import { NextUp } from "./NextUp";
import { people } from "@/data/people";

export const CalendarSide = ({ selected, circle }: { selected: Date | null, circle:number | null }) => {
  return (
    <div className="flex flex-col gap-4">
      <NextUp people={people} circle={circle}/>
      <PickDay people={people} selectedDay={selected} circle={circle} />
    </div>
  );
};
