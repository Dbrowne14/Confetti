export const CloseButton = ({
  onClose,
  label = "Close",
}: {
  onClose: () => void;
  label?: string;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClose}
    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-confetti-border bg-confetti-surface text-confetti-ink transition-colors hover:bg-confetti-active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-border"
  >
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  </button>
);
