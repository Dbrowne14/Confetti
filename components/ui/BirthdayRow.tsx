import { People } from "@/data/people";
import { months } from "../calendar/calendarUtils";

const BirthdayRow = ({
  birthday,
  occurenceYear,
}: {
  birthday: People;
  occurenceYear: number;
}) => {
  return (
    <div className="flex w-full gap-3">
      <div className="flex flex-col w-10 h-10 rounded-full bg-amber-500">
        <span>{months[birthday.birthMonth - 1].slice(0, 3)}</span>
        <span>{birthday.birthDay}</span>
      </div>
      <div className="flex flex-col">
        <div>
          {birthday.firstName} {birthday.surname}
        </div>
        <div>
          <span>{birthday.circle.name}</span>
          {birthday.birthYear && occurenceYear && (
            <span>Turns {occurenceYear - birthday.birthYear}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayRow;
