
import { createClient } from "../supabase/server";

export type Person = {
  id: number;
  firstName: string;
  surname: string | null;
  birthMonth: number; // 1–12 (January = 1), unlike Date#getMonth()
  birthDay: number;
  birthYear: number | null; // null when the year is unknown
  circleId: number | null;
  giftNotes: string | null;
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
    giftNotes: null,
  },
  {
    id: 2,
    firstName: "Alex",
    surname: "Smith",
    birthMonth: 10,
    birthDay: 7,
    birthYear: null,
    circleId: 2,
    giftNotes: null,
  },
  {
    id: 3,
    firstName: "Alex",
    surname: "Smoth",
    birthMonth: 10,
    birthDay: 17,
    birthYear: null,
    circleId: 2,
    giftNotes: null,
  },
  {
    id: 4,
    firstName: "Sophie",
    surname: "Turner",
    birthMonth: 1,
    birthDay: 18,
    birthYear: 1995,
    circleId: 1,
    giftNotes: null,
  },
  {
    id: 5,
    firstName: "James",
    surname: "Wilson",
    birthMonth: 2,
    birthDay: 7,
    birthYear: 1992,
    circleId: 2,
    giftNotes: null,
  },
  {
    id: 6,
    firstName: "Amelia",
    surname: "Shah",
    birthMonth: 5,
    birthDay: 24,
    birthYear: 1997,
    circleId: 1,
    giftNotes: null,
  },
  {
    id: 7,
    firstName: "Tom",
    surname: "Harris",
    birthMonth: 6,
    birthDay: 11,
    birthYear: 1993,
    circleId: 3,
    giftNotes: null,
  },
  {
    id: 8,
    firstName: "Maya",
    surname: "Patel",
    birthMonth: 7,
    birthDay: 29,
    birthYear: null,
    circleId: 2,
    giftNotes: null,
  },
  {
    id: 9,
    firstName: "Daniel",
    surname: "Clarke",
    birthMonth: 11,
    birthDay: 4,
    birthYear: 1990,
    circleId: 3,
    giftNotes: null,
  },
  {
    id: 10,
    firstName: "Lucy",
    surname: "Evans",
    birthMonth: 12,
    birthDay: 21,
    birthYear: 1996,
    circleId: null,
    giftNotes: null,
  },
];

export const getPeople = async () => {
  const supabase = await createClient();
  const { data: people, error } = await supabase.from("people").select();

  if (error) {
    throw new Error(`error ${error.message}`);
  }
  return people;
};
