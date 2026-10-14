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
  const getGroupLabel = (birthday: Birthday, today: Date) => {
    const birthdayMonth = birthday.date.getMonth();
    const birthdayYear = birthday.date.getFullYear();

    const isThisYear = birthdayYear === today.getFullYear();
    const isThisMonth = birthdayMonth === today.getMonth();

    const month = monthNames[birthdayMonth];

    if (isThisWeek(birthday, today)) {
      return "This Week";
    } else if (isThisMonth && isThisYear) {
      return "Later this Month";
    } else if (isThisYear) {
      return month;
    } else {
      return `${month} ${birthdayYear}`;
    }
  };
  upcoming.forEach((birthday) => {
    const label = getGroupLabel(birthday, today);

    if (groups.has(label)) {
      const group = groups.get(label);
      group.birthdays.push(birthday);
    } else {
      groups.set(label, { birthdays: [birthday] });
    }
  });

  console.log(groups);

  return (
    <div className="flex flex-col gap-3 mt-3">
      {Array.from(groups.entries()).map(([label, group]) => {
        return (
          <div key={group.label}>
            <div>{label}</div>
            {group ? (
              group.birthdays.map((birthday: Birthday) => {
                return (
                  <NextBirthday
                    key={birthday.person.id}
                    person={birthday.person}
                    circle={getCircleForPerson(birthday.person, circles)}
                    date={today}
                    daysAway={getDaysUntil(birthday.date, today)}
                  />
                );
              })
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
        {daysAway === 0 ? (
          <span>today</span>
        ) : daysAway < 8 ? (
          <span>
            in {daysAway} day{daysAway === 1 ? "" : "s"}
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
