"use client";
import { TextField } from "@/components/ui/TextField";
import { fieldBase } from "@/components/ui/FormSection";
import { monthNames } from "@/lib/utils/dateUtils";
import { useBirthdayForm } from "./BirthdayFormProvider";

const days = Array.from({ length: 31 }, (_, index) => index + 1);
export const BirthdayFields = ({
  birthDayDefault,
  birthMonthDefault,
  birthYearDefault,
}: {
  birthDayDefault?: number;
  birthMonthDefault?: number;
  birthYearDefault?: number | null;
}) => {
  const { initialDate } = useBirthdayForm();

  return (
    <div
      className="flex flex-col gap-1.5"
      key={initialDate?.getTime() ?? "no-initial-date"}
    >
      <div className="flex gap-2">
        <BirthdayField
          label="Day"
          name="day"
          options={days}
          className="w-16"
          defaultValue={
            initialDate
              ? initialDate.getDate()
              : birthDayDefault
                ? birthDayDefault
                : 0
          }
        />
        <BirthdayField
          label="Month"
          name="month"
          options={monthNames}
          defaultValue={
            initialDate
              ? initialDate.getMonth() +1
              : birthMonthDefault
                ? birthMonthDefault
                : 0
          }
          className="flex-1"
        />
        <TextField
          label="Year"
          name="year"
          placeHolder="Year"
          className="w-20"
          defaultValue={birthYearDefault ?? ""}
        />
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
          return (
            <option key={option} value={index + 1}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
