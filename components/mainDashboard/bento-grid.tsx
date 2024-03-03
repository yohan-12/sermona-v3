"use client";
import React from "react";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "../aceternity-ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function BentoLayout() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        >
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            href={item.href}
          />
        </Link>
      ))}
    </BentoGrid>
  );
}
const SkeletonSunset = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #a1c4fd, #c2e9fb, #c2e9fb, #96deda)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonCool = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad0c4, #f6d365)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonForest = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #5f9ea0, #8fb0ab, #8fb0ab, #3b8d99)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonSunRise = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #f09819, #edde5d, #edde5d, #00d2ff)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonPeachy = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ffd1cf, #f0c6e6, #f0c6e6, #f3e7e9)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonDessertDusk = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #f6b93b, #fd9644, #fc5c7d, #6a82fb)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};
const SkeletonSpringBloom = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #E6E9F0, #EFEFEF, #CCD1E4, #E2E2E2)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "교적부",
    description:
      "교인 정보를 원활하게 추가 업데이트 및 정리하여 편하게 관리하세요.",
    header: <SkeletonSunset />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/people",
  },
  {
    title: "AI 어시스턴스",
    description: "Dive into the transformative power of technology.",
    header: <SkeletonCool />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/ai-assistant",
  },
  {
    title: "제정",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <SkeletonSunRise />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/giving",
  },
  {
    title: "문자보내기",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <SkeletonForest />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/text",
  },
  {
    title: "일정관리",
    description: "다가오는 교회 행사 및 일정을 관리하세요",
    header: <SkeletonPeachy />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/schedule",
  },
  {
    title: "출석부",
    description: "Experience the thrill of bringing ideas to life.",
    header: <SkeletonDessertDusk />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/attendance",
  },
  {
    title: "설정",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <SkeletonSpringBloom />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    href: "/dashboard/setting",
  },
];
