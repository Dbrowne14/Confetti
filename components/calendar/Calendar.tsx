"use client";
import { useState } from "react";
import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { CircleFilter } from "./CircleFilter";
import { MonthCalendar } from "./MonthCalendar";
import { NextUp } from "./NextUp";
import { PickDay, SelectedDay } from "./PickDay";
import { filterPeopleByCircle } from "@/lib/utils/circleUtils";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useIsDesktop } from "@/lib/hooks/useIsDesktop";

const selectedDayTitleId = "selected-day-title";

type CalendarProps = {
  people: Person[];
  circles: Circle[];
};

export const Calendar = ({ people, circles }: CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(null);
  // Mobile only: the selected day opens in a sheet over the calendar. Closing
  // it keeps the day selected (and the sheet's content in place while it
  // slides away).
  const [isDaySheetOpen, setIsDaySheetOpen] = useState(false);
  const isDesktop = useIsDesktop();

  // Everything below the filter only sees people in the selected circle.
  const visiblePeople = filterPeopleByCircle(people, selectedCircleId);

  const handleSelectDay = (day: Date) => {
    setSelectedDay(day);
    setIsDaySheetOpen(!isDesktop);
  };

  return (
    // Mobile: Next up, then filters + calendar, with the selected day in a
    // sheet. Desktop: filters + calendar on the left; Next up / Pick a day
    // sidebar on the right.
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20">
        <div className="lg:col-start-2 lg:row-start-1">
          <NextUp people={visiblePeople} circles={circles} />
        </div>
        <section className="flex flex-col gap-4 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <CircleFilter
            circles={circles}
            selectedCircleId={selectedCircleId}
            onSelectCircle={setSelectedCircleId}
          />
          <MonthCalendar
            people={visiblePeople}
            circles={circles}
            selectedDay={selectedDay}
            onSelectDay={handleSelectDay}
          />
        </section>
        <div className="hidden self-start lg:col-start-2 lg:row-start-2 lg:block">
          <PickDay
            selectedDay={selectedDay}
            people={visiblePeople}
            circles={circles}
          />
        </div>
      </div>

      <BottomSheet
        isOpen={isDaySheetOpen && !isDesktop}
        onClose={() => setIsDaySheetOpen(false)}
        labelledBy={selectedDayTitleId}
        layer="belowDialogs"
        background="surface"
        showHandle
      >
        {selectedDay && (
          <div className="flex min-h-0 flex-col px-5 pt-3 pb-5">
            <SelectedDay
              day={selectedDay}
              people={visiblePeople}
              circles={circles}
              titleId={selectedDayTitleId}
              onClose={() => setIsDaySheetOpen(false)}
            />
          </div>
        )}
      </BottomSheet>
    </>
  );
};
