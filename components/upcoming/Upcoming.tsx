"use client";

import { useState } from "react";
import type { Person } from "@/lib/data/people";
import type { Circle } from "@/lib/data/circles";
import { Upcomingfilter } from "./Upcomingfilter";
import { UpcomingDisplay } from "./UpcomingDisplay";

export const Upcoming = ({
  circles,
  people,
}: {
  circles: Circle[];
  people: Person[];
}) => {
  // `null` means "All circles".
  const [selectedCircle, setSelectedCircle] = useState<number | null>(null);

  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-confetti-ink sm:text-[2.75rem]">
        Upcoming
      </h1>
      <Upcomingfilter
        circles={circles}
        selectedCircle={selectedCircle}
        setSelectedCircle={setSelectedCircle}
      />
      <UpcomingDisplay
        people={people}
        circles={circles}
        selectedCircle={selectedCircle}
      />
    </div>
  );
};
