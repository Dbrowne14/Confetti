import { fieldBase } from "@/components/ui/FormSection";

export const NameField = () => {
  return (
    <div className="flex gap-2">
      <TextField
        label="First Name"
        name="firstName"
        placeHolder="Who's celebrating?"
        className="flex-1"
      />
      <TextField
        label="Last Name"
        name="lastName"
        placeHolder="Last name"
        className="flex-1"
      />
    </div>
  );
};

export const TextField = ({
  label,
  name,
  placeHolder,
  className = "",
}: {
  label: string;
  name: string;
  placeHolder?: string;
  className?: string;
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
      />
    </div>
  );
};
