import { Circles } from "@/components/circles/Circles"
import { getCircles } from "@/lib/data/circles"

const page = async () => {
  const testCircle =  await getCircles()
console.log("CIRCLES RESULT:", JSON.stringify(testCircle, null, 2));
  return (
    <div className="mx-auto w-full max-w-280 px-4 py-6 sm:px-6 lg:py-8">
      <Circles/>
    </div>
  )
}

export default page
