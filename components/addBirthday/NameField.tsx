import { fieldBase } from "@/components/ui/FormSection";

export const NameField = ({
  firstNameDefault,
  surnameDefault,
}: {
  firstNameDefault?: string;
  surnameDefault?: string | null;
}) => {
  return (
    <div className="flex gap-2">
      <TextField
        label="First Name"
        name="firstName"
        placeHolder="Who's celebrating?"
        className="flex-1"
        defaultValue={firstNameDefault}
      />
      <TextField
        label="Last Name"
        name="lastName"
        placeHolder="Last name"
        className="flex-1"
        defaultValue={surnameDefault}
      />
    </div>
  );
};

export const TextField = ({
  label,
  name,
  placeHolder,
  className = "",
  defaultValue,
}: {
  label: string;
  name: string;
  placeHolder?: string;
  className?: string;
  defaultValue?: string | null;
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* The section heading is the visible label; this keeps each input named for screen readers. */}
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeHolder}
        className={`${fieldBase} h-10`}
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
};
