import React from "react";
import MemberCard from "./member-card";
const MainSection = () => {
  return (
    <div className="grid grid-rows-4 gap-6 mt-20 md:grid-cols-2 lg:grid-cols-4">
      <div className="md:col-span-2 md:row-span-2">
        <MemberCard />
      </div>
      <div className="border row-span-2">출석부</div>
      <div className="border row-span-2">헌금</div>
      <div className="border row-span-2 md:order-4 lg:order-3 min-h-[200px]">
        문자보내기
      </div>
      <div className="border col-span-2 row-span-2 md:order-3 min-h-[200px]">
        AI 설교
      </div>
      <div className="border row-span-2 md:order-5 min-h-[200px]">일정관리</div>
    </div>
  );
};

export default MainSection;
