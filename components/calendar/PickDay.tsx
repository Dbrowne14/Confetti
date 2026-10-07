import React from "react";
import type { People } from "@/data/people";
import { getBirthdaysForDate, months, weekdays } from "./calendarUtils";

const PickDay = ({
  cellDate,
  people,
}: {
  cellDate: Date;
  people: People[];
}) => {
  const month = cellDate.getMonth();
  const date = cellDate.getDate();
  const day = cellDate.getDate();
  console.log(day);
  const birthdays = getBirthdaysForDate(people, date, month);

  return (
    <div className="rounded-3xl flex flex-col gap-2 bg-confetti-surface p-4 sm:p-5">
      <AddBirthdayUI month={month} day={day} date={date} people={people} />
      <FirstLoadUI />
    </div>
  );
};

const FirstLoadUI = () => {
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
  return (
    <div>
      <div>{`${weekdays[day - 1]} ${date} ${months[month]}`}</div>
      <div>
        {birthdayDate || "No"} Birthday{birthdayDate !== 1 && "s"} on this day
      </div>
      {birthdayDate &&
        birthdays.map((birthday, index) => {
          return (
            <div className="flex w-full gap-3">
              <div className="flex flex-col w-10 h-10 rounded-full bg-amber-500">
                <span>{months[birthday.birthMonth - 1].slice(0, 3)}</span>
                <span>{birthday.birthDay}</span>
              </div>
              <div className="flex flex-col">
                <div>{birthday.firstName} {birthday.surname}</div>
                <div><span>{birthday.circle.name}</span><span>Turns {birthday.birthYear}</span></div>
              </div>
            </div>
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
