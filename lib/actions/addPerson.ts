"use server";
import { createClient } from "../supabase/server";

export const addPerson = async (formData: FormData) => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("User is not authenticated");
  }

  const {
    firstName,
    surname,
    birthDay,
    birthMonth,
    birthYear,
    circleId,
    giftNotes,
  } = parsePersonFormData(formData);
  const userId = claimsData.claims.sub;
  const { error } = await supabase.from("people").insert({
    user_id: userId,
    first_name: firstName,
    surname: surname,
    birth_day: birthDay,
    birth_month: birthMonth,
    birth_year: birthYear,
    circle_id: circleId,
    gift_notes: giftNotes,
  });
  if (error) {
    throw new Error(`Failed to create new birthday: ${error.message}`);
  }
};

const parsePersonFormData = (formData: FormData) => {
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
  const circleIdValue = formData.get("circleId");

  const circleId =
    typeof circleIdValue === "string" && circleIdValue !== ""
      ? Number(circleIdValue)
      : null;

  if (circleId !== null && (!Number.isInteger(circleId) || circleId < 1)) {
    throw new Error("Invalid circle");
  }

  const giftNotesValue = formData.get("giftNotes");

  const giftNotes =
    typeof giftNotesValue === "string" && giftNotesValue.trim() !== ""
      ? giftNotesValue.trim()
      : null;

  return {
    firstName,
    surname,
    birthDay,
    birthMonth,
    birthYear,
    circleId,
    giftNotes,
  };
};
