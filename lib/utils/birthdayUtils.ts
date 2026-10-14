import { Person } from "@/lib/data/people";
import { startOfDay } from "./dateUtils";

// One person's next birthday occurrence.
export type UpcomingBirthday = {
  person: Person;
  date: Date;
};

export const getNextBirthday = (people: Person[], date: Date) => {
  return getUpcomingBirthdays(people, date).at(0);
};

// Every person's next birthday, soonest first.
export const getUpcomingBirthdays = (
  people: Person[],
  date: Date,
): UpcomingBirthday[] => {
  return people
    .map((person) => ({
      person,
      date: getNextBirthdayDate(person, date),
    }))
    .toSorted((a, b) => a.date.getTime() - b.date.getTime());
};

export const getNextBirthdayDate = (person: Person, today: Date) => {
  const birthdayThisYear = getBirthdayInYear(person, today.getFullYear());

  return birthdayThisYear < startOfDay(today)
    ? getBirthdayInYear(person, today.getFullYear() + 1)
    : birthdayThisYear;
};
const getBirthdayInYear = (person: Person, year: number) =>
  new Date(year, person.birthMonth - 1, person.birthDay);
