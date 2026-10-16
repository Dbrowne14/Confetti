import { AddCircle } from "./AddCircle";

export const AddCircleButton = ({
  openCircle,
  closeCircle,
  isCircleOpen,
}: {
  openCircle: () => void;
  closeCircle: () => void;
  isCircleOpen: boolean;
}) => {
  return (
    <div>
        <button onClick={() => openCircle()} className="h-full aspect-square border-confetti-border bg-confetti-surface rounded-2xl">
            <div className="flex flex-col"><span>+</span><span>New Circle</span></div>
        </button>
         <AddCircle isCircleOpen={isCircleOpen} closeCircle={closeCircle} />
    </div>
  );
};