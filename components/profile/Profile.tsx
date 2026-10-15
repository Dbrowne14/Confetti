"use client";

import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { getDaysUntil, monthNames } from "@/lib/utils/dateUtils";
import { getNextBirthdayDate } from "@/lib/utils/birthdayUtils";
import { ProfileHeader } from "./ProfileHeader";
import { useAddProfile } from "./AddProfileProvider";

export const Profile = ({
  circles,
  people,
}: {
  circles: Circle[];
  people: Person[];
}) => {
  const { isProfileOpen, personId } = useAddProfile();
  const today = new Date();
  const person = people.find((person) => person.id === personId);
  if (!person) return;
  const { birthDay, circleId, firstName, surname, birthMonth, birthYear } =
    person;
  const initials = firstName[0] + surname[0];
  const circle = circles.find((circle) => circle.id === circleId);
  const next = getNextBirthdayDate(person, today);
  const day = next.toLocaleDateString("en-GB", {
    weekday: "long",
  });
  console.log(next);
  const daysAway = getDaysUntil(next, today);

  return (
    <div
      className={`p-4 fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(27rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-confetti-border bg-confetti-bg shadow-raised ${isProfileOpen ? "flex" : "hidden"}`}
    >
      <ProfileHeader />
      <div id="profileMainItems" className="flex justify-between items-center">
        <div className="flex flex-col items-center">
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
            <div className="flex flex-col">
              <span>
                {day}
                {birthDay}
                {dayToSuffix(birthDay)}
                {monthNames[birthMonth - 1]}
              </span>
              <div>
                Turns{" "}
                {birthYear && (
                  <span>{next.getFullYear() - birthYear}</span>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {daysAway === 0 ? (
            <span>Today</span>
          ) : (
            <>
              <span>{daysAway}</span>
              <span>day{daysAway === 1 ? "" : "s"}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const dayToSuffix = (day: number) => {
  if (day === 11 || day === 12 || day === 13) return "th";
  if (day % 10 === 1) return "st";
  if (day % 10 === 2) return "nd";
  if (day % 10 === 3) return "rd";
  return "th";
};

/*
To do:
- Create the next birthday box 
- Refactor this whole section 
- add dummy areas for reminders, gift notes and delete button
*/
