import { createClient } from "../supabase/server";

export const getCircles = async () => {
  const supabase = await createClient();
  const { data: circles, error } = await supabase.from("circles").select();

  if (error) {
    throw new Error(`Failed to fetch circles: ${error.message}`);
  }
  return circles;
};