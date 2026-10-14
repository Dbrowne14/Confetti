import { TextField } from "./NameField";
import { fieldBase } from "./FormSection";
import { monthNames } from "@/lib/utils/dateUtils";

const days = Array.from({ length: 31 }, (_, index) => index + 1);

export const BirthdayFields = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <BirthdayField label="Day" name="day" options={days} className="w-16" />
        <BirthdayField label="Month" name="month" options={monthNames} className="flex-1" />
        <TextField label="Year" name="Year" placeHolder="Year" className="w-20" />
      </div>
      <p className="text-[11px] text-confetti-muted">
        Year is optional. Add it to see the age they’re turning.
      </p>
    </div>
  );
};

export type BirthdayFieldProps = {
  label: string;
  name: string;
  defaultValue?: number | string;
  options?: number[] | string[];
  className?: string;
};

export const BirthdayField = ({
  label,
  name,
  options,
  defaultValue,
  className = "",
}: BirthdayFieldProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`${fieldBase} h-10 cursor-pointer appearance-none`}
        defaultValue={defaultValue}
      >
        {options?.map((option, index) => {
          return <option key={option} value={index}>{option}</option>;
        })}
      </select>
    </div>
  );
};
