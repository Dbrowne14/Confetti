"use client";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";
import { useAddProfile } from "./AddProfileProvider";

export const ProfileHeader = () => {
  const { closeProfile } = useAddProfile();
  const { openAddBirthday } = useAddBirthday();
  return (
    <div className="flex justify-between">
      <button onClick={() => closeProfile}>x</button>
      <button onClick={() => {openAddBirthday(); closeProfile()}}>Edit</button>
    </div>
  );
};
