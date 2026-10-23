
import { createClient } from "../supabase/server";

export type Circle = {
  id: number;
  name: string;
  description: string;
  colour: string;
};

export const circles: Circle[] = [
  {
    id: 1,
    name: "Family",
    description: "Immediate and extended family",
    colour: "#ea7862",
  },
  {
    id: 2,
    name: "Friends",
    description: "Friends",
    colour: "#78a08c",
  },
];

export const getCircles = async () => {
  const supabase = await createClient();
  const { data: circles, error } = await supabase.from("circles").select();

  if (error) {
    throw new Error(`Failed to fetch circles: ${error.message}`);
  }
  return circles;
};
