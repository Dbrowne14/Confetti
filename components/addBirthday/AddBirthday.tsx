"use client";

import { useAddBirthday } from "./AddBirthdayProvider";
import { NameField } from "./NameField";
import { BirthdayFields } from "./BirthdayFields";
import { AddHeader, addBirthdayTitleId } from "./AddHeader";
import { CircleOptions } from "./CircleOptions";
import { ReminderOptions } from "@/components/ui/ReminderOptions";
import { FormSection, fieldBase } from "@/components/ui/FormSection";
import { useState } from "react";
import { Circle } from "@/lib/data/circles";

export const AddBirthday = ({ circles }: { circles: Circle[] }) => {
  const { closeAddBirthday, initialCircleId } = useAddBirthday();
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(initialCircleId);
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const newBirthday = Object.fromEntries(formData);

  console.log(newBirthday);
  closeAddBirthday();
};
  return (
    <form
      aria-labelledby={addBirthdayTitleId}
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit}
    >
      <AddHeader closeAddBirthday={closeAddBirthday} />
      <div className="flex min-h-0 flex-col gap-5 overflow-y-auto px-5 pt-5 pb-8">
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
