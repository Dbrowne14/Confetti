export const chipBase =
  "flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink";

export const chipState = (isSelected: boolean) =>
  isSelected
    ? "border-confetti-ink bg-confetti-ink font-semibold text-confetti-surface shadow-raised"
    : "border-confetti-border bg-confetti-surface font-medium text-confetti-muted hover:border-confetti-ink/20 hover:text-confetti-ink";

export type PillProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  colour?: string;
};

export const Pill = ({ label, isSelected, onClick, colour }: PillProps) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`${chipBase} ${chipState(isSelected)}`}
      onClick={onClick}
    >
      <span
        aria-hidden
        className={`size-2 shrink-0 rounded-full ${isSelected ? "ring-2 ring-confetti-surface/25" : ""}`}
        style={{ backgroundColor: colour }}
      />
      {label}
    </button>
  );
};
