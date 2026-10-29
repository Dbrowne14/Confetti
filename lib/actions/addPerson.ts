"use server";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { parsePersonFormData } from "./dataParsing";

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

  revalidatePath("/")
};

