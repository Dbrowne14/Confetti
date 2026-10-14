import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import { Upcomingfilter } from "./Upcomingfilter";
import { UpcomingDisplay } from "./UpcomingDisplay";

export const Upcoming = ({ circles, people }: { circles: Circle[], people:Person[] }) => {
  return (
    <div>
      <h1 className="text-3xl">Upcoming</h1>
      <Upcomingfilter circles={circles} />
      <UpcomingDisplay people={people} circles={circles}/>
    </div>
  );
};
