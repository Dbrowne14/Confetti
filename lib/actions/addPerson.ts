"use server";
import { createClient } from "../supabase/server";

export const addPerson = async (formData: FormData) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  console.log(data);
  console.log(Object.fromEntries(formData));
  const firstNameValue = formData.get("firstName");
  if (typeof firstNameValue !== "string" || firstNameValue.trim() === "") {
    throw new Error("First name is required");
  }
  const firstName = firstNameValue.trim();
  const surnameValue = formData.get("lastName");
  const surname =
    typeof surnameValue === "string" && surnameValue.trim() !== ""
      ? surnameValue.trim()
      : null;

  const birthDay = Number(formData.get("day"));

console.log("birthDay:", birthDay);

  if (!Number.isInteger(birthDay) || birthDay < 1 || birthDay > 31) {
    throw new Error("Invalid birth day");
  }

  const birthMonth = Number(formData.get("month"));
  if (birthMonth < 1 || birthMonth > 12) {
    throw new Error("Invalid month");
  }

  const yearValue = formData.get("year");

  const birthYear =
    typeof yearValue === "string" && yearValue.trim() !== ""
      ? Number(yearValue)
      : null;

  if (
    birthYear !== null &&
    (!Number.isInteger(birthYear) || birthYear < 1900)
  ) {
    throw new Error("Invalid year");
  }

  const giftNotesValue = formData.get("giftNotes");

  const giftNotes =
    typeof giftNotesValue === "string" && giftNotesValue.trim() !== ""
      ? giftNotesValue.trim()
      : null;
};
