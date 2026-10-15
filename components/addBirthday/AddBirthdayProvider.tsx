"use client";
import { createContext, useState, useContext } from "react";
import { ReactNode } from "react";

type AddBirthdayContextType = {
  isAddOpen: boolean;
  initialDate: Date | null;
  openAddBirthday: (options?: OpenAddBirthdayOptions) => void;
  closeAddBirthday: () => void;
  editingPersonId: number | null;
};
type OpenAddBirthdayOptions = {
  date?: Date;
  personId?: number;
};

const AddBirthdayContext = createContext<AddBirthdayContextType | null>(null);

export const AddBirthdayProvider = ({ children }: { children: ReactNode }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

  const openAddBirthday = (options: OpenAddBirthdayOptions = {}) => {
    const { date, personId } = options;
    setInitialDate(date ?? null);
    setIsAddOpen(true);
    setEditingPersonId(personId ?? null);
  };

  const closeAddBirthday = () => {
    setIsAddOpen(false);
    setInitialDate(null);
    setEditingPersonId(null);
  };

  return (
    <AddBirthdayContext.Provider
      value={{
        isAddOpen,
        initialDate,
        openAddBirthday,
        closeAddBirthday,
        editingPersonId,
      }}
    >
      {children}
    </AddBirthdayContext.Provider>
  );
};

export const useAddBirthday = () => {
  const context = useContext(AddBirthdayContext);

  if (!context) {
    throw new Error("useAddBirthday must be used inside AddBirthdayProvider");
  }

  return context;
};
