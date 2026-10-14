export const chipBase =
  "flex shrink-0 items-center rounded-full border whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink";

export const chipState = (isSelected: boolean) =>
  isSelected
    ? "border-confetti-ink bg-confetti-ink font-semibold text-confetti-surface shadow-raised"
    : "border-confetti-border bg-confetti-surface font-medium text-confetti-muted hover:border-confetti-ink/20 hover:text-confetti-ink";

const chipSize = {
  default: "h-9 gap-2 px-4 text-sm",
  compact: "h-7 gap-1.5 px-3 text-xs",
};

export type PillProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  colour?: string;
  size?: keyof typeof chipSize;
};

export const Pill = ({
  label,
  isSelected,
  onClick,
  colour,
  size = "default",
}: PillProps) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`${chipBase} ${chipSize[size]} ${chipState(isSelected)}`}
      onClick={onClick}
    >
      {colour && (
        <span
          aria-hidden
          className={`size-2 shrink-0 rounded-full ${isSelected ? "ring-2 ring-confetti-surface/25" : ""}`}
          style={{ backgroundColor: colour }}
        />
      )}
      {label}
    </button>
  );
};
