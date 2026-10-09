import { circles } from "@/data/circle";
import { People } from "@/data/people";
import { Circle } from "@/data/circle";
import { SetStateAction } from "react";

export const CalendarFilter = ({
  setCircle,
}: {
  setCircle: React.Dispatch<SetStateAction<number | null>>;
}) => {
  return (
    <div className="h-20 flex flex-row gap-4 ">
      <button
        className=" flex items-center gap-2 p-4 h-fit rounded-3xl border-confetti-border bg-amber-950"
        onClick={() =>
          handleCircleFilter({
            setCircleFilter: setCircle,
            selectedFilter: null,
          })
        }
      >
        <div className="text-white">All</div>
      </button>
      {circles.map((circle) => {
        return (
          <button
            className=" flex items-center gap-2 p-4 h-fit rounded-3xl bg-confetti-surface border-confetti-border"
            onClick={() =>
              handleCircleFilter({
                setCircleFilter: setCircle,
                selectedFilter: circle.id,
              })
            }
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: circle.colour }}
            ></div>
            <div>{circle.name}</div>
          </button>
        );
      })}
    </div>
  );
};



const handleCircleFilter = ({
  setCircleFilter,
  selectedFilter,
}: {
  setCircleFilter: React.Dispatch<SetStateAction<number | null>>;
  selectedFilter: number | null;
}) => {
  return setCircleFilter(selectedFilter);
};
