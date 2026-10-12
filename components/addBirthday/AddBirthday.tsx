import { useAddBirthday } from "./AddBirthdayProvider";
import { NameField } from "./NameField";
import { AddHeader } from "./AddHeader";

export const AddBirthday = () => {
  const { isAddOpen, closeAddBirthday } = useAddBirthday();
  return (
    <form
      className={`fixed top-1/2 left-1/2 z-50 h-120 w-90 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-confetti-border bg-confetti-surface p-5 shadow-raised ${isAddOpen ? "block" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
    >
<AddHeader closeAddBirthday={closeAddBirthday}/>
      <NameField />
    </form>
  );
};
