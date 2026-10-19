'use client'

import type { Person } from "@/lib/data/people";
import type { Circle } from "@/lib/data/circles";
import { getUpcomingBirthdays } from "@/lib/utils/birthdayUtils";
import { UpcomingBirthdayRow } from "@/components/birthday/UpcomingBirthdayRow";
import {
  filterPeopleByCircle,
  getCircleForPerson,
} from "@/lib/utils/circleUtils";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { groupUpcomingBirthdays } from "./upcomingUtils";


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
