// Presentational only: reminders aren't implemented yet, so these switches are
// disabled, hold no state and carry no `name` (nothing reaches the form data).
const reminders = ["1 week before", "1 day before", "On the day"];

export const ReminderOptions = () => {
  return (
    <ul className="divide-y divide-confetti-border border-b border-confetti-border">
      {reminders.map((label) => (
        <li key={label} className="flex items-center justify-between py-2.5">
          <span className="text-sm font-medium text-confetti-ink">{label}</span>
          <button
            type="button"
            role="switch"
            aria-checked
            aria-label={`${label} (coming soon)`}
            disabled
            className="relative inline-flex h-6 w-10 shrink-0 cursor-not-allowed items-center rounded-full bg-confetti-coral"
          >
            <span className="absolute right-0.5 size-5 rounded-full bg-confetti-surface shadow-pill" />
          </button>
        </li>
      ))}
    </ul>
  );
};
