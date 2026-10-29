"use client";
import { createContext, useState, useContext } from "react";
import { ReactNode } from "react";

type BirthdayFormContextType = {
  isOpen: boolean;
  editingPersonId: number | null;
  initialDate: Date | null;
  initialCircleId: number | null;
  openAddBirthday: (options?: OpenAddBirthdayOptions) => void;
  openEditBirthday: (personId: number) => void;
  closeBirthdayForm: () => void;
};
type OpenAddBirthdayOptions = {
  date?: Date;
  circleId?: number;
};

const BirthdayFormContext = createContext<BirthdayFormContextType | null>(null);

export const BirthdayFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [initialCircleId, setInitialCircleId] = useState<number | null>(null);

  const openAddBirthday = ({ date, circleId }: OpenAddBirthdayOptions = {}) => {
    setEditingPersonId(null);
    setInitialDate(date ?? null);
    setInitialCircleId(circleId ?? null);
    setIsOpen(true);
  };

  // Clears the add-only values so they can't override the person's own
  // birthday in BirthdayFields.
  const openEditBirthday = (personId: number) => {
    setEditingPersonId(personId);
    setInitialDate(null);
    setInitialCircleId(null);
    setIsOpen(true);
  };

  // Only closes: the values are left as they were so the form doesn't
  // reset while the mobile sheet slides out. The open functions set them afresh.
  const closeBirthdayForm = () => {
    setIsOpen(false);
  };

  return (
    <BirthdayFormContext.Provider
      value={{
        isOpen,
        editingPersonId,
        initialDate,
        initialCircleId,
        openAddBirthday,
        openEditBirthday,
        closeBirthdayForm,
      }}
    >
      {children}
    </BirthdayFormContext.Provider>
  );
};

export const useBirthdayForm = () => {
  const context = useContext(BirthdayFormContext);

  if (!context) {
    throw new Error("useBirthdayForm must be used inside BirthdayFormProvider");
  }

  return context;
};
