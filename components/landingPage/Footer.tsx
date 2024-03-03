import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <>

      <hr className="text-white mx-5" />
      <footer className="bg-black pb-5">
        <div className="max-w-screen-xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-300 sm:justify-start"></div>

            <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
              Sermona &nbsp; Career &nbsp; Privacy & Policy &nbsp; Developers
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
