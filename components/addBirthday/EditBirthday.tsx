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
import { Person } from "@/lib/data/people";

export const EditBirthday = ({
  circles,
  person,
}: {
  circles: Circle[];
  person: Person;
}) => {
  const { firstName, surname, birthDay, birthMonth, birthYear, giftNotes, circleId } = person;
  const { closeAddBirthday } = useAddBirthday();
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(
   circleId ?? null,
  );
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(Object.fromEntries(formData));

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
          <NameField firstNameDefault={firstName} surnameDefault={surname} />
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
            defaultValue={giftNotes ?? ""}
          />
        </FormSection>
      </div>
    </form>
  );
};
