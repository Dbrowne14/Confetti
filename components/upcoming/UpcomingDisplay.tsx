import { Person } from "@/lib/data/people";
import { BirthdayRow } from "../ui/BirthdayRow";
import { getUpcomingBirthdays } from "@/lib/utils/getNextBirthday";
import { getCircleForPerson, getDaysUntil } from "../calendar/calendarUtils";
import { Circle } from "@/lib/data/circles";
import { monthNames } from "../calendar/calendarConstants";

export const UpcomingDisplay = ({
  people,
  circles,
  selectedCircle,
}: {
  people: Person[];
  circles: Circle[];
  selectedCircle: number | null;
}) => {
  const today = new Date();
  const peopleByCircles = selectedCircle ? people.filter((person)=> person.circleId === selectedCircle) : people
  const upcoming = getUpcomingBirthdays(peopleByCircles, today);

  const groups = new Map();
  const getGroupLabel = (birthday: Birthday, today: Date) => {
    const birthdayMonth = birthday.date.getMonth();
    const birthdayYear = birthday.date.getFullYear();

    const isThisYear = birthdayYear === today.getFullYear();
    const isThisMonth = birthdayMonth === today.getMonth();

    const month = monthNames[birthdayMonth];

    if (isThisWeek(birthday, today) && isThisMonth) {
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


  return (
    <div className="flex flex-col gap-6">
      {Array.from(groups.entries()).map(([label, group]) => {
        return (
          <section key={label} className="flex flex-col gap-2">
            <h2 className="text-[10px] font-semibold tracking-[0.16em] text-confetti-muted uppercase">
              {label}
            </h2>
            {group ? (
              group.birthdays.map((birthday: Birthday) => {
                return (
                  <NextBirthday
                    key={birthday.person.id}
                    person={birthday.person}
                    circle={getCircleForPerson(birthday.person, circles)}
                    date={birthday.date}
                    daysAway={getDaysUntil(birthday.date, today)}
                  />
                );
              })
            ) : (
              <p className="text-[15px] text-confetti-muted">
                No upcoming birthdays
              </p>
            )}
          </section>
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
  <div className="flex items-center gap-3 rounded-2xl border border-confetti-border bg-confetti-surface px-3 py-2.5 sm:px-3.5">
    <BirthdayRow
      person={person}
      circle={circle}
      occurrenceYear={date.getFullYear()}
      size="compact"
    />
    <div className="flex shrink-0 flex-col items-end">
      <div
        className={`rounded-md px-2 py-1 text-[11px] leading-none font-semibold tabular-nums ${
          daysAway < 8
            ? "bg-confetti-coral text-confetti-ink"
            : "bg-confetti-active text-confetti-ink/80"
        }`}
      >
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
  const day = (today.getDay() + 6) % 7;
const daysLeftThisWeek = 6 - day;
  const difference = (birthdayTime - time) / (1000 * 60 * 60 * 24);

return difference >= 0 && difference <= daysLeftThisWeek;
};
