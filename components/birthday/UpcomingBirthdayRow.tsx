'use client'

import type { Circle } from "@/lib/data/circles";
import {
  formatDaysAway,
  SOON_THRESHOLD_DAYS,
  type UpcomingBirthday,
} from "@/lib/utils/birthdayUtils";
import { useProfile } from "../profile/ProfileProvider";
import { BirthdayRow } from "./BirthdayRow";

export const UpcomingBirthdayRow = ({
  birthday,
  circle,
  daysAway,
}: {
  birthday: UpcomingBirthday;
  circle: Circle | undefined;
  daysAway: number;
}) => {
  const isSoon = daysAway < SOON_THRESHOLD_DAYS;
  const{openProfile} = useProfile();
  return (
    <button type="button" className="flex items-center w-full min-w-0 cursor-pointer gap-3 rounded-2xl border border-confetti-border bg-confetti-surface px-3 py-2.5 text-left transition-colors hover:border-confetti-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-active sm:px-3.5" onClick={()=> openProfile(birthday.person.id)}>
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
    </button>
  );
};
