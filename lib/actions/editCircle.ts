'use server';
import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { parseFormDataCircle } from "./dataParsing";

export const editCircle = async (circleId: number, formData: FormData) => {
  const supabase = await createClient();

  const { name, colour, description } = parseFormDataCircle(formData);

  const { error } = await supabase
    .from("circles")
    .update({ name: name, colour: colour, description: description })
    .eq("id", circleId);

  if (error?.code === "23505") {
    return {
      success: false,
      error: "You already have a circle with this name.",
    };
  }
  if (error) {
    throw new Error(`Unable to update database, error:${error.message}`);
  }
  revalidatePath("/");
  return {
    success: true,
    error: null,
  };
};
