'use client'
import { getPeople } from "@/lib/fetches/getPeople";
import { getCircle } from "@/lib/fetches/getCircles";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { initialsRetrieval } from "../profile/ProfileIdentity";
import { AddCircleButton } from "./AddCircleButton";
import { useState } from "react";

export const CirclesDisplay = () => {
  const [isCircleOpen, setIsCircleOpen] = useState(false);
  const closeCircle = () => {
    setIsCircleOpen(false);
  };
  const openCircle = () => {
    setIsCircleOpen(true);
  };
  const people = getPeople();
  const circles = getCircle();

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Circles</h1>
      <h2>Each circle owns a colour. That colour is how the calendar reads.</h2>
      <div className="flex gap-4">
        {circles.map((circle) => {
          return <CircleComponent circle={circle} people={people} />;
        })}
        <AddCircleButton isCircleOpen={isCircleOpen} closeCircle={closeCircle} openCircle={openCircle} people={people} circles={circles}/>
      </div>
      <UncategorisedGroup people={people} circles={circles} />
    </div>
  );
};

const CircleComponent = ({
  circle,
  people,
}: {
  circle: Circle;
  people: Person[];
}) => {
  const peopleInCircle = people.filter(
    (people) => people.circleId === circle.id,
  );
  return (
    <div className="flex flex-col rounded-2xl bg-confetti-surface p-5">
      <div
        className="h-10 w-10 rounded-2xl"
        style={{ backgroundColor: circle.colour }}
      ></div>
      <div>{circle.name}</div>
      <div>
        {people.length !== 1 ? (
          <span>{peopleInCircle.length} people</span>
        ) : (
          <span>1 person</span>
        )}
      </div>
      <PeopleInitials circle={circle} people={peopleInCircle} />
    </div>
  );
};

const PeopleInitials = ({
  circle,
  people,
}: {
  circle: Circle;
  people: Person[];
}) => {
  const OVERLAPNUMBER = 3;
  const viewedInitials = people.slice(0, OVERLAPNUMBER);
  const additionals = people.slice(OVERLAPNUMBER);
  const lengthOverMax = people.length > OVERLAPNUMBER;
  return (
    <div className="flex">
      {viewedInitials?.map((person) => {
        return (
          <div
            className="h-5 w-5 rounded-xl text-sm"
            style={{ backgroundColor: circle.colour }}
          >
            {initialsRetrieval(person)}
          </div>
        );
      })}
      {lengthOverMax && (
        <div className="h-5 w-5 rounded-xl text-sm bg-black text-amber-50">
          +{additionals?.length}
        </div>
      )}
    </div>
  );
};

export const UncategorisedGroup = ({
  people,
  circles,
}: {
  people: Person[];
  circles: Circle[];
}) => {
  const UncategorisedGroup = people.filter(
    (person) => person.circleId === null,
  );

  return (
    <div className="w-full flex justify-between bg-gray-400 p-5 rounded-2xl">
      <div className="flex">
        <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col">
          <h1>Uncategorised</h1>
          <div>
            {UncategorisedGroup.length}{" "}
            {UncategorisedGroup.length === 1 ? "person" : "people"} with no
            circle yet
          </div>
        </div>
      </div>
      <button className="text-red-700">sort</button>
    </div>
  );
};

export const AddCircleComponent = () => {};
