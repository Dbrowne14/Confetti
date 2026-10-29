import { fieldBase } from "@/components/ui/FormSection";

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
  defaultValue?: string | number| null;
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
