import { Person } from "@/lib/data/people";
import { AddCircle } from "./AddCircle";
import { Circle } from "@/lib/data/circles";

export const AddCircleButton = ({
  openCircle,
  closeCircle,
  isCircleOpen,
  people,
  circles,
}: {
  openCircle: () => void;
  closeCircle: () => void;
  isCircleOpen: boolean;
  people: Person[];
  circles: Circle[];
}) => {
  return (
    <div>
      <button
        onClick={() => openCircle()}
        className="h-full aspect-square border-confetti-border bg-confetti-surface rounded-2xl"
      >
        <div className="flex flex-col">
          <span>+</span>
          <span>New Circle</span>
        </div>
      </button>
      <AddCircle isCircleOpen={isCircleOpen} closeCircle={closeCircle} people={people} circles={circles}/>
    </div>
  );
};
