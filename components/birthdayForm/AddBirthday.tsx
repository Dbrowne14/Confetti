"use client";

import { useBirthdayForm } from "./BirthdayFormProvider";
import { NameField } from "./NameField";
import { BirthdayFields } from "./BirthdayFields";
import {
  BirthdayFormHeader,
  birthdayFormTitleId,
} from "./BirthdayFormHeader";
import { CircleOptions } from "./CircleOptions";
import { ReminderOptions } from "@/components/ui/ReminderOptions";
import { FormSection, fieldBase } from "@/components/ui/FormSection";
import { useState } from "react";
import { Circle } from "@/lib/data/circles";
import { addPerson } from "@/lib/actions/addPerson";
import { ErrorMessage } from "../ui/ErrorMessage";

export const AddBirthday = ({ circles }: { circles: Circle[] }) => {
  const { closeAddBirthday, initialCircleId } = useBirthdayForm();
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(
    initialCircleId,
  );
  const [error, setError] = useState<string|null>(null);
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await addPerson(formData);
    if (!result.success) {
      setError(result.error);
      return;
    }
    closeAddBirthday();
  };
  return (
    <form
      aria-labelledby={birthdayFormTitleId}
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit}
    >
      <BirthdayFormHeader onClose={closeAddBirthday} />
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
          <input type="hidden" name="circleId" value={selectedCircleId ?? ""} />
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
        {error && <ErrorMessage message={error} />}
      </div>
    </form>
  );
};
