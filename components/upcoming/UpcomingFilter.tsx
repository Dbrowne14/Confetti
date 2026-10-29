import type { Dispatch, SetStateAction } from "react";
import type { Circle } from "@/lib/data/circles";
import { Pill } from "@/components/ui/Pill";

type UpcomingFilterProps = {
  circles: Circle[];
  setSelectedCircle: Dispatch<SetStateAction<number | null>>;
  selectedCircle: number | null;
};

export const UpcomingFilter = ({
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
        isSelected={selectedCircle === null}
        size="compact"
      />
      {circles.map(({ colour, name, id }) => (
        <Pill
          key={id}
          colour={colour}
          label={name}
          onClick={() => setSelectedCircle(id)}
          isSelected={id === selectedCircle}
          size="compact"
        />
      ))}
    </div>
  );
};
