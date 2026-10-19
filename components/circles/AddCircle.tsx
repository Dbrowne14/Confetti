"use client";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { useEffect, useRef } from "react";
import { CircleForm } from "./CircleForm";

export const AddCircle = ({
  isCircleOpen,
  closeCircle,
  people,
  selectedCircle,
}: {
  isCircleOpen: boolean;
  closeCircle: () => void;
  people: Person[];
  selectedCircle?: Circle;
}) => {
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
      if (event.key === "Escape") closeCircle();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCircle]);

  if (!selectedCircle) return;

  return (
    <>
      <div
        aria-hidden
        onClick={closeCircle}
        className={`fixed inset-0 z-40 bg-confetti-ink/30 transition-opacity duration-300 ease-out motion-reduce:transition-none animate-[fade-in_300ms_ease-out]${
          isCircleOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="fixed inset-y-0 right-0 z-40 flex h-dvh w-full animate-slide-in-right flex-col bg-confetti-bg p-4 shadow-raised outline-none sm:w-104 sm:border-l sm:border-confetti-border animate-[slide-in-right_300ms_ease-out]"
      >
        <AddCircleHeader closeCircle={closeCircle} />
        <CircleForm people={people} circle={selectedCircle} />
      </div>
    </>
  );
};

const AddCircleHeader = ({ closeCircle }: { closeCircle: () => void }) => {
  return (
    <div className="flex justify-between">
      <button onClick={closeCircle}>x</button>
      <button className="text-red-900 disabled">delete circle</button>
    </div>
  );
};
