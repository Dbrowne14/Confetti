
import { Circle } from "@/lib/data/circles";
import { Pill } from "@/components/ui/Pill";


export const CircleOptions = ({
  circles,
  selectedCircleId,
  setSelectedCircleId,
}: {
  circles: Circle[];
  selectedCircleId: number | null;
  setSelectedCircleId: (circleId: number | null) => void;
}) => {

  return (
    <div role="group" aria-label="Circle" className="flex flex-wrap gap-2">
      <Pill
        label="None"
        isSelected={selectedCircleId === null}
        onClick={() => setSelectedCircleId(null)}
      />
      {circles.map(({ name, colour, id }) => {
        const isSelected = selectedCircleId === id;
        return (
          <Pill
            key={id}
            label={name}
            colour={colour}
            isSelected={isSelected}
            onClick={() => setSelectedCircleId(id)}
          />
        );
      })}
    </div>
  );
};
