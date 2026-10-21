"use client";

import { ReactNode, useEffect, useRef } from "react";
import { CloseButton } from "./CloseButton";

type DrawerProps = {
  children: ReactNode;
  closeDrawer: () => void;
  ariaLabel?: string;
};

export const Drawer = ({
  children,
  closeDrawer,
  ariaLabel = "Drawer",
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDrawer]);

  return (
    <>
      <div
        aria-hidden
        onClick={closeDrawer}
        className="fixed inset-0 z-40 bg-confetti-ink/30 animate-[fade-in_300ms_ease-out] motion-reduce:animate-none"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="fixed inset-y-0 right-0 z-40 flex h-dvh w-full animate-[slide-in-right_300ms_ease-out] flex-col bg-confetti-bg shadow-raised outline-none motion-reduce:animate-none sm:w-104 sm:border-l sm:border-confetti-border"
      >
        {children}
      </div>
    </>
  );
};

// Layout pieces shared by every drawer's content: a fixed header with the
// close control, a body that scrolls on its own, and a footer that stays
// pinned to the bottom so the main action is always within reach.

export const DrawerHeader = ({
  onClose,
  closeLabel = "Close",
}: {
  onClose: () => void;
  closeLabel?: string;
}) => (
  <div className="flex shrink-0 items-center justify-between px-5 pt-5 pb-3">
    <CloseButton onClose={onClose} label={closeLabel} />
  </div>
);

export const DrawerBody = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-5 pt-1 pb-8">
    {children}
  </div>
);

export const DrawerFooter = ({ children }: { children: ReactNode }) => (
  <div className="shrink-0 border-t border-confetti-border bg-confetti-bg px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
    {children}
  </div>
);

export const DrawerTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <h2 className="font-serif text-3xl leading-tight font-semibold tracking-tight wrap-anywhere text-confetti-ink">
      {title}
    </h2>
    {subtitle && <p className="text-sm text-confetti-muted">{subtitle}</p>}
  </div>
);

export const primaryButton =
  "flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-confetti-ink px-4 text-sm font-semibold text-confetti-surface shadow-pill transition-colors hover:bg-confetti-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-ink/80 disabled:cursor-not-allowed disabled:opacity-50";
