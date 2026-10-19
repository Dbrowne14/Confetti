
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { CircleForm } from "./CircleForm";
import { Drawer, DrawerHeader } from "./Drawer";

export const EditCircle = ({
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
    <Drawer closeDrawer={closeCircle} ariaLabel={`Edit ${selectedCircle.name}`}>
      <DrawerHeader onClose={closeCircle} closeLabel="Close circle" />
      <CircleForm people={people} circle={selectedCircle} />
    </Drawer>
  );
};
