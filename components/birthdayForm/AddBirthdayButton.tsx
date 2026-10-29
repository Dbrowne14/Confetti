import { PlusIcon } from "@/components/layout/NavIcons";
import { useAddBirthday } from "./AddBirthdayProvider";

// The label is visually hidden below lg but stays readable to screen readers.
export const AddBirthdayButton = () => {
  const { openAddBirthday } = useAddBirthday();
  return (
    <button
      type="button"
      onClick={() => openAddBirthday()}
      className="ml-auto inline-flex size-13 shrink-0 items-center justify-center gap-2.5 rounded-full bg-confetti-coral text-sm font-semibold whitespace-nowrap text-confetti-ink shadow-raised transition-colors hover:bg-confetti-coral/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-coral lg:h-11 lg:w-auto lg:px-5"
    >
      <PlusIcon className="size-4 lg:size-2.5" />
      <span className="sr-only lg:not-sr-only">Add birthday</span>
    </button>
  );
};
