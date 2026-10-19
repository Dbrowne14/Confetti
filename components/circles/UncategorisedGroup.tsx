"use client";
import { Person } from "@/lib/data/people";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer";
import { useState } from "react";
import { formatPeopleCount } from "@/lib/utils/circleUtils";
import { FormSection } from "@/components/ui/FormSection";
import { PeopleInitials } from "./PeopleInitials";
import { PeopleBirthdayList } from "./CirclePeople";

// Not a real circle: these are the people whose `circleId` is null, so this is
// shown as a utility row under the grid rather than as another circle card.
export const UncategorisedGroup = ({
  people,
}: {
  people: Person[];
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const uncategorisedPeople = people.filter(
    (person) => person.circleId === null,
  );

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        className="group flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-2xl bg-confetti-active px-4 py-3.5 text-left transition-colors hover:bg-confetti-border/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-border sm:gap-4 sm:px-5"
      >
        {/* Dashed and colourless: these people have no circle colour yet. */}
        <span
          aria-hidden
          className="size-10 shrink-0 rounded-xl border-2 border-dashed border-confetti-ink/15"
        />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[15px] leading-snug font-semibold text-confetti-ink">
            Uncategorised
          </span>
          <span className="truncate text-sm text-confetti-muted">
            {formatPeopleCount(uncategorisedPeople.length)} with no circle yet
          </span>
        </span>
        {uncategorisedPeople.length > 0 && (
          <span className="hidden sm:block">
            <PeopleInitials
              people={uncategorisedPeople}
              ringClassName="ring-confetti-active"
            />
          </span>
        )}
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-confetti-ink">
          Sort
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3.5l4.5 4.5L6 12.5" />
          </svg>
        </span>
      </button>
      {drawerOpen && (
        <UncategorisedDrawer
          closeDrawer={closeDrawer}
          people={uncategorisedPeople}
        />
      )}
    </>
  );
};

const UncategorisedDrawer = ({
  closeDrawer,
  people,
}: {
  closeDrawer: () => void;
  people: Person[];
}) => {
  return (
    <Drawer closeDrawer={closeDrawer} ariaLabel="Uncategorised people">
      <DrawerHeader onClose={closeDrawer} closeLabel="Close uncategorised" />
      <DrawerBody>
        <DrawerTitle
          title="Uncategorised"
          subtitle={`${formatPeopleCount(people.length)} not in a circle yet`}
        />
        <FormSection label="People">
          <PeopleBirthdayList
            people={people}
            circle={undefined}
            emptyMessage="Everyone is in a circle."
          />
        </FormSection>
      </DrawerBody>
    </Drawer>
  );
};
