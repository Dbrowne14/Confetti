"use client";
import { useState } from "react";
import type { Circle } from "@/data/circles";
import type { Person } from "@/data/people";
import { CircleFilter } from "./CircleFilter";
import { MonthCalendar } from "./MonthCalendar";
import { NextUp } from "./NextUp";
import { PickDay } from "./PickDay";
import { filterPeopleByCircle } from "./calendarUtils";

type CalendarProps = {
  people: Person[];
  circles: Circle[];
};

export const Calendar = ({ people, circles }: CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(null);

  // Everything below the filter only sees people in the selected circle.
  const visiblePeople = filterPeopleByCircle(people, selectedCircleId);

  return (
    // Month calendar on the left; Next up / Pick a day sidebar on the right (desktop).
    <div className="grid grid-cols-1 gap-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section className="flex flex-col gap-4">
        <CircleFilter
          circles={circles}
          selectedCircleId={selectedCircleId}
          onSelectCircle={setSelectedCircleId}
        />
        <MonthCalendar
          people={visiblePeople}
          circles={circles}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      </section>
      <div className="flex flex-col gap-4">
        <NextUp people={visiblePeople} circles={circles} />
        <PickDay
          selectedDay={selectedDay}
          people={visiblePeople}
          circles={circles}
        />
      </div>
    </div>
  );
};
