import type { Circle } from "@/data/circles";

const chipBase =
  "flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink";

const chipState = (isSelected: boolean) =>
  isSelected
    ? "border-confetti-ink bg-confetti-ink font-semibold text-confetti-surface shadow-raised"
    : "border-confetti-border bg-confetti-surface font-medium text-confetti-muted hover:border-confetti-ink/20 hover:text-confetti-ink";

type CircleFilterProps = {
  circles: Circle[];
  selectedCircleId: number | null; // null = All
  onSelectCircle: (circleId: number | null) => void;
};

export const CircleFilter = ({
  circles,
  selectedCircleId,
  onSelectCircle,
}: CircleFilterProps) => {
  return (
    // Scrolls sideways rather than wrapping when there are more circles than fit.
    <div
      role="group"
      aria-label="Filter birthdays by circle"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 scrollbar-none sm:-mx-1 sm:max-w-182 sm:px-1 [&::-webkit-scrollbar]:hidden"
    >
      <button
        type="button"
        aria-pressed={selectedCircleId === null}
        className={`${chipBase} ${chipState(selectedCircleId === null)}`}
        onClick={() => onSelectCircle(null)}
      >
        All
      </button>
      {circles.map(({ id, name, colour }) => {
        const isSelected = selectedCircleId === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isSelected}
            className={`${chipBase} ${chipState(isSelected)}`}
            onClick={() => onSelectCircle(id)}
          >
            <span
              aria-hidden
              className={`size-2 shrink-0 rounded-full ${isSelected ? "ring-2 ring-confetti-surface/25" : ""}`}
              style={{ backgroundColor: colour }}
            />
            {name}
          </button>
        );
      })}
    </div>
  );
};
