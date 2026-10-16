import { Person } from "@/lib/data/people";

export const AddCircleButton = ({
}) => {
  return (
    <div>
      <button
        className="h-full aspect-square border-confetti-border bg-confetti-surface rounded-2xl"
      >
        <div className="flex flex-col">
          <span>+</span>
          <span>New Circle</span>
        </div>
      </button>
    </div>
  );
};
