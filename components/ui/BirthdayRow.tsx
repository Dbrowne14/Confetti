import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { monthNames } from "../calendar/calendarConstants";

type BirthdayRowProps = {
  person: Person;
  circle: Circle | undefined;
  // The year of the birthday being shown, so the age matches that occurrence.
  occurrenceYear: number;
  // "compact" is the smaller badge/text used in list views like Upcoming.
  size?: "default" | "compact";
};

const sizeStyles = {
  default: {
    badge: "size-12 sm:size-13",
    month: "text-[9px] sm:text-[10px]",
    day: "text-lg sm:text-xl",
    name: "text-[15px] sm:text-base",
    meta: "text-sm",
  },
  compact: {
    badge: "size-10",
    month: "text-[8px]",
    day: "text-base",
    name: "text-sm",
    meta: "text-xs",
  },
};

export const BirthdayRow = ({
  person,
  circle,
  occurrenceYear,
  size = "default",
}: BirthdayRowProps) => {
  const styles = sizeStyles[size];
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-3.5">
      <div
        className={`flex ${styles.badge} shrink-0 flex-col items-center justify-center rounded-full text-confetti-ink`}
        style={circle ? { backgroundColor: circle?.colour }: {backgroundColor:"lightgray"}}
      >
        <span className={`${styles.month} leading-none font-semibold tracking-[0.12em] uppercase`}>
          {/* birthMonth is 1-based */}
          {monthNames[person.birthMonth - 1].slice(0, 3)}
        </span>
        <span className={`mt-0.5 ${styles.day} leading-none font-semibold tabular-nums`}>
          {person.birthDay}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className={`truncate ${styles.name} leading-snug font-semibold text-confetti-ink`}>
          {person.firstName} {person.surname}
        </div>
        <div className={`truncate ${styles.meta} leading-snug text-confetti-muted`}>
          {!circle ? (<span>Uncategorised</span>):(<span>{circle.name}</span>)}
          {person.birthYear !== null && (
            <span> · turns {occurrenceYear - person.birthYear}</span>
          )}
        </div>
      </div>
    </div>
  );
};
