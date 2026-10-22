import { connection } from "next/server";
import { Calendar } from "@/components/calendar/Calendar";
import { circles } from "@/lib/data/circles";
import { people } from "@/lib/data/people";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";


// Calendar works out "today" while rendering, so render per request rather
// than freezing the build date into a static page.
export default async function Home() {
  await connection();
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Calendar people={people} circles={circles} />
          <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsData />
    </Suspense>
    </main>
  );
}


async function InstrumentsData() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase.from("instruments").select();

  if (error) {
    return <p>Error loading instruments: {error.message}</p>;
  }

  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}

