import { getPeople } from "@/lib/fetches/getPeople";
import { getCircle } from "@/lib/fetches/getCircles";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { initialsRetrieval } from "../profile/ProfileIdentity";

export const CirclesDisplay = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Circles</h1>
      <h2>Each circle owns a colour. That colour is how the calendar reads.</h2>
      <CircleComponent />
    </div>
  );
};

const CircleComponent = () => {
  const circle = getCircle()[1];
  const people = getPeople();
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
        <div className="h-5 w-5 rounded-xl text-sm bg-black text-amber-50">+{additionals?.length}</div>
      )}
    </div>
  );
};
