"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { parsePersonFormData } from "./dataParsing";

export const editPerson = async (personId: number, formData: FormData) => {
  const supabase = await createClient();
  try {
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
    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
  revalidatePath("/");
  return {
    success: true,
    error: null,
  };
};
