import { Person } from "../data/people";
import { startOfDay } from "@/components/calendar/calendarUtils";

export const getNextBirthday = (people: Person[], date: Date) => {
  return getUpcomingBirthdays(people, date).at(0);
};

export const getUpcomingBirthdays = (people: Person[], date: Date) => {
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
