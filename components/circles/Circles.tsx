"use client";
import { getPeople } from "@/lib/fetches/getPeople";
import { getCircle } from "@/lib/fetches/getCircles";
import { AddCircleButton } from "./AddCircleButton";
import { useState } from "react";
import { UncategorisedGroup } from "./UncategorisedGroup";
import { EditCircle } from "./EditCircle";
import { getSpecificCircle } from "@/lib/utils/circleUtils";
import { NewCircle } from "./NewCircle";
import { CircleCard } from "./CircleCard";


export const Circles =  () => {
  // Open with an id → editing that circle; open with null → creating one.
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
  
  const selectedCircle = getSpecificCircle(selectedCircleId, circles)

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
              <CircleCard
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
      {isCircleOpen && ( selectedCircle ?<EditCircle people ={people} closeCircle={closeCircle} circle={selectedCircle}/> : <NewCircle closeCircle={closeCircle}/>)}
    </div>
  );
};
