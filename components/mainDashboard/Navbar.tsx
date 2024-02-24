import Link from "next/link";
import { Search } from "./Search";
import UserNav from "./user-nav";
const Navbar = () => {
  return (
    <div className="mt-10 ">
      <div className="flex h-16 items-center space-x-4 justify-between">
        <Link
          href="/"
          className="font-bold text-2xl text-blue-600 hover:underline decoration-wavy "
        >
          Sermona
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
