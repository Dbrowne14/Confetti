"use client";
import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import { filterPeopleByCircle } from "@/lib/utils/circleUtils";
import { useState } from "react";
import { BirthdayRow } from "../ui/BirthdayRow";
import { getUpcomingBirthdays } from "@/lib/utils/birthdayUtils";
import { useAddProfile } from "../profile/AddProfileProvider";

export const CircleForm = ({
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
        <CirclePeople people={peopleInCircle} circle={circle} />
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
  const { openProfile } = useAddProfile();
  return (
    <div >
      <div>People</div>
      <div>
        {upComingBirthdays.map((birthday) => {
            console.log(birthday.person.id)
          return (
            <button type="button" className="flex flex-col cursor-pointer" onClick={()=> openProfile(birthday.person.id)} key={birthday.person.id}>
                <BirthdayRow
                  person={birthday.person}
                  circle={circle}
                  occurrenceYear={birthday.date.getFullYear()}
                />
            </button>
          );
        })}
      </div>
      <button onClick={()=>openProfile}>Add New Person</button>
    </div>
  );
};

// have to default openprofile to set on categoreis
