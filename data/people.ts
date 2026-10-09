export type People = {
  id: number;
  firstName: string;
  surname: string;
  birthMonth: number;
  birthDay: number;
  birthYear: number | null;
  circleID: number;
};

export const people = [
  {
    id: 1,
    firstName: "Sush",
    surname: "Parihar",
    birthMonth: 4,
    birthDay: 29,
    birthYear: 1998,
    circleID: 1,
  },
  {
    id: 2,
    firstName: "Alex",
    surname: "Smith",
    birthMonth: 10,
    birthDay: 7,
    birthYear: null,
    circleID: 2,
  },
  {
    id: 3,
    firstName: "Alex",
    surname: "Smoth",
    birthMonth: 10,
    birthDay: 7,
    birthYear: null,
    circleID: 2,
  },
];
