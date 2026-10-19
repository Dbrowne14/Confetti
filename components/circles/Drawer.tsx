"use client";

import { ReactNode, useEffect, useRef } from "react";

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
        className="fixed inset-0 z-40 bg-confetti-ink/30 animate-[fade-in_300ms_ease-out]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="fixed inset-y-0 right-0 z-40 flex h-dvh w-full animate-[slide-in-right_300ms_ease-out] flex-col bg-confetti-bg p-4 shadow-raised outline-none sm:w-104 sm:border-l sm:border-confetti-border"
      >
        {children}
      </div>
    </>
  );
};