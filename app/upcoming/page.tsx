import { Upcoming } from "@/components/upcoming/Upcoming";
import { getCircle } from "@/lib/fetches/getCircles";
import { getPeople } from "@/lib/fetches/getPeople";

const page = () => {
  const circles = getCircle();
  const people = getPeople();
  return (
    <main className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Upcoming circles={circles} people={people}/>
    </main>
  );
};

export default page;
