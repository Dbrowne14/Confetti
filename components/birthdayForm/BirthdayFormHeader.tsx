export const addBirthdayTitleId = "add-birthday-title";

export const AddHeader = ({
  closeAddBirthday,
}: {
  closeAddBirthday: () => void;
}) => {
  return (
    <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-confetti-border px-5 py-3">
      {/* Padding widens the tap target; the negative margin keeps the text aligned. */}
      <button
        type="button"
        onClick={closeAddBirthday}
        className="-mx-2 justify-self-start rounded-lg px-2 py-2 text-sm text-confetti-muted transition-colors hover:text-confetti-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink"
      >
        Cancel
      </button>
      <h2
        id={addBirthdayTitleId}
        className="font-serif text-lg font-medium text-confetti-ink"
      >
        Add birthday
      </h2>
      <button
        type="submit"
        className="justify-self-end rounded-lg bg-confetti-ink px-4 py-1.5 text-sm font-semibold text-confetti-surface shadow-pill transition-colors hover:bg-confetti-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink"
      >
        Save
      </button>
    </div>
  );
};
