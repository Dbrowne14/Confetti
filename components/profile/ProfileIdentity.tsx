import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";
import { initialsRetrieval } from "@/lib/utils/personUtils";

export const ProfileIdentity = ({
  person,
  circles,
}: {
  person: Person;
  circles: Circle[];
}) => {
  const { firstName, surname, circleId } = person;
  const circle = circles.find((circle) => circle.id === circleId);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        aria-hidden
        className={`flex size-20 items-center justify-center rounded-full font-serif text-3xl font-semibold text-confetti-ink ${circle ? "" : "bg-confetti-active"}`}
        style={circle ? { backgroundColor: circle.colour } : undefined}
      >
        {initialsRetrieval(person)}
      </div>
      <h2
        id="profile-name"
        className="font-serif text-3xl leading-tight font-semibold tracking-tight text-confetti-ink"
      >
        {firstName} {surname}
      </h2>
      {circle && (
        <span className="flex items-center gap-1.5 rounded-full bg-confetti-active px-2.5 py-1 text-xs font-medium text-confetti-ink">
          <span
            aria-hidden
            className="size-2 rounded-full"
            style={{ backgroundColor: circle.colour }}
          />
          {circle.name}
        </span>
      )}
    </div>
  );
};
