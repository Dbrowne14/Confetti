"use server";

import { createClient } from "../supabase/server";

export const addCircle = async (formData: FormData) => {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();
  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("Unable to authenticate user");
  }
  const userId = claimsData.claims.sub;
  console.log(userId);

  const { name, colour, description } = parseFormData(formData);
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
  return {
    success: true,
    error: null,
  };
};

const parseFormData = (formData: FormData) => {
  const nameValue = formData.get("name");
  if (typeof nameValue !== "string" || nameValue.trim() === "") {
    throw new Error("Name must be a string");
  }
  const name = nameValue.trim();

  const colourValue = formData.get("colour");
  if (typeof colourValue !== "string" || colourValue.trim() === "") {
    throw new Error("Colour must be a recognised colour or hexcode");
  }

  const colour = colourValue.trim();

  const descriptionValue = formData.get("description");

  const description =
    typeof descriptionValue === "string" && descriptionValue.trim() !== ""
      ? descriptionValue.trim()
      : null;

  return { name, colour, description };
};
