import { TextField } from "./NameField";

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const BirthdayFields = () => {
  return (
    <div className="flex">
      <BirthdayField label="Day" name="day" options={days} />
      <BirthdayField label="Month" name="month" options={months} />
      <TextField label="Year" name="Year" placeHolder="Year" />
    </div>
  );
};

export type BirthdayFieldProps = {
  label: string;
  name: string;
  defaultValue?: number | string;
  options?: number[] | string[];
};

export const BirthdayField = ({
  label,
  name,
  options,
  defaultValue,
}: BirthdayFieldProps) => {
  return (
    <div className="text-sm">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        className="bg-gray-200 border-b-confetti-border rounded-3xl p-1"
        defaultValue={defaultValue}
      >
        {options?.map((option, index) => {
          return <option value={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};
