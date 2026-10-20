type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  // Point at visible text rather than duplicating it in an aria-label.
  labelledBy?: string;
  describedBy?: string;
};

export const Switch = ({
  checked,
  onCheckedChange,
  id,
  labelledBy,
  describedBy,
}: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink motion-reduce:transition-none ${
        checked ? "bg-confetti-coral" : "bg-confetti-ink/15"
      }`}
    >
      <span
        aria-hidden
        className={`size-6 rounded-full bg-confetti-surface shadow-pill transition-transform duration-200 motion-reduce:transition-none ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};
