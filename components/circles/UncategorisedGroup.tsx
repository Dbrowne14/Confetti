import { Circle } from "@/lib/data/circles";
import { Person } from "@/lib/data/people";

export const UncategorisedGroup = ({
  people,
  circles,
}: {
  people: Person[];
  circles: Circle[];
}) => {
  const UncategorisedGroup = people.filter(
    (person) => person.circleId === null,
  );

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
      <button className="text-red-700">sort</button>
    </div>
  );
};
