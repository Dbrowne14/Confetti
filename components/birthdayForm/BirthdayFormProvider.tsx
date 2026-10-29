"use client";
import { createContext, useState, useContext } from "react";
import { ReactNode } from "react";

type BirthdayFormContextType = {
  isAddOpen: boolean;
  initialDate: Date | null;
  openAddBirthday: (options?: OpenAddBirthdayOptions) => void;
  closeAddBirthday: () => void;
  editingPersonId: number | null;
  openEditBirthday: (person: number) => void;
  closeEditBirthday: () => void;
  isEditOpen: boolean;
  initialCircleId: number | null;
};
type OpenAddBirthdayOptions = {
  date?: Date;
  personId?: number;
  circleId?: number;
};

const BirthdayFormContext = createContext<BirthdayFormContextType | null>(null);

export const BirthdayFormProvider = ({ children }: { children: ReactNode }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [initialCircleId, setInitialCircleId] = useState<number | null>(null);

  const openAddBirthday = (options: OpenAddBirthdayOptions = {}) => {
    const { date, personId, circleId } = options;
    setInitialCircleId(circleId ?? null);
    setInitialDate(date ?? null);
    setIsAddOpen(true);
    setEditingPersonId(personId ?? null);
  };
  //to do editBirthday provider
  const openEditBirthday = (personId: number) => {
    setIsEditOpen(true);
    setEditingPersonId(personId);
  };

  const closeEditBirthday = () => {
    setIsEditOpen(false);
  };
  // Only closes: the initial values are left as they were so the form doesn't
  // reset while the mobile sheet slides out. openAddBirthday sets them afresh.
  const closeAddBirthday = () => {
    setIsAddOpen(false);
  };

  return (
    <BirthdayFormContext.Provider
      value={{
        isAddOpen,
        initialDate,
        openAddBirthday,
        closeAddBirthday,
        editingPersonId,
        openEditBirthday,
        closeEditBirthday,
        isEditOpen,
        initialCircleId,
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
