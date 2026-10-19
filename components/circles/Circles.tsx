"use client";
import { getPeople } from "@/lib/fetches/getPeople";
import { getCircle } from "@/lib/fetches/getCircles";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { AddCircleButton } from "./AddCircleButton";
import { useState } from "react";
import { UncategorisedGroup } from "./UncategorisedGroup";
import { EditCircle } from "./AddCircle";
import {
  filterPeopleByCircle,
  formatPeopleCount,
  getSpecifcCircle,
} from "@/lib/utils/circleUtils";
import { NewCircle } from "./NewCircle";
import { PeopleInitials } from "./PeopleInitials";

export const Circles = () => {
  const [isCircleOpen, setIsCircleOpen] = useState(false);
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(null);
  const closeCircle = () => {
    setIsCircleOpen(false);
  };
  const openCircle = (circleId:number) => {
    setIsCircleOpen(true);
    setSelectedCircleId(circleId)
  };
  const people = getPeople();
  const circles = getCircle();

  const selectedCircle = getSpecifcCircle(selectedCircleId, circles)

  const openNewCircle = () => {
  setSelectedCircleId(null);
  setIsCircleOpen(true);
};

  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-confetti-ink sm:text-[2.75rem]">
          Circles
        </h1>
        <p className="text-[15px] text-confetti-muted">
          Each circle owns a colour. That colour is how the calendar reads.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {circles.map((circle) => {
            return (
              <CircleComponent
                key={circle.id}
                circle={circle}
                people={people}
                onOpen={() => openCircle(circle.id)}
              />
            );
          })}
          <AddCircleButton openNewCircle={openNewCircle}/>
        </div>
        <UncategorisedGroup people={people} />
      </div>
      {isCircleOpen && ( selectedCircle ?<EditCircle isCircleOpen={isCircleOpen} people ={people} closeCircle={closeCircle} selectedCircle={selectedCircle}/> : <NewCircle closeCircle={closeCircle}/>)}
    </div>
  );
};

const CircleComponent = ({
  circle,
  people,
  onOpen,
}: {
  circle: Circle;
  people: Person[];
  onOpen: () => void;
}) => {
  const peopleInCircle = filterPeopleByCircle(people, circle.id);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex min-h-44 min-w-0 cursor-pointer flex-col items-start rounded-2xl border border-confetti-border bg-confetti-surface p-4 text-left transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-confetti-ink/15 hover:shadow-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:translate-y-0 active:shadow-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-5"
    >
      <span
        aria-hidden
        className="size-10 shrink-0 rounded-xl ring-1 ring-confetti-ink/5 ring-inset transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
        style={{ backgroundColor: circle.colour }}
      />
      <span className="mt-4 w-full truncate text-base leading-snug font-semibold text-confetti-ink">
        {circle.name}
      </span>
      <span className="text-sm text-confetti-muted">
        {formatPeopleCount(peopleInCircle.length)}
      </span>
      <span className="mt-auto flex h-7 items-center pt-4">
        {peopleInCircle.length > 0 ? (
          <PeopleInitials colour={circle.colour} people={peopleInCircle} />
        ) : (
          <span className="text-xs text-confetti-muted">No one yet</span>
        )}
      </span>
    </button>
  );
};
