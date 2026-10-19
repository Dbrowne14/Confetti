import { CircleColour } from "./CircleColour";
import { Drawer } from "./Drawer";

export const NewCircle = ({ closeCircle }: { closeCircle: () => void }) => {
  return (
    <Drawer closeDrawer={closeCircle}>
      <CircleColour />
    </Drawer>
  );
};
