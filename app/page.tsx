import { connection } from "next/server";
import { Calendar } from "@/components/calendar/Calendar";
import { circles } from "@/lib/data/circles";
import { people } from "@/lib/data/people";



// Calendar works out "today" while rendering, so render per request rather
// than freezing the build date into a static page.
export default async function Home() {
  await connection();
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Calendar people={people} circles={circles} />
    </main>
  );
}


