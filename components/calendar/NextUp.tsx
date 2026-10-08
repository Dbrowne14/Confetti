import React from "react";
import { People } from "@/data/people";

const NextUp = ({ people }: { people: People[] }) => {
  const date = new Date();
  return (
    <div className="rounded-3xl bg-confetti-surface p-4 sm:p-5">
      <div>Next Up</div>
      <div></div>
    </div>
  );
};

export default NextUp;
