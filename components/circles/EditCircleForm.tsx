"use client";
import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import {
  filterPeopleByCircle,
  formatPeopleCount,
} from "@/lib/utils/circleUtils";
import {
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  primaryButton,
} from "@/components/ui/Drawer";
import { CircleColour } from "./CircleColour";
import { CirclePeople } from "./CirclePeople";
import { deleteCircle } from "@/lib/actions/deleteCircle";

export const EditCircleForm = ({
  circle,
  people,
  closeCircle,
}: {
  circle: Circle;
  people: Person[];
  closeCircle: () => void;
}) => {
  const { colour, name, id } = circle;
  const peopleInCircle = filterPeopleByCircle(people, id);

  const handleDelete = async () => {
    await deleteCircle(id);
    closeCircle();
  };
  return (
    // Saving is presentational until the backend exists; this stops the
    // submit from reloading the page in the meantime.
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(e) => e.preventDefault()}
    >
      <DrawerBody>
        <div className="flex flex-col gap-1">
          <input
            className="font-serif text-3xl leading-tight font-semibold tracking-tight wrap-anywhere text-confetti-ink"
            defaultValue={name}
          />

          {formatPeopleCount(peopleInCircle.length) && (
            <p className="text-sm text-confetti-muted">
              {formatPeopleCount(peopleInCircle.length)}
            </p>
          )}
        </div>
        <CircleColour initialColour={colour} key={id} />
        <CirclePeople people={peopleInCircle} circle={circle} />

        <div className="mt-auto border-t border-confetti-border pt-5">
          {/* Presentational until deleting circles is supported. */}
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm font-semibold text-confetti-danger transition-colors enabled:cursor-pointer enabled:hover:text-confetti-danger/80 disabled:cursor-not-allowed"
          >
            Delete circle
          </button>
        </div>
      </DrawerBody>
      <DrawerFooter>
        <button type="submit" className={primaryButton}>
          Save changes
        </button>
      </DrawerFooter>
    </form>
  );
};
