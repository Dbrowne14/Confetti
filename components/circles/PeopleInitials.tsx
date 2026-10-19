import { Person } from "@/lib/data/people";
import { initialsRetrieval } from "@/lib/utils/personUtils";

const OVERLAPNUMBER = 3;

// A stack of overlapping initials. Purely decorative: the people count is
// always shown as text next to it.
export const PeopleInitials = ({
  colour,
  people,
  ringClassName = "ring-confetti-surface",
}: {
  // Without a colour the avatars fall back to a neutral tone (Uncategorised).
  colour?: string;
  people: Person[];
  // Matches the background behind the stack so the overlap reads cleanly.
  ringClassName?: string;
}) => {
  const viewedInitials = people.slice(0, OVERLAPNUMBER);
  const additionals = people.length - OVERLAPNUMBER;

  const avatar = `-ml-1 flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] leading-none font-semibold ring-2 first:ml-0 ${ringClassName}`;

  return (
    <div aria-hidden className="flex items-center">
      {viewedInitials.map((person) => (
        <span
          key={person.id}
          className={`${avatar} text-confetti-ink ${colour ? "" : "bg-confetti-border"}`}
          style={colour ? { backgroundColor: colour } : undefined}
        >
          {initialsRetrieval(person)}
        </span>
      ))}
      {additionals > 0 && (
        <span
          className={`${avatar} bg-confetti-ink text-confetti-surface tabular-nums`}
        >
          +{additionals}
        </span>
      )}
    </div>
  );
};
