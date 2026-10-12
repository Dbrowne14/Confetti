import { SetStateAction } from "react";

export const AddHeader = ({
  closeAddBirthday,
}: {
  closeAddBirthday: () => void;
}) => {
  return (
    <div className="flex justify-between text-sm font-medium text-confetti-muted">
      <span className="" onClick={closeAddBirthday}>
        Cancel
      </span>
      <span>Add Birthday</span>
      <span>Save</span>
    </div>
  );
};
