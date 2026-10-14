const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Indexed by Date#getMonth() (0 = January).
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// Whole calendar days from `from` until `to`, ignoring time of day.
export const getDaysUntil = (to: Date, from: Date) =>
  Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY);
