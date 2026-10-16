"use client";
import { Circle } from "@/lib/data/circles";
import { people, Person } from "@/lib/data/people";
import { filterPeopleByCircle } from "@/lib/utils/circleUtils";
import { useEffect, useRef, useState } from "react";
import { BirthdayRow } from "../ui/BirthdayRow";
import {
  getNextBirthday,
  getUpcomingBirthdays,
} from "@/lib/utils/birthdayUtils";

export const AddCircle = ({
  isCircleOpen,
  closeCircle,
  people,
  selectedCircle,
}: {
  isCircleOpen: boolean;
  closeCircle: () => void;
  people: Person[];
  selectedCircle?: Circle;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // While open: move focus into the drawer and stop the page behind it scrolling.
  useEffect(() => {
    if (!isCircleOpen) return;
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCircleOpen]);

  useEffect(() => {
    if (!isCircleOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCircle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCircleOpen, closeCircle]);

  if (!selectedCircle) return;

  return (
    <>
      <div
        aria-hidden
        onClick={closeCircle}
        className={`fixed inset-0 z-50 bg-confetti-ink/30 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          isCircleOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-name"
        tabIndex={-1}
        inert={!isCircleOpen}
        className={`fixed p-4 inset-y-0 right-0 z-50 flex h-dvh w-full flex-col bg-confetti-bg shadow-raised outline-none duration-300 ease-out motion-reduce:transition-none sm:w-104 sm:border-l sm:border-confetti-border ${
          // Visibility only transitions on close, so the drawer is visible (and
          // focusable) immediately on open but stays visible while sliding out.
          isCircleOpen
            ? "visible translate-x-0 transition-[translate]"
            : "invisible translate-x-full transition-[translate,visibility]"
        }`}
      >
        <AddCircleHeader closeCircle={closeCircle} />
        <CircleForm people={people} circle={selectedCircle} />
      </div>
    </>
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

const CircleForm = ({
  circle,
  people,
}: {
  circle: Circle;
  people: Person[];
}) => {
  const { colour, name, id } = circle;
  const peopleInCircle = filterPeopleByCircle(people, id);
  return (
    <form>
      <div>{name}</div>
      <div>
        {peopleInCircle.length}{" "}
        {peopleInCircle.length === 0 ? "person" : "people"}
      </div>
      <Colour circleColour={colour} key={id} />
        <div>
        <CirclePeople people={peopleInCircle} circle={circle}/>
      </div>
    </form>
  );
};

const Colour = ({ circleColour }: { circleColour?: string }) => {
  const [colour, setColour] = useState(circleColour);
  return (
    <div className="flex flex-col">
      <span>Colour</span>
      <label
        htmlFor="circle-colour"
        className="h-8 w-8 cursor-pointer rounded-full border"
        style={{ backgroundColor: colour }}
      >
        <input
          id="circle-colour"
          type="color"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className="sr-only "
        />
      </label>

    </div>
  );
};

const CirclePeople = ({
  people,
  circle,
}: {
  people: Person[];
  circle: Circle;
}) => {
  const today = new Date();
  const upComingBirthdays = getUpcomingBirthdays(people, today);
  return (
    <div>
      <div>People</div>
      <div>
        {upComingBirthdays.map((birthday) => {
          return (
            <BirthdayRow
              person={birthday.person}
              circle={circle}
              occurrenceYear={birthday.date.getFullYear()}
            />
          );
        })}
      </div>
    </div>
  );
};
