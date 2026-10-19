"use client";

import { useAddBirthday } from "./AddBirthdayProvider";
import { AddBirthday } from "./AddBirthday";
import { Circle } from "@/lib/data/circles";

export const AddBirthdayModal = ({ circles }: { circles: Circle[] }) => {
  const { isAddOpen } = useAddBirthday();

  if (!isAddOpen) return null;

  return <AddBirthday circles={circles} />;
};