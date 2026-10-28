export const parseFormDataCircle = (formData: FormData) => {
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
