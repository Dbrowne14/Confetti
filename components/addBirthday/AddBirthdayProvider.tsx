"use client";
import { createContext, useState, useContext } from "react";
import { ReactNode } from "react";

type AddBirthdayContextType = {
  isAddOpen: boolean;
  initialDate: Date | null;
  openAddBirthday: (date?: Date) => void;
  closeAddBirthday: () => void;
};
const AddBirthdayContext = createContext<AddBirthdayContextType | null>(null);

export const AddBirthdayProvider = ({ children }: { children: ReactNode }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<Date | null>(null);

  const openAddBirthday = (date?: Date) => {
    setInitialDate(date ?? null);
    setIsAddOpen(true);
  };

  const closeAddBirthday = () => {
    setIsAddOpen(false);
    setInitialDate(null);
  };

  return (
    <AddBirthdayContext.Provider
      value={{
        isAddOpen,
        initialDate,
        openAddBirthday,
        closeAddBirthday,
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
