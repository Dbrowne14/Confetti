"use client";
import {useEffect, useRef } from "react";

export const AddCircle = ({
  isCircleOpen,
  closeCircle,
}: {
  isCircleOpen: boolean;
  closeCircle: () => void;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // While open: move focus into the drawer and stop the page behind it scrolling.
  useEffect(() => {
    if (!isCircleOpen) return;
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCircleOpen]);

  useEffect(() => {
    if (!isCircleOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCircle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCircleOpen, closeCircle]);

  // The backdrop and drawer stay mounted so both the open and close
  // transitions can play; `invisible` + `inert` keep the closed drawer out of
  // the tab order and accessibility tree.
  return (
    <>
      <div
        aria-hidden
        onClick={closeCircle}
        className={`fixed inset-0 z-50 bg-confetti-ink/30 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          isCircleOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-name"
        tabIndex={-1}
        inert={!isCircleOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col bg-confetti-bg shadow-raised outline-none duration-300 ease-out motion-reduce:transition-none sm:w-104 sm:border-l sm:border-confetti-border ${
          // Visibility only transitions on close, so the drawer is visible (and
          // focusable) immediately on open but stays visible while sliding out.
          isCircleOpen
            ? "visible translate-x-0 transition-[translate]"
            : "invisible translate-x-full transition-[translate,visibility]"
        }`}
      ></div>
    </>
  );
};
