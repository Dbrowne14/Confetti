export type Person = {
  id: number;
  firstName: string;
  surname: string;
  birthMonth: number; // 1–12 (January = 1), unlike Date#getMonth()
  birthDay: number;
  birthYear: number | null; // null when the year is unknown
  circleId: number;
};

export const people: Person[] = [
  {
    id: 1,
    firstName: "Sush",
    surname: "Parihar",
    birthMonth: 4,
    birthDay: 29,
    birthYear: 1998,
    circleId: 1,
  },
  {
    id: 2,
    firstName: "Alex",
    surname: "Smith",
    birthMonth: 10,
    birthDay: 7,
    birthYear: null,
    circleId: 2,
  },
  {
    id: 3,
    firstName: "Alex",
    surname: "Smoth",
    birthMonth: 10,
    birthDay: 7,
    birthYear: null,
    circleId: 2,
  },
];
