export const AddCircleButton = ({openNewCircle
}:{openNewCircle: ()=> void}) => {
  return (
    <button
      type="button"
      className="group flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-confetti-ink/20 p-4 text-confetti-muted transition-colors hover:border-confetti-ink/40 hover:bg-confetti-surface/60 hover:text-confetti-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-surface sm:p-5"
      onClick={openNewCircle}
    >
      <span
        aria-hidden
        className="flex size-10 items-center justify-center rounded-xl bg-confetti-active text-confetti-ink transition-transform group-hover:scale-105"
      >
        <svg
          viewBox="0 0 16 16"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          <path d="M8 3v10M3 8h10" />
        </svg>
      </span>
      <span className="text-sm font-semibold">New circle</span>
    </button>
  );
};
