"use client";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { useAddProfile } from "./AddProfileProvider";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";
import { BirthdayRow } from "../ui/BirthdayRow";

export const Profile = ({
  circles,
  people,
}: {
  circles: Circle[];
  people: Person[];
}) => {
  const { closeProfile, openProfile, isProfileOpen } = useAddProfile();
  const { openAddBirthday } = useAddBirthday();

  const { birthDay, circleId, firstName, surname, birthMonth, birthYear } =
    people[0];
  const initials = firstName[0] + surname[0];
  const circle = circles.find((circle) => circle.id === circleId);
  console.log(initials);
  return (
    <div
      className={`p-4 fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(27rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-confetti-border bg-confetti-bg shadow-raised flex `}
    >
      <div className="flex justify-between">
        <button onClick={() => closeProfile()}>x</button>
        <button onClick={() => openAddBirthday()}>Edit</button>
      </div>
      <div id="profileMainItems" className="flex flex-col items-center">
        <div className="h-10 w-10 rounded-full bg-amber-400 text-black text-center">
          {initials}
        </div>
        <div>
          {firstName} {surname}
        </div>
        <div className="flex gap-2">
          <span className="h-2 w-2 bg-black rounded-full"></span>{" "}
          <span>{circle?.name}</span>
        </div>
        <div>
           <h1>Next Birthday</h1>
           <div>

           </div>
        </div>
      </div>
    </div>
  );
};

/*
To do:
- Create the next birthday box 
- Refactor this whole section 
- add dummy areas for reminders, gift notes and delete button
*/