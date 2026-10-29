"use server";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { ActionResult } from "./actionResult";

export const deletePerson = async (
  personId: number,
): Promise<ActionResult> => {
  const supabase = await createClient();

  if (!Number.isInteger(personId) || personId < 1) {
    throw new Error("Invalid person ID");
  }
  const { error } = await supabase.from("people").delete().eq("id", personId);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }
  revalidatePath("/");
  return {
    success: true,
    error: null,
  };
};
