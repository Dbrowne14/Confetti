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
    <div
      role="group"
      aria-label="Filter upcoming birthdays by circle"
      className="flex flex-wrap gap-2"
    >
      <Pill
        label="All"
        onClick={() => setSelectedCircle(null)}
        isSelected={!selectedCircle}
        size="compact"
      />
      {circles.map(({ colour, name, id }) => {
          const isSelected = id === selectedCircle
        return (
          <Pill
            key={id}
            colour={colour}
            label={name}
            onClick={() => setSelectedCircle(id)}
            isSelected={isSelected}
            size="compact"
          />
        );
      })}
    </div>
  );
};


