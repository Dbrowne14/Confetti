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
import { Person } from "@/lib/data/people";
import { editPerson } from "@/lib/actions/editPerson";
import { ErrorMessage } from "../ui/ErrorMessage";

export const EditBirthday = ({
  circles,
  person,
}: {
  circles: Circle[];
  person: Person;
}) => {
  const {
    id,
    firstName,
    surname,
    birthDay,
    birthMonth,
    birthYear,
    giftNotes,
    circleId,
  } = person;
  const { closeEditBirthday } = useBirthdayForm();
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(
    circleId ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await editPerson(id, formData);
    if (!result.success) {
      setError(result.error);
      return;
    }
    closeEditBirthday();
  };
  return (
    <form
      aria-labelledby={birthdayFormTitleId}
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit}
    >
      <BirthdayFormHeader onClose={closeEditBirthday} />
      <div className="flex min-h-0 flex-col gap-5 overflow-y-auto px-5 pt-5 pb-8">
        <FormSection label="Name">
          <NameField firstNameDefault={firstName} surnameDefault={surname} />
        </FormSection>
        <FormSection label="Birthday">
          <BirthdayFields
            birthDayDefault={birthDay}
            birthMonthDefault={birthMonth}
            birthYearDefault={birthYear}
          />
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
        {error && <ErrorMessage message={error} />}
      </div>
    </form>
  );
};
