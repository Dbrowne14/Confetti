"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { parsePersonFormData } from "./dataParsing";

export const editPerson = async (personId: number, formData: FormData) => {
  const supabase = await createClient();

  const {
    firstName,
    surname,
    birthDay,
    birthMonth,
    birthYear,
    circleId,
    giftNotes,
  } = parsePersonFormData(formData);

  const { error } = await supabase
    .from("people")
    .update({
      first_name: firstName,
      surname: surname,
      birth_day: birthDay,
      birth_month: birthMonth,
      birth_year: birthYear,
      circle_id: circleId,
      gift_notes: giftNotes,
    })
    .eq("id", personId);
  console.log("Parsed birth year:", birthYear);
  if (error) {
    throw new Error(`Unable to update person: ${error.message}`);
  }
  revalidatePath("/");
};
