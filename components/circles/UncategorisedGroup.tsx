"use client";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { Drawer } from "./Drawer";
import { useState } from "react";
import { BirthdayRow } from "../ui/BirthdayRow";
import {
  getUpcomingBirthdays,
  UpcomingBirthday,
} from "@/lib/utils/birthdayUtils";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { UpcomingBirthdayRow } from "../upcoming/UpcomingDisplay";

export const UncategorisedGroup = ({
  people,
  circles,
}: {
  people: Person[];
  circles: Circle[];
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const UncategorisedGroup = people.filter(
    (person) => person.circleId === null,
  );

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="w-full flex justify-between bg-gray-400 p-5 rounded-2xl">
      <div className="flex">
        <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col">
          <h1>Uncategorised</h1>
          <div>
            {UncategorisedGroup.length}{" "}
            {UncategorisedGroup.length === 1 ? "person" : "people"} with no
            circle yet
          </div>
        </div>
      </div>
      <button className="text-red-700" onClick={openDrawer}>
        sort
      </button>
      {drawerOpen && (
        <UncategorisedDrawer
          closeDrawer={closeDrawer}
          people={UncategorisedGroup}
        />
      )}
    </div>
  );
};

const UncategorisedDrawer = ({
  closeDrawer,
  people,
}: {
  closeDrawer: () => void;
  people: Person[];
}) => {
  const today = new Date();
  const upComingBirthdays = getUpcomingBirthdays(people, today);
  return (
    <Drawer closeDrawer={closeDrawer}>
      <div>
        <button type="button" onClick={closeDrawer}>x</button>
        <div>Uncategorised</div>
        <div>
          {people.length} {people.length === 1 ? "person" : "people"}
        </div>
        <div>
          <PeopleRow birthdays={upComingBirthdays} />
        </div>
      </div>
    </Drawer>
  );
};

const PeopleRow = ({ birthdays }: { birthdays: UpcomingBirthday[] }) => {
  const today = new Date();
  return (
    <div className="w-full">
      <div>People</div>
      {birthdays.map((birthday) => {
        return (
          <UpcomingBirthdayRow
            birthday={birthday}
            circle={undefined}
            daysAway={getDaysUntil(birthday.date, today)}
            key={birthday.person.id}
          />
        );
      })}
    </div>
  );
};
