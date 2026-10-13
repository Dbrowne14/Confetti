import { Circle } from "@/lib/data/circles";
import { Pill } from "../ui/Pill";

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
    <div>
      {circles.map(({ name, colour, id }) => {
        const isSelected = selectedCircleId === id;
        return (
          <Pill
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
