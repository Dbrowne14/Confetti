import { FormSection, fieldBase } from "@/components/ui/FormSection";
import { CircleColour } from "./CircleColour";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  primaryButton,
} from "@/components/ui/Drawer";

export const NewCircle = ({ closeCircle }: { closeCircle: () => void }) => {
  return (
    <Drawer closeDrawer={closeCircle} ariaLabel="New circle">
      <DrawerHeader onClose={closeCircle} closeLabel="Close new circle" />
      {/* Creating is presentational until the backend exists; this stops the
          submit from reloading the page in the meantime. */}
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <DrawerBody>
          <DrawerTitle
            title="New circle"
            subtitle="Name it and give it a colour. You can add people once it's created."
          />
          <FormSection label="Name">
            <label htmlFor="circle-name" className="sr-only">
              Circle name
            </label>
            <input
              id="circle-name"
              name="name"
              type="text"
              required
              autoComplete="off"
              placeholder="e.g. University friends"
              className={`${fieldBase} h-11`}
            />
          </FormSection>
          <CircleColour />
        </DrawerBody>
        <DrawerFooter>
          <button type="submit" className={primaryButton}>
            Create circle
          </button>
        </DrawerFooter>
      </form>
    </Drawer>
  );
};
