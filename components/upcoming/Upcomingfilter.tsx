import { Circle } from "@/lib/data/circles";
import { Pill } from "../ui/Pill";

export const Upcomingfilter = ({ circles }: { circles: Circle[] }) => {
  return (
    <div className="flex gap-1">
      <Pill label="All" />
      {circles.map(({ colour, name }) => {
        return <Pill colour={colour} label={name} />;
      })}
    </div>
  );
};
