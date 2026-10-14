import { connection } from "next/server";
import { Upcoming } from "@/components/upcoming/Upcoming";
import { getCircle } from "@/lib/fetches/getCircles";
import { getPeople } from "@/lib/fetches/getPeople";

// Upcoming works out "today" while rendering, so render per request rather
// than freezing the build date into a static page.
const page = async () => {
  await connection();
  const circles = getCircle();
  const people = getPeople();
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Upcoming circles={circles} people={people}/>
    </main>
  );
};

export default page;
