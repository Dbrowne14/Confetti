import type { Person } from "@/lib/data/people";

export const initialsRetrieval = (person: Person) => {
  const { surname, firstName } = person;
  const initials = surname ? firstName[0] + surname[0] : firstName[0];
  return initials.toUpperCase();
};
