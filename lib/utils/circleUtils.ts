import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";

// `null` means "All circles".
export const filterPeopleByCircle = (
  people: Person[],
  circleId: number | null,
) =>
  circleId === null
    ? people
    : people.filter((person) => person.circleId === circleId);

export const getCircleForPerson = (person: Person, circles: Circle[]) =>
  circles.find((circle) => circle.id === person.circleId);

export const getSpecificCircle = (
  circleId:number | null,
  circles: Circle[],
) => circles.find((circle) => circle.id === circleId);

export const formatPeopleCount = (count: number) =>
  `${count} ${count === 1 ? "person" : "people"}`;
