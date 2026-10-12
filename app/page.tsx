import { Calendar } from "@/components/calendar/Calendar";
import { circles } from "@/data/circles";
import { people } from "@/data/people";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Calendar people={people} circles={circles} />
    </main>
  );
}
