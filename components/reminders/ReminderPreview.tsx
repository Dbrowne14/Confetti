// A product preview of what a reminder looks like, not a real notification.
export const ReminderPreview = ({
  time,
  message,
  isPushEnabled,
}: {
  time: string;
  // Undefined when no reminder in the schedule is switched on.
  message?: string;
  isPushEnabled: boolean;
}) => {
  return (
    <section
      aria-labelledby="reminder-preview-label"
      className="flex flex-col gap-3 rounded-3xl border border-confetti-border bg-confetti-active p-4 sm:p-5"
    >
      <h2
        id="reminder-preview-label"
        className="text-[11px] font-semibold tracking-[0.16em] text-confetti-muted uppercase"
      >
        Preview
      </h2>
      {message ? (
        <div
          className={`flex gap-3 rounded-2xl bg-confetti-surface p-4 shadow-pill transition-opacity ${
            isPushEnabled ? "" : "opacity-60"
          }`}
        >
          <ConfettiAppIcon />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-confetti-ink">
                Confetti
              </span>
              <span className="shrink-0 text-sm text-confetti-muted tabular-nums">
                {time || "--:--"}
              </span>
            </div>
            <p className="text-[15px] leading-snug text-confetti-ink">
              {message}
            </p>
          </div>
        </div>
      ) : (
        <p className="rounded-2xl bg-confetti-surface/60 p-4 text-sm text-confetti-muted">
          Turn on a reminder to see a preview.
        </p>
      )}
      {message && !isPushEnabled && (
        <p className="text-xs text-confetti-muted">
          Push notifications are off.
        </p>
      )}
    </section>
  );
};

// The Confetti brand square, inverted into an app icon.
const ConfettiAppIcon = () => (
  <span
    aria-hidden
    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-confetti-ink"
  >
    <span className="size-3.5 rounded-[4px] bg-confetti-coral" />
  </span>
);
