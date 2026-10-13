'use client'

import { useAddBirthday } from "./AddBirthdayProvider";
import { NameField } from "./NameField";
import { BirthdayFields } from "./BirthdayFields";
import { AddHeader } from "./AddHeader";
import { CircleOptions } from "./CircleOptions";
import { useState } from "react";
import { Circle } from "@/lib/data/circles";

export const AddBirthday = ({circles}:{circles:Circle[]}) => {
  const { isAddOpen, closeAddBirthday } = useAddBirthday();
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(null);
  return (
    <form
      className={`fixed top-1/2 left-1/2 z-50 h-120 w-90 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-confetti-border bg-confetti-surface p-5 shadow-raised ${isAddOpen ? "block" : "hidden"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <AddHeader closeAddBirthday={closeAddBirthday} />
      <NameField />
      <BirthdayFields />
      <CircleOptions
        selectedCircleId={selectedCircleId}
        setSelectedCircleId={setSelectedCircleId}
        circles={circles}
      />
    </form>
  );
};
