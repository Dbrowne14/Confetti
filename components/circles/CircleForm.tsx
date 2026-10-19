"use client";
import { Person } from "@/lib/data/people";
import { Circle } from "@/lib/data/circles";
import {
  filterPeopleByCircle,
  formatPeopleCount,
} from "@/lib/utils/circleUtils";
import { getDaysUntil } from "@/lib/utils/dateUtils";
import { UpcomingBirthdayRow } from "../upcoming/UpcomingDisplay";
import { getUpcomingBirthdays } from "@/lib/utils/birthdayUtils";
import { useAddBirthday } from "../addBirthday/AddBirthdayProvider";
import { FormSection } from "../addBirthday/FormSection";
import { CircleColour } from "./CircleColour";
import {
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  primaryButton,
} from "./Drawer";


export const CircleForm = ({
  circle,
  people,
}: {
  circle: Circle;
  people: Person[];
}) => {
  const { colour, name, id } = circle;
  const peopleInCircle = filterPeopleByCircle(people, id);
  return (
    // Saving is presentational until the backend exists; this stops the
    // submit from reloading the page in the meantime.
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(e) => e.preventDefault()}
    >
      <DrawerBody>
        <DrawerTitle
          title={name}
          subtitle={formatPeopleCount(peopleInCircle.length)}
        />
        <CircleColour circleColour={colour} key={id} />
        <CirclePeople people={peopleInCircle} circle={circle} />

        <div className="mt-auto border-t border-confetti-border pt-5">
          {/* Presentational until deleting circles is supported. */}
          <button
            type="button"
            disabled
            className="text-sm font-semibold text-confetti-danger transition-colors enabled:cursor-pointer enabled:hover:text-confetti-danger/80 disabled:cursor-not-allowed"
          >
            Delete circle
          </button>
        </div>
      </DrawerBody>
      <DrawerFooter>
        <button type="submit" className={primaryButton}>
          Save changes
        </button>
      </DrawerFooter>
    </form>
  );
};



const CirclePeople = ({
  people,
  circle,
}: {
  people: Person[];
  circle: Circle;
}) => {
  const today = new Date();
  const upComingBirthdays = getUpcomingBirthdays(people, today);
  const { openAddBirthday } = useAddBirthday()
  return (
    <FormSection label="People">
      {upComingBirthdays.length === 0 && (
        <p className="text-sm text-confetti-muted">
          No one in this circle yet.
        </p>
      )}
      {upComingBirthdays.map((birthday) => {
        return (
          <UpcomingBirthdayRow
            birthday={birthday}
            circle={circle}
            daysAway={getDaysUntil(birthday.date, today)}
            key={birthday.person.id}
          />
        );
      })}
      <button
        type="button"
        onClick={() => openAddBirthday({ circleId: circle.id })}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-dashed border-confetti-ink/20 text-sm font-semibold text-confetti-ink transition-colors hover:border-confetti-ink/40 hover:bg-confetti-surface/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-confetti-ink active:bg-confetti-surface"
      >
        <span aria-hidden>+</span> Add someone to this circle
      </button>
    </FormSection>
  );
};
