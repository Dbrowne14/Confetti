"use server";

import { parseFormDataCircle } from "./dataParsing";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export const addCircle = async (formData: FormData) => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("Unable to authenticate user");
  }
  const userId = claimsData.claims.sub;
  console.log(userId);

  const { name, colour, description } = parseFormDataCircle(formData);
  const { error } = await supabase.from("circles").insert({
    user_id: userId,
    name: name,
    colour: colour,
    description: description,
  });
  if (error?.code === "23505") {
    return {
      success: false,
      error: "You already have a circle with this name.",
    };
  }
  if (error) {
    throw new Error(`Failed to create new circle: ${error.message}`);
  }
  revalidatePath("/");
  return {
    success: true,
    error: null,
  };
};

