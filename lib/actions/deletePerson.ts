"use server";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export const deletePerson = async (personId: number) => {
  const supabase = await createClient();

  if (!Number.isInteger(personId) || personId < 1) {
    throw new Error("Invalid person ID");
  }
  const { error } = await supabase
    .from("people")
    .delete()
    .eq("id", personId)

  if (error) {
    throw new Error("unable to delete user");
  }
revalidatePath("/")
};
