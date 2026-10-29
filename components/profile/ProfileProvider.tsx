"use client";

import { useState, useContext, createContext, ReactNode } from "react";

export type ProfileContextType = {
  closeProfile: () => void;
  openProfile: (personId:number|null) => void;
  isProfileOpen: boolean;
  personId: number | null;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
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
    <ProfileContext.Provider
      value={{ closeProfile, openProfile, isProfileOpen, personId }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return context;
};
