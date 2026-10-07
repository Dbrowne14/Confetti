export type People = {
  id: number;
  firstName: string;
  surname: string;
  birthMonth: number;
  birthDay: number;
  birthYear: number | null;
  circle: { name: string; colour: string };
};

export const people = [
  {
    id: 1,
    firstName: "Sush",
    surname: "Parihar",
    birthMonth: 4,
    birthDay: 29,
    birthYear: 1998,
    circle: { name: "Family", colour: "rgb(122,200,200)" },
  },
  {
    id: 2,
    firstName: "Alex",
    surname: "Smith",
    birthMonth: 10,
    birthDay: 7,
    birthYear: null,
    circle: { name: "Friends", colour: "rgb(0,0,0)" },
  },
];
