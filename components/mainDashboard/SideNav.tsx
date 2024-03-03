"use client";
import {
  BrainCircuit,
  CalendarCheck,
  ChevronRight,
  Church,
  HandCoins,
  LayoutDashboard,
  MessageSquareText,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Nav } from "./nav";

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        // Check if window width is less than Tailwind's 'md' breakpoint (768px by default)
        if (window.innerWidth < 1100) {
          setIsCollapsed(true);
        } else {
          setIsCollapsed(false);
        }
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call the function to set the initial state based on the current window width
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-8">
        <Button
          variant="secondary"
          className="rounded-full p-2"
          onClick={toggleSidebar}
        >
          <ChevronRight />
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "홈 대시보드",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "교적부",
            href: "/dashboard/people",
            icon: Users,
            variant: "ghost",
          },
          {
            title: "AI 어시스턴트",
            href: "/dashboard/ai-assistant",
            icon: BrainCircuit,
            variant: "ghost",
          },
          {
            title: "제정",
            href: "/dashboard/giving",
            icon: HandCoins,
            variant: "ghost",
          },
          {
            title: "문자보내기",
            href: "/dashboard/text",
            icon: MessageSquareText,
            variant: "ghost",
          },
          {
            title: "일정관리",
            href: "/dashboard/schedule",
            icon: CalendarCheck,
            variant: "ghost",
          },
          {
            title: "출석부",
            href: "/dashboard/attendance",
            icon: Church,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default SideNav;
