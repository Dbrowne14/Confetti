
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { CircleForm } from "./CircleForm";
import { Drawer } from "./Drawer";

export const AddCircle = ({
  closeCircle,
  people,
  selectedCircle,
}: {
  isCircleOpen: boolean;
  closeCircle: () => void;
  people: Person[];
  selectedCircle?: Circle;
}) => {
  if (!selectedCircle) return null;
  return (
    <Drawer closeDrawer={closeCircle}>
      <AddCircleHeader closeCircle={closeCircle} />
      <CircleForm people={people} circle={selectedCircle} />
    </Drawer>
  );
};

const AddCircleHeader = ({ closeCircle }: { closeCircle: () => void }) => {
  return (
    <div className="flex justify-between">
      <button onClick={closeCircle}>x</button>
      <button className="text-red-900 disabled">delete circle</button>
    </div>
  );
};
