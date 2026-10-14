import { Person } from "@/lib/data/people";
import { BirthdayRow } from "../ui/BirthdayRow";
import { getUpcomingBirthdays } from "@/lib/utils/getNextBirthday";
import { getCircleForPerson, getDaysUntil } from "../calendar/calendarUtils";
import { Circle } from "@/lib/data/circles";
import { monthNames } from "../calendar/calendarConstants";

export const UpcomingDisplay = ({
  people,
  circles,
}: {
  people: Person[];
  circles: Circle[];
}) => {
  const today = new Date();
  const upcoming = getUpcomingBirthdays(people, today);

  const groups = new Map();

  upcoming.forEach((birthday) => {
    const day = today.getTime();
    const birthdayDay = birthday.date.getTime();
    const birthdayMonth = birthday.date.getMonth();
    const difference = (birthdayDay - day) / (1000 * 60 * 60 * 24);

    const birthdayYear = birthday.date.getFullYear();
    const isThisYear = birthdayYear === today.getFullYear();
    const isThisMonth = birthdayMonth === today.getMonth();
    const month = monthNames[birthday.date.getMonth()];

    if (isThisWeek(birthday, today)) {
      if (groups.has("This Week")) {
        const group = groups.get("This Week");
        group.birthdays.push(birthday);
      } else {
        groups.set("This Week", { birthdays: [birthday] });
      }
    } else if (isThisMonth && isThisYear) {
      if (groups.has("Later this Month")) {
        const group = groups.get("Later this Month");
        group.birthdays.push(birthday);
      } else {
        groups.set("Later this Month", { birthdays: [birthday] });
      }
    } else if (isThisYear) {
      if (groups.has(month)) {
        const group = groups.get(month);
        group.birthdays.push(birthday);
      } else {
        groups.set(month, { birthdays: [birthday] });
      }
    } else {
      if (groups.has(`${month} ${birthdayYear}`)) {
        const group = groups.get(`${month} ${birthdayYear}`);
        group.birthdays.push(birthday);
      } else {
        groups.set(`${month} ${birthdayYear}`, { birthdays: [birthday] });
      }
    }
  });

  console.log(groups);

  return (
    <div className="flex flex-col gap-3 mt-3">
      {upcoming.map((person) => {
        return (
          <div>
            {upcoming ? (
              <NextBirthday
                person={person.person}
                circle={getCircleForPerson(person.person, circles)}
                date={today}
                daysAway={getDaysUntil(person.date, today)}
              />
            ) : (
              <p className="text-[15px] text-confetti-muted">
                No upcoming birthdays
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const NextBirthday = ({
  person,
  circle,
  date,
  daysAway,
}: {
  person: Person;
  circle: Circle | undefined;
  date: Date;
  daysAway: number;
}) => (
  <div className="flex items-center gap-4 w-140">
    <BirthdayRow
      person={person}
      circle={circle}
      occurrenceYear={date.getFullYear()}
    />
    <div className="flex shrink-0 flex-col items-end">
      <div className="leading-none text-[10px] font-medium text-confetti-ink tabular-nums sm:text-[13px]">
        {daysAway < 8 ? (
          <span>
            in {daysAway} day{daysAway == 1 ? "" : "s"}
          </span>
        ) : (
          <span>{daysAway}d</span>
        )}
      </div>
    </div>
  </div>
);

type Birthday = {
  date: Date;
  person: Person;
};
const isThisWeek = (birthday: Birthday, today: Date) => {
  const time = today.getTime();
  const birthdayTime = birthday.date.getTime();
  const birthdayDay = (birthday.date.getDay() + 6) % 7;
  const day = (today.getDay() + 6) % 7;

  const difference = (birthdayTime - time) / (1000 * 60 * 60 * 24);

  return difference >= 0 && birthdayDay - day >= 0;
};
