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

export const parsePersonFormData = (formData: FormData) => {
  const firstNameValue = formData.get("firstName");
  if (typeof firstNameValue !== "string" || firstNameValue.trim() === "") {
    throw new Error("First name is required");
  }
  const firstName = firstNameValue.trim();
  const surnameValue = formData.get("lastName");
  const surname =
    typeof surnameValue === "string" && surnameValue.trim() !== ""
      ? surnameValue.trim()
      : null;

  const birthDay = Number(formData.get("day"));

  if (!Number.isInteger(birthDay) || birthDay < 1 || birthDay > 31) {
    throw new Error("Invalid birth day");
  }

  const birthMonth = Number(formData.get("month"));
 if (
  !Number.isInteger(birthMonth) ||
  birthMonth < 1 ||
  birthMonth > 12
) {
  throw new Error("Invalid month");
}

  const yearValue = formData.get("year");

  const birthYear =
    typeof yearValue === "string" && yearValue.trim() !== ""
      ? Number(yearValue)
      : null;

  if (
    birthYear !== null &&
    (!Number.isInteger(birthYear) || birthYear < 1900)
  ) {
    throw new Error("Invalid year");
  }
  const circleIdValue = formData.get("circleId");

  const circleId =
    typeof circleIdValue === "string" && circleIdValue !== ""
      ? Number(circleIdValue)
      : null;

  if (circleId !== null && (!Number.isInteger(circleId) || circleId < 1)) {
    throw new Error("Invalid circle");
  }

  const giftNotesValue = formData.get("giftNotes");

  const giftNotes =
    typeof giftNotesValue === "string" && giftNotesValue.trim() !== ""
      ? giftNotesValue.trim()
      : null;

  return {
    firstName,
    surname,
    birthDay,
    birthMonth,
    birthYear,
    circleId,
    giftNotes,
  };
};
