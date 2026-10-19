"use client";
import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { getUpcomingBirthdays } from "@/lib/utils/birthdayUtils";
import { UpcomingBirthdayRow } from "@/components/birthday/UpcomingBirthdayRow";
import { FormSection } from "@/components/ui/FormSection";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";

// The people in an existing circle, plus the action to add someone to it.
export const CirclePeople = ({
  people,
  circle,
}: {
  people: Person[];
  circle: Circle;
}) => {
  const { openAddBirthday } = useAddBirthday()
  return (
    <FormSection label="People">
      <PeopleBirthdayList
        people={people}
        circle={circle}
        emptyMessage="No one in this circle yet."
      />
      <button
        type="button"
        onClick={() => openAddBirthday({ circleId: circle.id })}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-dashed border-confetti-ink/20 text-sm font-semibold text-confetti-ink transition-colors hover:border-confetti-ink/40 hover:bg-confetti-surface/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-surface"
      >
        <span aria-hidden>+</span> Add someone to this circle
      </button>
    </FormSection>
  );
};

// Each person's row, soonest birthday first. Shared by a circle's drawer and
// the Uncategorised drawer, where `circle` is undefined.
export const PeopleBirthdayList = ({
  people,
  circle,
  emptyMessage,
}: {
  people: Person[];
  circle: Circle | undefined;
  emptyMessage: string;
}) => {
  const today = new Date();
  const upComingBirthdays = getUpcomingBirthdays(people, today);

  if (upComingBirthdays.length === 0) {
    return <p className="text-sm text-confetti-muted">{emptyMessage}</p>;
  }

  return upComingBirthdays.map((birthday) => (
    <UpcomingBirthdayRow
      birthday={birthday}
      circle={circle}
      daysAway={getDaysUntil(birthday.date, today)}
      key={birthday.person.id}
    />
  ));
};
