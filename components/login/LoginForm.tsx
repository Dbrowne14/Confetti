import { ReactNode, SubmitEventHandler } from "react";
import { fieldBase } from "@/components/ui/FormSection";
import { primaryButton } from "@/components/ui/Drawer";
import { ConfettiScatter } from "./ConfettiScatter";
import type { AuthError } from "@supabase/supabase-js";
import { ErrorMessage } from "../ui/ErrorMessage";

// Presentational only: the page owns submission and passes it in.
export const LoginForm = ({
  onSubmit,
  error,
}: {
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  error: string | null;
}) => {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-6 sm:py-16">
      <div className="relative w-full max-w-sm">
        <ConfettiScatter />

        {/* Below sm the form sits straight on the page; from sm up it becomes a card. */}
        <div className="relative flex flex-col gap-8 sm:rounded-3xl sm:border sm:border-confetti-border sm:bg-confetti-surface sm:p-8 sm:shadow-raised">
          <div className="flex flex-col items-center gap-3 text-center">
            <span
              aria-hidden
              className="size-5 rotate-12 rounded-md bg-confetti-coral"
            />
            <h1 className="font-serif text-4xl leading-tight font-semibold tracking-tight text-confetti-ink">
              Confetti
            </h1>
            <p className="text-sm text-confetti-muted">
              Welcome back. Let’s see who’s celebrating.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <LoginField label="Email" htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                required
                className={loginField}
              />
            </LoginField>
            <LoginField label="Password" htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className={loginField}
              />
            </LoginField>
            <button type="submit" className={`${primaryButton} mt-2 h-12`}>
              Log in
            </button>
            <ErrorMessage message={error ?? ""}/>
          </form>
        </div>
      </div>
    </main>
  );
};

// 16px text below lg stops iOS Safari zooming the page when a field is focused.
const loginField = `${fieldBase} h-12 text-base lg:text-sm`;

const LoginField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={htmlFor}
      className="text-[10px] font-semibold tracking-[0.12em] text-confetti-muted uppercase"
    >
      {label}
    </label>
    {children}
  </div>
);
