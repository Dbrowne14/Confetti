'use client'
import { useState } from "react";

export const CircleColour = ({ circleColour }: { circleColour?: string }) => {
  const [colour, setColour] = useState(circleColour);
  return (
    <div className="flex flex-col">
      <span>Colour</span>
      <label
        htmlFor="circle-colour"
        className="h-8 w-8 cursor-pointer rounded-full border"
        style={{ backgroundColor: colour }}
      >
        <input
          id="circle-colour"
          type="color"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className="sr-only "
        />
      </label>
    </div>
  );
};