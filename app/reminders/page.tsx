import { Reminders } from "@/components/reminders/Reminders";
import { getPeople } from "@/lib/data/people";

const page = async () => {
  const testPeople = await getPeople()
  console.log(
  "PEOPLE RESULT:",
  JSON.stringify(testPeople, null, 2)
);
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Reminders />
    </main>
  );
};

export default page;
