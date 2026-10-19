import { CircleColour } from "./CircleColour";
import { Drawer } from "./Drawer";

export const NewCircle = ({ closeCircle }: { closeCircle: () => void }) => {
  return (
    <Drawer closeDrawer={closeCircle}>
      <button type="button" onClick={closeCircle}>
        x
      </button>
      <form action="">
        <input placeholder="Circle Name" />
        <CircleColour />
        <button type="submit"> Save </button>
      </form>
    </Drawer>
  );
};
