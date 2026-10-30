import { Circles } from "@/components/circles/Circles";

import { getPeople } from "@/lib/fetches/getPeople";
import { getCircles } from "@/lib/fetches/getCircles";

const page = async () => {
  const circles = await getCircles();
  const people = await getPeople();
  console.log("CIRCLES RESULT:", JSON.stringify(circles, null, 2));
  return (
    <div className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Circles people={people} circles={circles}/>
    </div>
  );
};

export default page;
