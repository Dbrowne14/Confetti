"use client";

import { ReactNode, useEffect, useRef } from "react";
import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { getNextBirthdayDate } from "@/lib/utils/birthdayUtils";
import { ReminderOptions } from "@/components/ui/ReminderOptions";
import { ProfileHeader } from "./ProfileHeader";
import { useAddProfile } from "./AddProfileProvider";
import { ProfileIdentity } from "./ProfileIdentity";
import { ProfileBirthdayDetails } from "./ProfileBirthdayDetails";

export const Profile = ({
  circles,
  people,
}: {
  circles: Circle[];
  people: Person[];
}) => {
  const { isProfileOpen, personId, closeProfile } = useAddProfile();
  const panelRef = useRef<HTMLDivElement>(null);
  const person = people.find((person) => person.id === personId);

  
  // While open: move focus into the drawer and stop the page behind it scrolling.
  useEffect(() => {
    if (!isProfileOpen) return;
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isProfileOpen]);

  useEffect(() => {
    if (!isProfileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProfile();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isProfileOpen, closeProfile]);

  // The backdrop and drawer stay mounted so both the open and close
  // transitions can play; `invisible` + `inert` keep the closed drawer out of
  // the tab order and accessibility tree.
  return (
    <>
      <div
        aria-hidden
        onClick={closeProfile}
        className={`fixed inset-0 z-50 bg-confetti-ink/30 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          isProfileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-name"
        tabIndex={-1}
        inert={!isProfileOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full flex-col bg-confetti-bg shadow-raised outline-none duration-300 ease-out motion-reduce:transition-none sm:w-104 sm:border-l sm:border-confetti-border ${
          // Visibility only transitions on close, so the drawer is visible (and
          // focusable) immediately on open but stays visible while sliding out.
          isProfileOpen
            ? "visible translate-x-0 transition-[translate]"
            : "invisible translate-x-full transition-[translate,visibility]"
        }`}
      >
        {person && <ProfileContent person={person} circles={circles} />}
      </div>
    </>
  );
};

const ProfileContent = ({
  person,
  circles,
}: {
  person: Person;
  circles: Circle[];
}) => {
  const today = new Date();
  const next = getNextBirthdayDate(person, today);

  return (
    <>
      <ProfileHeader person={person} />
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 pt-1 pb-10">
        <ProfileIdentity person={person} circles={circles} />
        <ProfileBirthdayDetails next={next} today={today} person={person} />

        {/* Reminders, gift notes and delete are presentational until the
            backend exists: no state, persistence or deletion behind them. */}
        <ProfileSection label="Reminders">
          <ReminderOptions />
        </ProfileSection>

        <ProfileSection label="Gift notes">
          <textarea
            readOnly
            aria-label="Gift notes"
            value={person.giftNotes ?? ""}
            placeholder="No gift notes yet"
            className="max-h-60 min-h-20 w-full resize-y rounded-xl border border-confetti-border bg-confetti-surface px-3 py-2.5 text-sm text-confetti-ink placeholder:text-confetti-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-confetti-ink"
          />
        </ProfileSection>

        <button
          type="button"
          disabled
          className="self-start text-sm font-semibold text-confetti-danger"
        >
          Delete {person.firstName}
        </button>
      </div>
    </>
  );
};

const ProfileSection = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-2">
    <h3 className="text-[10px] font-semibold tracking-[0.12em] text-confetti-muted uppercase">
      {label}
    </h3>
    {children}
  </section>
);
