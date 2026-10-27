import { createClient } from "../supabase/server";

export const getPeople = async () => {
  const supabase = await createClient();
  const { data: people, error } = await supabase.from("people").select();

  if (error) {
    throw new Error(`error ${error.message}`);
  }
    return people.map((person) => ({
    id: person.id,
    firstName: person.first_name,
    surname: person.surname,
    birthMonth: person.birth_month,
    birthDay: person.birth_day,
    birthYear: person.birth_year,
    circleId: person.circle_id,
    giftNotes: person.gift_notes,
  }));
};
