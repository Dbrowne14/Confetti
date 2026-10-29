import { TextField } from "@/components/ui/TextField";

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
