import type { Circle } from "@/lib/data/circles";
import { Pill } from "@/components/ui/Pill";

type CircleFilterProps = {
  circles: Circle[];
  selectedCircleId: number | null; // null = All
  onSelectCircle: (circleId: number | null) => void;
};

export const CircleFilter = ({
  circles,
  selectedCircleId,
  onSelectCircle,
}: CircleFilterProps) => {
  return (
    // Scrolls sideways rather than wrapping when there are more circles than fit.
    <div
      role="group"
      aria-label="Filter birthdays by circle"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 scrollbar-none sm:-mx-1 sm:max-w-182 sm:px-1 [&::-webkit-scrollbar]:hidden"
    >
      <Pill
        label="All"
        isSelected={selectedCircleId === null}
        onClick={() => onSelectCircle(null)}
      />
      {circles.map(({ id, name, colour }) => {
        const isSelected = selectedCircleId === id;
        return (
          <Pill
            onClick={() => onSelectCircle(id)}
            isSelected={isSelected}
            label={name}
            colour={colour}
          />
        );
      })}
    </div>
  );
};

//    onClick={() => onSelectCircle(id)}
