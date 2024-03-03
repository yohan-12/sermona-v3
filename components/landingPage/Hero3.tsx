"use client";
import { TypewriterEffectSmooth } from "../aceternity-ui/typewrite-effect";
export default function Hero3() {
  const words = [
    {
      text: "교회",
    },
    {
      text: "사역의",
    },
    {
      text: "잠재력을",
    },
    {
      text: "AI로",
      className: "text-orange-500 dark:text-orange-500",
    },
    {
      text: "혁신하세요!",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        당신의 사역을 강화하는 길은 설모나에서 시작됩니다
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          지금 가입하세요!
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          회원 가입
        </button>
      </div>
    </div>
  );
}
