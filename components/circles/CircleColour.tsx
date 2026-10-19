'use client'
import { useState } from "react";
import { FormSection } from "../addBirthday/FormSection";

export const CircleColour = ({ circleColour }: { circleColour?: string }) => {
  const [colour, setColour] = useState(circleColour);
  return (
    <FormSection label="Colour">
      {/* The whole row opens the native colour picker; the hidden input
          still carries focus, so the ring is drawn on the row instead. */}
      <label
        htmlFor="circle-colour"
        className="group flex cursor-pointer items-center gap-3 rounded-xl border border-confetti-border bg-confetti-surface py-2.5 pr-3.5 pl-2.5 transition-colors hover:border-confetti-ink/20 active:bg-confetti-active has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-confetti-ink"
      >
        <span
          aria-hidden
          className={`size-10 shrink-0 rounded-full transition-transform group-hover:scale-105 ${
            colour
              ? "ring-1 ring-confetti-ink/10 ring-inset"
              : "border-2 border-dashed border-confetti-ink/20"
          }`}
          style={colour ? { backgroundColor: colour } : undefined}
        />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-sm font-semibold text-confetti-ink">
            {colour ? "Change colour" : "Choose a colour"}
          </span>
          <span className="text-xs text-confetti-muted">
            Marks this circle&apos;s birthdays on the calendar
          </span>
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-3.5 shrink-0 text-confetti-muted transition-colors group-hover:text-confetti-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3.5l4.5 4.5L6 12.5" />
        </svg>
        <input
          id="circle-colour"
          type="color"
          name="colour"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className="sr-only "
        />
      </label>
    </FormSection>
  );
};
