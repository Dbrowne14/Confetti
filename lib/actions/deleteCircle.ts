"use server";

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";

export const deleteCircle = async (circleId: number) => {
  const supabase = await createClient();
  if (!Number.isInteger(circleId) || circleId < 1) {
    throw new Error("Invalid circleId");
  }

  const { error } = await supabase.from("circles").delete().eq("id", circleId);

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
