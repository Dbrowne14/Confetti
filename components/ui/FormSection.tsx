import { ReactNode } from "react";

export const fieldBase =
  "w-full min-w-0 rounded-xl border border-confetti-border bg-confetti-surface px-3 text-sm text-confetti-ink placeholder:text-confetti-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-confetti-ink";

export const FormSection = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-[10px] font-semibold tracking-[0.12em] text-confetti-muted uppercase">
        {label}
      </h3>
      {children}
    </section>
  );
};
