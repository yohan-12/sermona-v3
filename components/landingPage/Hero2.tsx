import { Trophy, HeartHandshake, TrendingUp } from "lucide-react";
const Hero2 = () => {
  return (
    <div className="bg-black">
      <section
        id="features"
        className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
      >
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
            Why choose us
          </span>
          <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Your Success is Our Success
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
            We are invested in your church&apos;s growth and success. You are
            not just a client; you&apos;re a partner in a shared journey.
            We&apos;re here to support, understand and grow with you every step
            of the way
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                borderColor: "rgb(93, 79, 240)",
              }}
            >
              {/* SVG content */}
              <Trophy />
            </div>
            <h3 className="mt-6 text-gray-400">Personal Mission</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              It&apos;s a personal mission, passion, and purpose inspired by my
              dad&apos;s ministry to better serve your ministry&apos;s needs.
            </p>
          </div>
          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                borderColor: "rgb(93, 79, 240)",
              }}
            >
              <HeartHandshake />
            </div>
            <h3 className="mt-6 text-gray-400">Collaborative Solutions</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              Your challenges resonate personally with us. We evolve with your
              feedback, ensuring our software meets the unique demands of your
              ministry
            </p>
          </div>

          <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
            <div
              className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)",
                borderColor: "rgb(93, 79, 240)",
              }}
            >
              <TrendingUp />
            </div>
            <h3 className="mt-6 text-gray-400">Adapting with You</h3>
            <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
              As your church&apos;s needs evolve, so does our software.
              We&apos;re dedicated to continuous improvement to ensure your
              ministry stays ahead.
            </p>
          </div>

          {/* Repeat the div for other sections as needed */}

          {/* Repeat the above div for other items, modifying content as needed */}
        </div>

        <div
          className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
          style={{
            backgroundImage:
              "linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)",
            borderColor: "rgba(92, 79, 240, 0.2)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
          style={{
            backgroundImage:
              "linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)",
            borderColor: "rgba(92, 79, 240, 0.2)",
          }}
        ></div>
      </section>
    </div>
  );
};
export default Hero2;
