
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { Drawer, DrawerHeader } from "@/components/ui/Drawer";
import { EditCircleForm } from "./EditCircleForm";

type EditCircleProps = {
  circle: Circle;
  people: Person[];
  closeCircle: () => void;
};

export const EditCircle = ({ circle, people, closeCircle }: EditCircleProps) => {
  return (
    <Drawer closeDrawer={closeCircle} ariaLabel={`Edit ${circle.name}`}>
      <DrawerHeader onClose={closeCircle} closeLabel="Close circle" />
      <EditCircleForm people={people} circle={circle} />
    </Drawer>
  );
};
