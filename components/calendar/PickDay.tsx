import type { People } from "@/data/people";
import { getBirthdaysForDate, months, weekdays } from "./calendarUtils";
import BirthdayRow from "../ui/BirthdayRow";
import { AddBirthdayForDayButton } from "./AddBirthdayForDayButton";

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

  return (
    <div className="rounded-3xl flex flex-col gap-2 bg-confetti-surface p-4 sm:p-5">
      <AddBirthdayUI selectedDay={selectedDay} people={people} />
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
  selectedDay,
  people,
}: {
  selectedDay: Date;
  people: People[];
}) => {
  const birthdays = getBirthdaysForDate(people, selectedDay);
  const birthdayDate = birthdays.length;

  //need to add in logic to decide which UI to show depending on what is selected

  return (
    <div>
      <div>{`${weekdays[(selectedDay.getDay() + 7 - 1) % 7]} ${selectedDay.getDate()} ${months[selectedDay.getMonth()]}`}</div>
      <div>
        {birthdayDate || "No"} Birthday{birthdayDate !== 1 && "s"} on this day
      </div>

      {birthdays.map((birthday) => {
        return (
          <BirthdayRow
            key={birthday.id}
            birthday={birthday}
            occurenceYear={selectedDay.getFullYear()}
          />
        );
      })}
      <AddBirthdayForDayButton
        hasBirthday={!!birthdayDate}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default PickDay;
