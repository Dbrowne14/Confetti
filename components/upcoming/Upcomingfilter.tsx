import { Circle } from "@/lib/data/circles";
import { Pill } from "../ui/Pill";
import { SetStateAction } from "react";

type UpcomingFilterProps = {
  circles: Circle[];
  setSelectedCircle: React.Dispatch<SetStateAction<number | null>>;
  selectedCircle: number | null;
};

export const Upcomingfilter = ({
  circles,
  setSelectedCircle,
  selectedCircle,
}: UpcomingFilterProps) => {

  return (
    <div className="flex gap-1">
      <Pill label="All" onClick={() => setSelectedCircle(null)}  colour={"black"} isSelected={!selectedCircle}/>
      {circles.map(({ colour, name, id }) => {
          const isSelected = id === selectedCircle
        return (
          <Pill
            colour={colour}
            label={name}
            onClick={() => setSelectedCircle(id)}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};


