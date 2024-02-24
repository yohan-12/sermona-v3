import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-lg bg-white px-4 pt-24 py-8 mx-auto text-left md:max-w-none md:text-center">
          <h1 className="text-3xl font-extrabold leading-10 tracking-tight text-black text-center sm:leading-none md:text-6xl lg:text-7xl">
            <span className="inline md:block">Start Free</span>
            <span className=" mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-emerald-400 to-green-500 md:inline-block">
              {" "}
              Join us
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyon-400 to-purple-300">
                {" "}
                Today!
              </span>{" "}
            </span>
          </h1>
          <div className="mx-auto rounded-lg font-black mt-5 text-zinc-400 md:mt-12 md:max-w-lg text-center lg:text-lg">
            <Button variant="link">
              <UserPlus className="mr-2 h-4 w-4" /> Join Sermona
            </Button>
            {/* <button className="bg-tkb border text-sm text-blue-700 py-3 px-7 rounded-full">
              Join Sermona
            </button> */}
          </div>
        </div>
      </section>

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
