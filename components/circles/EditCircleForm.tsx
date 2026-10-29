"use client";
import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import {
  filterPeopleByCircle,
  formatPeopleCount,
} from "@/lib/utils/circleUtils";
import {
  DrawerBody,
  DrawerError,
  DrawerFooter,
  primaryButton,
} from "@/components/ui/Drawer";
import { CircleColour } from "./CircleColour";
import { CirclePeople } from "./CirclePeople";
import { deleteCircle } from "@/lib/actions/deleteCircle";
import { editCircle } from "@/lib/actions/editCircle";
import { useState } from "react";

export const EditCircleForm = ({
  circle,
  people,
  closeCircle,
}: {
  circle: Circle;
  people: Person[];
  closeCircle: () => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const { colour, name, id } = circle;
  const peopleInCircle = filterPeopleByCircle(people, id);
  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const response = await editCircle(id, formData);
    if (!response.success) {
      setError(response.error);
      return;
    }
  };
  const handleDelete = async () => {
    setError(null);
    const response = await deleteCircle(id);
    if (!response.success) {
      setError(response.error);
      return;
    }
    closeCircle();
  };
  return (
    <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
      <DrawerBody>
        <div className="flex flex-col gap-1">
          <input
            name="name"
            className="font-serif text-3xl leading-tight font-semibold tracking-tight wrap-anywhere text-confetti-ink"
            defaultValue={name}
          />
          {error && <DrawerError error={error} />}
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
