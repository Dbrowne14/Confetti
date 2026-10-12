export const NameField = () => {
  return (
    <div className="flex gap-2 justify-between">
      <TextField
        label="First Name"
        name="firstName"
        placeHolder="Who's Celebrating?"
      />
      <TextField
        label="Last Name"
        name="lastName"
        placeHolder="Their Last Name"
      />
    </div>
  );
};

export const TextField = ({
  label,
  name,
  placeHolder,
}: {
  label: string;
  name: string;
  placeHolder?: string;
}) => {
  return (
    <div className=" flex flex-col text-sm font-medium text-confetti-muted">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        className="bg-gray-200 border-confetti-border rounded-3xl p-1 text-[11px]"
        name={name}
        placeholder={placeHolder}
      />
    </div>
  );
};
