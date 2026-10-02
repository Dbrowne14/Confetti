import { navigation } from "@/data/navigation";
import Link from "next/link";

const FloatingNav = () => {
  return (
    <nav className="flex justify-center gap-4 p-3">
      {navigation.map((item) => {
        const {href, name} = item
        return (
          <Link className="flex gap-2" href={`${href}`} key={name}>
            <span className="h-4 w-4 bg-white"></span>
            <div>{name}</div>
          </Link>
        );
      })}
    </nav>
  );
};

export default FloatingNav;
