"use client";

import { useState, useContext, createContext, ReactNode } from "react";

export type AddProfileProps = {
  closeProfile: () => void;
  openProfile: (personId:number|null) => void;
  isProfileOpen: boolean;
  personId: number | null;
};

type OpenAddProfileOptions = {
  personId: number;
};


const AddProfileContext = createContext<AddProfileProps | null>(null);

export const AddProfileProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [personId, setPersonId] = useState<number | null>(null);

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const openProfile = (personId:number|null) => {
    setIsProfileOpen(true);
    setPersonId(personId )    
  };

  return (
    <AddProfileContext.Provider
      value={{ closeProfile, openProfile, isProfileOpen, personId }}
    >
      {children}
    </AddProfileContext.Provider>
  );
};

export const useAddProfile = () => {
  const context = useContext(AddProfileContext);
  if (!context) {
    throw new Error("useAddProfile must be used inside AddProfileProvider");
  }
  return context;
};
