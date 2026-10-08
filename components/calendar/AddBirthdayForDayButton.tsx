"use client";
import { months } from "./calendarUtils";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";

export const AddBirthdayForDayButton = ({
  selectedDay,
  hasBirthday,
}: {
  selectedDay: Date;
  hasBirthday: boolean;
}) => {
  const { openAddBirthday } = useAddBirthday();

  return (
    <button onClick={() => openAddBirthday(selectedDay)}>
      Add {hasBirthday ? "Another" : "Birthday"} on {selectedDay.getDate()}{" "}
      {months[selectedDay.getMonth()]}
    </button>
  );
};
