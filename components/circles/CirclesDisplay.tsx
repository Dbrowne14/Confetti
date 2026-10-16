"use client";
import { getPeople } from "@/lib/fetches/getPeople";
import { getCircle } from "@/lib/fetches/getCircles";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { initialsRetrieval } from "../profile/ProfileIdentity";
import { AddCircleButton } from "./AddCircleButton";
import { useState } from "react";
import { UncategorisedGroup } from "./UncategorisedGroup";
import { AddCircle } from "./AddCircle";
import { getSpecifcCircle } from "@/lib/utils/circleUtils";

export const CirclesDisplay = () => {
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


  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Circles</h1>
      <h2>Each circle owns a colour. That colour is how the calendar reads.</h2>
      <div className="flex gap-4">
        {circles.map((circle) => {
          return (
            <button onClick={()=> openCircle(circle.id)} key={circle.id}>
              <CircleComponent circleId={circle.id} people={people} />
            </button>
          );
        })}
      </div>
      <UncategorisedGroup people={people} circles={circles} />
      <AddCircle isCircleOpen={isCircleOpen} people ={people} closeCircle={closeCircle} selectedCircle={selectedCircle}/>
    </div>
  );
};

const CircleComponent = ({
  circleId,
  people,
}: {
  circleId: number | null;
  people: Person[];
}) => {
  const circles = getCircle();
  const circle = getSpecifcCircle(circleId, circles)

  if (!circle) return;
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
