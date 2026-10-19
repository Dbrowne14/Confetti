"use client";
import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import { filterPeopleByCircle } from "@/lib/utils/circleUtils";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { UpcomingBirthdayRow } from "../upcoming/UpcomingDisplay";
import { getUpcomingBirthdays } from "@/lib/utils/birthdayUtils";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";
import { useAddProfile } from "../profile/AddProfileProvider";
import { CircleColour } from "./CircleColour";


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
      <CircleColour circleColour={colour} key={id} />
      <div>
        <CirclePeople people={peopleInCircle} circle={circle} />
      </div>
    </form>
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
  const { openAddBirthday } = useAddBirthday()
  return (
    <div >
         <div>People</div>
            {upComingBirthdays.map((birthday) => {
              return (
                <UpcomingBirthdayRow
                  birthday={birthday}
                  circle={circle}
                  daysAway={getDaysUntil(birthday.date, today)}
                  key={birthday.person.id}
                />
              );
            })}
      <button type="button" onClick={()=>openAddBirthday({circleId: circle.id})}>Add New Person</button>
    </div>
  );
};

// have to default openprofile to set on categoreis
