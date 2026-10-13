"use client";

import { useAddBirthday } from "./AddBirthdayProvider";
import { NameField } from "./NameField";
import { BirthdayFields } from "./BirthdayFields";
import { AddHeader } from "./AddHeader";
import { CircleOptions } from "./CircleOptions";
import { ReminderOptions } from "./ReminderOptions";
import { FormSection, fieldBase } from "./FormSection";
import { useState } from "react";
import { Circle } from "@/lib/data/circles";

export const AddBirthday = ({ circles }: { circles: Circle[] }) => {
  const { isAddOpen, closeAddBirthday } = useAddBirthday();
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(null);
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const newBirthday = Object.fromEntries(formData);

  console.log(newBirthday);
  closeAddBirthday();
};
  return (
    <form
      aria-label="Add birthday"
      className={`fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(27rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-confetti-border bg-confetti-bg shadow-raised ${isAddOpen ? "flex" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      <AddHeader closeAddBirthday={closeAddBirthday} />
      <div className="flex flex-col gap-5 overflow-y-auto px-5 pt-5 pb-8">
        <FormSection label="Name">
          <NameField />
        </FormSection>
        <FormSection label="Birthday">
          <BirthdayFields />
        </FormSection>
        <FormSection label="Circle">
          <CircleOptions
            selectedCircleId={selectedCircleId}
            setSelectedCircleId={setSelectedCircleId}
            circles={circles}
          />
        </FormSection>
        <FormSection label="Reminders">
          <ReminderOptions />
        </FormSection>
        <FormSection label="Gift notes">
          <label htmlFor="giftNotes" className="sr-only">
            Gift notes
          </label>
          <textarea
            id="giftNotes"
            name="giftNotes"
            placeholder="Gift ideas, things they’ve mentioned..."
            className={`${fieldBase} max-h-48 min-h-20 resize-y py-2.5`}
          />
        </FormSection>
      </div>
    </form>
  );
};
