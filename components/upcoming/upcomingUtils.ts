import type { UpcomingBirthday } from "@/lib/utils/birthdayUtils";
import { getDaysUntil, monthNames } from "@/lib/utils/dateUtils";

export type BirthdayGroup = {
  birthdays: UpcomingBirthday[];
};

// From today through the end of the current Monday–Sunday week.
export const isThisWeek = (date: Date, today: Date) => {
  // getDay() is Sunday-first; shift it so Monday = 0.
  const daysLeftThisWeek = 6 - ((today.getDay() + 6) % 7);
  const daysUntil = getDaysUntil(date, today);

  return daysUntil >= 0 && daysUntil <= daysLeftThisWeek;
};

export const getGroupLabel = ({ date }: UpcomingBirthday, today: Date) => {
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const isThisMonth = date.getMonth() === today.getMonth();
  const isThisYear = year === today.getFullYear();

  if (isThisMonth && isThisWeek(date, today)) return "This Week";
  if (isThisMonth && isThisYear) return "Later this Month";
  if (isThisYear) return month;
  return `${month} ${year}`;
};

// `birthdays` must already be chronological: groups keep the order in which
// their label is first seen, so they come out chronological too.
export const groupUpcomingBirthdays = (
  birthdays: UpcomingBirthday[],
  today: Date,
) => {
  const groups = new Map<string, BirthdayGroup>();

  for (const birthday of birthdays) {
    const label = getGroupLabel(birthday, today);
    const group = groups.get(label);

    if (group) {
      group.birthdays.push(birthday);
    } else {
      groups.set(label, { birthdays: [birthday] });
    }
  }

  return groups;
};

// 0 → "today", within a week → "in 3 days", otherwise compact "12d".
export const SOON_THRESHOLD_DAYS = 8;

export const formatDaysAway = (daysAway: number) => {
  if (daysAway === 0) return "today";
  if (daysAway < SOON_THRESHOLD_DAYS)
    return `in ${daysAway} day${daysAway === 1 ? "" : "s"}`;
  return `${daysAway}d`;
};
