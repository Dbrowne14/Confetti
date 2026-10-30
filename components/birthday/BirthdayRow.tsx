import type { Circle } from "@/lib/data/circles";
import type { Person } from "@/lib/data/people";
import { compareColours } from "@/lib/utils/colourContrastUtils";
import { monthNames } from "@/lib/utils/dateUtils";

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
  const textTone = circle ? compareColours(circle.colour) : "dark";
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-3.5">
      <div
        className={`flex ${styles.badge} shrink-0 flex-col items-center justify-center rounded-full text-confetti-ink ${textTone === "dark" ? "text-confetti-ink" : "text-confetti-surface"}`}
        style={{
          backgroundColor: circle?.colour ?? "lightgray",
        }}
      >
        <span
          className={`${styles.month} leading-none font-semibold tracking-[0.12em] uppercase`}
        >
          {monthNames[person.birthMonth - 1].slice(0, 3)}
        </span>

        <span
          className={`mt-0.5 ${styles.day} leading-none font-semibold tabular-nums`}
        >
          {person.birthDay}
        </span>
      </div>

      <div className="min-w-0 flex-1 text-left">
        <div
          className={`truncate ${styles.name} leading-snug font-semibold text-confetti-ink`}
        >
          {person.firstName} {person.surname}
        </div>

        <div
          className={`flex min-w-0 items-center ${styles.meta} leading-snug text-confetti-muted`}
        >
          <span className="truncate">{circle?.name ?? "Uncategorised"}</span>

          {person.birthYear !== null && (
            <span className="shrink-0">
              &nbsp;· turns {occurrenceYear - person.birthYear}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export const TurnsYear = ({
  person,
  occurrenceYear,
}: {
  person: Person;
  occurrenceYear: number;
}) => {
  return (
    <>
      {person.birthYear !== null && (
        <span className="shrink-0">
          · turns {occurrenceYear - person.birthYear}
        </span>
      )}
    </>
  );
};
