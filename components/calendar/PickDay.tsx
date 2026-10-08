import React from "react";
import type { People } from "@/data/people";
import { getBirthdaysForDate, months, weekdays } from "./calendarUtils";
import BirthdayRow from "../ui/BirthdayRow";

const PickDay = ({
  selectedDay,
  people,
}: {
  people: People[];
  selectedDay: Date | null;
}) => {
  if (!selectedDay) {
    return <NotSelected />;
  }
  const month = selectedDay.getMonth();
  const date = selectedDay.getDate();
  const day = selectedDay.getDay();
  console.log(day);

  return (
    <div className="rounded-3xl flex flex-col gap-2 bg-confetti-surface p-4 sm:p-5">
      <AddBirthdayUI month={month} day={day} date={date} people={people} />
    </div>
  );
};

const NotSelected = () => {
  return (
    <>
      {" "}
      <h1 className="text-[18px]">Pick a Day</h1>
      <p className="text-[16px]">
        Select a date on the calendar to see who's celebrating, or to add a
        birthday on it.
      </p>
    </>
  );
};

const AddBirthdayUI = ({
  month,
  day,
  date,
  people,
}: {
  month: number;
  day: number;
  date: number;
  people: People[];
}) => {
  const birthdays = getBirthdaysForDate(people, date, month);
  const birthdayDate = birthdays.length;
  //need to add in logic to decide which UI to show depending on what is selected
  console.log(day);
  return (
    <div>
      <div>{`${weekdays[(day + 7 - 1) % 7]} ${date} ${months[month]}`}</div>
      <div>
        {birthdayDate || "No"} Birthday{birthdayDate !== 1 && "s"} on this day
      </div>
      {birthdayDate &&
        birthdays.map((birthday, index) => {
          return (
            <BirthdayRow birthday={birthday}/>
          );
        })}
      <button className="rounded-xl border p-2 flex gap-2">
        <span>+</span>
        <span>
          Add {birthdayDate ? "Another" : "Birthday"} on {date} {months[month]}
        </span>
      </button>
    </div>
  );
};

export default PickDay;
