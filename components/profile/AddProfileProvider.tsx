"use client";

import { useState, useContext, createContext, ReactNode } from "react";

export type AddProfileProps = {
  closeProfile: () => void;
  openProfile: () => void;
  isProfileOpen: boolean;
};

const AddProfileContext = createContext<AddProfileProps | null>(null);

export const AddProfileProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  return (
    <AddProfileContext.Provider
      value={{ closeProfile, openProfile, isProfileOpen }}
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
