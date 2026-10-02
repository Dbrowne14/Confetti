import { PlusIcon } from "./NavIcons";

const AddBirthdayButton = ({ openAdd }: { openAdd: () => void }) => {
  return (
    <button
      type="button"
      onClick={openAdd}
      className="order-2 ml-auto inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full bg-confetti-coral px-5 text-sm font-semibold whitespace-nowrap text-confetti-ink shadow-raised transition-colors hover:bg-confetti-coral/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-coral"
    >
      <PlusIcon />
      <span>Add birthday</span>
    </button>
  );
};

export default AddBirthdayButton;
