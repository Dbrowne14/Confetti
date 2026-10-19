import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import {
  filterPeopleByCircle,
  formatPeopleCount,
} from "@/lib/utils/circleUtils";
import { PeopleInitials } from "./PeopleInitials";

type CircleCardProps = {
  circle: Circle;
  // Everyone; the card picks out the people in its own circle.
  people: Person[];
  onOpen: () => void;
};

export const CircleCard = ({ circle, people, onOpen }: CircleCardProps) => {
  const peopleInCircle = filterPeopleByCircle(people, circle.id);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex min-h-44 min-w-0 cursor-pointer flex-col items-start rounded-2xl border border-confetti-border bg-confetti-surface p-4 text-left transition-[translate,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-confetti-ink/15 hover:shadow-pill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:translate-y-0 active:shadow-none motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-5"
    >
      <span
        aria-hidden
        className="size-10 shrink-0 rounded-xl ring-1 ring-confetti-ink/5 ring-inset transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
        style={{ backgroundColor: circle.colour }}
      />
      <span className="mt-4 w-full truncate text-base leading-snug font-semibold text-confetti-ink">
        {circle.name}
      </span>
      <span className="text-sm text-confetti-muted">
        {formatPeopleCount(peopleInCircle.length)}
      </span>
      <span className="mt-auto flex h-7 items-center pt-4">
        {peopleInCircle.length > 0 ? (
          <PeopleInitials colour={circle.colour} people={peopleInCircle} />
        ) : (
          <span className="text-xs text-confetti-muted">No one yet</span>
        )}
      </span>
    </button>
  );
};
