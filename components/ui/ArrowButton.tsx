type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  label: string;
};

export const ArrowButton = ({
  direction,
  onClick,
  disabled = false,
  label,
}: ArrowButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-lg border border-confetti-border text-confetti-ink transition-colors hover:bg-confetti-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink disabled:cursor-not-allowed disabled:text-confetti-muted disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={direction === "left" ? "rotate-180" : ""}
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
};
