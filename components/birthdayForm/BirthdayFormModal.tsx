"use client";

import { useBirthdayForm } from "./BirthdayFormProvider";
import { AddBirthday } from "./AddBirthday";
import { birthdayFormTitleId } from "./BirthdayFormHeader";
import { Circle } from "@/lib/data/circles";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useIsDesktop } from "@/lib/hooks/useIsDesktop";
import { Person } from "@/lib/data/people";
import { EditBirthday } from "./EditBirthday";

// One form, two presentations: a centred modal on desktop, and a near
// full-height sheet that slides up from the bottom on mobile.
export const BirthdayFormModal = ({
  circles,
  people,
}: {
  circles: Circle[];
  people: Person[];
}) => {
  const { isOpen, closeBirthdayForm, editingPersonId } = useBirthdayForm();
  const isDesktop = useIsDesktop();

  const editingPerson = people.find((person) => person.id === editingPersonId);

  const content = editingPerson ? (
    <EditBirthday person={editingPerson} circles={circles} />
  ) : (
    <AddBirthday circles={circles} />
  );

  if (isDesktop) {
    if (!isOpen) return null;

    return (
      <>
        <div
          aria-hidden
          className="fixed inset-0 z-50 bg-black/10"
          onClick={closeBirthdayForm}
        />

        <div className="fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[min(27rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-confetti-border bg-confetti-bg shadow-raised">
          {content}
        </div>
      </>
    );
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={closeBirthdayForm}
      labelledBy={birthdayFormTitleId}
      layer="dialog"
      size="full"
    >
      {content}
    </BottomSheet>
  );
};
