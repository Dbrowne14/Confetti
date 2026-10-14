'use client'

import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import { Upcomingfilter } from "./Upcomingfilter";
import { UpcomingDisplay } from "./UpcomingDisplay";
import { useState } from "react";

export const Upcoming = ({ circles, people }: { circles: Circle[], people:Person[] }) => {
    const[selectedCircle, setSelectedCircle] = useState<number |null>(null)
  return (
    <div>
      <h1 className="text-3xl">Upcoming</h1>
      <Upcomingfilter circles={circles} setSelectedCircle={setSelectedCircle} selectedCircle={selectedCircle} />
      <UpcomingDisplay people={people} circles={circles}/>
    </div>
  );
};
