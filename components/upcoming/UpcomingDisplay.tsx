import type { Person } from "@/lib/data/people";
import type { Circle } from "@/lib/data/circles";
import {
  getUpcomingBirthdays,
  type UpcomingBirthday,
} from "@/lib/utils/birthdayUtils";
import { BirthdayRow } from "@/components/ui/BirthdayRow";
import {
  filterPeopleByCircle,
  getCircleForPerson,
} from "@/lib/utils/circleUtils";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import {
  formatDaysAway,
  groupUpcomingBirthdays,
  SOON_THRESHOLD_DAYS,
} from "./upcomingUtils";

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
  const upcoming = getUpcomingBirthdays(
    filterPeopleByCircle(people, selectedCircle),
    today,
  );

  if (upcoming.length === 0) {
    return (
      <p className="text-[15px] text-confetti-muted">No upcoming birthdays</p>
    );
  }

  const groups = groupUpcomingBirthdays(upcoming, today);

  return (
    <div className="flex flex-col gap-6">
      {Array.from(groups, ([label, group]) => (
        <section key={label} className="flex flex-col gap-2">
          <h2 className="text-[10px] font-semibold tracking-[0.16em] text-confetti-muted uppercase">
            {label}
          </h2>
          {group.birthdays.map((birthday) => (
            <UpcomingBirthdayRow
              key={birthday.person.id}
              birthday={birthday}
              circle={getCircleForPerson(birthday.person, circles)}
              daysAway={getDaysUntil(birthday.date, today)}
            />
          ))}
        </section>
      ))}
    </div>
  );
};

const UpcomingBirthdayRow = ({
  birthday,
  circle,
  daysAway,
}: {
  birthday: UpcomingBirthday;
  circle: Circle | undefined;
  daysAway: number;
}) => {
  const isSoon = daysAway < SOON_THRESHOLD_DAYS;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-confetti-border bg-confetti-surface px-3 py-2.5 sm:px-3.5">
      <BirthdayRow
        person={birthday.person}
        circle={circle}
        occurrenceYear={birthday.date.getFullYear()}
        size="compact"
      />
      <span
        className={`shrink-0 rounded-md px-2 py-1 text-[11px] leading-none font-semibold tabular-nums ${
          isSoon
            ? "bg-confetti-coral text-confetti-ink"
            : "bg-confetti-active text-confetti-ink/80"
        }`}
      >
        {formatDaysAway(daysAway)}
      </span>
    </div>
  );
};
